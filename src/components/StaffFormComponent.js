import React, { Component } from "react";
import { connect } from "react-redux";

import { Button, Modal, ModalBody, Label, Row, Col } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

import { createStaff, updateStaff } from "../redux/ActionCreators";

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  createStaff: (staff) => dispatch(createStaff(staff)),
  updateStaff: (staff) => dispatch(updateStaff(staff)),
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

  submit() {
    if (this.state.isEdit) {
      this.props.updateStaff(this.state.staff).then(() => {
        this.props.onStaffUpdate(this.state.staff);
        this.toggleModal();
      });
    } else {
      this.props.createStaff(this.state.staff).then(() => this.toggleModal());
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
    const {
      name,
      doB,
      startDate,
      departmentId,
      salaryScale,
      annualLeave,
      overTime,
    } = this.state.staff;

    let btn;
    if (this.state.isEdit) {
      btn = "Sua nhan vien";
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
            <LocalForm onSubmit={() => this.submit()}>
              <Row className="form-group">
                <Label htmlFor="name" md={5}>
                  Tên nhân viên
                </Label>
                <Col md={7}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    value={name}
                    onChange={this.onInputchange}
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
                    id="doB"
                    name="doB"
                    value={doB}
                    onChange={this.onInputchange}
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
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={this.onInputchange}
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
                    defaultValue={this.props.departments[0].id}
                    model=".departmentId"
                    id="department"
                    name="department"
                    value={departmentId}
                    onChange={this.onInputchange}
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
                    defaultValue={"1.0"}
                    model=".salaryScale"
                    id="salaryScale"
                    name="salaryScale"
                    value={salaryScale}
                    onChange={this.onInputchange}
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
                    defaultValue={"0"}
                    model=".annualLeave"
                    id="annualLeave"
                    name="annualLeave"
                    value={annualLeave}
                    onChange={this.onInputchange}
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
                    defaultValue={"0"}
                    model=".overTime"
                    id="overTime"
                    name="overTime"
                    value={overTime}
                    onChange={this.onInputchange}
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
                    Huy
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffForm);
