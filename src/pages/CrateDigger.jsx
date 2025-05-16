import { useState, useEffect } from "react";
import "../app.css";
import MediaObject from "../components/MediaObject.jsx";
import MediaViewBox from "../components/MediaViewBox.jsx";
import { supabase } from "../supabaseClient.js";
import loadingGif from "../assets/equalizerLoading.gif";
import MediaInfo from "../components/MediaInfo.jsx";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function CrateDigger() {
  const [media, setMedia] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

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
        setMedia(data); // Set media to all the media JSON found in
        setSelectedMedia(data[0]);
      } catch (err) {
        console.error("Error fetching media:", err);
        setError(err.message || "Failed to load media");
      }
    }

    getMediaObjects();
  }, []); // Empty dependency array to run once

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
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {media.length > 0 ? (
          media.map((item, index) => (
            <SwiperSlide
              key={item.mediaID}
              onClick={() => setSelectedMedia(item)} // Update selected media
              style={{ cursor: "pointer" }}
            >
              <MediaViewBox mediaID={item.mediaID} />
            </SwiperSlide>
          ))
        ) : (
          <p>We don't know much about this one!!</p>
        )}
      </Swiper>
      {selectedMedia && <MediaInfo media={selectedMedia} />}
    </div>
  );
}

export default CrateDigger;
