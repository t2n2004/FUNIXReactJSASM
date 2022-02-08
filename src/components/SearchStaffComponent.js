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
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleChangeInput(event) {
    this.setState({ searchStaff: event.target.value }); 
  }

  handleSearchStaff(event) {
    this.toggleModal();
    
    const result = STAFFS.filter(
      (staff) =>
        staff.name.toLowerCase().includes(this.state.searchStaff.toLowerCase()) 
    );
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
              <Input
                type="text"
                value={this.state.searchStaff} 
                onChange={this.handleChangeInput} 
              />
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
