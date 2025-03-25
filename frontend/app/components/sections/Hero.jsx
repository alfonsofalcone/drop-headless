"use client";

import FadeIn from "../animations/FadeIn";
import Image from "next/image";
import HeroCard from "../elements/HeroCard";

function renderHeroCards(cards) {
  if (!cards || !Array.isArray(cards)) return null;

  return cards.map((node, index) => {
    return <HeroCard key={index} data={node}></HeroCard>;
  });
}

export default function HeroSection({ data }) {
  if (!data) {
    return null;
  }

  const heroCards = renderHeroCards(data.heroCards);

  const overlayStyle = {
    backgroundColor: data.heroBgOverlayColor,
    opacity: data.heroBgOverlayOpacity,
  };

  return (
    <section className="hero relative flex flex-col justify-center items-center min-h-screen bg-black">
      {data.heroBgImage && (
        <div className="absolute w-full h-full overflow-hidden">
          <FadeIn>
            <Image
              className="w-full h-full object-cover"
              src={`${process.env.STRAPI_URL || 'http://localhost:1337'}${data.heroBgImage[0].url}`}
              alt={data.image?.alt || "Hero Image"}
              width={data.image?.width || 1200}
              height={data.image?.height || 600}
              priority="true"
            />
          </FadeIn>
        </div>
      )}
      {data.heroBgHasOverlay && (
        <div className="absolute w-full h-full" style={overlayStyle}></div>
      )}
      {/* Content */}
      <FadeIn>
        <div className="relative w-full">
          <div className="flex min-h-screen justify-center mx-auto p-6 lg:p-10 z-10 w-full lg:max-w-[80vw]">
            <div className="flex flex-col justify-center items-start w-full">
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white">
                {data.heroTitle}
              </h1>
              <p className="text-lg text-gray-200">{data.heroText}</p>
            </div>
          </div>
        </div>
        {data.heroCards && (
          <div className="relative flex flex-col items-end lg:grid lg:grid-rows-auto grid-cols-6 lg:grid-cols-12 gap-4 lg:gap-12 w-full lg:max-w-[80vw] min-h-auto lg:min-h-[50vh] text-center items-start justify-center mx-auto p-6 lg:p-10 z-10">
            <div className="col-span-full text-left text-4xl text-white">
              {data.heroCardsTitle}
            </div>
            {heroCards}
          </div>
        )}
      </FadeIn>
    </section>
  );
}
