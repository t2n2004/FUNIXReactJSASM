import React, { Component } from "react";
import { Card,  CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat from 'dateformat';

class StaffDetail extends Component {
  render() {
    if (this.props.staff != null) {
      return (
        <div className="container">
          <div className="row">
            <div className={`col-12 col-sm-6 col-md-${12 / this.props.columnDisplay} my-1`}>
              <Card>
                <CardBody>
                  <CardTitle>Họ và tên: {this.props.staff.name}</CardTitle>
                  <CardText>Ngày sinh: {`${dateFormat(this.props.staff.doB, "dd/mm/yyyy")}`}</CardText>
                  <CardText>
                    Ngày vào công ty:  {`${dateFormat(this.props.staff.startDate, "dd/mm/yyyy")}`}
                  </CardText>
                  <CardText>Phòng ban: {this.props.staff.department.name}</CardText>
                  <CardText>
                    Số ngày nghỉ còn lại: {this.props.staff.annualLeave}
                  </CardText>
                  <CardText>
                    Số ngày làm thêm: {this.props.staff.overTime}
                  </CardText>
                </CardBody>
              </Card>
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
