import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Input, Label, FormGroup } from 'reactstrap';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../context/auth';
import { useForm } from '../../util/hooks';

import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

export default function Login(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  let toPath

  // On ComponentDidMount
  useEffect(() => {

    // Scroll to top.
    window.scrollTo(0, 1);

  }, []);

  props.history.location.state === undefined ?
    toPath = '/'
    :
    toPath = props.history.location.state.fromPath



  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: '',
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      props.history.push(toPath);
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
        <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
          <h1>Login</h1>
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
          <Button type='submit' color='primary'>
            Login
          </Button>
          <Link to='/register'>
            <Button color='primary'>Sign Up</Button>
          </Link>
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
