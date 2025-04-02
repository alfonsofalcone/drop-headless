"use client";
import React from "react";
import { useHeaderData } from "../contexts/HeaderContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/sass/base/Header.module.scss";
import { routing } from '@/i18n/routing';


export default function Header() {
  const data = useHeaderData();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [logoColor, setLogoColor] = useState("fill-black");
  const pathname = usePathname();
  const localeHome = pathname.split("/")[1];
  

  useEffect(() => {
    // Verifica se il pathname indica la homepage (es. "/it", "/en")
    const pathSegments = pathname.split("/");
    const homePageCheck = pathSegments.length === 2 || pathSegments[1] === "";
    setIsHomePage(homePageCheck);
    setLogoColor(homePageCheck ? "fill-white" : "fill-black");
  }, [pathname]); // Esegui ogni volta che cambia il pathname

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);

    if (!menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%"; // Evita lo shift orizzontale
    } else {
      const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY); // Ripristina la posizione originale
    }
  };

  const menuItems = data?.data?.menuItems || [];

  return (
    <header className="absolute top-0 w-full p-6 lg:p-10">
      <div className={`${styles['header-menu']} header-menu relative flex items-center justify-between`}>
        <div className="header-menu-logo w-20 lg:w-24 lg:w-28 z-[1]">
        <Link href={`/${localeHome}`}>
          <svg className={`icon-logo ${logoColor}`} viewBox="0 0 90 32">
            <path d="M16.28,16.001C16.28,7.597,9.41,0.722,1,0.722v3.124c2.558,0,5.397,0.683,7.897,2.955c2.501,2.211,4.258,5.449,4.258,9.2 c0,2.495-0.681,5.394-2.954,7.893C7.988,26.393,4.752,28.155,1,28.155v3.122C9.41,31.278,16.28,24.403,16.28,16.001z" />
            <path d="M34.943,8.559V5.434c-5.617,0-10.562,4.946-10.562,10.567v10.562h3.129V16.001C27.511,12.255,30.689,8.559,34.943,8.559z" />
            <path d="M43.327,16.001c0,5.619,4.943,10.562,10.566,10.562c5.621,0,10.562-4.943,10.562-10.562c0-5.621-4.941-10.567-10.562-10.567 C48.271,5.434,43.327,10.381,43.327,16.001z M61.332,16.001c0,3.748-3.183,7.44-7.439,7.44c-3.752,0-7.445-3.183-7.445-7.44 c0-3.752,3.185-7.438,7.445-7.438C57.64,8.563,61.332,11.741,61.332,16.001z" />
            <path d="M78.336,5.434v3.129c3.754,0,7.441,3.178,7.441,7.438c0,3.748-3.178,7.44-7.441,7.44H71.47h-1.536v7.767h3.122v-4.645h5.279 c5.625,0,10.568-4.943,10.568-10.562C88.904,10.381,83.961,5.436,78.336,5.434z" />
          </svg>
        </Link>
        </div>
        <div
          className={`${styles['header-menu-button']} ${ menuOpen ? styles['open'] : "" } fixed right-0 mr-6 lg:mr-10 z-50 cursor-pointer flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-drop-gray rounded-full top-[20px] lg:top-[32px]`}
          onClick={toggleMenu}
        >
          <div className={`${styles['block']} w-4 md:w-5 lg:w-6 h-0.5 bg-black`}></div>
          <div className={`${styles['block']} w-4 md:w-5 lg:w-6 h-0.5 bg-black`}></div>
        </div>
        {/* Pannello del menu */}
        <div
          className={`${styles['header-menu-panel']} fixed top-0 left-0 w-full h-full max-w-full p-6 lg:p-10 ${
            menuOpen
              ? "z-40 opacity-100 bg-drop-header-menu"
              : "z-minus-10 opacity-0 bg-transparent"
          }`}
        >
          <div className="header-menu-logo w-24 lg:w-28">
            <svg className="icon-logo fill-white" viewBox="0 0 90 32">
              <path d="M16.28,16.001C16.28,7.597,9.41,0.722,1,0.722v3.124c2.558,0,5.397,0.683,7.897,2.955c2.501,2.211,4.258,5.449,4.258,9.2 c0,2.495-0.681,5.394-2.954,7.893C7.988,26.393,4.752,28.155,1,28.155v3.122C9.41,31.278,16.28,24.403,16.28,16.001z" />
              <path d="M34.943,8.559V5.434c-5.617,0-10.562,4.946-10.562,10.567v10.562h3.129V16.001C27.511,12.255,30.689,8.559,34.943,8.559z" />
              <path d="M43.327,16.001c0,5.619,4.943,10.562,10.566,10.562c5.621,0,10.562-4.943,10.562-10.562c0-5.621-4.941-10.567-10.562-10.567 C48.271,5.434,43.327,10.381,43.327,16.001z M61.332,16.001c0,3.748-3.183,7.44-7.439,7.44c-3.752,0-7.445-3.183-7.445-7.44 c0-3.752,3.185-7.438,7.445-7.438C57.64,8.563,61.332,11.741,61.332,16.001z" />
              <path d="M78.336,5.434v3.129c3.754,0,7.441,3.178,7.441,7.438c0,3.748-3.178,7.44-7.441,7.44H71.47h-1.536v7.767h3.122v-4.645h5.279 c5.625,0,10.568-4.943,10.568-10.562C88.904,10.381,83.961,5.436,78.336,5.434z" />
            </svg>
          </div>
          {menuItems.map((item, index) => (
  <div
    key={`menu-item-${index}`}
    className={`${styles['header-menu-lists']} flex flex-col w-full h-full md:w-drop-header-menu-lists gap-y-6 ml-auto py-10`}
  >
    {item.subMenuItems?.map((subItem, subIndex) => (
      <React.Fragment key={`sub-menu-item-${subIndex}`}>
        <div
          className={`${styles['header-menu-list']} flex grow-0 shrink bg-drop-${
            subItem.subMenuBgColor
          } ${
            subItem.isFooterItem
              ? `${styles['footer-menu']} basis-auto`
              : "basis-full"
          }`}
        >
          {subItem.isFooterItem && (
            <ul className={`${styles['language-list']}`}>
              {routing.locales?.map((localeLink, localeIndex) => (
                <li key={`locale-link-${localeIndex}`}>
                  <Link href={`/${localeLink}`}>
                    {localeLink.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {subItem.subMenuLinks?.length > 0 && (
          <ul>
            {subItem.subMenuLinks?.map((subMenuLink, subLinkIndex) => (
              <li key={`sub-menu-link-${subLinkIndex}`}>
                <Link href={`${subMenuLink.subMenuLinkUrl}`}>
                  {subMenuLink.subMenuLinkTitle}
                </Link>
              </li>
            ))}
          </ul>
          )}
          {subItem.showMinorLinks && (
            <ul
              className={`${
                subItem.isFooterItem ? "social-list" : styles['sub-list']
              }`}
            >
              {/* 🔹 Mostra la lista delle lingue SOLO dopo il primo elemento */}
              {subItem.subMenuMinorLinks?.map(
                (subMenuMinorLink, subLinkMinorIndex) => (
                  <li key={`sub-menu-link-${subLinkMinorIndex}`}>
                    <Link href={`${subMenuMinorLink.subMenuMinorLinkUrl}`}>
                      {subMenuMinorLink.subMenuMinorLinkTitle}
                    </Link>
                  </li>
                )
              )}
            </ul>
          )}
        </div>


      </React.Fragment>
    ))}
  </div>
))}


        </div>
      </div>
    </header>
  );
}
