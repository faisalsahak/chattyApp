import React, {Component} from 'react';

class ChatBar extends Component {

 constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.newMessage=this.newMessage.bind(this);
    this.newNotification=this.newNotification.bind(this);
    this.state = {
        username: this.props.currentUser.name,
        content: ""
    };
  }

// update state with current value in input field on each change
  handleChange(event) {
    let id = event.target.id;
    let value = event.target.value.trim();

    if (id === "new-message") {
      this.setState({content: value});
    }

    if (id === "username") {
      this.setState({username: value});
    }
  }

  // invoke the appropriate function when enter is hit from an input field
  handleSubmit(event) {
    let id = event.target.id;
    let value = event.target.value.trim();

    if (event.key === 'Enter' && value !="") {
      if (id === 'new-message') {
        this.newMessage();
        event.target.value = "";
      }
      if (id === 'username') {
        this.newNotification();
      }

    }
  }

  newMessage() {
   let newCF = {
      type: 'postMessage',
      info: {
        username: this.state.username,
        content: this.state.content
      }
    }
    this.props.sendChatFields(newCF);
  }

  newNotification() {
    if (this.state.username !== this.props.currentUser.name) {
      let notification = this.props.currentUser.name+ ' changed their name to ' + this.state.username;
      let newCF = {
        type: 'postNotification',
        info: {
          itemChanged: 'name',
          newUsername: this.state.username,
          notification: notification
        }
      }
      this.props.sendChatFields(newCF)
      // console.log(notification.prevUsername, ' changed their ', notification.item, ' to ', notification.newUsername,'!')
    }
  }

  render() {
    console.log("Rendering <ChatBar/>");
    return (
      <footer>
        <div></div>
        <input
          id="username"
          type="text"
          placeholder="Type your username and hit ENTER"
          defaultValue={this.state.username}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
          onBlur={this.newNotification}
        />
        <input
          id="new-message"
          type="text"
          placeholder="Type a message and hit ENTER"
          defaultValue={this.state.value}
          onChange ={this.handleChange}
          onKeyDown={this.handleSubmit}
        />
      </footer>
    );
  }

}
export default ChatBar;






