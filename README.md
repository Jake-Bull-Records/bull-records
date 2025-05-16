## Title:

Bull Records Online Store

## Description

The concept for this (Though miles beyond what I was able to accomplish) is to build myself an online sales platform where I could input images of records with a little metadata and then additional information be automatically populated when a user looks at the record image. As a concept, no actual financiality has been hooked up to anything, and it is not a commercial site. It is also unique in the format by which you would shop for the records: rather than using a search bar, filters, and grid-style ecommerce, you would actually flip through records. To save time and fulfill requirements, I instead used a slider for browsing records.

## Target Browsers

The intention for this site is to be used on laptop and PC browsers: Google Chrome, DuckDuckGo, etc. Although there is no functionality that uses keys, the CSS is only formatted for larger landscape screens

## Naming Convention

Pages and Components use PascalCase (NavBar.jsx)

Styling uses kebab-case (nav-bar.css)

JavaScript uses camelCase (diggerDiv.js)

## Developer Manual

The app can be installed simply by copying the GitHub repository to Vercel, which is the deployment platform I have used.

Dependencies include:
*react
*vite
*dollars-to-cents
*swiper
*dotenv
*eslint

The application is automatically run once deployed to Vercel. When testing the application, Vite is used. Simply type "npm run dev" into the terminal to begin a localhost server.

Tests for this were performed almost entirely using console.log, but I have also put multiple error handlers within the code in the hopes that it would assist in development.

The API functionality contains POST and GET to my Supabase, as well as a GET to the MusicBrainz API. For MusicBrainz, a GET is made to the http://musicbrainz.org/ws/2/release/ endpoint, used during the media upload process in MyStore.jsx. This obtains information on a release based on the metadata input when uploading a record to the database. My database has a multitude of API endpoints. There is both a GET and POST on the Auth table, Media table, MediaImages table, and Storage. When using Profile.jsx, you have the ability to make a POST to the Auth table to create an account. A GET is then used upon loading of the site to see if the local storage you have corresponds with an authorized user. If you are, you will then see the option is Profile to access the MyStore.jsx page, which allows you to post to Media, MediaImages, and Storage. All of this is automatic and based on a form on that page. It is after the form is submitted and before POSTS are made to the tables in my DB that a GET is sent to the MusicBrainz API. Otherwise, regardless of authorization status, upon accessing the Shop page "CraterDigger.jsx" a fetch will be made to those same 3 tables. This is what displays the Media images as well as the metadata for each media object.

A known bug is that upon submission of the images, even if you select the front cover of a media object first, sometimes the back cover will be set as Index 0 in storage. This means that upon loading of the images, the back will show first, and you have to flip it to see the front. The footer also extends beyond the scope of my screen for some reason, so that has to be fixed. Other than that, I cannot think of any bugs. You are pretty limited in what you can do and I've tried very hard to make this a relatively reliable piece of software.

Future development:
This is the exciting part. First I need to get down the actual display of records in a "crate digging" functionality. This means ceasing use of the Slider library and creating my own, or at least iterating on another. Second, I need to streamline the MusicBrainz API calls. Even though it's reliable at getting information, I just make the first pick. I think if I refine the query criteria I can get more accurate information. Third, I need to fix the css. I have a whole bundle of goofy css from a bunch of sources. I need to make a better-defined way of providing css. Fourth, I need to seperate my code out more into functions and components. I would be far better served if I did things the long way, as I can reuse functionality for more efficiently. Fifth, I need to comment my code in a far more robust way. I'm still learning, and I need to have a 100% grip on what I've figured out through debugging, and how to access things again in the future. Sixth, I need to verify the liscences of everything I use, mainly fonts and APIs. I don't want to be caught red-handed using something I shouldn't when the site becomes commercial. Seventh, I need to redesign practically everything. Long-winded I know, but this site doesn't look anywhere as good as I need it to. Eigth, I need to streamline the upload process. I don't want to have to type out anything besides notes and price. This will require OCR and the use of a book scanner or something similar, which is a ton of automation and a ton of work. This is something that truly hasn't been done before in this space. Ninth, I need to add genre qualifiers and seperate the crate-digger by "crates" so someone can actually dig through it like they would a record store. Tenth, I need to apply some form of image comparison for the images applied during the input process to further refine the MusicBrainz query. Eleventh, I need to add in actual commercial functionality. Twelfth, I simply go gangbusters and iterate on the app constantly until it's good enough to make available to other sellers.
