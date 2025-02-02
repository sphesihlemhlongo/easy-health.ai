import React, { useEffect,useState } from "react";
// import Button from '../components/Button';
// import { supabase } from "../supabaseClient";

import { fetchInfluencers } from "../api/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [influencers, setInfluencers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
        const loadData = async () => {
          const influencerData = await fetchInfluencers();
          setInfluencers(Array.isArray(influencerData) ? influencerData : []); // Ensure it's an array
        };
        loadData();
      }, []);
    console.log('influencers:', influencers);
  
    // Filter influencers based on the search term
    const filteredInfluencers = Array.isArray(influencers)
    ? influencers.filter(
        (inf) =>
          inf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inf.platform.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Health Claim Tracker</h1>
  
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search influencers..."
          className="w-full p-2 border rounded-lg mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
  
        {/* Display Influencers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredInfluencers.length > 0 ? (
            filteredInfluencers.map((inf) => (
              <div
                key={inf.id}
                className="p-4 border rounded-lg shadow-lg bg-white cursor-pointer hover:shadow-xl"
                onClick={() => navigate(`/influencers/${inf.id}`)}
              >
                <img
                  src={inf.image_url || "/default-avatar.png"}
                  alt={inf.name}
                  className="w-20 h-20 rounded-full mx-auto mb-2"
                />
                <h2 className="text-xl font-semibold text-center">{inf.name}</h2>
                <p className="text-gray-600 text-center">Platform: {inf.platform}</p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No influencers found.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default Dashboard;
