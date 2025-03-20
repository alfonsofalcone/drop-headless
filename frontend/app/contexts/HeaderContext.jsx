"use client";

import { createContext, useContext } from "react";

// Crea il contesto
const HeaderContext = createContext();

// Provider del contesto
export function HeaderProvider({ children, data }) {
  return (
    <HeaderContext.Provider value={data}>{children}</HeaderContext.Provider>
  );
}

// Hook per usare il contesto
export function useHeaderData() {
  return useContext(HeaderContext);
}
