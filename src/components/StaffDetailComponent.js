import React, { Component } from "react";
import { Media, Breadcrumb, BreadcrumbItem  } from "reactstrap";
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';

class StaffDetail extends Component {
  render() {
    if (this.props.staff != null) {
      return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/staff">Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.staff.name}</BreadcrumbItem>
                </Breadcrumb>
            </div>

          <div className="row">
            <div className="col-12 col-sm-4 col-md-3">
                <Media left middle className="m-3">
                    <Media object src={this.props.staff.image} alt={this.props.staff.name} />
                </Media>
            </div>
            <div className={`col-12 col-sm-8 col-md-9 my-1`}>
                <Media body className="m-3" >
                    <Media heading>Họ và tên: {this.props.staff.name}</Media>
                    <p>Ngày sinh: {`${dateFormat(this.props.staff.doB, "dd/mm/yyyy")}`}</p>
                    <p>Ngày vào công ty:  {`${dateFormat(this.props.staff.startDate, "dd/mm/yyyy")}`}</p>
                    <p>Phòng ban: {this.props.staff.department.name}</p>
                    <p>Số ngày nghỉ còn lại: {this.props.staff.annualLeave}</p>
                    <p>Số ngày làm thêm: {this.props.staff.overTime}</p>
                </Media>

            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default StaffDetail;