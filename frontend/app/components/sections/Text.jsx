"use client";
import FadeInSection from "../animations/FadeIn";
import Button from "../elements/Button";
import styles from "@/sass/sections/Text.module.scss";
import { DM_Sans, Inter, Roboto, Montserrat, Lora } from "next/font/google";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["100", "400", "500", "600", "700"], display: 'swap' });
const inter = Inter({ subsets: ["latin"], weight: ["100", "400", "500", "600", "700"], display: 'swap' });
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "400", "500", "700"], display: 'swap' });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["100", "400", "500", "600", "700"] });
const lora = Lora({ subsets: ["latin"], weight: ["400", "500", "600", "700"], display: 'swap' });

const fonts = {
  dm_sans,
  inter,
  roboto,
  montserrat,
  lora
};

function getFontClass(fontKey) {
  return fonts[fontKey]?.className || dm_sans.className;
}

function renderButtons(buttons) {
  if (!buttons || !Array.isArray(buttons)) return null;

  return buttons.map((node, index) => {
    return <Button key={index} data={node}></Button>;
  });
}

function renderContent(content) {
  if (!content || !Array.isArray(content)) return null;
  
  return content.map((node, index) => {
    switch (node.type) {
      case "heading":
        const HeadingTag = `h${node.level || 1}`;
        return (
          <HeadingTag
            key={index}
          >
            {renderContent(node.children)}
          </HeadingTag>
        );

      case "paragraph":
        return <p key={index}>{renderContent(node.children)}</p>;

      case "text":
        let textElement = node.text;

        if (node.bold)
          textElement = (
            <strong>{textElement}</strong>
          );
        if (node.italic)
          textElement = <em>{textElement}</em>;
        if (node.underline)
          textElement = <u>{textElement}</u>;
        if (node.strikethrough)
          textElement = <s>{textElement}</s>;

        return <span key={index}>{textElement}</span>;

      case "link":
        return (
          <a
            key={index}
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {renderContent(node.children)}
          </a>
        );

      case "list":
        const ListTag = node.format === "ordered" ? "ol" : "ul";
        return <ListTag key={index}>{renderContent(node.children)}</ListTag>;

      case "list-item":
        return <li key={index}>{renderContent(node.children)}</li>;

      default:
        console.warn(`Unsupported node type: ${node.type}`);
        return null;
    }
  });
}

export default function TextSection({ data }) {
  if (!data) {
    return null;
  }

  const styledColorClass = `styled-text-${data.sectionStyledTextColor.toLowerCase()}`;

  const sectionContent = renderContent(data.sectionContent);
  const sectionButtons = renderButtons(data.sectionButtons);

  const fontClass = getFontClass(data.sectionFontFamily);

  const backgroundColor = data.sectionBgColor || "white";
  const color = data.sectionTextColor || "black";

  
  const hasScreenHeight = data.hasScreenHeight ? "min-h-screen" : "";

  return (
    <section
      className={`${styles['text-section']} ${fontClass} flex flex-col justify-left items-center py-16`}
      style={{ backgroundColor, color }}
    >
      <FadeInSection>
        <div className={`flex justify-center mx-auto p-6 lg:p-10 z-10 w-full lg:max-w-[80vw] ${hasScreenHeight}`}>
          <div
            className={`${styles[styledColorClass]} flex flex-col justify-center items-start w-full`}
          >
            {sectionContent}
            <div className="flex flex-wrap items-center gap-4">
              {sectionButtons}
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
