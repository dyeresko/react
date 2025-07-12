import { Component, type ChangeEvent } from 'react';
import type { IState } from '../../App.tsx';

interface IProps {
  onSearch: (searchResult: string) => void;
}
class Controls extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { searchResult: '' };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchResult: e.target.value });
  };

  componentDidMount() {
    const localSearchResult = localStorage.getItem('searchResult');
    if (localSearchResult !== null) {
      this.setState({ searchResult: JSON.parse(localSearchResult) });
    }
  }

  componentDidUpdate() {
    localStorage.setItem(
      'searchResult',
      JSON.stringify(this.state.searchResult)
    );
  }

  render() {
    return (
      <div className={'controls'}>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchResult}
          onChange={this.handleInputChange}
        />
        <button onClick={() => this.props.onSearch(this.state.searchResult)}>
          Search
        </button>
      </div>
    );
  }
}

export default Controls;
