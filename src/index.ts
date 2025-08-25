import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
// import Stats from "./core/value-objects/Stats.js";
import Stats from "@/core/value-objects/Stats.js";

// constants
const app = express();
const PORT = 3000;

// cors settings
const settings = {
  // ["http://localhost:5173", "https://myapp.com"]
  origin: "*", // allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // allow cookies/auth headers
};

// enable cors
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.send("Welcome to RPG Game!");
});

app.listen(PORT, () => console.log(`🚀 RPG running on: ${PORT}`));

console.log("\nthis is dope\n");
