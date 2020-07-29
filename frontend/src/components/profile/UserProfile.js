import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import withContext from "../../withContext";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";

const BASE_URL = "http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3001";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.context.user,
      password: "",
      editable: false,
    };
    this.baseState = this.state;
  }

  makeEditable = () => {
    this.setState({
      editable: true,
    });
  };

  cancelEdit = () => {
    this.setState(this.baseState);
  };

  updateUserDetails = async () => {
    const userId = this.props.context.user.user_id;
    const response = await Axios.put(
      `${BASE_URL}/users/${userId}`,
      {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        dateOfBirth: this.state.date_of_birth,
        city: this.state.city,
        state: this.state.state,
      },
      {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user")).token,
        },
      }
    );
    alert("User info Updated Successfully");
    this.setState({
      editable: false,
    });
  };

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
          {this.state.name && (
            <center>
              <form>
                <TextField
                  disabled={!this.state.editable}
                  style={{ width: "50%" }}
                  id="name"
                  label="Name"
                  value={this.state.name}
                  variant="outlined"
                  onChange={(e) => this.setState({ name: e.target.value })}
                />
                <br />
                <br />
                <TextField
                  disabled={!this.state.editable}
                  style={{ width: "50%" }}
                  id="subject"
                  label="Email"
                  value={this.state.email}
                  variant="outlined"
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <br />
                <br />
                <TextField
                  disabled={!this.state.editable}
                  style={{ width: "50%" }}
                  id="timings"
                  label="Phone"
                  value={this.state.phone}
                  variant="outlined"
                  onChange={(e) => this.setState({ phone: e.target.value })}
                />
                <br />
                <br />
                <TextField
                  disabled={!this.state.editable}
                  style={{ width: "50%" }}
                  id="dateOfBirth"
                  label="Date Of Birth"
                  value={this.state.date_of_birth}
                  variant="outlined"
                  onChange={(e) =>
                    this.setState({ date_of_birth: e.target.value })
                  }
                />
                <br />
                <br />
                <TextField
                  disabled={!this.state.editable}
                  style={{ width: "50%" }}
                  id="city"
                  label="City"
                  value={this.state.city}
                  variant="outlined"
                  onChange={(e) => this.setState({ city: e.target.value })}
                />
                <br />
                <br />
                <TextField
                  disabled={!this.state.editable}
                  style={{ width: "50%" }}
                  id="state"
                  label="State"
                  value={this.state.state}
                  variant="outlined"
                  onChange={(e) => this.setState({ state: e.target.value })}
                />
                <br />
                <br />
                {this.state.editable ? (
                  <>
                    <Button
                      onClick={this.updateUserDetails}
                      style={{ margin: 3 }}
                      variant="contained"
                      color="primary"
                      disableElevation
                    >
                      Update
                    </Button>
                    <Button
                      onClick={this.cancelEdit}
                      style={{ margin: 3 }}
                      variant="contained"
                      color="secondary"
                      disableElevation
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={this.makeEditable}
                    style={{ margin: 3 }}
                    variant="contained"
                    color="primary"
                    disableElevation
                  >
                    Edit
                  </Button>
                )}
              </form>
            </center>
          )}
        </div>
      </Fragment>
    );
  }
}

export default withContext(UserInfo);
