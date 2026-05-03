import { useState, useEffect } from "react";

function Hero() {
  const goTo = (id) => {
    document
      .getElementById(id)
      .scrollIntoView({
        behavior: "smooth",
      });
  };

  const getGreeting = () => {
    const hour =
      new Date().getHours();

    if (hour < 12)
      return "Good Morning";

    if (hour < 18)
      return "Good Afternoon";

    return "Good Evening";
  };

  const [greeting, setGreeting] =
    useState(getGreeting());

  useEffect(() => {
    const timer =
      setInterval(() => {
        setGreeting(
          getGreeting()
        );
      }, 60000); // updates every minute

    return () =>
      clearInterval(timer);
  }, []);

  return (
    <section
      className="hero"
      id="hero"
    >
      <div className="hero-text">
        <p className="tag">
          {greeting},
          Tanvish ⚡
        </p>

        <h1 className="typing">
          Master Coding Terms
          With Style.
        </h1>

        <p className="sub">
          Flip interactive
          flashcards, track
          progress, and learn
          faster.
        </p>

        <div className="hero-buttons">
          <button
            className="primary"
            onClick={() =>
              goTo("decks")
            }
          >
            Get Started
          </button>

          <button
            className="secondary"
            onClick={() =>
              goTo("stats")
            }
          >
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;