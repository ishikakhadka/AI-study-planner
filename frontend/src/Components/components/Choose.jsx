import Cards from "../common/Cards";

const Choose = () => {
  return (
    <div>
      <h2
        className="pilot"
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "50px",
        }}>
        Why Choose Us?
      </h2>
      <p className="why-subtitle">
        Everything you need to plan smarter, stay organized, and achieve your
        academic goals.
      </p>
      <Cards />
    </div>
  );
};
export default Choose;
