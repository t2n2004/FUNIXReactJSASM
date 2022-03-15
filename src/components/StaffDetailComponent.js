import React from "react";
import { Media, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";

function RenderStaffDetail({ staff, department }) {
  if (staff != null) {
    const avatar = `https://i.pravatar.cc/250?img=${staff.id}`;

    return (
      <div className="container">
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
            <Media body className="m-3">
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
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const StaffDetail = (props) => {
  if (props.staff != null) {
    const department = props.departments.find(
      ({ id }) => props.staff.departmentId === id
    );

    return <RenderStaffDetail staff={props.staff} department={department} />;
  } else {
    return <div></div>;
  }
};

export default StaffDetail;
