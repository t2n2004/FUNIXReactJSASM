import React, { Component } from "react";
import { Input, Form, FormGroup, Label } from "reactstrap";

import Staff from "./StaffComponent";
import StaffDetail from "./StaffDetailComponent";
import StaffForm from "./StaffFormComponent";

class ListStaff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStaff: null,
      staffs: props.staffs.staffs,
      query: null,
      order: "name",
    };

    this.onStaffSelect = this.onStaffSelect.bind(this);
  }

  // hàm hiển thị chi tiết của nhân viên
  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  // hàm search theo name
  search(event) {
    this.setState({ query: event.target.value }, this.filterStaffs);
  }

  // hàm sort --> chọn theo name hoặc doB
  sort(event) {
    this.setState({ order: event.target.value }, this.filterStaffs);
  }

  //hàm render ra newlist = list đã được sort và search, nếu ko có thì lấy list STAFFS
  filterStaffs() {
    let newList;

    // filter staff --> lấy list đã được search, nếu ko có thì lấy STAFFS ban đầu
    if (this.state.query) {
      newList = this.props.staffs.filter((staff) => {
        return staff.name
          .toLowerCase()
          .includes(this.state.query.toLowerCase());
      });
    } else {
      newList = this.props.staffs;
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
      <StaffDetail
        staff={this.state.selectedStaff}
        departments={this.props.departments.departments}
      />
    );
  }

  renderList() {
    if (this.props.staffs.isLoading || this.props.departments.isLoading) {
      return <div>Loading...</div>;
    }

    const list = this.state.staffs.map((staff) => {
      return <Staff staff={staff} onStaffSelect={this.onStaffSelect} />;
    });

    return (
      <div className="container">
        <div className="row my-2">
          <div className="col-12 col-md-6">
            <Form inline className="my-2">
              <FormGroup className="mb-0">
                <Label htmlFor="query" className="mr-2">
                  Tìm tên nhân viên:
                </Label>
                <Input
                  type="text"
                  id="query"
                  name="query"
                  innerRef={(input) => (this.query = input)}
                  onChange={(event) => this.search(event)}
                ></Input>
              </FormGroup>
            </Form>
          </div>

          <div className="col-12 col-md-6">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-md-end">
              <Form inline className="my-2 mr-2">
                <FormGroup className="mb-0">
                  <Label className="mr-2"> Sắp xếp theo: </Label>
                  <Input
                    type={"select"}
                    size="1"
                    value={this.state.order}
                    onChange={(event) => this.sort(event)}
                  >
                    <option value={"name"}>Tên</option>
                    <option value={"doB"}>Ngày sinh</option>
                    <option value={"startDate"}>Ngày vào công ty</option>
                  </Input>
                </FormGroup>
              </Form>

              <StaffForm
                className="my-2"
                onAddStaff={this.props.addStaff}
                departments={this.props.departments.departments}
              />
            </div>
          </div>
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
