import terms from "../data/terms";

function Stats() {
  const totalTerms = terms.length;

  const totalCategories =
    new Set(
      terms.map(
        (item) => item.category
      )
    ).size;

  return (
    <section
      className="stats"
      id="stats"
    >
      <div className="box">
        <h3>
          {totalTerms}+
        </h3>
        <p>Terms</p>
      </div>

      <div className="box">
        <h3>
          {
            totalCategories
          }
        </h3>
        <p>
          Categories
        </p>
      </div>

      <div className="box">
        <h3>3D</h3>
        <p>
          Card Flip
        </p>
      </div>

      <div className="box">
        <h3>∞</h3>
        <p>
          Potential
        </p>
      </div>
    </section>
  );
}

export default Stats;