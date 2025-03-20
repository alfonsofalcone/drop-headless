import { notFound } from "next/navigation";
import { ReactLenis } from "lenis/react";
import CaseCard from "@/app/components/elements/CaseCard";
import Tag from "@/app/components/elements/Tag";


// 🔥 Funzione per ottenere i dati della pagina principale
async function fetchCasesMainPage(locale = 'en') {
  try {
    const response = await fetch(
      `http://localhost:1337/api/cases-list?locale=${locale}`,
      { next: { revalidate: 30 } }
    );
    if (!response.ok) notFound();

    return await response.json();
  } catch (error) {
    notFound();
  }
}

// 🔥 Funzione per ottenere i casi dalla API
async function fetchCases(locale = 'en') {
  try {
    const response = await fetch(
      `http://localhost:1337/api/cases?populate=*&locale=${locale}`,
      { next: { revalidate: 30 } }
    );
    if (!response.ok) notFound();

    return await response.json();
  } catch (error) {
    notFound();
  }
}

// 🔥 Renderizza le card dei casi studio
function renderCases(cases) {
  console.log(cases);
  
  if (!cases || !Array.isArray(cases)) return null;
  return cases.map((node, index) => <CaseCard key={index} data={node} />);
}

// 🔥 Estrai i tag unici
function getUniqueTags(cases) {
  const allTags = cases
    .flatMap(({ caseTags }) => caseTags?.split(",").map(tag => tag.trim()) || [])
    .filter(tag => tag);
  return [...new Set(allTags)];
}

// 🔥 Renderizza i tag
function renderTags(tags) {
  if (!tags || !Array.isArray(tags)) return null;
  return tags.map((node, index) => <Tag key={index} data={node} />);
}

// 🟢 🔥 Pagina aggiornata per supportare la lingua corretta
export default async function Cases({ params }) {
  const locale = params?.locale || "en";

  const strapiPage = await fetchCasesMainPage(locale);
  const casesMainPageTitle = strapiPage.data.casesListTitle;

  const strapi = await fetchCases(locale);
  const cases = renderCases(strapi.data);
  const tagsList = getUniqueTags(strapi.data);
  const tags = renderTags(tagsList);

  return (
    <div className="w-full min-h-screen">
      <ReactLenis root>
        <section className="relative w-full">
          <div className="flex flex-col justify-center mx-auto px-6 py-10 lg:px-10 lg:py-14 z-10 w-full">
            <div className="flex flex-col justify-center items-start w-full pt-12 pb-24 lg:py-36">
              <div className="ml-0 lg:ml-[33%]">
                <h2 className="text-6xl lg:text-9xl">
                  <span className="text-drop-white">{casesMainPageTitle}</span>
                  <sub className="text-base">({cases.length})</sub>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full">
              <div className="flex flex-row self-end lg:self-start gap-x-4 w-full h-auto pb-8">
                {tags}
              </div>
            </div>

            <div className="flex flex-col justify-center items-start w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full">
                {cases}
              </div>
            </div>
          </div>
        </section>
      </ReactLenis>
    </div>
  );
}
