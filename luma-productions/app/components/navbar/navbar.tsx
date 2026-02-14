// app/components/navbar/Navbar.tsx
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>Bruno Pavlic</span>
      <div className={styles.links}>
        <a href="#portfolio">Portfolio</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}
