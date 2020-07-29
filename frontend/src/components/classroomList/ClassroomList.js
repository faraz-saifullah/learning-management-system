import React, { Fragment, Component } from "react";
import ClassroomItem from "./ClassroomItem";
import withContext from "../../withContext";
import Button from "@material-ui/core/Button";
import SortIcon from "@material-ui/icons/Sort";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Redirect } from "react-router-dom";

class ClassroomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classrooms: this.props.context.classrooms,
      nameSortOrder: 1,
      subjectSortOrder: 1,
      numberOfStudentsSortOrder: 1,
    };
  }

  sortByClassroomName = () => {
    let classrooms = this.state.classrooms;
    let sortOrder = this.state.nameSortOrder;
    classrooms = classrooms.sort(function (a, b) {
      return a.classroom_name > b.classroom_name ? -1 * sortOrder : sortOrder;
    });
    this.setState({
      classrooms: classrooms,
      nameSortOrder: -1 * sortOrder,
    });
  };

  sortBySubject = () => {
    let classrooms = this.state.classrooms;
    let sortOrder = this.state.subjectSortOrder;
    classrooms = classrooms.sort(function (a, b) {
      return a.subject > b.subject ? -1 * sortOrder : sortOrder;
    });
    this.setState({
      classrooms: classrooms,
      subjectSortOrder: -1 * sortOrder,
    });
  };

  sortByNumberOfStudents = () => {
    let classrooms = this.state.classrooms;
    let sortOrder = this.state.numberOfStudentsSortOrder;
    classrooms = classrooms.sort(function (a, b) {
      return a.number_of_students > b.number_of_students
        ? -1 * sortOrder
        : sortOrder;
    });
    this.setState({
      classrooms: classrooms,
      numberOfStudentsSortOrder: -1 * sortOrder,
    });
  };

  componentWillMount() {
    this.setState({
      classrooms: this.props.context.classrooms,
    });
  }

  render() {
    return this.props.context.user ? (
      <Fragment>
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">My Classrooms</h4>
          </div>
        </div>
        <br />
        <div className="container">
          <center>
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={this.sortByClassroomName}
                startIcon={<SortIcon />}
              >
                Sort By Classroom Name
              </Button>
              <Button onClick={this.sortBySubject} startIcon={<SortIcon />}>
                Sort By Subject
              </Button>
              <Button
                onClick={this.sortByNumberOfStudents}
                startIcon={<SortIcon />}
              >
                Sort By Number Of Students
              </Button>
            </ButtonGroup>
          </center>
          <div className="column columns is-multiline">
            {this.state.classrooms && this.state.classrooms.length ? (
              // Diplay each classroom
              this.state.classrooms.map((classroom, index) => (
                <ClassroomItem
                  history={this.props.history}
                  classroom={classroom}
                  key={index}
                />
              ))
            ) : (
              <div className="column">
                <span className="title has-text-grey-light">
                  No Classrooms found!
                </span>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default withContext(ClassroomList);
