import patients from "../../data/patients";
import { patient } from "../types";

const getPatients = (): Omit<patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const patientService = { getPatients };

export default patientService;
