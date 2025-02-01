import React, { useEffect,useState } from "react";
import Button from '../components/Button';
import { supabase } from "../supabaseClient";

import { fetchInfluencers, searchInfluencers } from "../api/api.jsx";

const Dashboard = () => {
  const [influencers, setInfluencers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const influencerData = await fetchInfluencers();
      setInfluencers(influencerData);
    };
    loadData();
  }, []);

  const handleSearch = async () => {
    if (!search.trim()) return;
    const result = await searchInfluencers(search);
    if (result.success) {
      setInfluencers([...influencers, ...result.influencers]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Health Claim Tracker</h1>

      {/* Search Input */}
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search for health influencers & claims..."
          className="border p-2 flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Display Influencers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {influencers.map((inf) => (
          <div key={inf.name} className="p-4 border rounded-lg shadow-lg bg-white">
            <img src={inf.imageUrl || "/default-avatar.png"} alt={inf.name} className="w-20 h-20 rounded-full mx-auto mb-2" />
            <h2 className="text-xl font-semibold text-center">{inf.name}</h2>
            <p className="text-gray-600 text-center">Claim: {inf.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;