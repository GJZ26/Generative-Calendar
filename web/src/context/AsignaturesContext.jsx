import React, { createContext, useState, useContext } from "react";
import asignatures_data from "../assets/data/subjects.json";

const AsignatureContext = createContext();

const AsignatureProvider = ({ children }) => {
  asignatures_data.map((quar, index) => {
    quar.map((assi,subindex) => {
      if (assi.dependents.length > 0) {
        assi.status = "unavailable";
      }
    });
  });

  const [asignature, setAsignature] = useState(asignatures_data);

  return (
    <AsignatureContext.Provider value={{ asignature, setAsignature }}>
      {children}
    </AsignatureContext.Provider>
  );
};

const useAsignature = () => {
  const context = useContext(AsignatureContext);
  if (!context) {
    throw new Error("useAsignature must be used within a AsignatureProvider");
  }
  return context;
};

export { AsignatureProvider, useAsignature };
