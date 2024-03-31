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
        <div className="stress">
          <span className="as-label">Nivel de estrés</span>

          <label className="as-input">
            Cualquiera
            <input
              type="radio"
              name="stress"
              value="any"
              checked={stress === "any"}
              onChange={handleStressChange}
            />
          </label>

          <label className="as-input">
            Bajo
            <input
              type="radio"
              name="stress"
              value="low"
              checked={stress === "low"}
              onChange={handleStressChange}
            />
          </label>

          <label className="as-input">
            Normal
            <input
              type="radio"
              name="stress"
              value="normal"
              checked={stress === "normal"}
              onChange={handleStressChange}
            />
          </label>

          <label className="as-input">
            Alto
            <input
              type="radio"
              name="stress"
              value="high"
              checked={stress === "high"}
              onChange={handleStressChange}
            />
          </label>
        </div>

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
