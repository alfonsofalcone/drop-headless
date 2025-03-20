"use client";

import FadeIn from "../animations/FadeIn";
import styles from "@/sass/elements/HeroCard.module.scss";

export default function HeroCard({ data }) {
  if (!data) return null;
  return (
    <div className={styles["hero-card"]}>
      <FadeIn>
        <div className={styles["hero-card-element"]}>
          {data.heroCardLink && (
            <a
              href={data.heroCardLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["hero-card-link"]}
            ></a>
          )}
          <h2 className={styles["hero-card-title"]}>{data.heroCardTitle}</h2>
          <p className={styles["hero-card-text"]}>{data.heroCardText}</p>
          <div className={styles["hero-card-bg"]}></div>
        </div>
      </FadeIn>
    </div>
  );
}
