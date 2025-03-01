import express from "express";
import path from "path";
import { fileURLToPath } from "url"; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();
const PORT = 5092;


app.use(express.static(path.join(__dirname, "dist"))); 
app.get("/samid", (req, res) => {
    try {
    res.status(200).json({ message: "I samid" });
        } catch (error) {
    res.status(500).json({ message: error.response.data });
    }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "indexedDB.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});
