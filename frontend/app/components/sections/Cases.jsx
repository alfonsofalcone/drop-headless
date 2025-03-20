"use client";
import CaseCard from "../elements/CaseCard";
import Button from "../elements/Button";

function renderCases(cases) {
  if (!cases || !Array.isArray(cases)) return null;
  return cases.map((node, index) => {
    return <CaseCard key={index} data={node}></CaseCard>;
  });
}

export default function CasesSection({ data }) {
  if (!data) {
    return null;
  } 

  const cases = renderCases(data.caseCards);

  return (
    <section className="relative w-full">
      <div className="flex flex-col justify-center mx-auto px-6 py-10 lg:px-10 lg:py-14 z-10 w-full">
        <h2 className="text-6xl mb-12">Cases</h2>
        <div className="flex flex-col justify-center items-start w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full">
            {cases}
          </div>
          {data.casesGoTo && (
            <div className="flex justify-end items-center mt-8 w-full">
              <Button data={data.casesGoTo} className="text-2xl"></Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
