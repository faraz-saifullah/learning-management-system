import React, { Fragment, Component } from "react";
import ClassroomItem from "./ClassroomItem";
import withContext from "../../withContext";

class ClassroomList extends Component {
  render() {
    const { classrooms } = this.props.context;
    return (
      <Fragment>
        <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">My Classrooms</h4>
          </div>
        </div>
        <br />
        <div className="container">
          <div className="column columns is-multiline">
            {classrooms && classrooms.length ? (
              // Diplay each classroom
              classrooms.map((classroom, index) => (
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
    );
  }
}

export default withContext(ClassroomList);
