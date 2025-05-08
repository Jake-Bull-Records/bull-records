import "../app.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient";

function myStore(session) {
  const [images, setImages] = useState([]); //creates images (array since we have multiple files) and a variable that allows you to change images. Initialized as empty. State is used to manage dynamic data
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(false); // For loading state

  const previewImages = (event) => {
    //Function that handles the onChange for images
    const files = Array.from(event.target.files || []); //Retrieves list of files from the event object and makes an array of them. Array.from() creates an array of the File objects
    const imageUrls = files.map((file) => URL.createObjectURL(file)); //files.map() iterates over the File array, turns each file into a URL that can be used as img sources
    setImages(imageUrls); //Sets the images object to an array of usable image URLs
  };

  const handleSubmit = async (event) => {
    //THIS IS THE EVENT HANDLER THAT INPUTS A RECORD INTO THE MEDIA TABLE. PROBABLY GOTTA MAKE THIS A FUNCTION AT SOME POINT
    event.preventDefault();
    setLoading(true);

    //Obtains user/machine input
    try {
      const sellerUID = session.session.id;
      const formData = new FormData([event.target]); //gets the form from event.target and puts it into a FormData object
      const mediaData = {
        //Includes everything for a media object besides the images (media table)
        price: dollarsToCents(formData.get("price")),
        artist: formData.get("artist"),
        releaseName: formData.get("releaseName"),
        releaseType: "LP", //This is changeable in the future, static for now
        releaseLink: null, //This is changeable in the future, static for now
        releaseInfo: null, //WILL BE UPDATED FROM MUSICBRAINZ API
        format: "vinyl", //This is changeable in the future, static for now
        mediaCondition: formData.get("mediaCondition"),
        coverCondition: null, //This is changeable in the future, static for now
        sellerNotes: formData.get("notes"),
        forSale: true, //This is changeable in the future, static for now
        barcodeIMS: null, //This is changeable in the future, static for now. Needs barcode generation integration first (Way off)
        sellerID: session.session.id, //Important, puts the media on your seller ID
        shape: "Standard", //This is changeable in the future, static for now
      };

      //Call the musicBrainz API and drop the JSON in the releaseInfo

      const query = `artist:"${data.artist}" release:"${data.releaseName}"`;
      const fmt = "json";
      const limit = "10";
      const releaseID = null;
      const inc = "artist-credits+labels+recordings";

      //gets initial release query based on artist and releaseName (More in depth is possible once automation takes hold)
      fetch(
        `https://musicbrainz.org/ws/2/release?query=${encodeURIComponent(
          query
        )}&fmt=${fmt}&limit=${limit}`,
        {
          headers: {
            "User-Agent": "Bull-Records/1.0 (jakebullrecords@gmail.com)",
          },
        }
      )
        .then((response) => response.json())
        .then((responseJSON) => {
          if (responseJSON.count != 0) {
            releaseID = responseJSON.releases[0].id; //Takes the first fitting release and puts the ID into the releaseID const
          }
        });

      if (releaseID) {
        fetch(
          `http://musicbrainz.org/ws/2/release/${releaseID}?inc=${inc}&fmt=${fmt}`,
          {
            headers: {
              "User-Agent": "Bull-Records/1.0 (jakebullrecords@gmail.com)",
            },
          }
        )
          .then((response) => response.json())
          .then((responseJSON) => {
            mediaData.releaseInfo = responseJSON;
          });
      }

      // THIS ONE IS FOR THE BOYS WITH THE BOOMIN SYSTEM (Supabase call to add the media object to the media table)
      const { createdMedia, error } = await supabase //calls supabase, returns the media object so I can yoink the ID to put in the images table
        .from("media")
        .insert(mediaData)
        .select();

      const mediaID = createdMedia.mediaID;
      console.log(`Media ID: ${mediaID} created for User: ${sellerUID}`);

      //ADD THE IMAGES TO THE SUPABASE STORAGE
      for (i = 0; i < images.length(); i++) {
        //Adds the actual file to Supabase storage under my record store folder, which is hard coded
        const { storageData, storageError } = await supabase.storage
          .from("media-images")
          .upload(`media-images/bull-records/${mediaID}&${i}.jpg`, images[i], {
            cacheControl: "3600", // Cache for 1 hour
            upsert: true, // Overwrite if file exists
          });

        const { tableData, tableError } = await supabase
          .from("mediaImages")
          .insert();
      }

      //STORE THE LINKS WITH THE MEDIA ID IN THE MEDIA IMAGES TABLE

      event.target.reset(); // Reset form on success
      setImages([]);
      alert("Record uploaded successfully!");
    } catch (err) {
      setError(
        err.message || "Sorry brother but that upload didn't go very swimmingly"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pageContent">
      <h1>Aight gang just slide that record in real slow &#129396;</h1>
      <h3>Signed in as {session?.session?.user?.email} </h3>
      <h3>
        FYI, if you're not Jake you're not gonna be able to do this. Real ones
        only. Word to your mother.{" "}
      </h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="images">Images: </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          required
          onChange={previewImages}
        ></input>
        <div>
          {images.map(
            (
              url,
              index //div where preview of images go when being submitted. An img is generated in order for each item in the images array
            ) => (
              <img
                key={index} //name of the file, rn just the index where it was in the array
                src={url} //sets img src to the created URL
                alt="preview" //Explains the img purpose, lowkey not necessary besides for screen readers
                style={{ Width: "200px", height: "200px", margin: "5px" }} //style choices for each img
              />
            )
          )}
        </div>
        <br />

        <label htmlFor="price">Price in USD: </label>
        <input
          type="number"
          id="price"
          name="price"
          className="formInput"
          required
        ></input>
        <br />

        <label htmlFor="artist">Arist: </label>
        <input
          type="text"
          id="artist"
          name="artist"
          className="formInput"
          required
        ></input>
        <br />

        <label htmlFor="releaseName">Release (Album Name): </label>
        <input
          type="text"
          id="releaseName"
          name="releaseName"
          className="formInput"
          required
        ></input>
        <br />

        <label htmlFor="notes">Your Notes: </label>
        <input
          type="text"
          id="notes"
          name="notes"
          className="formInput"
          required
        ></input>
        <br />

        <label htmlFor="mediaCondition">Release: </label>
        <select
          id="mediaCondition"
          name="mediaCondition"
          className="formInput"
          required
        >
          <option value="M">Mint</option>
          <option value="NM">Near Mint</option>
          <option value="VG+">Very Good +</option>
          <option value="VG">Very Good</option>
          <option value="G+">Good +</option>
          <option value="G">Good</option>
          <option value="F">Fair</option>
          <option value="P">Poor</option>
        </select>
        <br />
        {/* Button does not work while loading is true */}
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload that Jawn"}
        </button>
      </form>
    </div>
  );
}

export default myStore;
