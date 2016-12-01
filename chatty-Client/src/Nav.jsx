import React, {Component} from 'react';

class Nav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav>
          <h1>Chatty</h1>
          <span className='users'>{this.props.usersOnline} users online</span>
      </nav>
    );
  }

}
export default Nav;





