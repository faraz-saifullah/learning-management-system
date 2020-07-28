import React from "react";
import withContext from "../../withContext";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";

const BASE_URL = "http://localhost:3001";

class TeacherInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: null,
    };
  }

  async componentDidMount() {
    const teacherId = this.props.teacherId;
    const response = await Axios.get(`${BASE_URL}/users/${teacherId}`, {
      headers: {
        "x-access-token": JSON.parse(localStorage.getItem("user")).token,
      },
    });
    this.setState({ teacher: response.data.data[0] });
  }

  render() {
    return (
      this.state.teacher && (
        <form>
          <TextField
            disabled
            fullWidth
            id="teacher_name"
            label="Teacher Name"
            value={this.state.teacher.name}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            disabled
            fullWidth
            id="subject"
            label="Teacher Email"
            value={this.state.teacher.email}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            disabled
            fullWidth
            id="timings"
            label="Teacher Phone"
            value={this.state.teacher.phone}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            disabled
            fullWidth
            id="city"
            label="City"
            value={this.state.teacher.city}
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            disabled
            fullWidth
            id="state"
            label="State"
            value={this.state.teacher.state}
            variant="outlined"
          />
        </form>
      )
    );
  }
}

export default withContext(TeacherInfo);
