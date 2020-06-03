import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Col, Row } from 'reactstrap';

import { AuthContext } from '../../context/auth';
import PostCard from './blog/PostCard';
import PostForm from './blog/PostForm';
import { FETCH_POSTS_QUERY, SUB_POSTS } from '../../util/graphql';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

export default function Home() {
  let posts = '';

  const { subscribeToMore, ...result } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    subscribeToMore({
      document: SUB_POSTS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeed = subscriptionData.data.newPost;
        console.log(newFeed);
        console.log(prev);
        console.log(user);
        if (user == null || newFeed.user.id !== user.id) {
          return Object.assign({}, prev, {
            getPosts: [newFeed, ...prev.getPosts],
          });
        }
        return Object.assign({}, prev, {
          getPosts: [...prev.getPosts],
        });
      },
    });
  }, []);

  console.log(`Loading: ${result.loading}`);
  console.log(result.data);

  if (result.data) {
    posts = { data: result.data.getPosts };
  }

  return (
    <div className='container'>
      <MenuBar />
      <Navbar />
      <Row>
        <Row className='page-title'>
          {' '}
          <h1>Recent Posts</h1>{' '}
        </Row>
        <Row xs='3'>
          {user && (
            <Col>
              <PostForm />
            </Col>
          )}
          {result.loading ? (
            <h1>Loading Posts...</h1>
          ) : (
            <>
              {posts.data &&
                posts.data.map((post) => (
                  <Col key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Col>
                ))}
            </>
          )}
        </Row>
      </Row>
    </div>
  );
}
