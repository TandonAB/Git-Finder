import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

const GIT_API_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const GIT_API_KEY = process.env.REACT_APP_GITHUB_CLIENT_SECRET;

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
    alert: null,
  };

  // async componentDidMount() {
  //   this.setState({ isLoading: true });
  //   const users = await axios.get(
  //     `https://api.github.com/users?client_id=${GIT_API_ID}&client_secret=${GIT_API_KEY}`
  //   );
  //   this.setState({ users: users.data, isLoading: false });
  // }

  // Find the array of Users list
  handleSearchUsers = async (searchQuery) => {
    this.setState({ isLoading: true });
    const users = await axios.get(
      `https://api.github.com/search/users?q=${searchQuery}&client_id=${GIT_API_ID}&client_secret=${GIT_API_KEY}`
    );
    this.setState({ users: users.data.items, isLoading: false });
  };

  // Get the single github user for user component
  getUser = async (username) => {
    this.setState({ isLoading: true });
    const result = await axios.get(
      `https://api.github.com/users/${username}?client_id=${GIT_API_ID}&client_secret=${GIT_API_KEY}`
    );
    this.setState({ user: result.data, isLoading: false });
  };

  // Get User's Repos
  getUserRepos = async (username) => {
    this.setState({ isLoading: true });
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${GIT_API_ID}&client_secret=${GIT_API_KEY}`
    );
    this.setState({ repos: result.data, isLoading: false });
  };

  // clear search users list from state
  handleClearUsers = () => this.setState({ users: [], isLoading: false });

  // Set Alert on blank submit
  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  };

  render() {
    const { users, user, repos, isLoading, alert } = this.state;

    return (
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Alert alert={alert} />
                  <Search
                    searchUsers={this.handleSearchUsers}
                    clearUsers={this.handleClearUsers}
                    showClearButton={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                  />
                  <Users isLoading={isLoading} users={users} />
                </Fragment>
              )}
            />
            <Route
              exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={this.getUser}
                  getUserRepos={this.getUserRepos}
                  user={user}
                  repos={repos}
                  isLoading={isLoading}
                />
              )}
            />
            <Route exact path="/about" component={About} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
