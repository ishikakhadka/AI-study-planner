import { COLORS } from "../../lib/constants";

export default function ProfileIcon({ username }) {
  const initial = username?.charAt(0).toUpperCase();

  const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  return (
    <div
      className="profile-icon"
      style={{
        backgroundColor: randomColor,
      }}>
      {initial}
    </div>
  );
}
