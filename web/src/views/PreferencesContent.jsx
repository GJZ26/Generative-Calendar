import React, { useState } from "react";
import HorizontalContainer from "../layouts/HorizontalContainer";
import { usePreferences } from "../context/PreferencesContext";

export default function PreferencesContent() {
  const { preferences, setPreferences } = usePreferences();

  const initialStress = preferences.stress || "any";
  const [stress, setStress] = useState(initialStress);

  const handleStressChange = (event) => {
    const value = event.target.value;
    setStress(value);
    setPreferences({
      ...preferences,
      stress: value,
    });
  };

  const handleQuarterChange = (event) => {
    setPreferences({
      ...preferences,
      quarter: event.target.value,
    });
  };

  return (
    <>
      <HorizontalContainer>
        <label>
          Cuatrimestre entrante
          <select
            name="quarter"
            id="quarter"
            value={preferences.quarter}
            onChange={handleQuarterChange}
          >
            <option value="1">1°</option>
            <option value="2">2°</option>
            <option value="3">3°</option>
            <option value="4">4°</option>
            <option value="5">5°</option>
            <option value="6">6°</option>
            <option value="7">7°</option>
            <option value="8">8°</option>
            <option value="9">9°</option>
          </select>
        </label>
      </HorizontalContainer>
    </>
  );
}
