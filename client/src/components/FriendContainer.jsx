import React, {Component} from 'react';
import { Card } from "semantic-ui-react";
const url = "https://have-you-tried.herokuapp.com/comments/"
const id = window
  .location
  .href
  .split("/")[4]

export default class FriendContainer extends Component {
  state = {
    friend: [],
  };
  componentDidMount() {
    this.fetchFriend();
  }
  fetchFriend = () => {
    fetch(`${url}`)
      .then(res => res.json())
      .then(friendData => {
        this.filterFriendById(friendData)
      })
  }
  filterFriendById = (friendData) => {
    let filteredFriend = friendData.filter(friend => friend.friend_id == id)
    this.setState({
      friend: filteredFriend
    })
  }


  render() {
    return (
      <div id='friend-page'>
        {this.state.friend.map((friend, i) => {
        console.log(friend)
        return (
          <React.Fragment key = {i}>
          <br/>
          <Card>
          <Card.Content>
          <Card.Header as='h3'>{friend.restaurant_name}</Card.Header>
          <Card.Description>
            {friend.comment_text}
          </Card.Description>
          </Card.Content>
          </Card>
          </React.Fragment>
      )
    })
}
    </div>
    );
  }
}
