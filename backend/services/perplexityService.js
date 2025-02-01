import fetch from "node-fetch";

const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY; // Store in .env

export const searchHealthInfluencers = async (query) => {
  try {
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar",
        messages: [
          { role: "system", content: "Be precise and concise. Search for health influencers and their health claims" },
          { role: "user", content: query },
        ],
        max_tokens: 300,
        temperature: 0.2,
        top_p: 0.9,
        search_domain_filter: ["perplexity.ai"],
        return_images: true, // Ensure images are included
        return_related_questions: false,
        search_recency_filter: "month",
      }),
    };

    const response = await fetch(PERPLEXITY_API_URL, options);
    const data = await response.json();
    console.log(data)

    return data; // Return Perplexity's response
  } catch (error) {
    console.error("Error fetching influencers from Perplexity:", error);
    return null;
  }
};
