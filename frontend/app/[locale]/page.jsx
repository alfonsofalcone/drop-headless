import { ReactLenis } from "lenis/react";
import { notFound } from "next/navigation";
import componentsMap from "@/app/components/index";
import { routing } from '@/i18n/routing';

// Funzione per ottenere i dati della homepage da Strapi
async function fetchHomePageData(locale) {  
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/home?locale=${locale}&populate=sections.populate=*&populate=seoAttributes&populate=sections.heroBgImage&populate=sections.sectionButtons&populate=sections.heroCards&populate=sections.caseCards&populate=sections.caseCards.caseImage&populate=sections.casesGoTo&populate=sections.logoItems&populate=sections.logoItems.logoImage&populate=sections.mobileImage&populate=sections.desktopImage`,
    { next: { revalidate: 60 } } // Cache dei dati lato server
  );  
  
  if (!response.ok) {
    notFound();
  }

  const data = await response.json();
  return data;
}

// Generazione dinamica dei metadati SEO
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const responseData = await fetchHomePageData(locale);
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

export default async function HomePage({ params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const strapi = await fetchHomePageData(locale);
  
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
