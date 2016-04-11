import React, {
  Component,
} from 'react';

import ReactDOM from 'react-dom';

class Application extends Component {
  constructor() {
    super();
    this.state = { content: 'wowow' };
  }

  changeContent() {
    this.setState({ content: 'lololol' });
  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <p>{this.state.content}</p>
        <p><button onClick={this.changeContent.bind(this)}>Change Content</button></p>
      </div>
    );
  }
}

ReactDOM.render(<Application />, document.querySelector('.application'));
