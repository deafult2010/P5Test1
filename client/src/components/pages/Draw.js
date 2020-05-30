import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import P5Wrapper from 'react-p5-wrapper';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  addDraw,
  getDraws,
  deleteDraw,
  updateDraw,
} from '../../actions/drawActions';
import OpenDraw from './OpenDraw';
import SaveDraw from './SaveDraw';
import sketch1 from './sketch1';
import { line, tempLine } from './sketch1';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

import 'bootstrap/dist/css/bootstrap.min.css';

//local vs prod
var socket;

function sendLine() {
  socket.emit('SLine', line);
}
function sendTempLine() {
  socket.emit('STempLine', tempLine);
}

const Draw = ({
  draw: { draws, loading, pics, getPics, drawModalOpen },
  getDraws,
}) => {
  let [line, setLine] = useState();
  let [tempLine, setTempLine] = useState();
  let [colorX, setColorX] = useState('255,255,255');
  let [strokeX, setStrokeX] = useState('4');
  let [joined, setJoined] = useState(0);
  let [openToggle, setOpenToggle] = useState(true);
  let [saveToggle, setSaveToggle] = useState(true);
  const [didMount, setDidMount] = useState(false);

  useEffect(() => setDidMount(true), []);

  // On ComponentDidMount
  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      socket = io('http://localhost:5000');
    } else {
      socket = io();
    }

    // Scroll to top.
    window.scrollTo(0, 1);

    // Socket Listeners
    socket.on('RTempLine', function (tempLine) {
      setTempLine(tempLine);
    });
    socket.on('RLine', function (line) {
      setLine(line);
    });
    socket.on('joined', function () {
      setJoined(joined + 1);
    });
    socket.on('ROpenPic', function (line) {
      setLine(line);
    });
    socket.on('RGetPics', function () {
      getDraws();
    });

    // GetDrawings
    getDraws();

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // prevent touchscroll
    function handleTouchMove(e) {
      e.preventDefault();
    }
    if (!drawModalOpen) {
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
    }
    if (drawModalOpen) {
      document.removeEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    }
    return () => {
      // enable touchscroll
      document.removeEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    };
    // eslint-disable-next-line
  }, [drawModalOpen]);

  const onOpenClick = () => {
    setOpenToggle(!openToggle);
  };

  const onSaveClick = () => {
    setSaveToggle(!saveToggle);
  };

  const onColorClick = (x) => {
    setColorX(x);
  };

  const onStrokeClick = (x) => {
    setStrokeX(x);
  };

  const onNewDrawClick = (x) => {
    // let SNameId = randomString(15)
    socket.emit('SNameId');
  };

  useEffect(() => {
    if (loading) {
      console.log('loading...');
      return;
    }
    if (!loading) {
      console.log({ draws });
    }
  }, [draws, loading]);

  useEffect(() => {
    if (didMount) {
      socket.emit('SGetPics');
    }
    // eslint-disable-next-line
  }, [getPics]);

  useEffect(() => {
    if (didMount) {
      socket.emit('SOpenPic', pics);
    }
    // eslint-disable-next-line
  }, [pics]);

  return (
    <div className='container'>
      <MenuBar />
      <Navbar />
      <Row style={{ height: '50px' }}>
        <Col className='drawboard' xs='auto'>
          <strong style={{ fontSize: '30px' }}>Draw</strong>{' '}
        </Col>
        <Col style={{ size: 'auto' }}>
          <UncontrolledDropdown>
            <DropdownToggle
              className='brush-btn'
              style={{
                backgroundColor: 'purple',
                color: 'black',
              }}
              size='sm'
              // onClick={this.onDeleteClick.bind(this, _id)}
            >
              <i className='fas fa-paint-brush fa-lg'></i>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'black',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onStrokeClick('2')}
              >
                <i className='fas fa-circle fa-sm' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'black',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onStrokeClick('4')}
              >
                <i className='fas fa-circle fa-lg' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'black',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onStrokeClick('7')}
              >
                <i className='fas fa-circle fa-2x' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'black',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onStrokeClick('12')}
              >
                <i className='fas fa-circle fa-3x' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'black',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onStrokeClick('20')}
              >
                <i className='fas fa-circle fa-5x' />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown>
            <DropdownToggle
              className='pal-btn'
              style={{
                backgroundColor: 'purple',
                color: 'peru',
              }}
              size='sm'
              // onClick={this.onDeleteClick.bind(this, _id)}
            >
              <i className='fas fa-palette fa-lg' />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'white',
                  borderTop: '1px solid black',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onColorClick('255,255,255')}
              >
                <i className='fas fa-square' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'red',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onColorClick('255,0,0')}
              >
                <i className='fas fa-square' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'blue',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onColorClick('0,0,255')}
              >
                <i className='fas fa-square' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'lime',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onColorClick('0,255,0')}
              >
                <i className='fas fa-square' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'yellow',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onColorClick('255,255,0')}
              >
                <i className='fas fa-square' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'cyan',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onColorClick('0,255,255')}
              >
                <i className='fas fa-square' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'deeppink',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onColorClick('255,0,255')}
              >
                <i className='fas fa-square' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'black',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onColorClick('0,0,0')}
              >
                <i className='fas fa-square' />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown>
            <DropdownToggle
              className='cog-btn'
              style={{
                backgroundColor: 'purple',
                color: 'grey',
              }}
              size='sm'
            >
              <i className='fas fa-cog fa-lg'></i>
            </DropdownToggle>
            <DropdownMenu persist>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'white',
                  borderTop: '1px solid black',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onNewDrawClick()}
              >
                <i className='fas fa-file fa-lg' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'khaki',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onOpenClick()}
              >
                <OpenDraw openToggle={openToggle} />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'grey',
                  borderBottom: '1px solid black',
                }}
                onClick={() => onSaveClick()}
              >
                <SaveDraw saveToggle={saveToggle} line={line} />
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/* <EditModal name={name} id={_id} />
        <Button
          className='remove-btn'
          color='danger'
          size='sm'
          onClick={this.onDeleteClick.bind(this, _id)}
        >
          &times;
        </Button> */}
        </Col>
      </Row>
      <P5Wrapper
        sketch={sketch1}
        sendLine={sendLine}
        sendTempLine={sendTempLine}
        line={line}
        tempLine={tempLine}
        colorX={colorX}
        strokeX={strokeX}
        joined={joined}
        // draw={draw}
      />
    </div>
  );
};

Draw.propTypes = {
  addDraw: PropTypes.func.isRequired,
  getDraws: PropTypes.func.isRequired,
  deleteDraw: PropTypes.func.isRequired,
  updateDraw: PropTypes.func.isRequired,
  draw: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  draw: state.draw,
  name: state.name,
});

export default connect(mapStateToProps, {
  addDraw,
  getDraws,
  deleteDraw,
  updateDraw,
})(Draw);
