import React, {Component} from 'react'
import Friend from './Friend'
import AddFriend from './AddFriend'
import EditFriend from './EditFriend'
// import {Header, Icon} from 'semantic-ui-react'
const apiUrl = 'https://have-you-tried.herokuapp.com/comments'

class FriendList extends Component {
  state = {
    friends: []
  }

  componentDidMount() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(friends => {
        return this.setState({friends: friends})
      })
  }

  handleSubmit = event => {
    console.log(this.state)
    event.preventDefault()
    const body = {
      friend_name: this.state.name,
    }
    fetch('https://have-you-tried.herokuapp.com/friends', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => {
        return response.error
          ? this.setState({ error: true })
          : this.setState({ error: false })
      })
  }
  
  deleteFriend(friend){
    console.log('clicked')
    console.log(friend)
    // event.preventDefault()
    // const url = `https://have-you-tried.herokuapp.com/friends${this.state.id}`
    // fetch(url, {
    //   method: 'DELETE'
    // })
}

editFriend = (event) => {
  event.preventDefault()
  const url = `https://have-you-tried.herokuapp.com/friends/${this.state.id}`
  const postData = {
    friend_name: this.state.name
  }
  fetch(url, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData),
  })
  this.setState({
    showForm: false,
    showUpdate: true,
    showDelete: false
  })
}

  render() {
    return (
      <React.Fragment>
        <div id='friend-page'>
          <Friend friendData={this.state.friends} deleteFriend={this.deleteFriend}/>
          <AddFriend handleSubmit={this.handleSubmit}/>
          <EditFriend editFriend={this.editFriend}/>
        </div>
      </React.Fragment>
    )
  }
}

export default FriendList