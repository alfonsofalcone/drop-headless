"use client";
import styles from "@/sass/elements/Tag.module.scss";

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function Tag({ data }) {
  if (!data) {
    return null;
  }

  // Se data è una stringa, la usiamo come testo senza link
  if (typeof data === "string") {
    const tagLabel = capitalizeFirstLetter(data);
    return (
      <div className={`${styles["tag"]}`}>
        <a className={`${styles["tag-link"]}`} href={`/cases/${data}`}>
          <div className={`${styles["tag-container"]}`} data-label={data}>
            <span className={`${styles["tag-label"]}`}>{tagLabel}</span>
          </div>
        </a>
      </div>
    );
  }

  // Se data è un oggetto, seguiamo il comportamento attuale
  return (
    <div className={`${styles["tag"]}`}>
      <a className={`${styles["tag-link"]}`} href={data.tagLink}>
        <div className={`${styles["tag-container"]}`} data-label={data.tagText}>
          <span className={`${styles["tag-label"]}`}>{data.tagText}</span>
        </div>
      </a>
    </div>
  );
}