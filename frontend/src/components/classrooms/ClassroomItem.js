import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class ClassroomItem extends Component {
  goToClassroomOverview = (event) => {
    event.preventDefault();
    const { classroom } = this.props;
    this.props.history.push(`/classroom/${classroom.classroom_id}`);
  };
  render() {
    const { classroom } = this.props;
    return (
      <div className="column is-half">
        <div className="box">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                {classroom.classroom_name}
              </Typography>
              <Typography color="textSecondary">{classroom.subject}</Typography>
              <Typography variant="body2" component="p">
                Timings: {classroom.timings}
                <br />
                Days of Class: {classroom.days.map((day) => `${day} `)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button color="primary" onClick={this.goToClassroomOverview}>
                Class Details
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}
export default ClassroomItem;
