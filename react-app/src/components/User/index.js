import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Lottie from "react-lottie";
import underConstructionAnimation from "../../lotties/under-construction.json";
import styles from "./User.module.css";

function User() {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  // loading animation
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: underConstructionAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (!sessionUser) {
    history.push("/");
  }

  return (
    <div className={styles.profilePageDiv}>
      <h1>Welcome, {sessionUser.firstName}!</h1>
      <h2>Profile page coming soon, thank you for your patience!</h2>
      {/* Animated by Andrea Del Latte */}
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
}
export default User;
