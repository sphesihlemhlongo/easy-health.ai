import axios from "axios";
import { supabase } from "../supabaseClient";

const TWITTER_API = "https://api.twitter.com/2/tweets/search/recent";
const PODCAST_API = "https://listen-api.listennotes.com/api/v2/search";

export const fetchTwitterPosts = async (username) => {
  try {
    const response = await axios.get(`${TWITTER_API}?query=from:${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TWITTER_BEARER_TOKEN}`,
      },
    });
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return [];
  }
};

export const fetchPodcastTranscripts = async (influencerName) => {
  try {
    const response = await axios.get(`${PODCAST_API}?q=${influencerName}`, {
      headers: {
        "X-ListenAPI-Key": process.env.REACT_APP_PODCAST_API_KEY,
      },
    });
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching podcast transcripts:", error);
    return [];
  }
};


export const fetchInfluencers = async () => {
    const { data, error } = await supabase.from("influencers").select("*");
    if (error) throw new Error(error.message);
    return data;
  };

