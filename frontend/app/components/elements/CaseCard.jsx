"use client";
import Image from "next/image";
import styles from "@/sass/elements/CaseCard.module.scss";
import HideOnTop from "../animations/HideOnTop";
import Link from 'next/link';

export default function CaseCard({ data }) {
  if (!data) return null;

  function imageSrc() {
    if (!data.caseImage) return placeholderSVG;
  
    const image = Array.isArray(data.caseImage) ? data.caseImage[0] : data.caseImage;
    return image?.url ? `${process.env.API_URL}${image.url}` : placeholderSVG;
  }
  
  function caseSlug(name) {
    return name.toLowerCase().replace(/\s/g, "-");
  }

  const caseImageHPosition = data.caseImageHPosition;
  const caseImageVPosition = data.caseImageVPosition;
  const imageStyle = (caseImageHPosition != null && caseImageVPosition != null) 
    ? { objectPosition: `${caseImageHPosition}% ${caseImageVPosition}%` } 
    : {};
  const placeholderSVG = "data:image/svg+xml;charset=UTF-8,<svg className='icon-logo fill-white' viewBox='0 0 90 32'><path d='M16.28,16.001C16.28,7.597,9.41,0.722,1,0.722v3.124c2.558,0,5.397,0.683,7.897,2.955c2.501,2.211,4.258,5.449,4.258,9.2 c0,2.495-0.681,5.394-2.954,7.893C7.988,26.393,4.752,28.155,1,28.155v3.122C9.41,31.278,16.28,24.403,16.28,16.001z' /><path d='M34.943,8.559V5.434c-5.617,0-10.562,4.946-10.562,10.567v10.562h3.129V16.001C27.511,12.255,30.689,8.559,34.943,8.559z' /><path d='M43.327,16.001c0,5.619,4.943,10.562,10.566,10.562c5.621,0,10.562-4.943,10.562-10.562c0-5.621-4.941-10.567-10.562-10.567 C48.271,5.434,43.327,10.381,43.327,16.001z M61.332,16.001c0,3.748-3.183,7.44-7.439,7.44c-3.752,0-7.445-3.183-7.445-7.44 c0-3.752,3.185-7.438,7.445-7.438C57.64,8.563,61.332,11.741,61.332,16.001z' /><path d='M78.336,5.434v3.129c3.754,0,7.441,3.178,7.441,7.438c0,3.748-3.178,7.44-7.441,7.44H71.47h-1.536v7.767h3.122v-4.645h5.279 c5.625,0,10.568-4.943,10.568-10.562C88.904,10.381,83.961,5.436,78.336,5.434z' /></svg>";
  const slug = caseSlug(data.caseName);

  return (
    <div className={styles["case-card"]}>
      <Link href={`/cases/${slug}`}>
      <div className={styles["case-card-image"]}>
        <HideOnTop></HideOnTop>
        <Image
          className="w-full h-full object-cover"
          src={imageSrc()}
          alt={data.caseImage?.alt || data.caseName || "Case Image"}
          width={data.caseImage?.width || 1200}
          height={data.caseImage?.height || 600}
          priority="true"
          style={imageStyle}
        />
      </div>
      </Link>
      <div className="case-card-content">
        <h2 className={styles["case-card-title"]}>{data.caseName}</h2>
      </div>
    </div>
  );
}
