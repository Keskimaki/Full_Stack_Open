import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: 'malformatted parameters' });
  }

  const bmi: string = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  if (!req.body.target || !req.body.daily_exercises) {
    res.json({ error: 'parameters missing' });
  }
  const target = Number(req.body.target);
  const exercises: Array<number> = req.body.daily_exercises.map((exercise: number | string) => Number(exercise));
  
  if (isNaN(target) || exercises.some((exercise: number) => isNaN(exercise))) {
    res.json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(target, exercises);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});