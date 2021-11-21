/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): Omit<Patient, 'id'> => {
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

const checkEntry = (entry: any): entry is Entry => {
  switch (entry.type) {
    case 'Hospital':
      if (!entry.discharge) {
        throw new Error('Missing field: discharge');
      }
      break;
    case 'OccupationalHealth':
      if (!entry.employerName) {
        throw new Error('Missing field: employer name');
      }
      break;
    case 'HealthCheck':
      if (!entry.healthCheckRating) {
        throw new Error('Missing field: healthcheck rating');
      }
      break;
    default:
      throw new Error('Incorrect field: type');
  }
  return true;
};

export const toNewEntry = (entry: any): Entry => {
  if (!entry.type || !entry.description || !entry.date || !entry.specialist) {
    throw new Error('Missing fields');
  }
  if (!checkEntry(entry)) {
    throw new Error('Incorrect entry');
  }
  return entry;
};
