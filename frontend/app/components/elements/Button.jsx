"use client";

import styles from "@/sass/elements/Button.module.scss";

export default function Button({ data }) {
  if (!data) {
    return null;
  }

  const {
    buttonText = "Default Text",
    buttonLink = "#",
    targetBlank = false,
    buttonType = "button",
    buttonTag = "button",
    buttonBgColor = "default",
  } = data;

  // Mappatura per i colori di sfondo
  const bgColorClasses = {
    default: "bg-transparent",
    primary: "bg-drop-yellow",
    secondary: "bg-white",
  };

  const buttonClasses = `p-4 ${
    bgColorClasses[buttonBgColor] || bgColorClasses.default
  }`;

  return (
    <div className={styles["button-element"]}>
      {buttonTag === "a" ? (
        <a
          href={buttonLink}
          target={targetBlank ? "_blank" : "_self"}
          rel={targetBlank ? "noopener noreferrer" : ""}
          className={`${styles[buttonType]} ${
            bgColorClasses[buttonBgColor] || bgColorClasses.default
          }`}
        >
          <span className={styles["pill"]}></span>
          {buttonText}
        </a>
      ) : (
        <button className={`${styles[buttonType]} ${buttonClasses}`}>
          {buttonType === "link" ? (
            <span className={styles["pill"]}></span>
          ) : null}
          {buttonText}
        </button>
      )}
    </div>
  );
}
