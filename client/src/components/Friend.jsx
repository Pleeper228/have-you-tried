import React from 'react'
import AddFriend from './AddFriend'
import { Card, Header, Icon } from 'semantic-ui-react'
import {NavLink} from 'react-router-dom'

class Friend extends React.Component {
  state = {

  }

  render() {
    return (
      <React.Fragment>
      <Header as='h1' icon textAlign='center'>
          <Icon name='users' circular/>
          <Header.Content>Friends</Header.Content>
        </Header>
      <Card.Group>
      {this.props.friendData.map((friend, i) => {
        return (
          <Card key={i}>
            <Card.Content friend={friend.i}>
              <Card.Header as={NavLink}
          to={`/friends/${friend.id}`}>{friend.friend_name}</Card.Header>
            </Card.Content>
            <a onClick={() => this.props.deleteFriend(friend.id)}>Delete</a>
            {/* <a onClick={this.props.editFriend(friend)}>Delete</a> */}
          </Card>
        )
      })}
      </Card.Group>
      </React.Fragment>
    )
  }
}
export default Friend
