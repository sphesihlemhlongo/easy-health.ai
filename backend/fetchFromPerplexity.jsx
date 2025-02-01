import fetch from "node-fetch";

const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";
const API_KEY = process.env.PERPLEXITY_API_KEY; 

export const fetchInfluencersFromWeb = async (query) => {
    try {
        const options = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "sonar",
                messages: [
                    { role: "system", content: "Be precise and concise." },
                    {
                        role: "user",
                        content: `Find well-known health influencers and list their health claims along with their category (e.g., nutrition, dentistry, fitness).`,
                    },
                ],
                max_tokens: 300,
                temperature: 0.2,
                top_p: 0.9,
                search_domain_filter: ["perplexity.ai"],
                return_images: false,
                return_related_questions: false,
                search_recency_filter: "month",
                top_k: 0,
                stream: false,
                presence_penalty: 0,
                frequency_penalty: 1,
                response_format: null,
            }),
        };

        const response = await fetch(PERPLEXITY_API_URL, options);
        const data = await response.json();

        if (!data || !data.choices || data.choices.length === 0) {
            console.error("No results returned from Perplexity AI");
            return [];
        }

        // Extract relevant influencer and claim information
        const influencers = data.choices[0]?.message?.content?.split("\n") || [];

        return influencers.map((entry) => {
            const parts = entry.split(" - ");
            return {
                name: parts[0]?.trim(),
                category: parts[1]?.trim() || "Unknown",
                claims: parts.slice(2).map((claim) => claim.trim()),
            };
        });
    } catch (error) {
        console.error("Error fetching influencers from Perplexity AI:", error);
        return [];
    }
};
