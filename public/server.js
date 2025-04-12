const axios = require("axios");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const HF_API_KEY = "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";
const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"; // Correct HF API URL

app.post("/generate-image", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text is required" });

    const response = await axios.post(
      API_URL,
      { inputs: text },
      {
        headers: { Authorization: `Bearer ${HF_API_KEY}` },
        responseType: "arraybuffer", // ✅ Correct response type
      }
    );

    // Convert the received image data to Buffer
    res.set("Content-Type", "image/png");
    res.send(Buffer.from(response.data)); // ✅ Send as an actual image
  } catch (error) {
    console.error("Backend Error:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
