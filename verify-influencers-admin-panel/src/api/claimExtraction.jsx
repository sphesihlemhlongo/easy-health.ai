import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});

export const extractHealthClaims = async (text) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI that extracts health-related claims from text.",
        },
        {
          role: "user",
          content: `Extract health claims from the following text:\n"${text}"`,
        },
      ],
    });

    return response.choices[0].message.content.split("\n").map((claim) => claim.trim());
  } catch (error) {
    console.error("Error extracting claims:", error);
    return [];
  }
};


export const removeDuplicateClaims = (claims) => {
    const uniqueClaims = new Set(claims.map((claim) => claim.toLowerCase()));
    return Array.from(uniqueClaims);
  };
  
export const formatClaims = (tweets, podcasts) => {
    let claims = [];

    tweets.forEach(tweet => {
        claims.push({ source: "Twitter", text: tweet.text, influencer: tweet.author, verified: false });
    });

    podcasts.forEach(podcast => {
        claims.push({ source: "Podcast", text: podcast.transcript, influencer: podcast.host, verified: false });
    });

    return claims;
};
