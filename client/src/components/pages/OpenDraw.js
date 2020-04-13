import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
import { connect } from 'react-redux';

// import { connect } from 'react-redux';
import { deleteDraw, openPic, toggleModal } from '../../actions/drawActions';

export let drawing = [];

const OpenDraw = ({ openToggle, draw, deleteDraw, openPic, toggleModal }) => {
  let [modal, setModal] = useState();
  let toggleX;

  useEffect(() => {
    // eslint-disable-next-line
    toggleX = true;
  }, []);

  useEffect(() => {
    if (openToggle !== toggleX) {
      // eslint-disable-next-line
      toggleX = openToggle;
      setModal(true);
      toggleModal();
    }
  }, [openToggle]);

  const toggle = () => {
    setModal(!modal);
    toggleModal();
  };

  const onDeleteClick = (id) => {
    deleteDraw(id);
  };

  const onOpenPicClick = (id) => {
    openPic(id);
    toggle();
  };

  const { draws } = draw;

  return (
    <div>
      <i
        className='fas fa-folder-open fa-lg'
        color='success'
        size='sm'
        // onClick={toggle}
      />

      <Modal isOpen={modal} toggle={toggle} scrollable>
        <ModalHeader
          toggle={toggle}
          style={{ backgroundColor: 'SandyBrown ', color: 'black' }}
        >
          Open Previously Saved Drawing
        </ModalHeader>
        <ModalBody style={{ backgroundColor: 'navajowhite', color: 'black' }}>
          <ListGroup>
            {draws.map(({ _id, name }) => (
              <ListGroupItem
                style={{ backgroundColor: 'pink', color: 'white' }}
              >
                <Row>
                  <Col>
                    <Button
                      block
                      style={{ backgroundColor: 'purple', color: 'white' }}
                      onClick={() => onOpenPicClick(_id)}
                    >
                      <Row>
                        <Col xs='auto'>{name}</Col>
                        <Col xs='auto'> </Col>
                      </Row>
                    </Button>
                  </Col>
                  <Button color='danger' onClick={() => onDeleteClick(_id)}>
                    <i className='fas fa-trash-alt' />
                  </Button>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ModalBody>
      </Modal>
    </div>
  );
};

OpenDraw.propTypes = {
  openToggle: PropTypes.object.isRequired,
  draw: PropTypes.object.isRequired,
  deleteDraw: PropTypes.func.isRequired,
  openPic: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  draw: state.draw,
});

export default connect(mapStateToProps, { deleteDraw, openPic, toggleModal })(
  OpenDraw
);
