import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody } from "reactstrap";

class Staff extends Component {
  constructor(props) {
    super(props);
    this.onSelectStaff = this.onSelectStaff.bind(this);
  }

  onSelectStaff() {
    if (this.props.onStaffSelect) {
      this.props.onStaffSelect(this.props.staff);
    }
  }

  render() {
    const avatar = `https://i.pravatar.cc/250?img=${this.props.staff.id}`;

    return (
      <div
        key={`staff-${this.props.staff.id}`}
        className={`col-12 col-sm-4 col-md-2 mb-4`}
      >
        <Card onClick={() => this.onSelectStaff()}>
          <CardImg src={avatar} alt={this.props.staff.name} />
          <CardBody>
            <CardText className="text-center">{this.props.staff.name}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Staff;
