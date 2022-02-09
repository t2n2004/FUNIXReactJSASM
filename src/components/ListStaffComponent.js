import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Input,
  Form,
  Label,
} from "reactstrap";
import StaffDetail from "./StaffDetailComponent";

class ListStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
      staffs: this.props.staff,
      query: null,
      order: "name",
    };
  }

  // hàm hiển thị chi tiết của nhân viên
  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  // hàm search theo name
  search(event) {
    console.log("đang search");
    this.setState({ query: event.target.value }, this.filterStaffs);
  }

  // hàm sort --> chọn theo name hoặc doB
  sort(event) {
    console.log("đang sort");
    this.setState({ order: event.target.value }, this.filterStaffs);
  }

  //hàm render ra newlist = list đã được sort và search, nếu ko có thì lấy list STAFFS
  filterStaffs() {
    let newList;

    // filter staff --> lấy list đã được search, nếu ko có thì lấy STAFFS ban đầu
    if (this.state.query) {
      newList = this.props.staff.filter((staff) => {
        return staff.name
          .toLowerCase()
          .includes(this.state.query.toLowerCase());
      });
    } else {
      newList = this.props.staff;
    }

    // lấy ds đã search để sort tiếp theo thứ tự của order
    newList = newList.sort((a, b) =>
      a[this.state.order] > b[this.state.order] ? 1 : -1
    );

    // set lại state cho danh sách staffs
    this.setState({ staffs: newList });
  }

  renderSelected() {
    return (
      <div className="container">
        <div className="row">
          <StaffDetail staff={this.state.selectedStaff} />
        </div>
      </div>
    );
  }

  renderList() {
    const list = this.state.staffs.map((staff) => {
      return (
        <div
          key={`staff-${staff.id}`}
          className={`col-12 col-sm-4 col-md-2 my-1`}
        >
          <Card onClick={() => this.onStaffSelect(staff)}>
            <CardImg src={staff.image} alt={staff.name} />
            <CardBody>
              <CardText style={{ textAlign: "center" }}>{staff.name}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <Form inline>
            <Label> Search a staff: </Label>
            <Input
              type="text"
              value={this.state.query}
              onChange={(event) => this.search(event)}
            />
          </Form>

          <Form inline style={{ margin: "auto" }}>
            <Label> Sort by: </Label>
            <Input
              type={"select"}
              size="1"
              value={this.state.order}
              onChange={(event) => this.sort(event)}
            >
              <option value={"name"}>Name</option>
              <option value={"doB"}>doB</option>
              <option value={"salaryScale"}>salaryScale</option>
              <option value={"startDate"}>startDate</option>
            </Input>
          </Form>
        </div>

        {/* hiển thị danh sách */}
        <div className="row">{list}</div>
      </div>
    );
  }

  render() {
    if (this.state.selectedStaff != null) {
      /* trả về chi tiết nhân viên đã chọn */
      return this.renderSelected();
    } else {
      /* trả về list danh sách */
      return this.renderList();
    }
  }
}

export default ListStaff;
