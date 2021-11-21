import axios from "axios";
import React, { useState } from "react";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { updatePatient, useStateValue } from "../state";
import { Redirect } from "react-router-dom";

type EntryType = 'Hospital'/* | 'OccupationalHealthcare' | 'HealthCheck'*/;

const AddEntry = ( {patientId}: {patientId: string} ) => {
  const [type, setType] = useState('Hospital');
  const [description, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpec] = useState('');
  const [code, setCode] = useState('M24.2');
  const [codes, setCodes] = useState<string[]>([]);
  const [discDate, setDiscDate] = useState('');
  const [discCrit, setDiscCrit] = useState('');
  const [submit, setSubmit] = useState(false);
  const [{ diagnoses }, dispatch] = useStateValue();
  
  const isType = (type: string): type is EntryType => {
    return true;
  };

  const onSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (!isType(type)) {
      throw Error('Incorrect type');
    }
    const newEntry: Entry = {
      type: type,
      specialist,
      diagnosisCodes: codes.length > 0 ? codes : undefined,
      description,
      date,
      discharge: {
        date: discDate,
        criteria: discCrit
      },
      id: ""
    };
    void axios.post(`${apiBaseUrl}/patients/${patientId}/entries`, newEntry);

    const getPatient = async () => {
      const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
      if (!patient) {
        return;
      }
      dispatch(updatePatient(patient));
    };
    void getPatient();
    setSubmit(true);
  };

  if (submit) {
    return <Redirect to="" />;
  }

  return (
    <div>
      <br /> <h2>Add an Entry</h2>
      <form onSubmit={onSubmit}>
        <>type: </>
        <select value={type} onChange={({ target }) => setType(target.value)}>
          <option value="Hospital">Hospital</option>
          <option value="OccupationalHealthcare">Occupational Health</option>
          <option value="HealthCheck">Health Check</option>
        </select> <br />
        <>description: </>
        <input required value={description} onChange={({ target }) => setDesc(target.value)} /> <br />
        <>date: </>
        <input required type="date" value={date} onChange={({ target }) => setDate(target.value)} /> <br />
        <>specialist: </>
        <input required value={specialist} onChange={({ target }) => setSpec(target.value)} /> <br />
        <>diagnosis codes (optional): </>
        <select value={code} onChange={({ target }) => setCode(target.value)}>
          {Object.keys(diagnoses).map(diagnosis => <option key={Math.random()} value={diagnosis}>{diagnosis}</option>)}
        </select>
        <button type="button" onClick={() => setCodes(codes.concat(code))}>add</button> 
        <> {codes.join(', ')} </>
        {codes.length > 0 ? <button type="button" onClick={() => setCodes([])}>remove</button> : null} <br />
        {type === 'Hospital'
          ? <div>
              <>discharge: </>
              <input required type="date" value={discDate} onChange={({ target }) => setDiscDate(target.value)} />
              <input required value={discCrit} placeholder="criteria" onChange={({ target }) => setDiscCrit(target.value)} />
            </div>
          : null
        }
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default AddEntry;