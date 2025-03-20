import { FooterProvider } from "./FooterContext";
import Footer from "../components/Footer";

async function fetchFooter() {
  const response = await fetch(
    "http://localhost:1337/api/footer?populate=footerColumns.footerLinkItems&populate=footerColumns.footerSublinkItems",
    { next: { revalidate: 30 } } // Per il caching di Next.js
  );
  const data = await response.json();
  return data;
}

export default async function FooterWrapper() {
  const footerData = await fetchFooter();

  return (
    <FooterProvider data={footerData}>
      <Footer />
    </FooterProvider>
  );
}
