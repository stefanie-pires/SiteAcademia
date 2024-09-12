import React from 'react';
import styles from './HeroSection.module.css';

function HeroSection() {
  return (
    <section className={styles.hero}>
      <h2 className={styles.hero__title}>Sobre Nós</h2>
      <p>Somos duas amigas apaixonadas pela área fitness...</p>
    </section>
  );
}

export default HeroSection;