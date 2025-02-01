import React, { useEffect,useState } from "react";
import Button from '../components/Button';
import { supabase } from "../supabaseClient";

import { fetchInfluencers } from "../api/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [influencers, setInfluencers] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const loadData = async () => {
        const influencerData = await fetchInfluencers();
        setInfluencers(influencerData);
      };
      loadData();
    }, []);
  
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Health Claim Tracker</h1>
  
        {/* Display Influencers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {influencers.map((inf) => (
            <div
              key={inf.id}
              className="p-4 border rounded-lg shadow-lg bg-white cursor-pointer hover:shadow-xl"
              onClick={() => navigate(`/influencers/${inf.id}`)}
            >
              <img src={inf.image_url || "/default-avatar.png"} alt={inf.name} className="w-20 h-20 rounded-full mx-auto mb-2" />
              <h2 className="text-xl font-semibold text-center">{inf.name}</h2>
              <p className="text-gray-600 text-center">Platform: {inf.platform}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Dashboard;