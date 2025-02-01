import { supabase } from "../verify-influencers-admin-panel/src/supabaseClient";
import { fetchInfluencersFromWeb } from "./fetchFromPerplexity";
import { storeInfluencerData } from "./storeInfluencerData";

export const searchInfluencer = async (query) => {
    try {
        // Check database first
        let { data: dbResults, error } = await supabase
            .from("influencers")
            .select("name, category")
            .ilike("name", `%${query}%`);

        if (error) throw error;

        if (dbResults.length > 0) {
            console.log("Found influencers in database:", dbResults);
            return dbResults;
        }

        // If not found, fetch from Perplexity
        console.log("Fetching from Perplexity...");
        const webResults = await fetchInfluencersFromWeb(query);

        if (webResults.length > 0) {
            await storeInfluencerData(webResults);
            return webResults;
        }

        return [];
    } catch (error) {
        console.error("Error during influencer search:", error);
        return [];
    }
};
