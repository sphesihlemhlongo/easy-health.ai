const API_BASE_URL = "https://easy-healthai-production.up.railway.app/api"; // Adjust if deployed

// Fetch all influencers
export const fetchInfluencers = async () => {
    try {
      const response = await fetch("https://easy-healthai-production.up.railway.app//api/influencers"); // Adjust backend URL if needed
      const data = await response.json();
      
      // Ensure data is always an array
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching influencers:", error);
      return []; // Return empty array on error
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