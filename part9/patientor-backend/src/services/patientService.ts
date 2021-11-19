import patients from "../../data/patients";
import { Patient } from "../types";
import {v1 as uuid} from 'uuid';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (newPatient: Omit<Patient, 'id'>): Patient => {
  const updatedPatient = { id: uuid(), ... newPatient };
  patients.push(updatedPatient);
  return updatedPatient;
};

const patientService = { getPatients, addPatient };

export default patientService;
