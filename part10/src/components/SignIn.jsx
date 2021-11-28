import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from 'react-router';

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
      <FormikTextInput name="username" placeholder="Username" testID="usernameField" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} testID="passwordField" />
      <Pressable style={styles.button} onPress={onSubmit} testID="submitButton">
        <Text style={{ color: '#FFF' }}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  );
};

export const SignInContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: ''
  };

  const validationSchema = yup.object().shape({
    username: yup.
      string().
      required('Username is required'),
    password: yup.
      string().
      required('Password is required')
  });

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>  
  );
};

export default SignIn;
