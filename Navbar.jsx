import { useState } from "react";

function Navbar() {
  const [theme, setTheme] =
    useState("cyber");

  const goTo = (id) => {
    document
      .getElementById(id)
      .scrollIntoView({
        behavior: "smooth",
      });
  };

  function changeTheme(value) {
    document.body.className = "";
    document.body.classList.add(value);
    setTheme(value);
  }

  return (
    <nav className="navbar">
      <h2
        onClick={() => goTo("hero")}
      >
        CodeVault
      </h2>

      <ul>
        <li onClick={() => goTo("hero")}>
          Home
        </li>

        <li onClick={() => goTo("decks")}>
          Decks
        </li>

        <li
          onClick={() => goTo("footer")}
        >
          About
        </li>
      </ul>

      <div className="nav-right">
        <select
          value={theme}
          onChange={(e) =>
            changeTheme(
              e.target.value
            )
          }
        >
          <option value="cyber">
            Cyber Blue
          </option>

          <option value="matrix">
            Matrix Green
          </option>

          <option value="sunset">
            Sunset Purple
          </option>

          <option value="light-mode">
            Clean Light
          </option>
        </select>

        <button
          onClick={() => goTo("decks")}
        >
          Launch
        </button>
      </div>
    </nav>
  );
}

export default Navbar;