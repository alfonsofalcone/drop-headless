import "../sass/main.scss";
import HeaderWrapper from "./contexts/HeaderWrapper";
import FooterWrapper from "./contexts/FooterWrapper";

export const metadata = {
  title: "Drop Headless Test",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" sizes="any" />
      </head>
      <body>
        <HeaderWrapper />
        <main className="flex flex-col gap-8 row-start-2 items-center justify-items-center min-h-screen gap-16">
          {children}
        </main>
        <FooterWrapper />
      </body>
    </html>
  );
}
