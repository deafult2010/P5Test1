import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Popover, PopoverHeader, PopoverBody, Card, Row, Col
} from 'reactstrap'

import { AuthContext } from '../../context/auth';


const StickBGPic = require('./images/StickBGImage.PNG');

const GameLogin = (props) => {
  const [loginPopoverOpen, setLoginPopoverOpen] = useState();
  const [guestPopoverOpen, setGuestPopoverOpen] = useState();

  const { user, logout } = useContext(AuthContext);

  const onLoginHover = () => {
    setLoginPopoverOpen(true);
  }
  const onLoginHoverLeave = () => {
    setLoginPopoverOpen(false);
  }

  const onGuestHover = () => {
    setGuestPopoverOpen(true);
  }
  const onGuestHoverLeave = () => {
    setGuestPopoverOpen(false);
  }

  let userLogin
  const location = {
    pathname: '/login',
    state: { fromPath: window.location.pathname }
  }

  if (user) {
    userLogin = (<Row xs='1' style={{ margin: '0px', color: 'black' }}>
      <Col style={{ padding: '0px' }}>
        Login and play
      </Col>
      <Col style={{ padding: '4px' }}>
        <img style={{ width: '120px', height: '120px' }}
          src='https://react.semantic-ui.com/images/avatar/large/molly.png' alt="userPic"
        />
      </Col>
      <Col style={{ padding: '0px' }}>
        {user.username}
      </Col>
    </Row>
    )
  }

  let nullLogin = (
    <Link to={location}>
      <Row xs='1' style={{ margin: '0px', color: 'black' }}>
        <Col style={{ padding: '0px' }}>
          Login and play
      </Col>
        <Col style={{ padding: '4px' }}>
          <img style={{ width: '120px', height: '120px' }}
            src='https://react.semantic-ui.com/images/avatar/large/molly.png' alt="userPic"
          />
        </Col>
        <Col style={{ padding: '0px' }}>
          Click to login
      </Col>
      </Row>
    </Link>
  )

  return (
    <div>
      <Card style={{ zIndex: '0', backgroundColor: 'rgb(255, 212, 148)', border: '2px solid black', borderRadius: '6px', width: '330px', marginLeft: 'auto', marginRight: 'auto', position: 'relative' }}>
        <Row xs='2'>
          <Col>
            <Button id="Popover2" type="button" onMouseEnter={onLoginHover} onMouseLeave={onLoginHoverLeave} style={{ backgroundColor: '#ffc062', border: '1px solid #0E6EB8', padding: '0px', width: 'auto', color: 'black' }} onClick={() => { props.onGameLogin() }}>
              {user ? userLogin : nullLogin}
            </Button>
          </Col>
          <Col>
            <Button id="Popover1" type="button" onMouseEnter={onGuestHover} onMouseLeave={onGuestHoverLeave} style={{ backgroundColor: '#ffc062', border: '1px solid #0E6EB8', padding: '0px', width: 'auto', color: 'black' }} onClick={() => { props.onGameLogin() }}>
              <Row xs='1' style={{ margin: '0px' }}>
                <Col style={{ padding: '0px' }}>
                  Play as Guest
                </Col>
                <Col style={{ padding: '4px' }}>
                  <img style={{ width: '120px', height: '120px' }}
                    src='https://react.semantic-ui.com/images/avatar/large/elliot.jpg' alt="guestPic"
                  />
                </Col>
                <Col style={{ padding: '0px' }}>
                  Guest
                </Col>
              </Row>
            </Button>
          </Col>
        </Row>
        {user && (<hr />)}
        {user && (
          <Row style={{ marginLeft: 'auto' }}>
            <Col>
              Play using a different account &nbsp;&nbsp;
                <Link to={location}>
                <Button style={{ backgroundColor: '#ffc062', color: '#0E6EB8', border: '1px solid #0E6EB8', padding: '5px' }} onClick={() => { logout(); }}>
                  <i className='fa fa-sign-out fa-lg' />
                </Button>
              </Link>
            </Col>
          </Row>
        )}
      </Card>

      <Popover
        placement="bottom"
        isOpen={loginPopoverOpen}
        target="Popover2"
      >
        <PopoverHeader style={{ backgroundColor: 'blue', border: '1px solid black' }}>Info</PopoverHeader>
        <PopoverBody style={{ backgroundColor: '#6666FF', border: '1px solid black' }}>
          Continue on your adventure.

          </PopoverBody>
      </Popover>

      <Popover
        placement="bottom"
        isOpen={guestPopoverOpen}
        target="Popover1"
      >
        <PopoverHeader style={{ backgroundColor: 'red', border: '1px solid black' }}>Warning!</PopoverHeader>
        <PopoverBody style={{ backgroundColor: '#ff6666', border: '1px solid black' }}>
          Any progress made as a guest will be lost.

          </PopoverBody>
      </Popover>
      <div style={{
        zIndex: '-2', position: 'absolute', top: '90px',
        left: 2 + Math.max((
          props.windowSize.width - 680) / 2,
          0
        ),
        width: '660px', marginLeft: 'auto', marginRight: 'auto'
      }}>
        <img src={StickBGPic} alt="Stickmen BG Pic"></img>
      </div>

    </div >
  )
}








// const GameLogin = (props) => {

//   return (
//     <Card fluid
//       //  style={{ backgroundColor: '#ffc062' }}
//       style={{ backgroundColor: '#ffd494', border: '2px solid black', borderRadius: '6px', color: 'black' }}
//     >
//       <Card.Content>
//         <Row></Row>
//         <Popup
//           content={
//             <>
//               <div>{`Logged in as ${props.user.username}`}</div>
//             </>
//           }
//           header={props.user.username}
//           inverted
//           trigger={
//             <Image
//               floated='right'
//               size='mini'
//               src='https://react.semantic-ui.com/images/avatar/large/molly.png'
//             />
//           }
//         />
//         <Card.Header>{props.user.username}</Card.Header>
//       </Card.Content>
//     </Card>
//   );
// };

export default GameLogin;
