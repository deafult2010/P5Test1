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
import { getDraws, deleteDraw, updateDraw } from '../../actions/drawActions';
import PropTypes from 'prop-types';

import sketch1 from './sketch1';
import { line, tempLine } from './sketch1';

import 'bootstrap/dist/css/bootstrap.min.css';

//local vs prod
var socket;

function sendLine() {
  socket.emit('SLine', line);
}
function sendTempLine() {
  socket.emit('STempLine', tempLine);
}

const Home = ({ draw: { draws, loading }, getDraws }) => {
  let [line, setLine] = useState();
  let [tempLine, setTempLine] = useState();
  let [colorX, setColorX] = useState('255,255,255');
  let [strokeX, setStrokeX] = useState('4');
  let [joined, setJoined] = useState();

  useEffect(() => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      socket = io('http://localhost:5000');
    } else {
      socket = io();
    }
    // prevent touchscroll
    function handleTouchMove(e) {
      e.preventDefault();
    }
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      socket.disconnect();
      // enable touchscroll
      document.removeEventListener('touchmove', handleTouchMove, {
        passive: true,
      });
    };
  }, []);

  useEffect(() => {
    socket.on('RTempLine', function (tempLine) {
      setTempLine(tempLine);
    });
    socket.on('RLine', function (line) {
      setLine(line);
    });
    socket.on('joined', function () {
      setJoined(true);
    });
  }, []);

  const onOpenClick = () => {
    getDraws();
    console.log('clicked');
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

  return (
    <div>
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
            <DropdownMenu>
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
                <i className='fas fa-folder-open fa-lg' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'grey',
                  borderBottom: '1px solid black',
                }}
              >
                <i className='fas fa-save fa-lg' />
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
      />
    </div>
  );
};

Home.propTypes = {
  getDraws: PropTypes.func.isRequired,
  deleteDraw: PropTypes.func.isRequired,
  updateDraw: PropTypes.func.isRequired,
  draw: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  draw: state.draw,
});

export default connect(mapStateToProps, { getDraws, deleteDraw, updateDraw })(
  Home
);
