import { Patient, Gender, Entry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const isEntries = (entries: Array<any>): entries is Array<Entry> => {
  const entryTypes = ['HealthCheck', 'Hospital', 'OccupationalHealthCare'];
  return !entries.some((entry) => !entryTypes.includes(entry.type));
};

const parseEntries = (entries: Array<unknown>): Array<Entry> => {
  if (!entries || !isEntries(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  return entries;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: Array<unknown>};

const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): Omit<Patient, 'id'> => {
  const newPatient: Omit<Patient, 'id'> = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntries(entries)
  };
  return newPatient;
};

export default toNewPatient;