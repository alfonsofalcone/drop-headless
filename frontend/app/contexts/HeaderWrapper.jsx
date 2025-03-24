import { HeaderProvider } from "./HeaderContext";
import Header from "../components/Header";

async function fetchHeader() {
  const response = await fetch(
    `${process.env.STRAPI_URL}/api/header?populate=localizations.menuItems&populate=menuItems&populate=menuItems.subMenuItems&populate=menuItems.subMenuItems.subMenuLinks&populate=menuItems.subMenuItems.subMenuMinorLinks`,
    { next: { revalidate: 30 } } // Per il caching di Next.js
  );
  const data = await response.json();
  return data;
}

export default async function HeaderWrapper() {
  const headerData = await fetchHeader();

  return (
    <HeaderProvider data={headerData}>
      <Header />
    </HeaderProvider>
  );
}
