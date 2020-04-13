import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';

// import { connect } from 'react-redux';
import { addDraw } from '../../actions/drawActions';

const SaveDraw = ({ saveToggle, draw, addDraw, line }) => {
  let [modal, setModal] = useState();
  let [name, setName] = useState();
  let [desc, setDesc] = useState();
  let [user, setUser] = useState();
  let toggleX;

  useEffect(() => {
    // eslint-disable-next-line
    toggleX = true;
  }, []);

  useEffect(() => {
    if (saveToggle !== toggleX) {
      // eslint-disable-next-line
      toggleX = saveToggle;
      setModal(true);
    }
  }, [saveToggle]);

  const toggle = () => {
    setModal(!modal);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const saveDraw = line;
    saveDraw.name = name;
    saveDraw.desc = desc;
    saveDraw.user = user;

    // Add drawng via addDraw action
    addDraw(saveDraw);

    // Close modal
    toggle();
  };

  // prevent touchscroll
  function handleTouchMove(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (modal) {
      document.removeEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    }
    if (!modal) {
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
    }
  }, [modal]);

  return (
    <div>
      <i
        className='fas fa-save fa-lg'
        color='success'
        size='sm'
        // onClick={toggle}
      />

      <Modal isOpen={modal} toggle={toggle} scrollable>
        <ModalHeader
          toggle={toggle}
          style={{ backgroundColor: 'SandyBrown ', color: 'black' }}
        >
          Save Drawing
        </ModalHeader>
        <ModalBody style={{ backgroundColor: 'navajowhite', color: 'black' }}>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for='name'>Drawing Name</Label>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Name'
                onChange={(e) => setName(e.target.value)}
              />
              <Label for='desc'>Description</Label>
              <Input
                type='text'
                name='name'
                id='desc'
                placeholder='Enter Description'
                onChange={(e) => setDesc(e.target.value)}
              />
              <Label for='user'>Username</Label>
              <Input
                type='text'
                name='name'
                id='user'
                placeholder='Enter User'
                onChange={(e) => setUser(e.target.value)}
              />
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

SaveDraw.propTypes = {
  saveToggle: PropTypes.object.isRequired,
  draw: PropTypes.object.isRequired,
  line: PropTypes.object.isRequired,
  addDraw: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  draw: state.draw,
});

// export default connect(mapStateToProps, { deleteDraw, openPic })(OpenDraw);
export default connect(mapStateToProps, { addDraw })(SaveDraw);
