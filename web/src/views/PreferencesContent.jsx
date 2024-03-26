import HorizontalContainer from "../layouts/HorizontalContainer";

export default function PreferencesContent() {
  return (
    <>
      <HorizontalContainer>
        <div className="stress">
          <span className="as-label">Nivel de estrés</span>

          <label className="as-input">
            Cualquiera
            <input type="radio" name="stress" defaultChecked />
          </label>

          <label className="as-input">
            Bajo
            <input type="radio" name="stress" />
          </label>

          <label className="as-input">
            Normal
            <input type="radio" name="stress" />
          </label>

          <label className="as-input">
            Alto
            <input type="radio" name="stress" />
          </label>
        </div>

        <label>
          Cuatrimestre entrante
          <select name="cuatrimestre" id="cuatrimestre">
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
