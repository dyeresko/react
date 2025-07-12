import { Component } from 'react';
import './App.css';
import Controls from './components/Controls/Controls.tsx';

export interface IState {
  searchResult: string;
}

class App extends Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = { searchResult: '' };
  }

  onSearch = (value: string) => {
    this.setState({ searchResult: value });
  };

  render() {
    return (
      <div className="App">
        <Controls onSearch={this.onSearch} />
      </div>
    );
  }
}

export default App;
