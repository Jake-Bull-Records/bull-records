import { supabase } from "../supabaseClient";
import "../app.css";
import { useState, useEffect } from "react";
import loadingGif from "../assets/equalizerLoading.gif";
import "./media.css";

function MediaViewBox({ mediaID }) {
  const [imageURLs, setImageURLs] = useState([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getImages() {
      try {
        if (!mediaID) {
          throw new Error("mediaID is undefined");
        }

        const { data, error } = await supabase
          .from("mediaImages")
          .select()
          .eq("mediaID", mediaID);

        if (error) {
          throw error;
        }

        if (!data) {
          throw new Error("No data returned from Supabase");
        }

        setImageURLs(data.map((mediaImage) => mediaImage.imageURL));
      } catch (err) {
        console.error("Submission error:", err);
        setError(err.message || "Can't find them images, son");
      } finally {
        setLoading(false);
      }
    }

    getImages();
  }, [mediaID]);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const media = (
    // if clicked, isFlipped gets set to true or false
    <div className="LP" onClick={handleClick}>
      {/* className also adjusts based on isFlipped */}
      <div className={`LP-cover ${isFlipped ? "flipped" : ""}`}>
        <div className="LP-front">
          <img className="LP-image" src={imageURLs[0]} />
        </div>
        <div className="LP-back">
          <img className="LP-image" src={imageURLs[1]} />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="mediaViewBox">
        <img src={loadingGif}></img>
      </div>
    );
  }
  if (error) {
    return (
      <div className="mediaViewBox">
        <p>Error: {error}</p>
      </div>
    );
  }
  return <div className="mediaViewBox">{media}</div>;
}

export default MediaViewBox;
