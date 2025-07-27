import { Component } from 'react';
import './App.css';
import Controls from './components/Controls/Controls.tsx';
import Results from './components/Results/Results/Results.tsx';
import MyErrorBoundary from './components/MyErrorBoundary.tsx';

export interface IState {
  searchResult: string;
}

class App extends Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = { searchResult: '' };
  }

  componentDidMount() {
    const localSearchResult = localStorage.getItem('searchResult');
    if (localSearchResult !== null) {
      this.setState({ searchResult: localSearchResult });
    }
  }
  onSearch = (value: string) => {
    this.setState({ searchResult: value.trim() });
    localStorage.setItem('searchResult', value.trim());
  };

  render() {
    return (
      <div className="App">
        <Controls onSearch={this.onSearch} />
        <MyErrorBoundary>
          <Results searchResult={this.state.searchResult} />
        </MyErrorBoundary>
      </div>
    );
  }
}

export default App;
