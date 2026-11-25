import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

const toSafeHttpUrl = (value, baseUrl) => {
  if (typeof value !== "string" || !value.trim()) return "";

  try {
    const url = new URL(value, baseUrl);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
};

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
        {photo.fullUrl ? <a href={photo.fullUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${photo.caption} in full size`}>{image}</a> : image}
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

function BackyardCover({ photo, onOpen, buttonRef }) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <button
      ref={buttonRef}
      className="backyard-review__cover"
      type="button"
      onClick={onOpen}
      aria-label="Open the backyard greenery photo series"
    >
      {!hasImageError && (
        <img
          src={photo.fullUrl}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onError={() => setHasImageError(true)}
        />
      )}
      <span className="backyard-review__cover-note" aria-hidden="true">
        <span>Photo review</span>
        <b>8 studies <i>↗</i></b>
      </span>
      {hasImageError && <span className="backyard-review__unavailable">Image unavailable</span>}
    </button>
  );
}

BackyardCover.propTypes = {
  photo: PropTypes.shape({
    alt: PropTypes.string.isRequired,
    fullUrl: PropTypes.string.isRequired,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
  buttonRef: PropTypes.shape({ current: PropTypes.any }),
};

function BackyardReview({ photos }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hasImageError, setHasImageError] = useState(false);
  const closeButtonRef = useRef(null);
  const coverButtonRef = useRef(null);
  const dialogPanelRef = useRef(null);
  const activePhoto = activeIndex === null ? null : photos[activeIndex];
  const isOpen = activePhoto !== null;

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const coverButton = coverButtonRef.current;
    const appRoot = document.getElementById("root");
    const wasInert = appRoot?.inert;
    const previousAriaHidden = appRoot?.getAttribute("aria-hidden");
    const getFocusableElements = () => Array.from(
      dialogPanelRef.current?.querySelectorAll("a[href], button:not([disabled])") || [],
    );
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index - 1 + photos.length) % photos.length);
      if (event.key === "ArrowRight") setActiveIndex((index) => (index + 1) % photos.length);
      if (event.key === "Tab") {
        const focusable = getFocusableElements();
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;
        if (!dialogPanelRef.current?.contains(document.activeElement)) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    if (appRoot) {
      appRoot.inert = true;
      appRoot.setAttribute("aria-hidden", "true");
    }
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (appRoot) {
        appRoot.inert = wasInert || false;
        if (previousAriaHidden === null) appRoot.removeAttribute("aria-hidden");
        else appRoot.setAttribute("aria-hidden", previousAriaHidden);
      }
      document.removeEventListener("keydown", handleKeyDown);
      coverButton?.focus();
    };
  }, [isOpen, photos.length]);

  useEffect(() => {
    setHasImageError(false);
  }, [activePhoto?.id]);

  const move = (offset) => {
    setActiveIndex((index) => (index + offset + photos.length) % photos.length);
  };

  return (
    <section className="diary-section backyard-review" aria-labelledby="backyard-title">
      <div className="backyard-review__header">
        <div>
          <p className="eyebrow">Entry 04 · after rain</p>
          <h2 id="backyard-title">Green after rain.</h2>
        </div>
        <p>A note from a rainy walk — damp leaves, low cloud, and the way an ordinary view can hold a feeling for a moment.</p>
      </div>

      <BackyardCover photo={photos[0]} onOpen={() => setActiveIndex(0)} buttonRef={coverButtonRef} />

      {isOpen && createPortal(
        <div className="backyard-lightbox" role="dialog" aria-modal="true" aria-labelledby="backyard-lightbox-title">
          <button className="backyard-lightbox__backdrop" type="button" onClick={() => setActiveIndex(null)} aria-label="Close photo gallery" />
          <div ref={dialogPanelRef} className="backyard-lightbox__panel">
            <header className="backyard-lightbox__topline">
              <p id="backyard-lightbox-title">Backyard greenery <span>/{activePhoto.number}</span></p>
              <button ref={closeButtonRef} className="backyard-lightbox__close" type="button" onClick={() => setActiveIndex(null)}>Close <span aria-hidden="true">×</span></button>
            </header>
            <div className="backyard-lightbox__image-wrap">
              {!hasImageError ? (
                <a href={activePhoto.fullUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open study ${activePhoto.number} original in a new tab`}>
                  <img src={activePhoto.fullUrl} alt={activePhoto.alt} decoding="async" onError={() => setHasImageError(true)} />
                </a>
              ) : <p className="backyard-review__unavailable">This study is unavailable.</p>}
            </div>
            <footer className="backyard-lightbox__footer">
              <p>{activePhoto.alt}</p>
              <div className="backyard-lightbox__controls">
                <button type="button" onClick={() => move(-1)} aria-label="Previous photograph">← Previous</button>
                <a href={activePhoto.fullUrl} target="_blank" rel="noopener noreferrer">Original ↗</a>
                <button type="button" onClick={() => move(1)} aria-label="Next photograph">Next →</button>
              </div>
            </footer>
          </div>
        </div>,
        document.body,
      )}
    </section>
  );
}

BackyardReview.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    fullUrl: PropTypes.string.isRequired,
  })).isRequired,
};

export default function Home() {
  const [photos, setPhotos] = useState(photoSlots);
  const [backyardPhotos, setBackyardPhotos] = useState([]);

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
    fetch(`${apiBaseUrl}/api/photographs`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Photography unavailable")))
      .then((items) => {
        if (!Array.isArray(items)) return;

        const nextPhotos = items
          .filter((item) => typeof item?.title === "string")
          .map((item, index) => ({
            number: String(index + 1).padStart(2, "0"),
            caption: item.title,
            previewUrl: toSafeHttpUrl(item.previewUrl, apiBaseUrl),
            fullUrl: toSafeHttpUrl(item.fullUrl, apiBaseUrl),
          }))
          .filter((item) => item.previewUrl || item.fullUrl);

        if (nextPhotos.length > 0) setPhotos(nextPhotos);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5002";
    fetch(`${apiBaseUrl}/api/backyard-greenery`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Backyard study unavailable")))
      .then((items) => {
        if (!Array.isArray(items)) return;

        setBackyardPhotos(items.flatMap((item) => {
          const fullUrl = toSafeHttpUrl(item?.fullUrl, apiBaseUrl);
          return item?.id && item?.number && item?.alt && fullUrl ? [{ ...item, fullUrl }] : [];
        }));
      })
      .catch(() => undefined);
  }, []);

  return (
    <main className="diary-shell">
      <section className="letter-hero" aria-labelledby="home-title">
        <div className="letter-hero__copy">
          <p className="eyebrow">Entry 01 · field notes</p>
          <h1 id="home-title">Hello, I&apos;m Olumide.</h1>
          <div className="letter-hero__body">
            <p>
              I&apos;m a software engineer working around AI, useful tools, and the unglamorous
              parts of keeping systems secure.
            </p>
            <p>
              This is where I put the things I&apos;m still learning to notice: words that follow me
              home, photographs from walks, and things I make before they&apos;re quite finished.
            </p>
            <p>Come in, have a look around. I&apos;m glad you found your way here.</p>
          </div>
          <p className="letter-signoff">— O., somewhere between releases and notebooks.</p>
        </div>
        <aside className="letter-hero__index" aria-label="Diary entry details">
          <span>Notes from the desk</span>
          <time dateTime="2026-11-25">25 / 11 / 26</time>
          <span>software engineer · observer</span>
          <span aria-hidden="true">↘</span>
        </aside>
      </section>

      <section className="diary-section lately" aria-labelledby="lately-title">
        <p className="eyebrow">Entry 02 · lately</p>
        <h2 id="lately-title">Trying to notice what is actually there.</h2>
        <div className="lately__notes">
          <p>Taking my camera on ordinary walks, and missing a few good shots.</p>
          <p>Leaving a bit of space between a thought and an answer.</p>
          <p>Starting before I know quite what I&apos;m making.</p>
        </div>
      </section>

      <section className="diary-section photo-section" aria-labelledby="photos-title">
        <div className="section-row">
          <div>
            <p className="eyebrow">Entry 03 · from the camera</p>
            <h2 id="photos-title">Things I carried home from outside.</h2>
          </div>
          <p className="section-aside">The thumbnails are only a first look; open one when you want the full frame.</p>
        </div>
        <div className="photo-grid" aria-label="Photography placeholders">
          {photos.map((photo, index) => (
            <PhotoSlot key={photo.number || photo.caption} photo={photo} index={index} />
          ))}
        </div>
      </section>

      {backyardPhotos.length > 0 && <BackyardReview photos={backyardPhotos} />}

      <section className="diary-section reading-section" aria-labelledby="reading-title">
        <p className="eyebrow">Entry 05 · on the shelf</p>
        <div className="section-row">
          <h2 id="reading-title">Books I&apos;ve carried with me recently.</h2>
          <p className="reading-now"><span>Reading now</span> The Language of God — Francis Collins</p>
        </div>
        <ol className="book-list">
          {books.map(([title, author], index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <em>{title}</em>
              <span className="book-list__author">{author}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="diary-section journal-callout" aria-labelledby="journal-title">
        <p className="eyebrow">Entry 06 · words, too</p>
        <h2 id="journal-title">Some thoughts need a little more room.</h2>
        <p>Notes on work, life, questions, and whatever else is asking to be written down.</p>
        <Link className="text-link" to="/thoughts">Visit the journal <span aria-hidden="true">→</span></Link>
      </section>

      <section className="work-whisper" aria-labelledby="work-title">
        <p id="work-title">The part where I write software.</p>
        <Link className="text-link" to="/work">See the work side of things <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
