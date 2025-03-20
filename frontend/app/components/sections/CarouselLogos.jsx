"use client";

import LogoItem from "../elements/LogoItem";
import React from "react";
import styles from "@/sass/sections/CarouselLogos.module.scss";

/**
 * Suddivide l'array in chunk di una data dimensione
 */
function chunkArray(array, chunkSize) {
  if (!array || !Array.isArray(array) || array.length === 0) return [];
  let result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

/**
 * Calcola la dimensione del chunk basandosi sul numero di logoItems
 */
function getChunkSize(totalItems) {
  if (totalItems <= 4) return totalItems; // 1 contenitore con tutti gli elementi
  if (totalItems <= 9) return 3; // 3 loghi per contenitore
  if (totalItems <= 12) return 4; // 4 loghi per contenitore
  if (totalItems <= 20) return 4; // 4 loghi per contenitore
  return 5; // Per numeri maggiori, si adatta meglio
}

function renderLogosDesktop(logoItems) {
  if (!logoItems || !Array.isArray(logoItems)) return null;
  return logoItems.map((node, index) => (
    <LogoItem
      key={`desktop-${index}`}
      data={node}
      itemWidth={`calc(100% / ${logoItems.length} - 2rem)`}
    />
  ));
}
function renderLogosMobile(logoItems) {
  if (!logoItems || !Array.isArray(logoItems)) return null;

  const chunkSize = getChunkSize(logoItems.length);
  const chunks = chunkArray(logoItems, chunkSize);

  return chunks.map((chunk, containerIndex) => {
    const slideClass = containerIndex % 2 === 0 ? "slide-left" : "slide-right";

    return (
      <div
        key={`container-${containerIndex}`}
        className={`flex lg:hidden ${styles.container}`}
      >
        <div className={`${styles.logosSlide} ${styles[slideClass]}`}>
          {chunk.map((node, index) => (
            <LogoItem
              key={`mobile-${containerIndex}-${index}`}
              data={node}
              itemWidth={`calc(100% / ${chunk.length} - 2rem)`}
            />
          ))}
        </div>
        <div className={`${styles.logosSlide} ${styles[slideClass]}`}>
          {chunk.map((node, index) => (
            <LogoItem
              key={`mobile-dup-${containerIndex}-${index}`}
              data={node}
              itemWidth={`calc(100% / ${chunk.length} - 2rem)`}
            />
          ))}
        </div>
      </div>
    );
  });
}

export default function CarouselLogos({ data }) {
  if (!data || !data.logoItems || !Array.isArray(data.logoItems)) {
    return null;
  }

  const logosDesktop = renderLogosDesktop(data.logoItems);
  const logosMobile = renderLogosMobile(data.logoItems);

  return (
    <section className="relative w-full">
      {/* Container Desktop */}
      <div className={`hidden lg:flex ${styles["container"]}`}>
        <div className={`${styles["slide-left"]} ${styles.logosSlide}`}>
          {logosDesktop}
        </div>
        <div className={`${styles["slide-left"]} ${styles.logosSlide}`}>
          {logosDesktop}
        </div>
      </div>

      {/* Container Mobile - Ora genera più container, ognuno con due logosSlide */}
      {logosMobile}
    </section>
  );
}
