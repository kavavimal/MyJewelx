import styles from "./loading-dots.module.css";

const LoadingDots = ({ color = "#000", size = "5px" }) => {
  return (
    <span className={styles.loading}>
      <span style={{ backgroundColor: color, width: size, height: size }} />
      <span style={{ backgroundColor: color, width: size, height: size }} />
      <span style={{ backgroundColor: color, width: size, height: size }} />
    </span>
  );
};

export default LoadingDots;