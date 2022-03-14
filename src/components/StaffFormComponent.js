import React, { Component } from "react";
import { Button, Modal, ModalBody, Label, Row, Col } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

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
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddComment = this.handleAddStaff.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleAddStaff(event) {
    // event.preventDefault();
    this.toggleModal();
    const newStaff = event;
    this.props.onAddStaff(newStaff);
  }

  render() {
    return (
      <div>
        <Button
          className="d-flex align-items-center justify-content-center"
          outline
          onClick={this.toggleModal}
        >
          <i className="fa fa-plus fa-lg"></i>
        </Button>

        <Modal isOpen={this.state.isModalOpen}>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleAddStaff(values)}>
              <Row className="form-group">
                <Label htmlFor="name" md={5}>
                  Tên nhân viên
                </Label>
                <Col md={7}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
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
                    className="form-control"
                    value={this.state.tenState}
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
                    className="form-control"
                    value={this.state.tenState}
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
                    defaultValue={"Dept01"}
                    model=".department"
                    id="department"
                    name="department"
                    placeholder="Phòng ban"
                    className="form-control"
                  >
                    <option value={"Dept01"}>Sale</option>
                    <option value={"Dept02"}>HR</option>
                    <option value={"Dept03"}>Marketing</option>
                    <option value={"Dept04"}>IT</option>
                    <option value={"Dept05"}>Finance</option>
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
                    className="form-control"
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={{ size: 10 }}>
                  <Button type="submit" value="submit" color="primary">
                    Thêm
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

export default StaffForm;
