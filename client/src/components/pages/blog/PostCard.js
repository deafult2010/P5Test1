import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image, Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../../../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

export default function PostCard({
  post: {
    body,
    createdAt,
    id,
    username,
    likeCount,
    commentCount,
    likes,
    user: postUser,
  },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid
      //  style={{ backgroundColor: '#ffc062' }}
      style={{ backgroundColor: '#ffd494', border: '2px solid black', borderRadius: '6px', color: 'black' }}
    >
      <Card.Content>
        <Popup
          content={
            <>
              <div>{`${username} has been a member since`}</div>
              <div>{`${moment(postUser.createdAt).format(
                'DD MMMM YYYY'
              )}`}</div>
            </>
          }
          header={username}
          inverted
          trigger={
            <Image
              floated='right'
              size='mini'
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
            />
          }
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Popup
          content='View Comments'
          inverted
          trigger={
            <Button labelPosition='right' as={Link} to={`/posts/${id}`} >
              <Button style={{ backgroundColor: '#ffc062', color: '#0E6EB8', border: '1px solid #0E6EB8' }}>
                <Icon name='comments' />
              </Button>
              <Label pointing='left' style={{ backgroundColor: '#ffc062', color: '#0E6EB8', border: '1px solid #0E6EB8' }}>
                {commentCount}
              </Label>
            </Button>
          }
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}
