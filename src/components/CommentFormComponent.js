import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleAddComment = this.handleAddComment.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleAddComment(event) {
    event.preventDefault();
    this.toggleModal();
    const message = `Author: ${this.author.value} Rating: ${this.rating.value} Comment: ${this.comment.value}`;

    setTimeout(() => {
      alert(message);
    }, 500);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span>
          Submit Comment
        </Button>

        <Modal isOpen={this.state.isModalOpen}>
          <ModalBody>
            <Form onSubmit={this.handleAddComment}>
              <FormGroup>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  type={"select"}
                  size="1"
                  id="rating"
                  name="rating"
                  innerRef={(input) => (this.rating = input)}
                >
                  <option value={"1"}>1</option>
                  <option value={"2"}>2</option>
                  <option value={"3"}>3</option>
                  <option value={"4"}>4</option>
                  <option value={"5"}>5</option>
                </Input>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="author">Your Name</Label>
                <Input
                  type="text"
                  id="author"
                  name="author"
                  innerRef={(input) => (this.author = input)}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="comment">Comment</Label>
                <Input
                  type="textarea"
                  rows={6}
                  id="comment"
                  name="comment"
                  innerRef={(input) => (this.comment = input)}
                />
              </FormGroup>

              <Button type="submit" value="submit" color="primary">
                Submit Comment
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default CommentForm;
