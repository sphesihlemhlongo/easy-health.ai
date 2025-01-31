import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const Dashboard = () => {
  const [influencers, setInfluencers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInfluencers = async () => {
      const { data, error } = await supabase.from('influencers').select('*');
      if (error) {
        console.error('Error fetching influencers:', error);
      } else {
        setInfluencers(data);
      }
    };
    fetchInfluencers();
  }, []);

  const handleSearch = async () => {
    const { data, error } = await supabase
      .from('influencers')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,topic.ilike.%${searchTerm}%,claims.ilike.%${searchTerm}%`);
    
    if (error) {
      console.error('Error searching influencers:', error);
    } else {
      setInfluencers(data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search by influencer, topic, or medical condition"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 w-full rounded-md"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded mt-2"
      >
        Search
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {influencers.map((influencer) => (
          <div key={influencer.id} className="border p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold">{influencer.name}</h2>
            <p className="text-gray-600">Topic: {influencer.topic}</p>
            <p className="text-gray-800">Claims: {influencer.claims}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;