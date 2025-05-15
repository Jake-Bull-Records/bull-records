import { supabase } from "../supabaseClient";
import "../app.css";
import MediaInfo from "./MediaInfo.jsx";
import MediaViewBox from "./MediaViewBox.jsx";

function MediaObject({ media }) {
  return (
    <div className="mediaBox">
      <div className="mediaViewBox">
        <MediaViewBox mediaID={media.mediaID} />
      </div>
      <div className="MediaInfo">
        <MediaInfo media={media} />
      </div>
    </div>
  );
}

export default MediaObject;
