// api/server.ts
import express from "express";
import { VercelRequest, VercelResponse } from '@vercel/node';

const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Express on Vercel!" });
});

// This is the function Vercel will run
export default function handler(req: VercelRequest, res: VercelResponse) {
  app(req as any, res as any); // Express handles the request
}
