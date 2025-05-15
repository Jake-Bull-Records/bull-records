import { useState, useEffect } from "react";
import "../app.css";
import loadingGif from "../assets/equalizerLoading.gif";

function MediaInfo({ media }) {
  const [loading, setLoading] = useState(true); //Initializes loading as true
  const [infoContent, setInfoContent] = useState({}); //Initializes infoContent as empty JSON

  const addInfo = (newInfo) => {
    setInfoContent([...infoContent, newInfo]);
  };

  useEffect(() => {
    //Takes the info out of the media object and arranges it in html
    async function renderInfo() {
      try {
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    renderInfo();
  }, [media]);

  const info = (
    <div className="media-info">
      <h1>
        "{media.releaseName}" by {media.artist}
      </h1>
      <h2>
        Price:{" "}
        {(media.price / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </h2>
      {infoContent.length > 0 ? (
        infoContent.map((item) => <div key={item.key}>{item.content}</div>)
      ) : (
        <p>We don't know much about this one!!</p>
      )}
    </div>
  );

  return (
    <div className="pageContent">
      {loading ? <img src={loadingGif} /> : info}
    </div>
  );
}

export default MediaInfo;
