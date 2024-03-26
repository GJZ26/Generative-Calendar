import CustomContainer from "../layouts/CustomContainer.jsx";
import ChildContainer from "../layouts/ChildContainer.jsx";

export default function AdvancedOptionContent() {
  return (
    <CustomContainer>
      <ChildContainer>
        <label>
          Numero de generaciones
          <input
            type="number"
            id="generation_number"
            defaultValue="100"
            min="0"
            max="120"
          />
        </label>

        <label>
          Población inicial
          <input
            type="number"
            id="initial_population"
            defaultValue="10"
            min="1"
            max="100"
          />
        </label>

        <label>
          Población máxima
          <input
            type="number"
            id="max_population"
            defaultValue="40"
            min="1"
            max="100"
          />
        </label>
      </ChildContainer>

      <ChildContainer>
        <label>
          Cantidad de bits*
          <input type="number" id="bit_size" defaultValue="7" min="1" max="12" />
        </label>

        <label>
          Probabilidad de mutación (gen)
          <input
            type="number"
            id="gen_mutation_prob"
            defaultValue="0.5"
            min="0"
            max="1"
            step="0.01"
          />
        </label>

        <label>
          Probabilidad de mutación (individuos)
          <input
            type="number"
            id="individual_mutation_prob"
            defaultValue="0.3"
            min="0"
            max="1"
            step="0.01"
          />
        </label>
      </ChildContainer>

      <ChildContainer>
        <label>
          Resolución Inicial
          <input
            type="number"
            id="initial_resolution"
            defaultValue="0.25"
            min="0"
            max="1"
            step="0.01"
          />
        </label>
      </ChildContainer>
    </CustomContainer>
  );
}
