import React from "react";
import MaterialTable from "material-table";
import withContext from "../../withContext";
import Axios from "axios";
import {
  getIcons,
  getColumnConfig,
  getRowsList,
  getTableOptions,
} from "./tableConfig";

const BASE_URL = "http://localhost:3001";

class StudentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      columnConfig: getColumnConfig(),
    };
  }

  fetchevents = async () => {
    const userId = this.props.userId;
    const classroomId = this.props.classroomId;
    try {
      const response = await Axios.get(
        `${BASE_URL}/users/${userId}/classrooms/${classroomId}/students`,
        {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("user")).token,
          },
        }
      );
      this.setState({
        students: response.data.data,
      });
    } catch (err) {
      console.error("This error is: ", err);
    }
  };

  componentDidMount = async () => {
    setImmediate(() => {
      this.fetchevents();
    });
  };

  render() {
    return (
      <MaterialTable
        title="Students List"
        columns={this.state.columnConfig}
        icons={getIcons()}
        options={getTableOptions()}
        data={getRowsList(this.state.students)}
      />
    );
  }
}

export default withContext(StudentsTable);
