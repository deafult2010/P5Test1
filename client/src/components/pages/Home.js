import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import classnames from 'classnames';

import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';
import QuickPoll from './HomeQuickPoll';



import 'bootstrap/dist/css/bootstrap.min.css';


const GameOfWeekImg = require('./images/BlobsPic.PNG');
const Pic1 = require('./images/Pic1.png');
const Pic2 = require('./images/Pic2.png');
const Pic3 = require('./images/Pic3.png');


// Carousel Items
const items = [
    {
        src: Pic1,
    },
    {
        src: Pic2,
    },
    {
        src: Pic3,
    }
];

const Home = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    // On ComponentDidMount
    useEffect(() => {

        // Scroll to top.
        window.scrollTo(0, 1);

    }, []);



    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.src}
            >
                <img src={item.src} alt='Carousel pic' />
            </CarouselItem>
        );
    });

    return (
        <div className='container' >
            <MenuBar />
            <Navbar />
            <Row xs="1" md='1' lg='1' style={{
                margin: '10px',
            }}>
                <Carousel
                    activeIndex={activeIndex}
                    next={next}
                    previous={previous}
                >
                    <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                    {slides}
                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
            </Row>
            <br />
            <Row xs="1" style={{
                margin: '10px',
            }}>
                <Col className='HomeCard' md="12" lg='7' style={{
                    backgroundColor: '#ffd494',
                    border: '2px solid black',
                    borderRadius: '12px', padding: '12px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <Row xs="2" style={{
                        margin: '0px',
                    }}>
                        <Col xs='4' style={{ padding: '0px', fontSize: '20px', color: '#fa923f', fontWeight: 'bold', fontFamily: 'Rockwell', }}>
                            <strong>Featured Game of the Week:</strong>
                        </Col >
                        <Col xs='8' style={{ padding: '0px' }}>
                            <Link to='/Blobs' style={{ backgroundColor: 'purple', color: 'white', float: 'right', height: '200px' }}>
                                <Row>

                                    <Col xs='6'>
                                        <img src={GameOfWeekImg} alt="Pic of week" style={{ margin: '10px' }}></img>
                                    </Col>
                                    <Col xs='6'>
                                        <div >
                                            <h1>
                                                Blobs</h1>
                                            <p>
                                                Eat all the other blobs to win!!!
                                                </p>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                        </Col >
                    </Row>
                </Col >
                <br />
                <Col md='12' lg='5'>
                    <Row xs="1">
                        <Col md='0' lg='1'></Col>
                        <br />
                        <Col className='HomeCard' md='12' lg='11' style={{
                            backgroundColor: '#ffd494',
                            border: '2px solid black',
                            borderRadius: '12px', padding: '12px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            <QuickPoll />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <br />
            <Row xs="1" style={{ margin: '10px' }}>
                <Col className='HomeCard' md="12" lg='7' style={{
                    backgroundColor: '#ffd494',
                    border: '2px solid black',
                    borderRadius: '12px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <div>
                        <Nav tabs>
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
                                    News
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
                                    Media
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col md="12" style={{ backgroundColor: '#ffd494' }}>
                                        <h4>Tab 1 Contents</h4>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col md="12" style={{ backgroundColor: '#ffd494' }}>
                                        <h4>Tab 2 Contents</h4>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div></Col>
                <br />
                <Col md='12' lg='5'>
                    <Row xs='1'>
                        <Col md='0' lg='1'></Col>
                        <br />
                        <Col md='12' lg='11'>
                            <Row xs="1">
                                <Col className='HomeCard' style={{
                                    backgroundColor: '#ffd494',
                                    border: '2px solid black',
                                    borderRadius: '12px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto'
                                }}>
                                    <p style={{ fontSize: '30px', color: '#00b3b3', fontWeight: 'bold', fontFamily: 'Rockwell', marginBottom: '0px' }}>
                                        32
                            </p>
                                    <p style={{ fontSize: '18px', color: '#fa923f', fontWeight: 'bold', fontFamily: 'Rockwell' }}>
                                        Chat Games Accounts Created
                            </p>
                                </Col>
                                <Col style={{
                                    margin: '5px'
                                }}></Col>
                                <Col className='HomeCard' style={{
                                    backgroundColor: '#ffd494',
                                    border: '2px solid black',
                                    borderRadius: '12px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto'
                                }}>
                                    <p style={{ fontSize: '24px', color: '#fa923f', fontWeight: 'bold', fontFamily: 'Rockwell', marginBottom: '0px' }}>Follow Us</p>
                                    <a href='https://www.reddit.com/'>
                                        <i className='fa fa-reddit-square' style={{ fontSize: '30px', color: '#99ccff' }} />&nbsp;&nbsp;&nbsp;
                                    </a>
                                    <a href='https://www.facebook.com/'>
                                        <i className='fa fa-facebook-official' style={{ fontSize: '30px', color: '	#4267B2' }} />&nbsp;&nbsp;&nbsp;
                                    </a>
                                    <a href='https://twitter.com/'>
                                        <i className='fa fa-twitter-square' style={{ fontSize: '30px', color: '	#1DA1F2' }} />&nbsp;&nbsp;&nbsp;
                                    </a>
                                    <a href='https://www.youtube.com/'>
                                        <i className='fa fa-youtube-square' style={{ fontSize: '30px', color: '	#FF0000' }} />
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </div >
    );
}



export default Home;