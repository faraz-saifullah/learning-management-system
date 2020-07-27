import React, { Fragment, Component } from "react";
import withContext from "../../withContext";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class ClassroomOverview extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params },
    } = this.props;
    const classroomId = params.classroomId;
    const { classrooms } = this.props.context;
    classrooms.map((item) => {
      if (Number(item.classroom_id) === Number(classroomId)) {
        this.classroom = { ...item };
      }
    });
    this.state = {
      ...this.classroom,
      editable: false,
    };
    this.baseState = this.state;
  }

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

  updateClassInfo = (event) => {
    event.preventDefault();
    //call backend to update
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
            <center>
              <form>
                <TextField
                  disabled={!this.state.editable}
                  style={{ width: "50%" }}
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
                  style={{ width: "50%" }}
                  id="subject"
                  label="Subject"
                  value={this.state.subject}
                  variant="outlined"
                  onChange={(e) => this.setState({ subject: e.target.value })}
                />
                <br />
                <br />
                <TextField
                  disabled={!this.state.editable}
                  style={{ width: "50%" }}
                  id="timings"
                  label="Time of Class"
                  value={this.state.timings}
                  variant="outlined"
                  onChange={(e) => this.setState({ timings: e.target.value })}
                />
                <br />
                <br />
                <TextField
                  disabled={!this.state.editable}
                  style={{ width: "50%" }}
                  id="days"
                  label="Days of Class"
                  value={this.state.days}
                  variant="outlined"
                  onChange={(e) => this.setState({ days: e.target.value })}
                />
                <br />
                <br />
                <TextField
                  disabled
                  style={{ width: "50%" }}
                  id="classId"
                  label="Class Id"
                  value={this.state.classroom_id}
                  variant="outlined"
                />
                <br />
                <br />
                <TextField
                  disabled
                  style={{ width: "50%" }}
                  id="numberOfStudents"
                  label="Number of Students"
                  value={this.state.number_of_students}
                  variant="outlined"
                />
                <br />
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
                      style={{ margin: 3 }}
                      variant="contained"
                      color="secondary"
                      disableElevation
                    >
                      Delete
                    </Button>
                  </>
                )}
              </form>
            </center>
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
