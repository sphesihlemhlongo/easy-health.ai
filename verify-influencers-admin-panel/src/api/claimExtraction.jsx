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
  
