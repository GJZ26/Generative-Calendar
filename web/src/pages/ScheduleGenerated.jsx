import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAsignature } from "../context/AsignaturesContext";
import { usePreferences } from "../context/PreferencesContext";
import purgeSubject from "../utils/SchedulePreGeneration";
import Schedule from "../components/Schedule";
import axios from "axios";
import ScheduleResultContainer from "../layouts/ScheduleResultContainer";
import AditionalTextContainer from "../layouts/AditionalTextContainer";
import AditionalData from "../components/AditionalData";
import opt from '../setting.json'

export default function ScheduleGenerated() {
  const { asignature, setAsignature } = useAsignature();
  const { preferences, setPreferences } = usePreferences();

  const [purgedSubjects, setPurgedSubjects] = useState(undefined);
  const [bodyRender, setBodyRender] = useState(<>Espere un momento...</>);

  const navigate = useNavigate();

  useEffect(() => {
    purgeSubject(asignature, setPurgedSubjects, preferences, navigate);
  }, [asignature]);

  useEffect(() => {
    setBodyRender(
      renderCalendar(purgedSubjects, setPurgedSubjects, preferences, navigate)
    );
  }, [purgedSubjects]);

  return (
    <>
      <Navbar />
      <main>{bodyRender}</main>
    </>
  );
}

function renderCalendar(data_to_send, set_purged, preferences, navto) {
  if (data_to_send === undefined) return <>Wait...</>;

  // Valida si los purged data son de tipo string
  if (typeof data_to_send === "string") {
    return <h1 style={{ textAlign: "center" }}>{data_to_send}</h1>;
  }

  // Validar si tiene un atributo que añade el servidor para evitar realizar dobles peticiones
  if (data_to_send.result) {
    return (
      <ScheduleResultContainer>
        <h2>¡Listo! Este es el mejor horario para ti.</h2>
        <Schedule data={data_to_send.result} isDinamic={true} />
        <AditionalTextContainer>
          <span>Detalles de tu población.</span>
          <span>
            Alternativa{" "}
            <strong style={{ fontWeight: 500 }}>
              {convertirBase(
                data_to_send.general.seed,
                data_to_send.general.seed_base + 1,
                10
              ).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            </strong>
            de{" "}
            <strong style={{ fontWeight: 500 }}>
              {data_to_send.general.possibilities.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}
            </strong>
          </span>
        </AditionalTextContainer>
        <AditionalData data={data_to_send} />
      </ScheduleResultContainer>
    );
  }

  if (data_to_send.error) {
    return (
      <ScheduleResultContainer>
        <AditionalTextContainer>
          <span></span>{" "}
          <h1>Ha ocurrido un error, regresando a la página de inicio.</h1>{" "}
          <span></span>
        </AditionalTextContainer>
      </ScheduleResultContainer>
    );
  }

  // Petición al servidor
  axios
    .post(`${opt.protocol}://${opt.host}:${opt.port}/make`, {
      preferences: preferences,
      assignatures: data_to_send,
    })
    .then((data) => {
      set_purged(data.data);
    })
    .catch((err) => {
      setTimeout(() => {
        navto("/");
      }, 3000);
      set_purged({ error: true });
    });

  return (
    <ScheduleResultContainer>
      <Schedule data={[]} isDinamic={true} />
      <AditionalTextContainer>
        <span></span> <span>Generando Horario...</span> <span></span>
      </AditionalTextContainer>
    </ScheduleResultContainer>
  );
}

function convertirBase(numero, baseOrigen, baseDestino) {
  var decimal = parseInt(numero, baseOrigen);
  var resultado = decimal.toString(baseDestino);

  return resultado;
}
