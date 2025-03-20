import { ReactLenis } from "lenis/react";
import { notFound } from "next/navigation";
import componentsMap from "@/app/components/index";

// Funzione per ottenere i dati della homepage da Strapi
async function fetchHomePageData() {
  // const fetchUrl = "http://localhost:1337/api/home?populate=*&[sections][populate]=*";
  const response = await fetch(
    "http://localhost:1337/api/home?populate=sections.populate=*&populate=seoAttributes&populate=sections.heroBgImage&populate=sections.sectionButtons&populate=sections.heroCards&populate=sections.caseCards&populate=sections.caseCards.caseImage&populate=sections.casesGoTo&populate=sections.logoItems&populate=sections.logoItems.logoImage",
    { next: { revalidate: 3600 } } // Cache dei dati lato server
  );

  if (!response.ok) {
    notFound();
  }
  const data = await response.json();

  return data;
}

// Generazione dinamica dei metadati SEO
export async function generateMetadata() {
  const responseData = await fetchHomePageData();
  const seo = responseData.data.seoAttributes;

  return {
    title: seo.seoMetaTitle || "Default Title",
    description: seo.seoMetaDescription || "Default Description",
    openGraph: {
      title: seo.ogTitle || seo.seoMetaTitle,
      description: seo.ogDescription || seo.seoMetaDescription,
      url: seo.ogUrl || "https://example.com",
      images: seo.ogImage ? [seo.ogImage.url] : [],
    },
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seo.seoMetaTitle,
      description: seo.seoMetaDescription,
      url: seo.ogUrl || "https://example.com",
    },
  };
}

export default async function HomePage() {
  const strapi = await fetchHomePageData();

  return (
    <div className="w-full min-h-screen">
      <ReactLenis root>
        {strapi.data.sections?.map((section) => {
          // Ottieni il componente corrispondente
          const SectionComponent = componentsMap[section.__component];

          // Se il componente esiste, renderizzalo
          if (SectionComponent) {
            return <SectionComponent key={section.id} data={section} />;
          }

          // Se non esiste un componente, puoi gestire l'errore
          console.warn(`No component found for ${section.__component}`);
          return null;
        })}
      </ReactLenis>
    </div>
  );
}
