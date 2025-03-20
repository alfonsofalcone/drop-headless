import { notFound } from "next/navigation";
import { ReactLenis } from "lenis/react";
import componentsMap from "@/app/components/index";
import CaseCard from "@/app/components/elements/CaseCard";
import Tag from "@/app/components/elements/Tag";

async function filterCases(slug) { 
  try {
    const response = await fetch(`http://localhost:1337/api/cases?populate=caseImage`, {
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero dei casi");
    }

    const data = await response.json();
    
    // Trova il caso con il giusto slug
    const foundCase = data.data.find((c) => 
      c.caseName.toLowerCase().replace(/ /g, '-') === slug
    );

    if (!foundCase) {
      const filteredCases = await filterCasesByTag(data, slug);
      return filteredCases ?? { data: [], isSingleCase: false }; // ✅ Evita undefined
    }

    // Se il caso esiste, recupera i dettagli
    const singleCase = await fetchSingleCase(foundCase.documentId);
    return { data: singleCase ?? {}, isSingleCase: true }; // ✅ Evita undefined

  } catch (error) {
    notFound();
  }
}

async function fetchSingleCase(documentId) {
  try {
    const response = await fetch(
      `http://localhost:1337/api/cases/${documentId}?populate=sections.populate=*&populate=sections.mobileImage&populate=sections.desktopImage&populate=sections.sectionTags&populate=sections.sectionGoals`,
      { next: { revalidate: 30 } }
    );

    if (!response.ok) {
      throw new Error("Errore nel recupero del caso");
    }

    return await response.json();

  } catch (error) {
    notFound();
  }
}

function getUniqueTags(cases) {
  console.log(cases); // Per debug

  const allTags = cases
    .flatMap((c) => c.caseTags?.split(",").map(tag => tag.trim()) || []) // Estrai e pulisci i tag
    .filter(tag => tag); // Rimuove eventuali stringhe vuote
  
  return [...new Set(allTags)]; // Elimina i duplicati
}

function renderTags(tags) {
  if (!tags || !Array.isArray(tags)) return null;
  
  return tags.map((node, index) => {
    return <Tag key={index} data={node}></Tag>
  })
}

async function filterCasesByTag(data, slug) { 
  console.log("Dati ricevuti:", data);
  console.log("Slug ricevuto:", slug);

  // Controlla se data ha la struttura attesa
  if (!data || !data.data) {
    console.error("Formato dati non valido:", data);
    notFound();
  }

  // Converti slug in minuscolo per evitare problemi di confronto
  const normalizedSlug = slug.toLowerCase().trim();

  // Filtra i casi basandoti sui tag correttamente
  const filteredCases = data.data.filter((c) => {
    if (!c.caseTags) return false; // Evita errori se caseTags è undefined/null

    return c.caseTags
      .toLowerCase() // Converti tutto in minuscolo
      .split(",") // Dividi la stringa in un array
      .map(tag => tag.trim()) // Rimuovi eventuali spazi
      .includes(normalizedSlug); // Confronta con lo slug normalizzato
  }); 

  if (filteredCases.length === 0) {
    console.warn("Nessun caso trovato per il tag:", normalizedSlug);
    notFound();
  }

  return { data: filteredCases ?? [], isSingleCase: false };
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default async function Case({ params }) {
  const { slug } = await params;
  
  const { data: strapi, isSingleCase } = await filterCases(slug);

  if (!strapi || (Array.isArray(strapi) && strapi.length === 0)) {
    return <p>Nessun caso trovato.</p>; // Gestione del caso vuoto
  }

  return (
    <div className={`w-full min-h-screen ${isSingleCase ? ("p-0") : ("p-6 lg:p-10")}`}>
      <ReactLenis root>
        {isSingleCase ? (
          strapi.data?.sections?.map((section) => {
            const SectionComponent = componentsMap[section.__component];
            return SectionComponent ? <SectionComponent key={section.id} data={section} /> : null;
          })
        ) : (
          <section className="relative w-full">
            <div className="flex flex-col justify-center items-start w-full pt-16 pb-24 lg:py-36">
              <div className="ml-0 lg:ml-[33%]">
              <h2 className="text-6xl lg:text-9xl"><span className="text-drop-white">{capitalizeFirstLetter(slug)}</span><sub className="text-base">({strapi.length})</sub></h2>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start w-full">
              <div className="flex flex-row self-end lg:self-start gap-x-4 w-full h-auto pb-8">
                {renderTags(getUniqueTags(strapi))}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 w-full">
                {Array.isArray(strapi) ? (
                  strapi.map((caseData, index) => (
                    <CaseCard key={index} data={caseData} />
                  ))
                ) : (
                  <p>Nessun caso trovato.</p> // ✅ Fallback se `strapi.data` non è un array
                )}
              </div>
            </div>
          </section>
        )}
      </ReactLenis>
    </div>
  );
}

