import React from "react";
import Text from "./Text";
import { View, Pressable, StyleSheet } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../qraphql/mutations";
import useSignIn from "../hooks/useSignIn";
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
  }
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <FormikTextInput name="confirmPassword" placeholder="Password confirmation" secureTextEntry={true} />
      <Pressable style={styles.button} onPress={onSubmit} testID="submitButton">
        <Text style={{ color: '#FFF'}}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const CreateUser = () => {
  const [mutate] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const history = useHistory();

  const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = yup.object().shape({
    username: yup.
      string().
      min(1, 'Username must be between 0 - 30 characters').
      max(30, 'Username must be between 0 - 30 characters').
      required('Username is required'),
    password: yup.
      string().
      min(5, 'Password must be between 5 - 50 characters').
      max(50, 'Password must be between 5 - 50 characters').
      required('Password is required'),
    confirmPassword: yup.
      string().
      oneOf([yup.ref('password')], 'Confirm password').
      required('Password confirmation is required')
  });

  const onSubmit = async (values) => {
    const { username, password } = values;
    console.log(username, password);
    await mutate({ variables: {user: { username, password } } });
    await signIn({ username, password });
    history.push('/');
  };

  return (
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik> 
    </View>
  );
};

export default CreateUser;