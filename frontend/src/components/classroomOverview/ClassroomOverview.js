import React, { Fragment, Component } from "react";
import withContext from "../../withContext";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import StudentsList from "./StudentsList";
import TeacherProfile from "./TeacherProfile";

const BASE_URL = "http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3001";

class ClassroomOverview extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
    } = this.props;
    this.classroomId = params.classroomId;
    const { classrooms } = this.props.context;
    classrooms.map((item) => {
      if (Number(item.classroom_id) === Number(this.classroomId)) {
        this.classroom = { ...item };
      }
    });
    this.state = {
      ...this.classroom,
      editable: false,
      resourceName: "",
      resourceLink: "",
      studentPhone: "",
    };
    this.baseState = this.state;
  }

  addNewResource = (event) => {
    event.preventDefault();
    const resources = this.state.useful_resources;
    const newResource = `${this.state.resourceName}: ${this.state.resourceLink}`;
    resources.push(newResource);
    this.setState({
      useful_resources: resources,
    });
    this.updateClassInfo();
  };

  addNewStudent = async (event) => {
    event.preventDefault();
    const { user_id } = this.props.context.user;
    const numberOfStudents = this.state.number_of_students;
    Axios.post(
      `${BASE_URL}/users/${user_id}/classrooms/${this.state.classroom_id}/students`,
      {
        phone: this.state.studentPhone,
      },
      {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user")).token,
        },
      }
    )
      .then((response) => {
        if (response.data && response.data.data && response.data.data[0]) {
          alert(
            `Successfully added student: ${response.data.data[0].user_id} to classroom`
          );
          this.setState({
            number_of_students: numberOfStudents + 1,
          });
          this.updateClassInfo();
        } else {
          alert(`Student not found`);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`Student already in the classroom`);
      });
    this.setState({
      studentPhone: "",
    });
  };

  makeEditable = (event) => {
    event.preventDefault();
    this.setState({
      editable: true,
    });
  };

  cancelEdit = (event) => {
    event.preventDefault();
    this.setState(this.baseState);
  };

  deleteClassroom = (event) => {
    event.preventDefault();
    const userId = this.props.context.user.user_id;
    Axios.delete(`${BASE_URL}/users/${userId}/classrooms/${this.classroomId}`, {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("user")).token,
      },
    })
      .then((response) => {
        alert(`Classroom Deleted Successfully!`);
        window.location.reload();
        this.props.history.push("/");
      })
      .catch((err) => {
        alert(`Delete Unsuccessful!\nError: ${err.message}`);
      });
  };

  updateClassInfo = (event) => {
    if (event) event.preventDefault();
    const userId = this.props.context.user.user_id;
    Axios.put(
      `${BASE_URL}/users/${userId}/classrooms/${this.classroomId}`,
      {
        classroomName: this.state.classroom_name,
        subject: this.state.subject,
        timings: this.state.timings,
        days: this.state.days,
        usefulResources: this.state.useful_resources,
        numberOfStudents: this.state.number_of_students,
      },
      {
        headers: {
          "x-access-token": JSON.parse(localStorage.getItem("user")).token,
        },
      }
    )
      .then((response) => {
        alert(
          `Update Successful for classroom Id: ${response.data.data[0].classroom_id}`
        );
      })
      .catch((err) => {
        alert(`Update Unsuccessful!\nError: ${err.message}`);
      });
    this.setState({
      editable: false,
    });
  };

  render() {
    return (
      <Fragment>
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">Classroom Overview</h4>
          </div>
        </div>
        <br />
        {this.state.classroom_id ? (
          <div className="container">
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <center>
                  <form>
                    <TextField
                      disabled={!this.state.editable}
                      fullWidth
                      id="classroom_mame"
                      label="Classroom Name"
                      value={this.state.classroom_name}
                      variant="outlined"
                      onChange={(e) =>
                        this.setState({ classroom_name: e.target.value })
                      }
                    />
                    <br />
                    <br />
                    <TextField
                      disabled={!this.state.editable}
                      fullWidth
                      id="subject"
                      label="Subject"
                      value={this.state.subject}
                      variant="outlined"
                      onChange={(e) =>
                        this.setState({ subject: e.target.value })
                      }
                    />
                    <br />
                    <br />
                    <TextField
                      disabled={!this.state.editable}
                      fullWidth
                      id="timings"
                      label="Time of Class"
                      value={this.state.timings}
                      variant="outlined"
                      onChange={(e) =>
                        this.setState({ timings: e.target.value })
                      }
                    />
                    <br />
                    <br />
                    <TextField
                      disabled={!this.state.editable}
                      fullWidth
                      id="days"
                      label="Days of Class"
                      value={this.state.days}
                      variant="outlined"
                      onChange={(e) =>
                        this.setState({ days: e.target.value.split(",") })
                      }
                    />
                    <br />
                    <br />
                    <TextField
                      disabled
                      fullWidth
                      id="usefulResources"
                      label="Useful Resources"
                      multiline
                      rows={this.state.useful_resources.length}
                      value={this.state.useful_resources}
                      variant="outlined"
                    />
                    <br />
                    <br />
                    <TextField
                      disabled
                      fullWidth
                      id="classId"
                      label="Class Id"
                      value={this.state.classroom_id}
                      variant="outlined"
                    />
                    <br />
                    <br />
                    <TextField
                      disabled
                      fullWidth
                      id="numberOfStudents"
                      label="Number of Students"
                      value={this.state.number_of_students}
                      variant="outlined"
                    />
                    <br />
                    <br />
                    {this.props.context.user.type === "teacher" && (
                      <>
                        {this.state.editable ? (
                          <>
                            <Button
                              onClick={this.updateClassInfo}
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
                            <>
                              <Button
                                onClick={this.makeEditable}
                                style={{ margin: 3 }}
                                variant="contained"
                                color="primary"
                                disableElevation
                              >
                                Edit
                            </Button>
                              <Button
                                onClick={this.deleteClassroom}
                                style={{ margin: 3 }}
                                variant="contained"
                                color="secondary"
                                disableElevation
                              >
                                Delete
                            </Button>
                            </>
                          )}
                      </>
                    )}
                  </form>
                </center>
              </Grid>
              <Grid item xs={6}>
                {this.props.context.user.type === "teacher" ? (
                  <>
                    <Grid>
                      <center>
                        <form>
                          <TextField
                            fullWidth
                            id="classroom_mame"
                            label="Resource Name"
                            value={this.state.resourceName}
                            variant="outlined"
                            onChange={(e) =>
                              this.setState({ resourceName: e.target.value })
                            }
                          />
                          <br />
                          <br />
                          <TextField
                            fullWidth
                            id="subject"
                            label="Resource Link"
                            value={this.state.resourceLink}
                            variant="outlined"
                            onChange={(e) =>
                              this.setState({ resourceLink: e.target.value })
                            }
                          />
                          <br />
                          <br />
                          <Button
                            onClick={this.addNewResource}
                            style={{ margin: 3 }}
                            variant="contained"
                            color="primary"
                            disableElevation
                          >
                            Add New Resource
                          </Button>
                        </form>
                      </center>
                    </Grid>
                    <br />
                    <Grid>
                      <center>
                        <form>
                          <TextField
                            fullWidth
                            id="studentPhone"
                            label="Student Phone Number"
                            value={this.state.studentPhone}
                            variant="outlined"
                            onChange={(e) =>
                              this.setState({ studentPhone: e.target.value })
                            }
                          />
                          <br />
                          <br />
                          <Button
                            onClick={this.addNewStudent}
                            style={{ margin: 3 }}
                            variant="contained"
                            color="primary"
                            disableElevation
                          >
                            Add New Student
                          </Button>
                        </form>
                      </center>
                    </Grid>
                  </>
                ) : (
                    <TeacherProfile teacherId={this.state.teacher_id} />
                  )}
              </Grid>
            </Grid>
            <br />
            <br />
            {this.props.context.user.type === "teacher" && (
              <StudentsList
                userId={this.props.context.user.user_id}
                classroomId={this.state.classroom_id}
                numberOfStudents={this.state.number_of_students}
              />
            )}
          </div>
        ) : (
            <center>
              <div className="column">
                <span className="title has-text-grey-light">
                  No Information To Display!
              </span>
              </div>
            </center>
          )}
      </Fragment>
    );
  }
}

export default withContext(ClassroomOverview);
