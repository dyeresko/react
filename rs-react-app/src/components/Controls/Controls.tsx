import { Component } from 'react';

class Controls extends Component<object, object> {
  render() {
    return (
      <div className={'controls'}>
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>
    );
  }
}

export default Controls;
