interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (target: number, exercises: Array<number>): Result => {
  const periodLength = exercises.length;
  const average = exercises.reduce((a, b) => a + b) / periodLength;
  const difference = target - average;
  let rating;
  let ratingDescription;
  if (difference > 1) {
    rating = 1;
    ratingDescription = 'you could do better';
  } else if (difference > 0) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 3;
    ratingDescription = 'well done';
  }
  return {
    periodLength,
    trainingDays: exercises.filter(exercise => exercise !== 0).length,
    success: average >= target, 
    rating,
    ratingDescription,
    target,
    average
  };
};

const target = Number(process.argv[2]);
let exercises: Array<number> = [];
for (let i = 3; i < process.argv.length; i++) {
  exercises = exercises.concat(Number(process.argv[i]));
}

if (process.argv.length < 4) {
  throw new Error('Incorrect amount of arguments!');
}

if (isNaN(target) || exercises.some(exercise => isNaN(exercise))) {
  throw new Error('Provided values were not numbers!');
}

console.log(calculateExercises(target, exercises));