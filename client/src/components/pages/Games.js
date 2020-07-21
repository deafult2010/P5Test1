import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Nav,
    NavLink,
    NavItem,
    TabContent,
    TabPane,
    Card
} from 'reactstrap';
import classnames from 'classnames';

import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

import 'bootstrap/dist/css/bootstrap.min.css';

const Pic1 = require('./images/GamesPic.png');
const DrawPic = require('./images/DrawPic.PNG');
const BlobsPic = require('./images/BlobsPic.PNG');
const StickPic = require('./images/StickPic.png');

const GamesHome = (props) => {
    const [activeTab, setActiveTab] = useState('1');


    // On ComponentDidMount
    useEffect(() => {

        // Scroll to top.
        window.scrollTo(0, 1);

    }, []);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

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
                <Col md="12" style={{
                    backgroundColor: '#ffd494',
                    border: '2px solid black',
                    borderRadius: '12px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <div>
                        <Nav tabs style={{ borderBottom: '1px solid black', }}>
                            <NavItem>
                                <NavLink href="#"
                                    className={classnames({ active: activeTab === '1' })}
                                    onClick={() => { toggle('1'); }}
                                    style={{
                                        backgroundColor: 'purple',
                                        color: 'white',
                                        border: '2px solid black',
                                    }}
                                >
                                    Multiplayer
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#"
                                    style={{
                                        backgroundColor: 'purple',
                                        color: 'white',
                                        border: '2px solid black',
                                    }}
                                    className={classnames({ active: activeTab === '2' })}
                                    onClick={() => { toggle('2'); }}
                                >
                                    Single Player
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Row xs="1" sm="2" lg="3">
                                    <Col style={{ backgroundColor: '#ffd494' }}>
                                        <Link to='/Draw'>
                                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', color: 'black' }}>
                                                <h4>Draw</h4>
                                                <img src={DrawPic} alt="Draw Pic"></img>
                                                <p>Draw with friends in real time and save your doodles</p>
                                            </Card>
                                        </Link>
                                    </Col>
                                    <Col style={{ backgroundColor: '#ffd494' }}>
                                        <Link to='/Blobs'>
                                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', color: 'black' }}>
                                                <h4>Blobs</h4>
                                                <img src={BlobsPic} alt="Blobs Pic" ></img>
                                                <p>Eat all the other blobs to win!!!</p>
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
                                    <Col style={{ backgroundColor: '#ffd494' }}>
                                        <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', }}>
                                            <h4>Placeholder</h4>
                                            <p>placeholder</p>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row xs="1" sm="2" lg="3">
                                    <Col style={{ backgroundColor: '#ffd494' }}>
                                        <Link to='/Game1'>
                                            <Card style={{ backgroundColor: '#ffc062', border: '2px solid black', borderRadius: '6px', color: 'black' }}>
                                                <h4>Stickmen</h4>
                                                <img src={StickPic} alt="Stickmen Pic" ></img>
                                                <p>Choose a gun and shoot the Stickmen</p>
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
                            </TabPane>
                        </TabContent>
                    </div>
                </Col>
            </Row >
        </div >
    );
}



export default GamesHome;