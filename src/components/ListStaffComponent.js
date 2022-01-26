import React, { Component } from "react";
import { Card } from "reactstrap";
import StaffDetail from "./StaffDetailComponent.js";

class ListStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
      columnDisplay: 3,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  handleChange(event) {
    this.setState({ columnDisplay: event.target.value });
  }

  render() {
    const list = this.props.staffs.map((staff) => {
      return (
        <div
          key={`staff-${staff.id}`}
          className={`col-12 col-sm-6 col-md-${12 / this.state.columnDisplay} my-1`}
        >
          <Card onClick={() => this.onStaffSelect(staff)}>{staff.name}</Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <form onChange={this.handleChange} className="d-none d-md-block">
            <label>Nhập số cột muốn hiển thị: </label>
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option defaultValue="3">
                3
              </option>
              <option value="4">4</option>
              <option value="6">6</option>
            </select>
          </form>
        </div>

        <div className="row">{list}</div>
        <div className="row">
          <StaffDetail staff={this.state.selectedStaff} columnDisplay={this.state.columnDisplay} />
        </div>
        <div className="row">Bấm vào tên nhân viên để xem chi tiết</div>
      </div>
    );
  }
}

export default ListStaff;
