"use client";
import FadeInSection from "../animations/FadeIn";

export default function HeadingSection({ data }) {
  if (!data) {
    return null;
  }
  
  const color = data.headingColor || "white";
  
  return (
    <section>
      <FadeInSection>
      <div className="w-full py-32">
          <div className="w-full pl-6 pr-6 lg:pl-[20%] lg:pr-8">
            <h1 className="leading-[1.3]" style={{ color }}>{data.headingTitle}</h1>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}