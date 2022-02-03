import React, { Component } from "react";
import { Button, Modal, ModalBody, Label, Input, Form } from "reactstrap";

import { STAFFS } from "../shared/staffs";

class SearchStaff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSearchStaff = this.handleSearchStaff.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSearchStaff(value) {
    this.toggleModal();
    const result = STAFFS.find((staffs) => staffs.name === value);
    this.setState({ selectedStaff: value });
  }

  render() {
    if (this.props.selectedStaff != null) {
      return (
        <div>
          <Button outline onClick={this.toggleModal}>
            <span className="fas fa-search fa-lg"></span>
            Searching Staff
          </Button>

          <Modal isOpen={this.state.isModalOpen}>
            <ModalBody>
              <Form onSubmit={(value) => this.handleSearchStaff(value)}>
                <Label htmlFor="name" md={2}>
                  Input a name:
                  <input type="text" name="name" value={this.state.value} />
                </Label>
                <Input type="submit" value="Submit" />
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    } else {
      return <div>Không tìm thấy nhân viên</div>;
    }
  }
}

export default SearchStaff;
