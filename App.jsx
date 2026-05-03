import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import FlashCard from "./components/FlashCard";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [scroll, setScroll] = useState(0);
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const [showToast, setShowToast] =
    useState(true);

  useEffect(() => {
    function handleScroll() {
      const winScroll =
        document.documentElement.scrollTop;

      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const scrolled =
        (winScroll / height) * 100;

      setScroll(scrolled);
    }

    function handleMouse(e) {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    window.addEventListener(
      "mousemove",
      handleMouse
    );

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "mousemove",
        handleMouse
      );

      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="app">
      <div
        className="progress-bar"
        style={{
          width: `${scroll}%`,
        }}
      ></div>

      <div
        className="cursor-glow"
        style={{
          left: mouse.x,
          top: mouse.y,
        }}
      ></div>

      {showToast && (
        <div className="toast">
          ⌨️ Press / to Search | R to Reset
        </div>
      )}

      <Navbar />
      <Hero />
      <Stats />
      <FlashCard />
      <Footer />
    </div>
  );
}

export default App;