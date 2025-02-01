const API_BASE_URL = "http://localhost:5000/api"; // Adjust if deployed

// Fetch all influencers
export const fetchInfluencers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/influencers`);
      return response.json();
    } catch (error) {
      console.error("Error fetching influencers:", error);
      return [];
    }
  };

// Fetch all health claims
export const fetchClaims = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/claims`);
    return response.json();
  } catch (error) {
    console.error("Error fetching claims:", error);
    return [];
  }
};

export const searchInfluencers = async (query) => {
    try {
      const response = await fetch(`${API_BASE_URL}/influencers/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery: query }),
      });
      return response.json();
    } catch (error) {
      console.error("Error searching influencers:", error);
      return { success: false };
    }
  };

export const fetchInfluencerDetails = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/influencers/${id}`);
        return response.json();
    } catch (error) {
        console.error("Error fetching influencer details:", error);
        return null;
    }
};