import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { SUB_POSTS, FETCH_POSTS_QUERY } from '../../util/graphql';

export default function TestSub() {
  const { subscribeToMore, ...result } = useQuery(FETCH_POSTS_QUERY);

  return (
    <CommentsPage
      {...result}
      subscribeToNewComments={() =>
        subscribeToMore({
          document: SUB_POSTS,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newFeed = subscriptionData.data.newPost;

            return Object.assign({}, prev, {
              getPosts: [newFeed, ...prev.getPosts],
            });
          },
        })
      }
    />
  );
}

function CommentsPage(props) {
  useEffect(() => {
    props.subscribeToNewComments();
  }, [props]);

  if (props.loading) {
    return <div>Loading...</div>;
  }

  if (props.error) {
    return <div>Error! {props.error.message}</div>;
  }

  if (props.data) {
    return <h4>New post: {props.data.getPosts[0].body}</h4>;
  }
  return null;
}
