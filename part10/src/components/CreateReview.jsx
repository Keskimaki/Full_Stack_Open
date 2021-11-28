import React, { useState } from "react";
import Text from "./Text";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import theme from "../theme";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../qraphql/mutations";
import { useHistory } from "react-router";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    borderRadius: 3,
    height: 50,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0366d6',
    marginTop: 10
  },
  review: {
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
    minHeight: 50,
    width: 300,
    maxWidth: 300,
    borderStyle: 'solid',
    borderColor: theme.colors.textSecondary,
    borderWidth: 1
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput style={styles.review} name="text" placeholder="Review" multiline={true} />
      <Pressable style={styles.button} onPress={onSubmit} testID="submitButton">
        <Text style={{ color: '#FFF'}}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [incorrect, setIncorrect] = useState(false);
  const [mutate] = useMutation(CREATE_REVIEW);
  const history = useHistory();

  const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
  };

  const validationSchema = yup.object().shape({
    ownerName: yup.
      string().
      required('Repository owner name is required'),
    repositoryName: yup.
      string().
      required('Repository name is required'),
    rating: yup.
      number('Rating has to be a number').
      min(0, 'Rating has to be between 0 and 100').
      max(100, 'Rating has to be between 0 and 100').
      required('Rating is required'),
    text: yup.
      string()
  });

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const result = await mutate({ variables: { review: { ownerName, repositoryName, rating: Number(rating), text }}})
      .catch(() => {setIncorrect(true); setTimeout(() => setIncorrect(false), 5000);});
    history.push(`/${result.data.createReview.repositoryId}`);
  };
  return (
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik> 
      {incorrect && <Text style={styles.error}>Incorrect owner or repository name</Text>}
    </View>
  );
};

export default CreateReview;