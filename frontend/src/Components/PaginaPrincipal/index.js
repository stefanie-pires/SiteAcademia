import React from 'react'; 
import styles from './HeroSection.module.css';

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.sectionContainer}>
        {/* Primeiro bloco - Texto à esquerda e Imagem à direita */}
        <div className={styles.block}>
          <div className={styles.textContainer}>
            <h2 className={styles.hero__title}>Sobre Nós</h2>
            <p>Aqui, combinamos treinos personalizados, equipamentos modernos e uma atmosfera acolhedora para ajudar você a alcançar seus objetivos de forma eficaz.</p>
            <p>Venha conhecer nosso espaço!</p>
          </div>
          <div className={styles.imageContainer}>
            <img src="/Imagem1.jpg" alt="Imagem da academia" className={styles.image} />
          </div>
        </div>

        {/* Segundo bloco - Imagem à esquerda e Texto à direita */}
        <div className={`${styles.block} ${styles.reverseBlock}`}>
          <div className={styles.imageContainer}>
            <img src="/Imagem2.jpg" alt="Imagem representativa da comunidade fitness" className={styles.image} />
          </div>
          <div className={styles.textContainer}>
            <p>Nosso compromisso é apoiar sua jornada de transformação, celebrando cada conquista e superando desafios.</p>
            <p>Marque uma aula experimental, e conheça nossas instalações e serviços!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
