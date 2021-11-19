import diagnoses from '../../data/diagnoses';
import { Diagnosis } from "../types";

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};

const diagnosisService = { getDiagnoses };

export default diagnosisService;