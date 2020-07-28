import React, { Fragment } from "react";
import withContext from "../../withContext";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";

const BASE_URL = "http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3001";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const userId = this.props.context.user.user_id;
    const response = await Axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("user")).token,
      },
    });
    this.setState({ user: response.data.data[0] });
  }

  render() {
    return (
      <Fragment>
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">My Profile</h4>
          </div>
        </div>
        <br />
        <div className="container">
          {this.state.user && (
            <center>
              <form>
                <TextField
                  disabled
                  style={{ width: "50%" }}
                  id="User_name"
                  label="Name"
                  value={this.state.user.name}
                  variant="outlined"
                />
                <br />
                <br />
                <TextField
                  disabled
                  style={{ width: "50%" }}
                  id="subject"
                  label="Email"
                  value={this.state.user.email}
                  variant="outlined"
                />
                <br />
                <br />
                <TextField
                  disabled
                  style={{ width: "50%" }}
                  id="timings"
                  label="Phone"
                  value={this.state.user.phone}
                  variant="outlined"
                />
                <br />
                <br />
                <TextField
                  disabled
                  style={{ width: "50%" }}
                  id="dateOfBirth"
                  label="Date Of Birth"
                  value={this.state.user.date_of_birth}
                  variant="outlined"
                />
                <br />
                <br />
                <TextField
                  disabled
                  style={{ width: "50%" }}
                  id="city"
                  label="City"
                  value={this.state.user.city}
                  variant="outlined"
                />
                <br />
                <br />
                <TextField
                  disabled
                  style={{ width: "50%" }}
                  id="state"
                  label="State"
                  value={this.state.user.state}
                  variant="outlined"
                />
              </form>
            </center>
          )}
        </div>
      </Fragment>
    );
  }
}

export default withContext(UserInfo);
