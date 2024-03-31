import React, { createContext, useState, useContext } from "react";
import defaultPreferences from "../assets/data/default-preferences.json";

const PreferencesContext = createContext();

const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(defaultPreferences);

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};

export { PreferencesProvider, usePreferences };
