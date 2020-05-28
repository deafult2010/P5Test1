import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { MenuContext } from '../../context/menu';
import { useForm } from '../../util/hooks';

import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

export default function Login(props) {
  const context = useContext(AuthContext);
  const { setActiveItem } = useContext(MenuContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className='container'>
      <MenuBar />
      <Navbar />
      <div className='form-container'>
        <Form
          onSubmit={onSubmit}
          noValidate
          className={loading ? 'loading' : ''}
        >
          <h1>Login</h1>
          <Form.Input
            label='Username'
            placeholder='Username...'
            name='username'
            type='text'
            value={values.username}
            error={errors.username ? true : false}
            onChange={onChange}
          />
          <Form.Input
            label='Password'
            placeholder='Password...'
            name='password'
            type='password'
            value={values.password}
            error={errors.password ? true : false}
            onChange={onChange}
          />
          <Button type='submit' primary>
            Login
          </Button>
          <Button
            as={Link}
            to='/register'
            primary
            onClick={(e) => setActiveItem('register')}
          >
            Sign Up
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
