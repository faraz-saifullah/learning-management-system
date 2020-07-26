import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/auth/Login";
import ClassroomList from "./components/classrooms/ClassroomList";
import Context from "./Context";
import Navbar from "./components/navbar/Navbar";
import axios from "axios";

const BASE_URL = "http://localhost:3001";
export default class App extends Component {
  constructor(props) {
    super(props);
    //Initial state of the application
    this.state = {
      user: null,
      classrooms: [],
    };
    this.routerRef = React.createRef();
  }

  //When user logs in the user object of application's state is set
  login = (user) => {
    if (user) {
      this.setState({ user });
      window.location.reload();
      localStorage.setItem("user", JSON.stringify(user));
      this.routerRef.current.history.push("/");
    }
  };

  logout = (event) => {
    event.preventDefault();
    axios.post(`${BASE_URL}/users/logout`);
    let user = null;
    this.setState({ user });
    localStorage.setItem("user", null);
    this.routerRef.current.history.push("/login");
  };

  //Load classrooms fromm database on Component Mount
  //Also if any user was authenticated get his details
  //Update user and classroom details after finishing the async call
  componentDidMount() {
    const user = this.state.user || JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .get(`${BASE_URL}/users/${user.user_id}/classrooms`)
        .then((response) => {
          let classrooms = response.data.data;
          console.log(classrooms);
          this.setState({
            classrooms,
            user,
          });
        })
        .catch((err) => {
          this.setState({
            user,
            classrooms: [],
          });
        });
    }
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={ClassroomList} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
