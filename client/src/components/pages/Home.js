import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Col, Row } from 'reactstrap';

import { AuthContext } from '../../context/auth';
import PostCard from './blog/PostCard';
import PostForm from './blog/PostForm';
import { FETCH_POSTS_QUERY } from '../../util/graphql';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

export default function Home() {
  const { user } = useContext(AuthContext);

  let posts = '';

  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  console.log(`Loading: ${loading}`);
  console.log(data);

  if (data) {
    posts = { data: data.getPosts };
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
          {loading ? (
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
