import React, { useContext } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './MenuBar.css';

import { AuthContext } from '../../../context/auth';

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  const menuBar = user ? (
    <Row>
      <Col
        xs='auto'
        style={{
          margin: '0px',
          marginLeft: '20px',
          marginTop: '3px',
          float: 'right',
          color: '#FFFFFF',
          fontSize: '16px',
          padding: '0px',
        }}
      >
        {user.username.length > 8
          ? user.username.substring(0, 8).concat('...')
          : user.username}
      </Col>
      <Col
        className='text-right text-md-right'
        style={{
          float: 'right',
          color: '#FFFFFF',
          padding: '0px',
          marginRight: '15px',
        }}
      >
        <>5 Online</>{' '}
        <Link to='/'>
          <Button
            style={{
              margin: '3px',
              backgroundColor: 'purple',
              color: '#FFFFFF',
              border: '2px solid black',
              padding: '10px',
              paddingTop: '0px',
              paddingBottom: '0px',
            }}
          >
            Profile
          </Button>
        </Link>
        <Button
          style={{
            margin: '3px',
            backgroundColor: 'purple',
            color: '#FFFFFF',
            border: '2px solid black',
            padding: '10px',
            paddingTop: '0px',
            paddingBottom: '0px',
          }}
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      </Col>
    </Row>
  ) : (
    <div style={{ float: 'right', color: '#FFFFFF' }}>
      <>5 Online</>{' '}
      <Link to='/'>
        <Button
          style={{
            margin: '3px',
            backgroundColor: 'purple',
            color: '#FFFFFF',
            border: '2px solid black',
            padding: '10px',
            paddingTop: '0px',
            paddingBottom: '0px',
          }}
        >
          Support
        </Button>
      </Link>
      <Link to='/login'>
        <Button
          style={{
            margin: '3px',
            backgroundColor: 'purple',
            color: '#FFFFFF',
            border: '2px solid black',
            padding: '10px',
            paddingTop: '0px',
            paddingBottom: '0px',
          }}
        >
          Sign in / Join
        </Button>
      </Link>
    </div>
  );

  return <header className='menubar'>{menuBar}</header>;
}
