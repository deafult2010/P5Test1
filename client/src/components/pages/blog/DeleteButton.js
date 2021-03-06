import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Confirm, Popup } from 'semantic-ui-react';
import { Button } from 'reactstrap';

import { FETCH_POSTS_QUERY } from '../../../util/graphql';

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: data.getPosts.filter((p) => p.id !== postId) },
        });
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
  });

  return (
    <>
      <Popup
        content={!commentId ? 'Delete Post' : 'Delete Comment'}
        inverted
        position='top right'
        trigger={
          <Button
            style={{ float: 'right' }}
            color='danger'
            onClick={() => setConfirmOpen(true)}
          >
            <i className='fas fa-trash-alt' />
          </Button>
        }
      />
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
