import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Modal, ModalBody, Label, Row, Col } from "reactstrap";
import { actions, Form, Control, Errors } from "react-redux-form";

import { createStaff, updateStaff, addStaffs } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    staffs: state.staffs.staffs, //lấy staffs từ Redux store
  };
};

const mapDispatchToProps = (dispatch) => ({
  createStaff: (staff) => dispatch(createStaff(staff)),
  updateStaff: (staff) => dispatch(updateStaff(staff)),
  dispatch
});

const required = (val) => val && val.length;
const validBday = (val) => {
  let thisYear = new Date().getFullYear();
  let bYear = new Date(val).getFullYear();
  let age = thisYear - bYear;
  return age >= 18;
};

// const maxLength = (len) => (val) => !val || val.length <= len;
// const minLength = (len) => (val) => val && val.length >= len;

class StaffForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      staff: props.staff ? { ...props.staff } : {},
      isEdit: !!props.staff,
    };

    if (this.state.staff.doB) {
      this.state.staff.doB = this.state.staff.doB.substr(0, 10);
    }

    if (this.state.staff.startDate) {
      this.state.staff.startDate = this.state.staff.startDate.substr(0, 10);
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.onInputchange = this.onInputchange.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  onInputchange(event) {
    this.setState({
      staff: {
        ...this.state.staff,
        [event.target.name]: event.target.value,
      },
    });
  }

  submit(staff) {
    if (this.state.isEdit) {
      this.props.updateStaff(staff).then(() => {
        let staffs = [...this.props.staffs];
        //cập nhật staff tương ứng
      
        let changedIndex = staffs.findIndex(s => s.id === staff.id);
        staffs[changedIndex] = staff;
        
        this.props.dispatch(addStaffs(staffs)); //cập nhật danh sách nhân viên ở Redux store
        this.props.onStaffUpdate(staff);
        this.toggleModal();
      });
    } else {
      this.props.createStaff(staff).then(() => this.toggleModal());
    }
  }

  departmentOptions() {
    return this.props.departments.map((dep) => {
      return (
        <option key={dep.id} value={dep.id}>
          {dep.name}
        </option>
      );
    });
  }

  render() {

    let btn;
    if (this.state.isEdit) {
      btn = "Sửa nhân viên";
    } else {
      btn = <i className="fa fa-plus fa-lg"></i>;
    }

    return (
      <div>
        <Button
          className="d-flex align-items-center justify-content-center"
          outline
          onClick={this.toggleModal}
        >
          {btn}
        </Button>

        <Modal isOpen={this.state.isModalOpen}>
          <ModalBody>
            <Form model='newStaff' onSubmit={(newStaff) => this.submit(newStaff)}>
              <Row className="form-group">
                <Label htmlFor="newStaff.name" md={5}>
                  Tên nhân viên
                </Label>
                <Col md={7}>
                  <Control.text
                    model=".name"
                    placeholder="Tên nhân viên"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="doB" md={5}>
                  Ngày sinh
                </Label>
                <Col md={7}>
                  <Control.text
                    type="date"
                    model=".doB"
                    className="form-control"
                    validators={{
                      required,
                      validBday,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".doB"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                      validBday: "Chưa đủ 18 tuổi",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="startDate" md={5}>
                  Ngày bắt đầu
                </Label>
                <Col md={7}>
                  <Control.text
                    type="date"
                    model=".startDate"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".startDate"
                    show="touched"
                    messages={{
                      required: "Yêu cầu nhập",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="department" md={5}>
                  Phòng ban
                </Label>
                <Col md={7}>
                  <Control.select
                    model=".departmentId"
                    placeholder="Phòng ban"
                    className="form-control"
                  >
                    {this.departmentOptions()}
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="salaryScale" md={5}>
                  Hệ số lương
                </Label>
                <Col md={7}>
                  <Control.select
                    model=".salaryScale"
                    placeholder="Hệ số lương"
                    className="form-control"
                  >
                    <option value={"1.0"}>1.0</option>
                    <option value={"1.1"}>1.1</option>
                    <option value={"1.2"}>1.2</option>
                    <option value={"1.3"}>1.3</option>
                    <option value={"1.4"}>1.4</option>
                  </Control.select>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="annualLeave" md={5}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={7}>
                  <Control.text
                    model=".annualLeave"
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="overTime" md={5}>
                  Số ngày làm thêm
                </Label>
                <Col md={7}>
                  <Control.text
                    model=".overTime"
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={{ size: 10 }}>
                  <Button type="submit" value="submit" color="primary">
                    {this.state.isEdit ? "Lưu" : "Thêm"}
                  </Button>

                  <Button className="ml-3" onClick={this.toggleModal}>
                    Hủy
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffForm);
