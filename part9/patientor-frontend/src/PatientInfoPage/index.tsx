import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { updatePatient } from "../state";
import { Icon } from "semantic-ui-react";

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [ready, setReady] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatient = async () => {
      const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      if (!patient) {
        return;
      }
      dispatch(updatePatient(patient));
      setReady(true);
    };
    void getPatient();
  }, []);

  if (!ready) {
    return <div>loading...</div>;
  }  

  const patient = patients[id];

  return (
    <div>
      <h2>{patient.name} {patient.gender === 'male' ? <Icon name="mars" /> : patient.gender === 'female' ? <Icon name="venus" /> : <Icon name="genderless" />}</h2>
      ssn: {patient.ssn}
      <br />
      occupation: {patient.occupation}
      <h3>entries</h3>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          {entry.date} {entry.description}
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};


export default PatientInfoPage;
