import { useState, useEffect } from "react";
import "../app.css";
import MediaObject from "../components/MediaObject.jsx";
import { supabase } from "../supabaseClient.js";
import loadingGif from "../assets/equalizerLoading.gif";

function CrateDigger() {
  const [media, setMedia] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMediaObjects() {
      try {
        const { data, error } = await supabase.from("media").select();
        if (error) {
          throw error;
        }
        if (!data || data.length === 0) {
          throw new Error("No media data found");
        }
        setMedia(data[0]); // Set the first item for testing
      } catch (err) {
        console.error("Error fetching media:", err);
        setError(err.message || "Failed to load media");
      }
    }

    getMediaObjects();
  }, []); // Empty dependency array to run once on mount

  if (!media) {
    return (
      <div className="pageContent">
        <h1>Welcome to the Crate Digger, friend.</h1>
        <img src={loadingGif}></img>
      </div>
    );
  }

  return (
    <div className="pageContent">
      <h1>Welcome to the Crate Digger, friend.</h1>
      <br />
      <MediaObject media={media} />
    </div>
  );
}

export default CrateDigger;
