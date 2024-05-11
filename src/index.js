import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI();
const app = express();
const port = process.env.SERVER_PORT;

openai.apiKey = process.env.OPENAI_API_KEY;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/", async (req, res) => {
    let { message } = req.body;
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `${message}`,
        max_tokens: 4000,
        temperature: 0,
    });

    if (response) {
        if (response.choices) {
            res.json({
                message: response.choices[0].text,
            });
        }
    }
});

app.listen(port, () => {
    console.log("port: " + port);
});