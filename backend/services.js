const axios = require("axios");

exports.fetchPerplexityData = async (handle) => {
  const response = await axios.get(`https://api.perplexity.ai/v1/search?q=${handle}+health`);
  return response.data;
};

exports.verifyWithOpenAI = async (claims) => {
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4",
      messages: [{ role: "user", content: `Verify these claims: ${claims.join(", ")}` }],
    },
    { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
  );
  
  return response.data.choices[0].message.content;
};
