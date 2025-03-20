"use client";
import FadeInSection from "../animations/FadeIn";
import styles from "@/sass/sections/GoalsList.module.scss";
import Goal from "../elements/Goal";

function renderGoals(goals) {  
  if (!goals || !Array.isArray(goals)) return null;
  return(
    goals.map((goal, index) => (
      <Goal key={index} data={goal} goalIndex={index}></Goal>
    ))
  )
}

function renderContent(content, altColor = "black", contentSublabel = null) {
  if (!content || !Array.isArray(content)) return null;

  return content.map((node, index) => {
    switch (node.type) {
      case "heading":
        const HeadingTag = `h${node.level || 1}`;
        return (
          <HeadingTag
            key={index}
            className="text-[40px] md:text-7xl"
          >
            {renderContent(node.children, altColor, contentSublabel)}
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

        return (
        <span key={index}>
          {textElement}
          {contentSublabel != null ? <sub className={`${styles['goalslist-title-sub']}`}>({contentSublabel})</sub> : ''}
        </span>);

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

  const sectionGoals = renderGoals(data.sectionGoals);
  const sectionGoalsLength = sectionGoals.length;

  const sectionTitle = renderContent(data.sectionTitle, altColor, sectionGoalsLength);

  const backgroundColor = data.sectionBgColor || "white";
  const color = data.sectionTextColor || "black";

  return (
    <section
      className={`flex flex-col justify-left items-center py-4 lg:py-6`}
      style={{ backgroundColor }}
    >
      <FadeInSection>
        <div className={`flex flex-wrap flex-col justify-center mx-auto p-6 lg:p-10 z-10 w-full`}>
          <div className="flex grow mb-16 lg:mb-8 items-end">
             {sectionTitle}
          </div>
          <div className="flex flex-col lg:flex-row gap-x-8 h-full">
            <div className="flex grow basis-1/3"></div>
            <div
              className={`flex flex-col grow basis-2/3 justify-center items-start w-full`}
              style={{color}}
            >
              <div className="w-full">
                {sectionGoals}
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
