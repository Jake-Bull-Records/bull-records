import { useState } from "react";
import { supabase } from "../supabaseClient";
import "../app.css";

function MediaInfo(media) {
  const [loading, setLoading] = useState(true); //Initializes loading as true
  const [infoContent, setInfoContent] = useState(null);

  useEffect(() => {
    async function renderInfo() {
      try {
        setInfo(document.createElement("div"));
      } catch (error) {
        console.error("Error fetching data:", error);
        setInfo("Data not found");
      } finally {
        setLoading(false);
      }
    }
  });

  const info = (
    <div className="media-info" id="mediaInfo">
      {infoContent.length > 0 ? (
        infoContent.map((item) => <div key={item.key}>{item.content}</div>)
      ) : (
        <p>We don't know much about this one!!</p>
      )}
    </div>
  );

  return (
    <div className="pageContent">
      {loading ? <img src="../assets/equalizerLoading.gif"></img> : { info }};
    </div>
  );
}

export default MediaInfo;
