"use client";
import FadeInSection from "../animations/FadeIn";
import Button from "../elements/Button";
import Tag from "../elements/Tag";
import styles from "@/sass/sections/CaseDetails.module.scss";

function renderTags(tags) {
  console.log(tags);
  
  if (!tags || !Array.isArray(tags)) return null;

  return tags.map((node, index) => {
    return <Tag key={index} data={node}></Tag>
  })
}

function renderButtons(buttons) {
  if (!buttons || !Array.isArray(buttons)) return null;

  return buttons.map((node, index) => {
    return <Button key={index} data={node}></Button>;
  });
}

function renderContent(content, altColor = "black") {
  if (!content || !Array.isArray(content)) return null;

  return content.map((node, index) => {
    switch (node.type) {
      case "heading":
        const HeadingTag = `h${node.level || 1}`;
        return (
          <HeadingTag
            key={index}
            className="text-4xl md:text-6xl mb-16 lg:mb-8"
          >
            {renderContent(node.children, altColor)}
          </HeadingTag>
        );

      case "paragraph":
        return <p key={index}>{renderContent(node.children, altColor)}</p>;

      case "text":
        let textElement = node.text;

        const color = altColor;

        if (node.bold)
          textElement = (
            <strong style={{color}}>{textElement}</strong>
          );
        if (node.italic)
          textElement = <em style={{color}}>{textElement}</em>;
        if (node.underline)
          textElement = <u style={{color}}>{textElement}</u>;
        if (node.strikethrough)
          textElement = <s style={{color}}>{textElement}</s>;

        return <span key={index}>{textElement}</span>;

      case "link":
        return (
          <a
            key={index}
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {renderContent(node.children, altColor)}
          </a>
        );

      case "list":
        const ListTag = node.format === "ordered" ? "ol" : "ul";
        return <ListTag key={index}>{renderContent(node.children, altColor)}</ListTag>;

      case "list-item":
        return <li key={index}>{renderContent(node.children, altColor)}</li>;

      default:
        console.warn(`Unsupported node type: ${node.type}`);
        return null;
    }
  });
}

export default function CaseDetailsSection({ data }) {
  if (!data) {
    return null;
  }
  const altColor = `${data.sectionStyledTextColor.toLowerCase()}`;
  console.log(data);

  const sectionTitle = renderContent(data.sectionTitle, altColor);
  
  const sectionContent = renderContent(data.sectionContent, altColor);
  const sectionButtons = renderButtons(data.sectionButtons);
  const sectionTags = renderTags(data.sectionTags);

  const backgroundColor = data.sectionBgColor || "white";
  const color = data.sectionTextColor || "black";
  
  const hasScreenHeight = data.hasScreenHeight ? "min-h-screen" : "";

  return (
    <section
      className={`${styles["case-details"]} flex flex-col justify-left items-center py-8 lg:py-16`}
      style={{ backgroundColor }}
    >
      <FadeInSection>
        <div className={`flex flex-wrap justify-center mx-auto p-6 lg:p-10 z-10 w-full ${hasScreenHeight}`}>
          <div className="flex grow">
             {sectionTitle}
          </div>
          <div className="flex flex-col lg:flex-row gap-x-8 h-full">
            <div className="flex flex-row grow shrink-0 basis-1/3 mb-10">
              <div className="case-tags flex flex-row self-end lg:self-start gap-x-4 w-full h-auto">
              {sectionTags}
              </div>
            </div>
            <div
              className={`${styles["case-details-text"]} flex flex-col grow justify-center items-start w-full`}
              style={{color}}
            >
              {sectionContent}
              <div className="flex flex-wrap items-center gap-4">
                {sectionButtons}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
