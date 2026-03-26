import express from "express";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/contact", contactRoutes);

export default app;
