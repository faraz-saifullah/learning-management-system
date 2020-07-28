import React, { Fragment } from "react";
import withContext from "../../withContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

class CreateClassroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classroomName: "",
      subject: "",
      timings: "",
      days: "",
    };
    this.baseState = this.state;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  createClassroom = (event) => {
    event.preventDefault();
    const userId = this.props.context.user.user_id;
    Axios.post(
      `${BASE_URL}/users/${userId}/classrooms`,
      {
        classroomName: this.state.classroomName,
        subject: this.state.subject,
        timings: this.state.timings,
        days: this.state.days,
      },
      {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user")).token,
        },
      }
    )
      .then((response) => {
        alert(
          `Classroom ${response.data.data[0].classroom_id} created successfully!`
        );
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert(`Unexpected error occured!`);
      });
    this.setState(this.baseState);
  };

  render() {
    return this.props.context.user.type === "teacher" ? (
      <Fragment>
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">Create Classroom</h4>
          </div>
        </div>
        <br />
        <div className="container">
          <center>
            <form>
              <TextField
                style={{ width: "50%" }}
                onChange={this.handleChange}
                id="classroomName"
                label="Classroom Name"
                value={this.state.classroomName}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                style={{ width: "50%" }}
                onChange={this.handleChange}
                id="subject"
                label="Subject"
                value={this.state.subject}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                style={{ width: "50%" }}
                onChange={this.handleChange}
                id="timings"
                label="Timings"
                value={this.state.timings}
                variant="outlined"
              />
              <br />
              <br />
              <TextField
                style={{ width: "50%" }}
                onChange={this.handleChange}
                id="days"
                label="Days"
                value={this.state.days}
                variant="outlined"
              />
              <br />
              <br />
              <Button
                type="submit"
                onClick={this.createClassroom}
                style={{ margin: 3 }}
                variant="contained"
                color="primary"
                disableElevation
              >
                Create
              </Button>
            </form>
          </center>
        </div>
      </Fragment>
    ) : (
      <Redirect to="/" />
    );
  }
}

export default withContext(CreateClassroom);
