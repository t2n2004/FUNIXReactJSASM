import React, { Component } from "react";
import { connect } from "react-redux";

import { Media, Breadcrumb, BreadcrumbItem, Button } from "reactstrap";
import StaffForm from "./StaffFormComponent";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

import { deleteStaff } from "../redux/ActionCreators";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  deleteStaff: (staff) => dispatch(deleteStaff(staff)),
});

class StaffDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      staff: props.staff,
    };

    this.onDeleteStaff = this.onDeleteStaff.bind(this);
    this.onStaffUpdate = this.onStaffUpdate.bind(this);
  }

  onDeleteStaff() {
    this.props.deleteStaff(this.props.staff).then(() => {
      this.props.onStaffDelete();
    });
  }

  onStaffUpdate(staff) {
    this.setState({
      staff: staff,
    });
  }

  renderStaff(staff, department) {
    const avatar = `https://i.pravatar.cc/250?img=${staff.id}`;

    return (
      <div className="container pb-5">
        <div className="row">
          <div className="col-12">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/staffs">Nhân viên</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
            </Breadcrumb>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-sm-4 col-md-3">
            <Media object src={avatar} alt={staff.name} className="w-100" />
          </div>

          <div className="col-12 col-sm-8 col-md-9">
            <Media body>
              <Media heading>Họ và tên: {staff.name}</Media>
              <p>Ngày sinh: {`${dateFormat(staff.doB, "dd/mm/yyyy")}`}</p>
              <p>
                Ngày vào công ty:{" "}
                {`${dateFormat(staff.startDate, "dd/mm/yyyy")}`}
              </p>
              <p>Phòng ban: {department.name}</p>
              <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
              <p>Số ngày làm thêm: {staff.overTime}</p>
            </Media>

            <div className="d-flex flex-align-center">
              <Button
                className="mr-3"
                color="danger"
                onClick={() => this.onDeleteStaff()}
              >
                Xoa nhan vien
              </Button>

              <StaffForm
                className="my-2"
                staff={this.props.staff}
                onStaffUpdate={this.onStaffUpdate}
                departments={this.props.departments}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const department = this.props.departments.find(
      ({ id }) => this.props.staff.departmentId === id
    );

    return this.renderStaff(this.state.staff, department);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffDetail);
