import React, { Component, Fragment } from "react";
import withContext from "../../withContext";
// import Cookies from 'universal-cookie';
import { Redirect } from "react-router-dom";
import { validateLoginInput } from "./Validation";
import Axios from "axios";
// const cookies = new Cookies();

// import { cookieClient } from 'react-cookie'

const BASE_URL = "http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3001";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
      error: "",
      isLoggingIn: false,
    };
  }
  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value, error: "" });

  handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateLoginInput(this.state);
    this.setState({
      error: validationError,
    });
    const { phoneNumber, password } = this.state;
    try {
      if (!validationError) {
        this.setState({ isLoggingIn: true });
        const user = await Axios.post(`${BASE_URL}/users/login`, {
          phone: phoneNumber,
          password: password,
        });
        this.props.context.login(user.data.data[0]);
      }
    } catch (error) {
      this.setState({
        error: error.message,
        isLoggingIn: false,
      });
    }
  };

  render() {
    return !this.props.context.user ? (
      <Fragment>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Login</h4>
          </div>
        </div>
        <br />
        <br />
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            <div className="field">
              <label className="label">Phone Number: </label>
              <input
                className="input"
                type="text"
                name="phoneNumber"
                onChange={this.handleChange}
              />
            </div>
            <div className="field">
              <label className="label">Password: </label>
              <input
                className="input"
                type="password"
                name="password"
                onChange={this.handleChange}
              />
            </div>
            {this.state.error && (
              <div className="has-text-danger">{this.state.error}</div>
            )}
            <div className="field is-clearfix">
              <button
                className="button is-primary is-outlined is-pulled-right"
                onClick={this.handleSubmit}
                disabled={this.state.isLoggingIn}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    ) : (
        <Redirect to="/" />
      );
  }
}

export default withContext(Login);
