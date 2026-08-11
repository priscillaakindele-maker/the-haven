import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI SDK if key present
  const apiKey = process.env.GEMINI_API_KEY;
  let aiClient: GoogleGenAI | null = null;
  if (apiKey) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", hotel: "The Haven" });
  });

  // AI Concierge Chat API
  app.post("/api/concierge", async (req, res) => {
    try {
      const { message, conversationHistory } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required." });
      }

      if (!aiClient) {
        // Fallback intelligent responder if API key isn't provided yet
        const text = getFallbackConciergeResponse(message);
        return res.json({ reply: text, fallback: true });
      }

      const systemInstruction = `You are "Aurelia", the Head Concierge at "The Haven", a world-renowned 5-star boutique luxury resort nestled in a serene coastal sanctuary.
Your tone is remarkably polished, warm, discreet, elegant, and attentive — echoing the iconic high-touch hospitality of Aman Resorts, Four Seasons, and Edition Hotels.

Hotel Knowledge Base:
- Hotel Name: The Haven (5-Star Boutique Sanctuary & Spa)
- Location: Amalfi Coast Cliffside Sanctuary, Italy (Private Helicopter pad & Yacht dock available)
- Check-in: 3:00 PM | Check-out: 12:00 PM (Late check-out available upon request)
- Dining:
  1. "L'Étoile" - 3 Michelin-Star fine dining with Executive Chef Jean-Luc Laurent. Focuses on organic Mediterranean tasting menus and vintage pairings.
  2. "The Sunken Garden" - Sunset cocktail lounge with artisanal botanical elixirs and raw bar.
  3. "The Tea Salon" - High tea & breakfast in a glass pavilion overlooking the sea.
- Rooms & Suites:
  1. The Haven Villa (Private Infinity Pool, 24/7 Butler, 280 sqm) - $3,200/night
  2. Sanctuary Ocean Suite (Panoramic terrace, private plunge pool, 140 sqm) - $1,850/night
  3. Forest Pavilion (Submerged in pine canopy, outdoor stone bath, 110 sqm) - $1,400/night
  4. Horizon King Room (Minimalist Japanese-Nordic design, 75 sqm) - $950/night
- Spa & Wellness: "Sanctuary Spa" with thermal mineral hydrotherapy, Japanese Onsen-inspired baths, sound bath meditation, bespoke organic botanical massages, and personal wellness masters.
- Experiences: Private Riviera Yacht Charters, Sunset Helicopter Tours, Truffle Hunting with master hounds, Private Stargazing, Cellar Master Class.
- Amenities: Heated Infinity Pool, Private Beach Club, Tesla/Lucid Valet Charging, Helicopter Pad, 24/7 Personal Butler Service, High-speed Starlink Wi-Fi.

Guidelines:
- Answer questions with refined elegance and conciseness (2-4 sentences usually, unless detail is requested).
- Address the guest with respect ("Dear Guest", "It would be my absolute pleasure", "Allow me to assist you").
- Offer to make reservations or schedule spa appointments whenever appropriate.
- Keep output formatted clearly. Do NOT output raw markdown symbols like ** inside single words or weird JSON unless asked.`;

      const contents: any[] = [];
      if (Array.isArray(conversationHistory)) {
        for (const item of conversationHistory) {
          if (!item.text || typeof item.text !== "string") continue;
          const role = item.sender === "user" ? "user" : "model";
          
          // Gemini contents must start with 'user'
          if (contents.length === 0 && role === "model") {
            continue; // Skip initial model greetings
          }
          
          // Roles must alternate: if current role matches previous role, merge texts
          if (contents.length > 0 && contents[contents.length - 1].role === role) {
            contents[contents.length - 1].parts[0].text += `\n${item.text}`;
          } else {
            contents.push({
              role: role,
              parts: [{ text: item.text }],
            });
          }
        }
      }

      // Append current user message if not already trailing
      if (contents.length > 0 && contents[contents.length - 1].role === "user") {
        if (!contents[contents.length - 1].parts[0].text.endsWith(message)) {
          contents[contents.length - 1].parts[0].text += `\n${message}`;
        }
      } else {
        contents.push({
          role: "user",
          parts: [{ text: message }],
        });
      }

      const response = await aiClient.models.generateContent({
        model: "gemini-3.6-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || "It is my honor to serve you at The Haven. How may I further customize your stay today?";
      return res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Error in AI Concierge route:", err);
      const fallbackReply = getFallbackConciergeResponse(req.body?.message || "");
      return res.json({
        reply: fallbackReply,
        fallback: true,
        error: err.message,
      });
    }
  });

  // Vite middleware for development vs production static serve
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`The Haven Luxury Hotel Server listening on http://localhost:${PORT}`);
  });
}

function getFallbackConciergeResponse(message: string): string {
  const query = message.toLowerCase();
  if (query.includes("room") || query.includes("suite") || query.includes("stay") || query.includes("book")) {
    return "At The Haven, our sanctuary offers four distinct sanctuaries ranging from our minimalist Horizon Rooms ($950/night) to The Haven Villa with a private infinity pool ($3,200/night). May I assist you in selecting dates for your stay?";
  }
  if (query.includes("dine") || query.includes("restaurant") || query.includes("food") || query.includes("menu") || query.includes("eat")) {
    return "Our flagship restaurant, L'Étoile, holds 3 Michelin stars under Executive Chef Jean-Luc Laurent, presenting hyper-seasonal Mediterranean tasting menus. We also feature the Sunken Garden Sunset Bar and The Pavilion Tea Salon. Shall I reserve a table for you?";
  }
  if (query.includes("spa") || query.includes("massage") || query.includes("wellness") || query.includes("pool")) {
    return "The Sanctuary Spa features private thermal hydrotherapy, sound bath rituals, and organic botanical body treatments crafted by world-class holistic therapists. We welcome you to reserve your session online.";
  }
  if (query.includes("checkout") || query.includes("checkin") || query.includes("time") || query.includes("hour")) {
    return "Check-in at The Haven commences at 3:00 PM, and check-out is extended through 12:00 PM. Should you require early arrival or late departure via helicopter transfer, our private valet will happily arrange it.";
  }
  return "Welcome to The Haven Concierge. It would be my absolute pleasure to assist you with room reservations, Michelin dining at L'Étoile, bespoke spa rituals, or private yacht charters during your stay.";
}

startServer();
