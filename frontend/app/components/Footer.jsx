"use client";

import { useFooterData } from "../contexts/FooterContext";
import styles from "../../sass/sections/Footer.module.scss";

function renderColumns(columns) {
  if (!columns || !Array.isArray(columns)) return null;
  return columns.map((column, index) => {
    return (
      <div key={`footer-column-${index}`} className={styles["footer-column"]}>
        <h3 className="text-white opacity-50 uppercase">
          {column.footerMenuTitle}
        </h3>
        <ul className="footer-column-menu mt-4">
          {column.footerLinkItems.map((link, linkIndex) => {
            return (
              <li className="mb-0" key={`footer-link-${linkIndex}`}>
                <a href={link.footerLinkUrl}>{link.footerLinkText}</a>
              </li>
            );
          })}
        </ul>
        <ul className="footer-column-submenu mt-4">
          {column.footerSublinkItems.map((sublink, sublinkIndex) => {
            return (
              <li className="mb-0" key={`footer-link-${sublinkIndex}`}>
                <a href={sublink.footerSublinkUrl}>
                  {sublink.footerSublinkText}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
}

export default function Footer() {
  const footer = useFooterData();
  const columns = renderColumns(footer.data.footerColumns);

  return (
    <footer className="footer-menu flex flex-col bg-black text-white w-full p-6 lg:p-10 min-h-screen">
      <div className="footer-menu-logo w-24 lg:w-28 z-[1]">
        <svg className={`icon-logo fill-white`} viewBox="0 0 90 32">
          <path d="M16.28,16.001C16.28,7.597,9.41,0.722,1,0.722v3.124c2.558,0,5.397,0.683,7.897,2.955c2.501,2.211,4.258,5.449,4.258,9.2 c0,2.495-0.681,5.394-2.954,7.893C7.988,26.393,4.752,28.155,1,28.155v3.122C9.41,31.278,16.28,24.403,16.28,16.001z" />
          <path d="M34.943,8.559V5.434c-5.617,0-10.562,4.946-10.562,10.567v10.562h3.129V16.001C27.511,12.255,30.689,8.559,34.943,8.559z" />
          <path d="M43.327,16.001c0,5.619,4.943,10.562,10.566,10.562c5.621,0,10.562-4.943,10.562-10.562c0-5.621-4.941-10.567-10.562-10.567 C48.271,5.434,43.327,10.381,43.327,16.001z M61.332,16.001c0,3.748-3.183,7.44-7.439,7.44c-3.752,0-7.445-3.183-7.445-7.44 c0-3.752,3.185-7.438,7.445-7.438C57.64,8.563,61.332,11.741,61.332,16.001z" />
          <path d="M78.336,5.434v3.129c3.754,0,7.441,3.178,7.441,7.438c0,3.748-3.178,7.44-7.441,7.44H71.47h-1.536v7.767h3.122v-4.645h5.279 c5.625,0,10.568-4.943,10.568-10.562C88.904,10.381,83.961,5.436,78.336,5.434z" />
        </svg>
      </div>
      <div className="footer-columns grid grid-cols-12 mt-24">{columns}</div>
    </footer>
  );
}
