import { useState, useEffect } from "react";
import "../app.css";
import loadingGif from "../assets/equalizerLoading.gif";

function MediaInfo({ media }) {
  const [loading, setLoading] = useState(true); //Initializes loading as true
  const [infoContent, setInfoContent] = useState([]); //Initializes infoContent as empty JSON

  console.log("Here is the media object at first", media);

  const addInfo = (newInfo) => {
    setInfoContent((prev) => [...prev, newInfo]);
  };

  useEffect(() => {
    //Takes the info out of the media object and arranges it in html
    function renderInfo() {
      try {
        setInfoContent([]);
        media.sellerNotes && addInfo(`Seller Notes: ${media.sellerNotes}`);
        media.mediaCondition &&
          addInfo(`Media Condition: ${media.mediaCondition}`);
        media.format && addInfo(`Format: ${media.format}`);
        media.releaseInfo &&
          addInfo(`"Below are the details gathered by MusicBrainz"`);
        media.releaseInfo["artist-credit"][0].artist.country &&
          addInfo(
            `Country of Origin: ${media.releaseInfo["artist-credit"][0].artist.country}`
          );
        media.releaseInfo["label-info"][0].label.name &&
          addInfo(`Label: ${media.releaseInfo["label-info"][0].label.name}`);
        if (media.releaseInfo.media[0].tracks.length > 0) {
          addInfo("Tracklist:");
          for (let i = 0; i < media.releaseInfo.media[0].tracks.length; i++) {
            addInfo(`${i + 1}: ${media.releaseInfo.media[0].tracks[i].title}`);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    renderInfo();
  }, [media]);

  console.log("Here is the infoContent array:", infoContent);

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
        infoContent.map((item, index) => (
          <div className="mediaDetail" key={index}>
            {item}
          </div>
        ))
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
