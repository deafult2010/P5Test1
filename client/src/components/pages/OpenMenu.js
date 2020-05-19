import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
} from 'reactstrap';

const OpenMenu = ({ openToggle, menu }) => {
  let [modal, setModal] = useState();

  useEffect(() => {
    if (openToggle) {
      setModal(true);
    }
  }, [openToggle]);

  const toggle = () => {
    setModal(!modal);
    menu();
  };

  // const onHomeClick = () => {
  //   toggle();
  // };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} scrollable>
        <ModalHeader
          toggle={toggle}
          style={{ backgroundColor: 'SandyBrown ', color: 'black' }}
        >
          Menu
        </ModalHeader>
        <ModalBody style={{ backgroundColor: 'navajowhite', color: 'black' }}>
          <ListGroup>
            <ListGroupItem style={{ backgroundColor: 'pink', color: 'white' }}>
              <Link to='/'>
                <Button
                  block
                  style={{ backgroundColor: 'purple', color: 'white' }}
                  onClick={() => toggle()}
                >
                  <Row>
                    <Col xs='auto'>Home</Col>
                    <Col xs='auto'> </Col>
                  </Row>
                </Button>
              </Link>
            </ListGroupItem>
            <ListGroupItem style={{ backgroundColor: 'pink', color: 'white' }}>
              <Button
                block
                style={{ backgroundColor: 'purple', color: 'white' }}
                onClick={() => toggle()}
              >
                <Row>
                  <Col xs='auto'>Resume</Col>
                  <Col xs='auto'> </Col>
                </Row>
              </Button>
            </ListGroupItem>
          </ListGroup>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default OpenMenu;
