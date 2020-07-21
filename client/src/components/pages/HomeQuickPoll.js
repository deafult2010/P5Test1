import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Label, FormGroup, Col, Progress } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import axios from 'axios';
import { useForm } from '../../util/hooks';

export default function QuickPoll(props) {
    const [ip, setIp] = useState('');

    // On ComponentDidMount
    useEffect(() => {


        const fetchData = async () => {
            const clientDetails = await axios.get('https://www.cloudflare.com/cdn-cgi/trace').then((res) => res.data);
            const ipStart = clientDetails.search('ip') + 3
            const ipEnd = clientDetails.search('ts') - 1
            setIp(clientDetails.substr(ipStart, ipEnd - ipStart))
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    const { onChange, onSubmit, values } = useForm(QuickPollCallback, {
    });

    const data = useQuery(
        GET_POLLS,
        {
            variables: {
                ip: ip,
            },
        }
    );
    console.log(data);

    const [submitPoll, { loading }] = useMutation(SUBMIT_POLL, {
        update(proxy, result) {
            try {
                proxy.writeQuery({
                    query: GET_POLLS,
                    variables: { ip: ip },
                    data: {
                        getPolls: result.data.pollChoice,
                    },
                });
            } catch (err) {
                console.log(err);
            }
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
    });

    function QuickPollCallback() {
        values.ip = ip
        submitPoll();
    }
    const Title = (<div>
        <legend className="col-form-label" style={{ fontSize: '20px', color: '#fa923f', fontWeight: 'bold', fontFamily: 'Rockwell', }}>Quick Poll</legend>
        <hr style={{ marginTop: '0px' }} />
    </div>)

    if (data.data) {
        return (
            data.data.getPolls.C1 === 101 ?
                <div>
                    {Title}
                    <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                        <FormGroup tag="fieldset" row style={{ padding: '0px', marginTop: '0px' }}>

                            <Col style={{ padding: '0px' }}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="choice" value='1' onChange={onChange} />{' '}
                                        &nbsp; &nbsp; &nbsp; &nbsp;Create More Games
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="choice" value='2' onChange={onChange} />{' '}
                                            &nbsp; &nbsp; &nbsp; &nbsp;Further Develop Existing Games

                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="choice" value='3' onChange={onChange} />{' '}
                                        &nbsp; &nbsp; &nbsp; &nbsp;More Proof of Concepts
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="choice" value='4' onChange={onChange} />{' '}
                                        &nbsp; &nbsp; &nbsp; &nbsp;Improve UI/UX
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" name="choice" value='5' onChange={onChange} />{' '}
                                        &nbsp; &nbsp; &nbsp; &nbsp;More User Features
                                    </Label>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col >
                                <Button type='submit' className='toolbar-btn' style={{ backgroundColor: 'purple', color: 'white' }}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                :
                <div>
                    {Title}
                    <ul>
                        <li>
                            {data.data.getPolls.C1}{' '}% - Create More Games
                        <Progress value={data.data.getPolls.C1} style={{ backgroundColor: '#fcb065' }} />
                        </li>
                        <br />
                        <li>
                            {data.data.getPolls.C2}{' '}% -Further Develop Existing Games
                        <Progress value={data.data.getPolls.C2} style={{ backgroundColor: '#fcb065' }} />
                        </li>
                        <br />
                        <li>
                            {data.data.getPolls.C3}{' '}% -More Proof of Concepts
                        <Progress value={data.data.getPolls.C3} style={{ backgroundColor: '#fcb065' }} />
                        </li>
                        <br />
                        <li>
                            {data.data.getPolls.C4}{' '}% -Improve UI/UX
                        <Progress value={data.data.getPolls.C4} style={{ backgroundColor: '#fcb065' }} />
                        </li>
                        <br />
                        <li>
                            {data.data.getPolls.C5}{' '}% -More User Features
                        <Progress value={data.data.getPolls.C5} style={{ backgroundColor: '#fcb065' }} />
                        </li>
                    </ul>
                </div>
        )
    } else { return (<div></div>) }
}

const GET_POLLS = gql`
query getPolls($ip: String!){
  getPolls(ip: $ip) {
    C1
    C2
    C3
    C4
    C5
}
}
`;

const SUBMIT_POLL = gql`
  mutation pollChoice($choice: String!, $ip: String!) {
    pollChoice(choice: $choice, ip: $ip) {
        C1
        C2
        C3
        C4
        C5
    }
  }
`;