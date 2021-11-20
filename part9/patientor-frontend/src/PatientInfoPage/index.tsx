import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { Icon } from "semantic-ui-react";

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const getPatient = async () => {
      const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      if (!patient) {
        return;
      }
      dispatch({ type: "UPDATE_PATIENT", payload: patient });
    };
    void getPatient();
  }, []);

  const patient = patients[id];

  if (!patient) {
    return <div>loading...</div>;
  }  
  return (
    <div>
      <h2>{patient.name} {patient.gender === 'male' ? <Icon name="mars" /> : patient.gender === 'female' ? <Icon name="venus" /> : <Icon name="genderless" />}</h2>
      ssn: {patient.ssn}
      <br />
      occupation: {patient.occupation}
    </div>
  );
};

export default PatientInfoPage;
