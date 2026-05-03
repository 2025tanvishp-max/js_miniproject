import { useEffect, useState } from "react";

function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateClock() {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      );
    }

    updateClock();

    const interval = setInterval(
      updateClock,
      1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <p>Built by Tanvish ⚡</p>
      <p>Interactive React Flashcard Experience</p>

      <p className="clock">
        Live Time: {time}
      </p>

      <p className="hint">
        Shortcuts: R = Reset | / = Search |
        1-4 = Categories
      </p>

      <div className="socials">
        <a href="#">🌐</a>
        <a href="#">💼</a>
        <a href="#">📧</a>
      </div>
    </footer>
  );
}

export default Footer;