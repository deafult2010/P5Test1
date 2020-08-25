import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';

export default function LikeButton({ user, post: { id, likeCount, likes } }) {

  const [liked, setLiked] = useState(false);
  const location = {
    pathname: '/login',
    state: { fromPath: window.location.pathname }
  }

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
    onError(err) {
      console.log(err);
    },
  });

  const likeButton = user ? (
    liked ? (
      <Button style={{ backgroundColor: '#008080', color: '#ffffff', border: '1px solid #008080' }}>
        <Icon name='heart' />
      </Button>
    ) : (
        <Button style={{ backgroundColor: '#ffc062', color: '#008080', border: '1px solid #008080' }}>
          <Icon name='heart' />
        </Button>
      )
  ) : (
      <Button as={Link} to={location} style={{ backgroundColor: '#ffc062', color: '#008080', border: '1px solid #008080' }}>
        <Icon name='heart' />
      </Button>
    );

  return (
    <Popup
      content={liked ? <strong>Unlike</strong> : <strong>Like</strong>}
      inverted
      trigger={
        <Button as='div' labelPosition='right' onClick={likePost}>
          {likeButton}
          <Popup
            content={likeCount === 0 ? 'be the first to like this post' : <ul style={{ marginBottom: '0px' }}>{likes.map((like) => <li>{like.username}</li>)}</ul>}
            inverted
            trigger={
              <Label style={{ backgroundColor: '#ffc062', color: '#008080', border: '1px solid #008080' }} pointing='left'>
                {likeCount}
              </Label>
            }
          />
        </Button>
      }
    />
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;
