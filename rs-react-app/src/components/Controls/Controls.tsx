import { Component, type ChangeEvent } from 'react';
import type { IState } from '../../App.tsx';
import classes from './Controls.module.css';
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
      this.setState({ searchResult: localSearchResult });
    }
  }

  render() {
    return (
      <div className={classes.controls}>
        <h2>Controls</h2>
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
