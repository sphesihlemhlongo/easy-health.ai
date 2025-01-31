import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const InfluencerPage = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchInfluencerDetails = async () => {
      const { data, error } = await supabase
        .from("influencers")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error("Error fetching influencer:", error);
      setInfluencer(data);
    };
    
    const fetchClaims = async () => {
      const { data, error } = await supabase
        .from("claims")
        .select("*")
        .eq("influencer_id", id);
      if (error) console.error("Error fetching claims:", error);
      setClaims(data);
    };

    fetchInfluencerDetails();
    fetchClaims();
  }, [id]);

  if (!influencer) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{influencer.name}</h1>
      <p>Followers: {influencer.followers}</p>
      <p>Trust Score: {influencer.trust_score}</p>
      <h2 className="mt-4 text-lg font-semibold">Health Claims</h2>
      <ul className="list-disc pl-6">
        {claims.map((claim) => (
          <li key={claim.id} className="mt-2">
            {claim.text} - <span className="font-bold">{claim.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfluencerPage;

