import React from "react";
import { Media, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

function RenderStaffDetail({ staff }) {
  if (staff != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/staff">Nhân viên</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <div className="row">
          <div className="col-12 col-sm-4 col-md-3">
            <Media left middle className="m-3">
              <Media object src={staff.image} alt={staff.name} />
            </Media>
          </div>
          <div className={`col-12 col-sm-8 col-md-9 my-1`}>
            <Media body className="m-3">
              <Media heading>Họ và tên: {staff.name}</Media>
              <p>Ngày sinh: {`${dateFormat(staff.doB, "dd/mm/yyyy")}`}</p>
              <p>
                Ngày vào công ty:{" "}
                {`${dateFormat(staff.startDate, "dd/mm/yyyy")}`}
              </p>
              <p>Phòng ban: {staff.department.name}</p>
              <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
              <p>Số ngày làm thêm: {staff.overTime}</p>
            </Media>
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const StaffDetail = (props) => {
  if (props.staff != null)
    return (
      <div className="container">
        <div className="row">
          <RenderStaffDetail staff={props.staff} />
        </div>
      </div>
    );
  else return <div></div>;
};

export default StaffDetail;
