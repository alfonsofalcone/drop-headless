"use client";
import FadeInSection from "../animations/FadeIn";
import Image from "next/image";
import HideOnTop from "../animations/HideOnTop";

export default function HeadingSection({ data }) {
  if (!data) {
    return null;
  }
  
  return (
    <section>
      <FadeInSection>
        <HideOnTop bgColor="silver"></HideOnTop>
        {data.mobileImage.url && (
          <Image
            className="w-full h-full object-cover aspect-square md:hidden"
            src={`http://localhost:1337${data.mobileImage.url}`}
            alt={data.image?.alt || "Mobile Image"}
            width={data.image?.width || 600}
            height={data.image?.height || 600}
          />
        )}
        {data.desktopImage.url && (
          <Image
            className="w-full h-full object-cover hidden md:block"
            src={`http://localhost:1337${data.desktopImage.url}`}
            alt={data.image?.alt || "Desktop Image"}
            width={data.image?.width || 1200}
            height={data.image?.height || 600}
          />
        )}
      </FadeInSection>
    </section>
  );
}