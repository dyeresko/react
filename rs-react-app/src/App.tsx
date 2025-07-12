import { Component } from 'react';
import './App.css';
import Controls from './components/Controls/Controls.tsx';

class App extends Component<object, object> {
  render() {
    return (
      <div className="App">
        <Controls />
      </div>
    );
  }
}

export default App;
