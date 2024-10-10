import React from 'react'; 
import styles from './HeroSection.module.css';


function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.contentContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.textContainer}>
            <h2 className={styles.hero__title}>Sobre Nós</h2>
            <p>
              Somos duas amigas apaixonadas pela área fitness que decidiram abrir um espaço dedicado exclusivamente às mulheres.
            </p>
            <p>
              Aqui, combinamos treinos personalizados, equipamentos modernos e uma atmosfera acolhedora para ajudar você a alcançar seus objetivos de forma divertida e eficaz.
            </p>
            <p>
              Nosso compromisso é apoiar sua jornada de transformação, celebrando cada conquista e superando desafios juntas.
            </p>
            <p>
              Venha fazer parte da nossa comunidade e sinta a força feminina em cada treino!
            </p>
          </div>
          <div className={styles.imageContainerBottom}>
            <img src="/Imagem1.jpg" alt="Imagem da academia" className={styles.image} />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.imageContainer}>
            <img src="/Imagem2.jpg" alt="Imagem representativa da comunidade fitness" className={styles.image} />
          </div>
          <div className={styles.hoursContainer}>
            <h3>Horário de Atendimento:</h3>
            <p>Segunda a Sexta-feira: 05:00 - 22:00</p>
            <p>Sábado e Domingo: 08:00 - 18:00</p>
            <p>Venha treinar com a gente e aproveite nossas instalações e serviços em um horário que se encaixa perfeitamente na sua agenda.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
