import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    search: '',
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClearButton: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  };

  handleSearh = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.search === '') {
      this.props.setAlert('Please enter something', 'light');
    } else {
      this.props.searchUsers(this.state.search);
      this.setState({ search: '' });
    }
  };

  render() {
    const { clearUsers, showClearButton } = this.props;
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search Users..."
            value={this.state.search}
            onChange={this.handleSearh}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>

        {showClearButton && (
          <button
            type="button"
            className="btn btn-light btn-block"
            onClick={clearUsers}
          >
            Clear
          </button>
        )}
      </div>
    );
  }
}

export default Search;
