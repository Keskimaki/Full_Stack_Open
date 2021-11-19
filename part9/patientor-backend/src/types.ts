export interface diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export interface patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}
