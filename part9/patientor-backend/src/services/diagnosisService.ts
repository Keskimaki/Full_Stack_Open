import diagnoses from '../../data/diagnoses';
import { diagnosis } from "../types";

const getDiagnoses = (): Array<diagnosis> => {
  return diagnoses;
};

const diagnosisService = { getDiagnoses };

export default diagnosisService;