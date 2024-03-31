import React, { useState, useEffect } from "react";
import CustomContainer from "../layouts/CustomContainer.jsx";
import ChildContainer from "../layouts/ChildContainer.jsx";
import { usePreferences } from "../context/PreferencesContext.jsx";

export default function AdvancedOptionContent() {
  const { preferences, setPreferences } = usePreferences();
  const [generations, setGenerations] = useState(preferences.generations);
  const [initialPopulation, setInitialPopulation] = useState(
    preferences.initial_population
  );
  const [maxPopulation, setMaxPopulation] = useState(
    preferences.maximum_population
  );
  const [bitSize, setBitSize] = useState(preferences.bit_size);
  const [genMutationProb, setGenMutationProb] = useState(
    preferences.mutation_gen
  );
  const [individualMutationProb, setIndividualMutationProb] = useState(
    preferences.mutation_individual
  );
  const [initialResolution, setInitialResolution] = useState(
    preferences.initial_resolution
  );

  // Actualizar preferencias cuando cambie alguno de los estados
  useEffect(() => {
    setPreferences({
      ...preferences,
      generations,
      initial_population: initialPopulation,
      maximum_population: maxPopulation,
      cross: bitSize,
      mutation_gen: genMutationProb,
      mutation_individual: individualMutationProb,
      initial_resolution: initialResolution,
    });
  }, [
    generations,
    initialPopulation,
    maxPopulation,
    bitSize,
    genMutationProb,
    individualMutationProb,
    initialResolution,
    setPreferences,
  ]);

  return (
    <CustomContainer>
      <ChildContainer>
        <label>
          Numero de generaciones
          <input
            type="number"
            id="generation_number"
            value={generations}
            onChange={(e) =>
              setGenerations(parseInt(e.target.value ? e.target.value : 0))
            }
            min="0"
            max="120"
            step="1"
          />
        </label>

        <label>
          Población inicial
          <input
            type="number"
            id="initial_population"
            value={initialPopulation}
            onChange={(e) =>
              setInitialPopulation(
                parseInt(e.target.value ? e.target.value : 0)
              )
            }
            min="1"
            max="100"
            step="1"
          />
        </label>

        <label>
          Población máxima
          <input
            type="number"
            id="max_population"
            value={maxPopulation}
            onChange={(e) =>
              setMaxPopulation(parseInt(e.target.value ? e.target.value : 0))
            }
            min="1"
            max="100"
            step="1"
          />
        </label>
      </ChildContainer>

      <ChildContainer>
        <label>
          Probabilidad de Cruza
          <input
            type="number"
            id="bit_size"
            value={bitSize}
            onChange={(e) =>
              setBitSize(parseInt(e.target.value ? e.target.value : 0))
            }
            min="1"
            max="12"
            step="1"
          />
        </label>

        <label>
          Probabilidad de mutación (gen)
          <input
            step="0.01"
            type="number"
            id="gen_mutation_prob"
            value={genMutationProb}
            onChange={(e) =>
              setGenMutationProb(
                parseFloat(e.target.value ? e.target.value : 0)
              )
            }
            onBlur={(e) => {
              setGenMutationProb(
                parseFloat(
                  parseFloat(e.target.value ? e.target.value : 0).toFixed(2)
                )
              );
            }}
            min="0"
            max="1"
          />
        </label>

        <label>
          Probabilidad de mutación (individuos)
          <input
            type="number"
            id="individual_mutation_prob"
            value={individualMutationProb}
            onChange={(e) =>
              setIndividualMutationProb(
                parseFloat(e.target.value ? e.target.value : 0)
              )
            }
            onBlur={(e) => {
              setIndividualMutationProb(
                parseFloat(
                  parseFloat(e.target.value ? e.target.value : 0).toFixed(2)
                )
              );
            }}
            min="0"
            max="1"
            step="0.01"
          />
        </label>
      </ChildContainer>

      {/* <ChildContainer>
        <label>
          Resolución Inicial
          <input
            type="number"
            id="initial_resolution"
            value={initialResolution}
            onChange={(e) =>
              setInitialResolution(
                parseFloat(e.target.value ? e.target.value : 0)
              )
            }
            onBlur={(e) => {
              setInitialResolution(
                parseFloat(
                  parseFloat(e.target.value ? e.target.value : 0).toFixed(2)
                )
              );
            }}
            min="0"
            max="1"
            step="0.01"
          />
        </label>
      </ChildContainer> */}
    </CustomContainer>
  );
}
