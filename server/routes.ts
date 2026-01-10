import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { z } from "zod";

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL || "https://YOUR_GHL_WEBHOOK_HERE";

async function sendToGHL(leadData: any): Promise<boolean> {
  if (GHL_WEBHOOK_URL === "https://YOUR_GHL_WEBHOOK_HERE") {
    console.log("[GHL] Webhook not configured, skipping...");
    return true;
  }

  try {
    const response = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...leadData,
        timestamp: new Date().toISOString(),
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("[GHL] Webhook error:", error);
    return false;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/leads", async (req: Request, res: Response) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      
      const lead = await storage.createLead(validatedData);
      
      const ghlSuccess = await sendToGHL({
        ...lead,
        source: "CarSettlements Landing Page",
      });

      if (!ghlSuccess) {
        console.log("[Lead] GHL webhook failed, lead saved locally:", lead.id);
      }

      console.log("[Lead] New lead captured:", {
        id: lead.id,
        name: `${lead.firstName} ${lead.lastName}`,
        state: lead.state,
        balance: lead.loanBalance,
        language: lead.language,
      });

      res.status(201).json({ 
        success: true, 
        message: "Lead captured successfully",
        leadId: lead.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
        return;
      }
      
      console.error("[Lead] Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  app.get("/api/leads", async (_req: Request, res: Response) => {
    try {
      const leads = await storage.getLeads();
      res.json({ success: true, leads });
    } catch (error) {
      console.error("[Leads] Error fetching leads:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  return httpServer;
}
