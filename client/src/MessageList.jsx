import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

 constructor(props) {
    super(props);
    this.displayMessage=this.displayMessage.bind(this);
  }

  displayMessage() {
    console.log(this.props.messages);
    return (
      <div>
        {this.props.messages.map((currentValue)=> {
          return (<Message key={currentValue.info.id} message={currentValue} />);
        })}
      </div>
    );
  }

  render() {
    console.log("Rendering <MessageList/>");

    return (
      <div id="message-list">
        {this.displayMessage()}
      </div>
    );
  }

}
export default MessageList;
