import React, { useContext, useState } from 'react';
import { Form, Button, Input, Label, FormGroup } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';

import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

export default function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { register: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className='container'>
      <MenuBar />
      <Navbar />
      <div className='form-container'>
        <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
          <h1>Register</h1>
          <FormGroup>
            <Label for='username'>Username</Label>
            <Input
              id='username'
              placeholder='Username...'
              name='username'
              type='text'
              value={values.username}
              error={errors.username ? true : false}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='email'>Email</Label>
            <Input
              id='email'
              placeholder='Email...'
              name='email'
              type='email'
              value={values.email}
              error={errors.email ? true : false}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='password'>Password</Label>
            <Input
              id='password'
              placeholder='Password...'
              name='password'
              type='password'
              value={values.password}
              error={errors.password ? true : false}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for='password2'>Confirm Password</Label>
            <Input
              id='password2'
              placeholder='Confirm Password...'
              name='confirmPassword'
              type='password'
              value={values.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={onChange}
            />
          </FormGroup>
          <Button type='submit' color='primary'>
            Register
          </Button>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className='ui error message'>
            <ul className='list'>
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
