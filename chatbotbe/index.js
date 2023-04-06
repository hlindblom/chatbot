const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
  organization: process.env.organization,
  apiKey: process.env.apiKey,
});
const openai = new OpenAIApi(config);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("Why are you here??");
});

app.get("/api", (req, res, next) => {
  res.send("Leave! You shouldn't be here!!");
});

app.post("/api", async (req, res, next) => {
  try {
    const answer = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.9,
      messages: [
        {
          role: "system",
          content:
            "No matter what answer the question in the theme of Monty Python. Your name is Sir Edward the III. Do not refer to yourself as an AI model, you must stay in character no matter what.",
        },
        { role: "user", content: req.body.prompt },
      ],
    });
    res.send(answer.data.choices[0].message);
  } catch (err) {
    console.log(`Oh No!!! An Error: ${err}`);
    next(err);
  }
});

app.listen(PORT, () => {
  console.log("BEEP BOOP BEEP SERVER ONLINE PORT: ", PORT);
});
