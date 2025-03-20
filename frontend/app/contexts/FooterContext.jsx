"use client";

import { createContext, useContext } from "react";

// Crea il contesto
const FooterContext = createContext();

// Provider del contesto
export function FooterProvider({ children, data }) {
  return (
    <FooterContext.Provider value={data}>{children}</FooterContext.Provider>
  );
}

// Hook per usare il contesto
export function useFooterData() {
  return useContext(FooterContext);
}
