import { Heart } from "lucide-react";
import "../../../../CSS/quote.css";
import { motivationalQuotes } from "../../../lib/constants";

const Quote = () => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const quote = motivationalQuotes[today];

  return (
    <div className="quote">
      <div className="quote-icon">
        <Heart size={20} fill="currentColor" />
      </div>

      <div className="quote-content">
        <span className="quote-label">Daily Motivation</span>
        <h5>{quote}</h5>
      </div>
    </div>
  );
};
export default Quote;
