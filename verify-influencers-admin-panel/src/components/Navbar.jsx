// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Define navigation links
  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname);

  const loggedInNav = [
    {name:"Dashboard", path:"dashboard"},
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "About", path: "/about" },
    { name: "Profile", path: "/profile" },
    
  ];

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Health Claim Verifier
        </Link>

        <div className="space-x-4">
          {isAuthPage ? (
            <>
              <Link to="/register" className="hover:underline">Register</Link>
              <Link to="/login" className="hover:underline">Login</Link>
            </>
          ) : user ? (
            <>
              {loggedInNav.map((item) => (
                <Link key={item.path} to={item.path} className="hover:underline">
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Sign Out
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
