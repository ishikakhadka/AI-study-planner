import { CARD_ELEMENTS } from "../../lib/constants";

const Cards = () => {
  return (
    <div className="card-section">
      {CARD_ELEMENTS.map((item) => {
        const Icon = item.icon;

        return (
          <div className="hero-cards" key={item.id}>
            {Icon && <Icon className="card-icon" size={32} />}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Cards;
