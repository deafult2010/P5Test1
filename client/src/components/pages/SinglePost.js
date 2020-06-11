import React, { useContext, useState, useRef, useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import {
  SUB_NEW_COMMENT,
  SUB_DEL_COMMENT,
  SUB_POST_LIKE,
} from '../../util/graphql';
// import { FETCH_POST_QUERY } from '../util/graphql';
import { Col, Row } from 'reactstrap';
import {
  Card,
  Form,
  Image,
  Button,
  Icon,
  Label,
  Popup,
} from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../../context/auth';
import LikeButton from './blog/LikeButton';
import DeleteButton from './blog/DeleteButton';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

export default function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  const { data: { getPost } = {}, subscribeToMore } = useQuery(
    FETCH_POST_QUERY,
    {
      variables: {
        postId,
      },
    }
  );

  useEffect(() => {
    // Update prev getPosts array by adding the subscriptionData to front of array
    // Store updated automatically in all cases -  no need for an updateQuery
    subscribeToMore({
      document: SUB_NEW_COMMENT,
    });

    subscribeToMore({
      document: SUB_DEL_COMMENT,
    });

    subscribeToMore({
      document: SUB_POST_LIKE,
    });
    // eslint-disable-next-line
  }, []);

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <div className='container'>
        <MenuBar />
        <Navbar />
        <Row>
          <Col xs='auto'>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              size='small'
              float='right'
            />
          </Col>
          <Col>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }} />
                <Popup
                  content='Comment on Post'
                  inverted
                  trigger={
                    user ? (
                      <Button
                        as='div'
                        labelPosition='right'
                        onClick={() => commentInputRef.current.focus()}
                      >
                        <Button basic color='blue'>
                          <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                          {commentCount}
                        </Label>
                      </Button>
                    ) : (
                      <Button as={Link} to='/login' labelPosition='right'>
                        <Button basic color='blue'>
                          <Icon name='comments' />
                        </Button>
                        <Label basic color='blue' pointing='left'>
                          {commentCount}
                        </Label>
                      </Button>
                    )
                  }
                />
                {user && user.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
            {user && (
              <Card fluid>
                <Card.Content>
                  <p>Post a Comment</p>
                  <Form>
                    <div className='ui action input fluid'>
                      <input
                        type='text'
                        placeholder='Comment..'
                        name='comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type='submit'
                        className='ui button teal'
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            <>
              {comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </>
          </Col>
        </Row>
      </div>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
