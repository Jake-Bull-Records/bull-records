import { supabase } from "../supabaseClient";
import "../app.css";
import MediaViewBox from "./MediaViewBox.jsx";
import MediaInfo from "./MediaInfo.jsx";

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
