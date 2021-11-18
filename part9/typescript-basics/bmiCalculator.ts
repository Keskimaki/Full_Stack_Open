const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ( height / 100 ) ** 2;

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi < 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 34.9) {
    return 'Obese (Class I)';
  } else if (bmi < 39.9) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
}

if (require.main === module) {
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);

  if (process.argv.length !== 4) {
    throw new Error('Incorrect amount of arguments!');
  }

  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  console.log(calculateBmi(height, weight));
}

export default calculateBmi;