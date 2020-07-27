import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Card
} from 'reactstrap';

import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

import 'bootstrap/dist/css/bootstrap.min.css';

const Pic1 = require('./images/GamesPic.png');
const GoLPic = require('./images/GoLPic.PNG');
const COVIDPic = require('./images/COVIDPic.PNG');
const COVIDTabPic = require('./images/COVIDTabPic.PNG');

const PoCs = (props) => {

    // On ComponentDidMount
    useEffect(() => {

        // Scroll to top.
        window.scrollTo(0, 1);

    }, []);

    return (
        <div className='container' >
            <MenuBar />
            <Navbar />
            <Row xs="1" md='1' lg='1' style={{
                margin: '10px',
            }}>
                <img src={Pic1} alt='Featured pic' />
            </Row>
            <br />
            <Row xs="1" style={{ margin: '10px' }}>
                <Col className='HomeCard' md="12" style={{
                    backgroundColor: '#ffd494',
                    border: '2px solid black',
                    borderRadius: '12px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <div>
                        <legend className="col-form-label" style={{ fontSize: '24px', color: '#fa923f', fontWeight: 'bold', fontFamily: 'Rockwell', }}>Proof of Concepts</legend>
                        <hr style={{ margin: '0px', padding: '0px', backgroundColor: 'black', }} />
                    </div>
                    <Row xs="1" sm="2" lg="3">
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Link to='/gol'>
                                <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', color: 'black' }}>
                                    <h4>Game of Life</h4>
                                    <img src={GoLPic} alt="GoL Pic"></img>
                                    <p>Watch the cellular automaton evolve over time based on a random initial state</p>
                                </Card>
                            </Link>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Link to='/covid'>
                                <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', color: 'black' }}>
                                    <h4>COVID Curve</h4>
                                    <img src={COVIDPic} alt="COVID Pic" ></img>
                                    <p>Observe the impact that changing the transmission and or recovery rate has on the population and on flattening the infected curve</p>
                                </Card>
                            </Link>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Link to='/covidtableau'>
                                <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', color: 'black' }}>
                                    <h4>COVID Tableau</h4>
                                    <img src={COVIDTabPic} alt="COVIDTab Pic" ></img>
                                    <p>This coronavirus tracker visualises Johns Hopkins University data to help you stay on top of key COVID-19 metrics</p>
                                </Card>
                            </Link>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', }}>
                                <h4>Placeholder</h4>
                                <p>placeholder</p>
                            </Card>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', }}>
                                <h4>Placeholder</h4>
                                <p>placeholder</p>
                            </Card>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', }}>
                                <h4>Placeholder</h4>
                                <p>placeholder</p>
                            </Card>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', }}>
                                <h4>Placeholder</h4>
                                <p>placeholder</p>
                            </Card>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', }}>
                                <h4>Placeholder</h4>
                                <p>placeholder</p>
                            </Card>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', }}>
                                <h4>Placeholder</h4>
                                <p>placeholder</p>
                            </Card>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', }}>
                                <h4>Placeholder</h4>
                                <p>placeholder</p>
                            </Card>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', }}>
                                <h4>Placeholder</h4>
                                <p>placeholder</p>
                            </Card>
                        </Col>
                        <Col style={{ backgroundColor: '#ffd494' }}>
                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', }}>
                                <h4>Placeholder</h4>
                                <p>placeholder</p>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </div >
    );
}



export default PoCs;