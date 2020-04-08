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
import { data } from './sketch1';

import 'bootstrap/dist/css/bootstrap.min.css';

//local vs prod
var socket;

function getCoords() {
  socket.emit('mouse', data);
}

const Home = ({ draw: { draws, loading }, getDraws }) => {
  let [dataX, setDataX] = useState();
  let [dataY, setDataY] = useState();
  let [dataC, setDataC] = useState();
  let [dataS, setDataS] = useState();
  let [colorX, setColorX] = useState('255,255,255');
  let [strokeX, setStrokeX] = useState('4');

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
    socket.on('mouse', function (data) {
      setDataX(data.x);
      setDataY(data.y);
      setDataC(data.c);
      setDataS(data.s);
    });
  });

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
              <i class='fas fa-paint-brush fa-lg'></i>
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
                <i class='fas fa-circle fa-sm' />
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
                <i class='fas fa-circle fa-lg' />
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
                <i class='fas fa-circle fa-2x' />
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
                <i class='fas fa-circle fa-3x' />
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
                <i class='fas fa-circle fa-5x' />
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
              <i class='fas fa-palette fa-lg' />
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
                <i class='fas fa-square' />
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
                <i class='fas fa-square' />
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
                <i class='fas fa-square' />
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
                <i class='fas fa-square' />
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
                <i class='fas fa-square' />
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
                <i class='fas fa-square' />
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
                <i class='fas fa-square' />
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
                <i class='fas fa-square' />
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
              <i class='fas fa-cog fa-lg'></i>
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
              >
                <i class='fas fa-file fa-lg' />
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
                <i class='fas fa-folder-open fa-lg' />
              </DropdownItem>
              <DropdownItem
                className='btn'
                style={{
                  backgroundColor: 'pink',
                  color: 'grey',
                  borderBottom: '1px solid black',
                }}
              >
                <i class='fas fa-save fa-lg' />
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
        getCoords={getCoords}
        dataX={dataX}
        dataY={dataY}
        dataC={dataC}
        dataS={dataS}
        colorX={colorX}
        strokeX={strokeX}
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
