import React, { Component } from "react";
import { Link } from "react-router-dom";
import withContext from "../../withContext";

class Navbar extends Component {
  componentWillMount() {
    this.setState({
      user: this.props.context.user,
    });
  }

  render() {
    return (
      <nav
        className="navbar container"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <b className="navbar-item is-size-4 ">LMS-Dashboard</b>
        </div>
        <div className={`navbar-menu`}>
          {!this.props.context.user ? (
            <>
              {/* login and register should only show when user is not logged in */}
              <Link to="/login" className="navbar-item">
                Login
              </Link>
            </>
          ) : (
            // Logout should only show when user is logged in
            <>
              {this.props.context.user.type === "teacher" && (
                <Link to="/create-classroom" className="navbar-item">
                  Create Classroom
                </Link>
              )}
              <Link to="/" className="navbar-item">
                My Classrooms
              </Link>
              <Link to="/profile" className="navbar-item">
                My Profile
              </Link>
              <a
                href="/login"
                className="navbar-item"
                onClick={this.props.context.logout}
              >
                Logout
              </a>
            </>
          )}
        </div>
      </nav>
    );
  }
}

export default withContext(Navbar);
