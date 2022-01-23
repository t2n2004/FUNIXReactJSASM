import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat from 'dateformat';

class StaffDetail extends Component {
  render() {
    if (this.props.staff != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <Card>
                <CardBody>
                  <CardTitle>Họ và tên: {this.props.staff.name}</CardTitle>
                  <CardText>Ngày sinh: </CardText>
                  <CardText>
                    Ngày vào công ty:  
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
