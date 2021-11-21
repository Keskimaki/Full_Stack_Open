import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.getPatientbyId(req.params.id);
  if (!patient) {
    res.status(404).send('Patient not found.');
  }
  res.json(patient);
});

patientRouter.post('/', (req, res) => {
  try {
    if (!Array.isArray(req.body.entries)) {
      req.body.entries = [];
    }
    const newPatient = toNewPatient(req.body);
    const addedNewPatient = patientService.addPatient(newPatient);
    res.json(addedNewPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

patientRouter.post('/:id/entries', (req, res) => {
  const entry = toNewEntry(req.body);
  const addedEntry = patientService.addEntry(entry, req.params.id);
  res.json(addedEntry);
});

export default patientRouter;