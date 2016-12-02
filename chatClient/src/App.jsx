import React, {Component} from 'react';
import Nav from './Nav.jsx';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:4000');
    this.sendChatFields = this.sendChatFields.bind(this);
    this.state = {
      //
      currentUser: {name: "Bob", color: "blue"},
      messages: [], // store messages coming from the server
      usersOnline: 0,
    };
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket.onopen = function () {
      console.log('Connected to server!');
    }

    this.socket.onmessage = (event) => {
      let broadcast = JSON.parse(event.data);

      if (broadcast.type === 'userCount') {
        let usersOnline = broadcast.info.usersOnline;
        this.setState({usersOnline: usersOnline});
      } else {
        let messages =this.state.messages.concat(broadcast);
        this.setState({messages: messages});

        if (broadcast.type === 'incomingMessage') {
          let name = broadcast.info.username;
          this.setState({currentUser: {name: name}});
        }

        if (broadcast.type === 'incomingNotification') {
         let name = broadcast.info.newUsername;
         this.setState({currentUser: {name: name}});
        }
      }
    }
  }

// send newCF object to the server when function invoked from ChatBar
  sendChatFields(newCF) {
    this.socket.send(JSON.stringify(newCF));
  }

  render() {
    console.log("Rendering <App/>");

    return (
      <div className="wrapper">
        <Nav usersOnline={this.state.usersOnline}/>
        <MessageList
          messages={this.state.messages}
        />
        <ChatBar
          currentUser={this.state.currentUser}
          sendChatFields={this.sendChatFields}
        />
      </div>
    );
  }

}
export default App;
