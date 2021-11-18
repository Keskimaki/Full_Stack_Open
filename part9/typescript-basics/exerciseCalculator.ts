interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercises: Array<number>, target: number): Result => {
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
    trainingDays: exercises.filter(hours => hours !== 0).length,
    success: average >= target, 
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));