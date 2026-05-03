import {
  useState,
  useEffect,
  useRef
} from "react";
import terms from "../data/terms";

function Card({
  term,
  definition,
  category,
  onFlip,
  resetTrigger
}) {
  const [flip, setFlip] = useState(false);
  const [pop, setPop] = useState(false);
  const [style, setStyle] = useState({});
  const cardRef = useRef(null);

  function handleFlip() {
    if (!flip) onFlip();

    /* flip sound */
    const audio = new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
    );
    audio.volume = 0.18;
    audio.play();

    setFlip(!flip);

    /* pop animation trigger */
    setPop(true);

    setTimeout(() => {
      setPop(false);
    }, 250);
  }

  useEffect(() => {
    setFlip(false);
  }, [resetTrigger]);

  function handleMove(e) {
    const rect =
      cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY =
      ((x / rect.width) - 0.5) * 14;

    const rotateX =
      ((y / rect.height) - 0.5) * -14;

    setStyle({
      transform: flip
        ? `rotateY(180deg) rotateX(${rotateX}deg)`
        : `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
    });
  }

  function resetTilt() {
    setStyle({
      transform: flip
        ? "rotateY(180deg)"
        : "rotateY(0deg)"
    });
  }

  return (
    <div
      className={`scene ${
        pop ? "pop-card" : ""
      }`}
      onClick={handleFlip}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
    >
      <div
        ref={cardRef}
        className={
          flip
            ? "card flipped"
            : "card"
        }
        style={style}
      >
        {/* FRONT */}
        <div
          className={`face front ${category}`}
        >
          <span className="tag-box">
            {category}
          </span>

          <h2>{term}</h2>
          <p>Click to Flip</p>
        </div>

        {/* BACK */}
        <div
          className={`face back themed-back ${category}`}
        >
          <span className="tag-box">
            {category}
          </span>

          <h3>{term}</h3>

          <p>{definition}</p>
        </div>
      </div>
    </div>
  );
}

function FlashCard() {
  const inputRef = useRef(null);

  const [cards, setCards] =
    useState(terms);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [resetTrigger,
    setResetTrigger] =
    useState(0);

  const [count, setCount] =
    useState(() => {
      return Number(
        localStorage.getItem(
          "progress"
        )
      ) || 0;
    });

  const quotes = [
    "First, solve the problem. Then, write the code.",
    "Programs must be written for people to read.",
    "Code is like humor. When you explain it, it’s bad.",
    "Fix the cause, not the symptom.",
    "Experience is the name everyone gives to mistakes.",
    "Simplicity is the soul of efficiency."
  ];

  const [quoteIndex,
    setQuoteIndex] =
    useState(0);

  useEffect(() => {
    const interval =
      setInterval(() => {
        setQuoteIndex(
          (prev) =>
            (prev + 1) %
            quotes.length
        );
      }, 3000);

    return () =>
      clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "progress",
      count
    );
  }, [count]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "r")
        resetProgress();

      if (e.key === "/") {
        e.preventDefault();
        inputRef.current.focus();
      }

      if (e.key === "1")
        setCategory("All");

      if (e.key === "2")
        setCategory("JavaScript");

      if (e.key === "3")
        setCategory("React");

      if (e.key === "4")
        setCategory("General");
    }

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, []);

  const filtered =
    cards.filter((item) => {
      const searchMatch =
        item.term
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const categoryMatch =
        category === "All" ||
        item.category ===
          category;

      return (
        searchMatch &&
        categoryMatch
      );
    });

  const progress =
    filtered.length === 0
      ? 0
      : Math.min(
          Math.round(
            (count /
              filtered.length) *
              100
          ),
          100
        );

  function handleFlipCount() {
    setCount((prev) => prev + 1);
  }

  function resetProgress() {
    setCount(0);
    setResetTrigger(
      (prev) => prev + 1
    );
  }

  function shuffleCards() {
    const shuffled = [
      ...cards
    ].sort(
      () =>
        Math.random() - 0.5
    );

    setCards(shuffled);

    setResetTrigger(
      (prev) => prev + 1
    );
  }

  return (
    <section
      className="flash-section"
      id="decks"
    >
      <h1 className="flash-title">
        Flashcard Arena
      </h1>

      <p className="quote">
        {quotes[quoteIndex]}
      </p>

      <div className="controls">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search terms..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        >
          <option>All</option>
          <option>
            JavaScript
          </option>
          <option>
            React
          </option>
          <option>
            General
          </option>
        </select>

        <button
          onClick={
            resetProgress
          }
        >
          Reset
        </button>

        <button
          onClick={
            shuffleCards
          }
        >
          Shuffle
        </button>
      </div>

      <div className="ring-wrap">
        <div
          className="progress-ring"
          style={{
            background:
              `conic-gradient(#00eaff ${progress}%, rgba(255,255,255,0.08) ${progress}%)`
          }}
        >
          <div className="inner-ring">
            {progress}%
          </div>
        </div>
      </div>

      <div className="tracker">
        <p>
          Cards Viewed: {count}
        </p>

        <p>
          Total Cards:
          {filtered.length}
        </p>
      </div>

      <div className="flash-grid">
        {filtered.map(
          (
            item,
            index
          ) => (
            <Card
              key={index}
              term={item.term}
              definition={
                item.definition
              }
              category={
                item.category
              }
              onFlip={
                handleFlipCount
              }
              resetTrigger={
                resetTrigger
              }
            />
          )
        )}
      </div>
    </section>
  );
}
const totalTerms = terms.length;

const totalCategories =
  new Set(
    terms.map(
      (item) => item.category
    )
  ).size;


export default FlashCard;