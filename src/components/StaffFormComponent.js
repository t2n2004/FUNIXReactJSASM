import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
  Modal,
  ModalBody,
} from "reactstrap";

class StaffForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      name: "",
      doB: "",
      startDate: "",
      department: "",
      salaryScale: "",
      annualLeave: "",
      overTime: "",
      touched: {
        name: false,
        doB: false,
        startDate: false,
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddComment = this.handleAddStaff.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  // validate
  validate(name, doB, startDate) {
    const errors = {
      name: "",
      doB: "",
      startDate: "",
    };

    // valid bDay phải đủ 18 tuổi
    let thisYear = new Date().getFullYear();
    let bYear = new Date(doB).getFullYear();
    let age = thisYear - bYear;

    if (this.state.touched.name && !name) errors.name = "Yêu cầu nhập";
    if (this.state.touched.doB && !doB) errors.doB = "Yêu cầu nhập";
    else if (this.state.touched.doB && age < 18) errors.doB = "Chưa đủ 18 tuổi";
    if (this.state.touched.startDate && !startDate) errors.startDate = "Yêu cầu nhập";

    return errors;
  }

  // hàm add newStaff
  handleAddStaff(event) {
    this.toggleModal();

    const newStaff = this.state;

    this.props.onAddStaff(newStaff);
    event.preventDefault();
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.doB,
      this.state.startDate
    );
    return (
      <div>
        <Button className="mx-auto d-flex" outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span>
          Thêm nhân viên
        </Button>

        <Modal isOpen={this.state.isModalOpen}>
          <ModalBody>
            <Form onSubmit={this.handleAddStaff}>
              <FormGroup row>
                <Label htmlFor="name" md={5}>
                  Tên Nhân viên
                </Label>
                <Col md={7}>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tên Nhân viên"
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={this.handleBlur("name")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="doB" md={5}>
                  Ngày sinh
                </Label>
                <Col md={7}>
                  <Input
                    type="date"
                    id="doB"
                    name="doB"
                    placeholder="dd/mm/yyyy"
                    value={this.state.doB}
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={this.handleBlur("doB")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="startDate" md={5}>
                  Ngày bắt đầu
                </Label>
                <Col md={7}>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    placeholder="dd/mm/yyyy"
                    value={this.state.startDate}
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={this.handleBlur("startDate")}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="department" md={5}>
                  Phòng ban
                </Label>
                <Col md={7}>
                  <Input
                    type="select"
                    size="1"
                    id="department"
                    name="department"
                    placeholder="Phòng ban"
                    value={this.state.department}
                    defaultValue={"Dept01"}
                    onChange={this.handleInputChange}
                  >
                    <option value={"Dept01"}>Sale</option>
                    <option value={"Dept02"}>HR</option>
                    <option value={"Dept03"}>Marketing</option>
                    <option value={"Dept04"}>IT</option>
                    <option value={"Dept05"}>Finance</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="salaryScale" md={5}>
                  Hệ số lương
                </Label>
                <Col md={7}>
                  <Input
                    type="select"
                    size="1"
                    id="salaryScale"
                    name="salaryScale"
                    placeholder="hệ số lương"
                    value={this.state.salaryScale}
                    defaultValue={"1.0"}
                    onChange={this.handleInputChange}
                  >
                    <option value={"1.0"}>1.0</option>
                    <option value={"1.1"}>1.1</option>
                    <option value={"1.2"}>1.2</option>
                    <option value={"1.3"}>1.3</option>
                    <option value={"1.4"}>1.4</option>
                  </Input>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="annualLeave" md={5}>
                  Số ngày nghỉ còn lại:
                </Label>
                <Col md={7}>
                  <Input
                    type="number"
                    id="annualLeave"
                    name="annualLeave"
                    placeholder="Số ngày nghỉ còn lại"
                    value={this.state.annualLeave}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label htmlFor="overTime" md={5}>
                  Số ngày làm thêm:
                </Label>
                <Col md={7}>
                  <Input
                    type="number"
                    id="overTime"
                    name="overTime"
                    placeholder="Số ngày làm thêm"
                    value={this.state.overTime}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Thêm
                  </Button>
                </Col>
              </FormGroup>

            </Form>

          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default StaffForm;
