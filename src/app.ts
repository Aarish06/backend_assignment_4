import express, { Express } from "express";
import loanRoutes from "./api/v1/routes/loanRoutes"
// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1/loans", loanRoutes)

export default app;