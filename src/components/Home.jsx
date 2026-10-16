import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const books = [
  ["Boys Don't Cry", "Tim Grayburn"],
  ["Men Without Women", "Haruki Murakami"],
  ["Beyond Good and Evil", "Friedrich Nietzsche"],
  ["Will You Help Me?", "Maggie Hartley"],
  ["Miss Peregrine's Home for Peculiar Children", "Ransom Riggs"],
  ["A Little Life", "Hanya Yanagihara"],
];

const photoSlots = [
  ["01", "a slow afternoon"],
  ["02", "a little bit of blue"],
  ["03", "somewhere I walked"],
  ["04", "a face in the light"],
  ["05", "a thing I almost missed"],
  ["06", "after rain"],
  ["07", "one more way of looking"],
].map(([number, caption]) => ({ number, caption }));

function PhotoSlot({ photo, index }) {
  const [hasPhoto, setHasPhoto] = useState(false);
  const source = photo.previewUrl || `/glimpses/${photo.number}.jpg`;
  const image = (
    <img
      className={hasPhoto ? "is-loaded" : ""}
      src={source}
      alt={hasPhoto ? photo.caption : ""}
      onLoad={() => setHasPhoto(true)}
      onError={(event) => { event.currentTarget.style.display = "none"; }}
    />
  );

  return (
    <figure className={`photo-slot photo-slot--${index + 1}`}>
      <div className="photo-slot__paper">
        {photo.fullUrl ? <a href={photo.fullUrl} target="_blank" rel="noreferrer" aria-label={`Open ${photo.caption} in full size`}>{image}</a> : image}
        {!hasPhoto && <span>{photo.number}</span>}
      </div>
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}

PhotoSlot.propTypes = {
  photo: PropTypes.shape({
    number: PropTypes.string,
    caption: PropTypes.string.isRequired,
    previewUrl: PropTypes.string,
    fullUrl: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default function Home() {
  const [photos, setPhotos] = useState(photoSlots);

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
    fetch(`${apiBaseUrl}/api/photographs`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Photography unavailable")))
      .then((items) => setPhotos(items.map((item, index) => ({
        number: String(index + 1).padStart(2, "0"),
        caption: item.title,
        previewUrl: new URL(item.previewUrl, apiBaseUrl).toString(),
        fullUrl: item.fullUrl,
      }))))
      .catch(() => undefined);
  }, []);

  return (
    <main className="diary-shell">
      <section className="letter-hero" aria-labelledby="home-title">
        <div className="letter-hero__copy">
          <h1 id="home-title">Hello, I&apos;m Olumide.</h1>
          <div className="letter-hero__body">
            <p>
              This is a place for the things I&apos;m learning to notice: words that stay with me,
              pictures I take, and the occasional thing I make.
            </p>
            <p>
              There&apos;s no rush here. I&apos;m glad you found your way in.
            </p>
          </div>
          <p className="letter-signoff">— O.</p>
        </div>
      </section>

      <section className="diary-section lately" aria-labelledby="lately-title">
        <p className="eyebrow">Lately</p>
        <h2 id="lately-title">Making more room for small things.</h2>
        <div className="lately__notes">
          <p>Taking my camera on ordinary walks.</p>
          <p>Keeping a little more time between a thought and an answer.</p>
          <p>Letting curiosity be enough of a reason to begin.</p>
        </div>
      </section>

      <section className="diary-section photo-section" aria-labelledby="photos-title">
        <div className="section-row">
          <div>
            <p className="eyebrow">From the camera</p>
            <h2 id="photos-title">Small records of being here.</h2>
          </div>
          <p className="section-aside">A lightweight preview opens the full image in a new tab.</p>
        </div>
        <div className="photo-grid" aria-label="Photography placeholders">
          {photos.map((photo, index) => (
            <PhotoSlot key={photo.number || photo.caption} photo={photo} index={index} />
          ))}
        </div>
      </section>

      <section className="diary-section reading-section" aria-labelledby="reading-title">
        <p className="eyebrow">On the shelf</p>
        <div className="section-row">
          <h2 id="reading-title">Books I&apos;ve carried with me recently.</h2>
          <p className="reading-now"><span>Reading now</span> The Language of God — Francis Collins</p>
        </div>
        <ol className="book-list">
          {books.map(([title, author], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <em>{title}</em>
              <small>{author}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className="diary-section journal-callout" aria-labelledby="journal-title">
        <p className="eyebrow">Words, too</p>
        <h2 id="journal-title">Some thoughts need a little more room.</h2>
        <p>Notes on work, life, questions, and whatever else is asking to be written down.</p>
        <Link className="text-link" to="/thoughts">Visit the journal <span aria-hidden="true">→</span></Link>
      </section>

      <section className="work-whisper" aria-labelledby="work-title">
        <p id="work-title">I also make things for work.</p>
        <Link className="text-link" to="/work">A look at that side of things <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
