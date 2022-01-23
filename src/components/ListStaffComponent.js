import React, { Component } from "react";
import { Button, Card } from "reactstrap";
import StaffDetail from "./StaffDetailComponent.js";

class ListStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
      colNumber: 4
    };
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  onColumSelect(col) {
    this.setState({ colNumber: col });
  }

  render() {
    const list = this.props.staffs.map((staff) => {
      return (
        <div key={`staff-${staff.id}`} className={`col-12 col-md-${12/this.state.colNumber} m-1`}>
          <Card onClick={() => this.onStaffSelect(staff)}>{staff.name}</Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div>
          <Button onClick={() => this.onColumSelect(2)}>2 cột</Button>
          <Button onClick={() => this.onColumSelect(3)}>3 cột</Button>
        </div>
        <div className="row">{list}</div>
        <div className="row">
          <StaffDetail staff={this.state.selectedStaff} />
        </div>
        <div className="row">Bấm vào tên nhân viên để xem chi tiết</div>
      </div>
    );
  }
}

export default ListStaff;