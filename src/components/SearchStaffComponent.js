import React, { Component } from "react";
import { Button, Modal, ModalBody, Label, Input, Form } from "reactstrap";

import { STAFFS } from "../shared/staffs";

class SearchStaff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      searchStaff: "",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSearchStaff = this.handleSearchStaff.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSearchStaff(event) {
    this.toggleModal();
    this.setState({ searchStaff: event.target.value });
    const result = STAFFS.find(staffs => staffs.name === event.target.value )
    console.log(result);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span>
          Search a staff
        </Button>

        <Modal isOpen={this.state.isModalOpen}>
          <ModalBody>
            <Form>
              <Label>Input a name: </Label>
              <Input type="text"  />
              <Button
                type="button"
                onClick={(value) => this.handleSearchStaff(value)}
              >
                Search
              </Button>
            </Form>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}

export default SearchStaff;
