import "../app.css";

function About() {
  return (
    <div className="pageContent">
      <h1>This is a concept for an online record store application.</h1>
      <p>
        At first, it will function as my personal website so I can test it, but
        as you can sorta see, I intend for this to eventually evolve into an
        entire platform for sales called "CrateDigger"
      </p>
      <p>
        It's also built pretty confusingly. You can literally see the
        progression of my understanding of React and JS as some files are
        completely different in structure from others.
      </p>
      <h1>Anyway, here's how it works</h1>
      <p>
        If you go to the shop page you can see the actual record objects in a
        slider that can be fliped to see the back, and when you click on it it
        displays some metadata. This is the relatively easy part of building the
        website. Most of the work is in the input process.
      </p>
      <p>
        If you go to your profile, which is in the top right of the Navigation,
        you can make an account. You gotta do the whole email confirmation
        shabangabang. Once you have an account you can then click the "My Store"
        button and access the input. To do it properly, Insert the front and
        back images of an album cover, and then input the other stuff. The
        object will then show up in the shop with metadata garnered from the
        MusicBrainz database, so long as it could find it.
      </p>
    </div>
  );
}

export default About;
