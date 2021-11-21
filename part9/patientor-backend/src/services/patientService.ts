import patients from "../../data/patients";
import { Patient, Entry } from "../types";
import {v1 as uuid} from 'uuid';

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (newPatient: Omit<Patient, 'id'>): Patient => {
  const updatedPatient = { id: uuid(), ... newPatient };
  patients.push(updatedPatient);
  return updatedPatient;
};

const getPatientbyId = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addEntry = (entry: Entry, patientId: string): Entry => {
  entry.id = patientId;
  patients.map(patient => {
    patient.id === patientId 
      ? patient.entries.push(entry) 
      : patient;
  });
  return entry;
};

const patientService = { getPatients, addPatient, getPatientbyId, addEntry };

export default patientService;
