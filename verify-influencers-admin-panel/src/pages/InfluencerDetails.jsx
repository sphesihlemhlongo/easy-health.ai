import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchInfluencerDetails } from "../api/api.jsx";

const InfluencerProfile = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchInfluencerDetails(id);
      setInfluencer(data);
    };
    loadData();
  }, [id]);

  if (!influencer) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4">
        <img
          src={influencer.influencer.image_url || "/default-avatar.png"}
          alt={influencer.influencer.name}
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{influencer.influencer.name}</h1>
          <p className="text-gray-500">Platform: {influencer.influencer.platform}</p>
          <p className="text-green-600 font-semibold">Trust Score: {influencer.trustScore}%</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mt-6">Claims</h2>
      {influencer.claims.length > 0 ? (
        <ul className="mt-4">
          {influencer.claims.map((claim) => (
            <li key={claim.id} className="p-3 border-b">
              <p className="text-lg">{claim.claim_text}</p>
              <p className="text-sm text-gray-500">Status: {claim.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No claims found for this influencer.</p>
      )}
    </div>
  );
};

export default InfluencerProfile;
