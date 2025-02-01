import { supabase } from "../supabaseClient";

export const storeInfluencerData = async (influencers) => {
    try {
        for (let influencer of influencers) {
            // Check if influencer already exists in the database
            let { data: existingInfluencer } = await supabase
                .from("influencers")
                .select("*")
                .eq("name", influencer.name)
                .single();

            if (!existingInfluencer) {
                // Insert new influencer
                const { data, error } = await supabase.from("influencers").insert([{ 
                    name: influencer.name, 
                    category: influencer.category 
                }]);

                if (error) {
                    console.error("Error storing influencer:", error);
                    continue;
                }

                console.log("Stored influencer:", data);
            }

            // Insert claims
            for (let claim of influencer.claims) {
                await supabase.from("claims").insert([{ 
                    influencer: influencer.name, 
                    text: claim, 
                    category: influencer.category, 
                    verified: false 
                }]);
            }
        }
    } catch (error) {
        console.error("Error storing influencer data:", error);
    }
};
