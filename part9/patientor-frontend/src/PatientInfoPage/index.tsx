import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Diagnosis, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import { updatePatient } from "../state";
import { Icon } from "semantic-ui-react";

const PatientInfoPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
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

  if (!ready || Object.keys(diagnoses).length === 0) {
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
      <Entries entries={patient.entries} diagnoses={diagnoses} />
    </div>
  );
};


const Entries = ({ entries, diagnoses }: { entries: Entry[], diagnoses: { [code: string]: Diagnosis } }) => {
  return (
    <div>
      {entries.map(entry => 
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />  
      )}
    </div>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry, diagnoses }: { entry: Entry, diagnoses: { [code: string]: Diagnosis } }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

const HospitalEntryDetails = ({ entry, diagnoses }: { entry: HospitalEntry, diagnoses: { [code: string]: Diagnosis } }) => {
  return (
    <div >
      <h3>{entry.date} <Icon name="hospital" /> </h3>
      {entry.description}
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>
            {code} {diagnoses[code].name}
          </li>
        ))}
      </ul>
      Discharge: {entry.discharge.date}, provided {entry.discharge.criteria}
    </div>
  );
};

const OccupationalHealthcareEntryDetails = ({ entry, diagnoses }: { entry: OccupationalHealthcareEntry, diagnoses: { [code: string]: Diagnosis } }) => {
  return (
    <div >
      <h3>{entry.date} <Icon name="stethoscope" /> {entry.employerName} </h3>
      {entry.description}
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>
            {code} {diagnoses[code].name}
          </li>
        ))}
      </ul>
      {entry.sickLeave ? <>Sick leave between {entry.sickLeave?.startDate} – {entry.sickLeave?.endDate}.</> : null}
    </div>
  );
};

const HealthCheckEntryDetails = ({ entry, diagnoses }: { entry: HealthCheckEntry, diagnoses: { [code: string]: Diagnosis } }) => {
  return (
    <div >
      <h3>{entry.date} <Icon name="doctor" /> </h3> 
      {entry.description} <br />
      <Icon name="heart" /> {['Healthy', 'LowRisk', 'HighRisk', 'CriticalRisk'][entry.healthCheckRating]}
      <ul>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>
            {code} {diagnoses[code].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientInfoPage;
