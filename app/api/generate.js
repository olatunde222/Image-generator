// From the openAi library
import { Configuration, OpenAIApi } from "openai";

// configuration for the OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// create an instance of the OpenAI API to make requests
const openai = new OpenAIApi(configuration);

// Creating a function to handle the request
export default async function (req, res) {
  const { prompt, imageSize } = req.body;
  // check if the API key is provided
  if (!configuration.apiKey) {
    return res.status(500).json({
      error: {
        message: "API key not provided",
      },
    });
  }
  // check if the prompt is provided
  if (!prompt.trim().length === 0 || imageSize.trim().length === 0) {
    return res.status(400).json({
      error: {
        message: "Prompt not provided",
      },
    });
  }

  // error message
  try {
    let response = await openai.createImage({
      prompt,
      n: 5,
      size,
    });
    return res.send({ data: response.data.data });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: {
        message: error.message,
      },
    });
  }
}
