"use client";

import styles from "@/sass/elements/LogoItem.module.scss";
import Image from "next/image";

export default function LogoItem({ data, itemWidth }) {
  const imageStyle = {
    width: itemWidth,
  };

  if (!data || !data.logoImage) return null;

  return (
    <div className={`${styles["logoItem"]}`} style={imageStyle}>
      <Image
        className="w-full max-w-32 h-auto"
        src={`${process.env.API_URL}${data.logoImage?.url}`}
        alt={data.image?.alternativeText || data.logoImageAlt || "Logo Image"}
        width={data.image?.width || 200}
        height={data.image?.height || 200}
        priority="true"
      />
    </div>
  );
}
