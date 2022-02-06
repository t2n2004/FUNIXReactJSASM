import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody } from 'reactstrap';
import SearchStaff from './SearchStaffComponent';
import StaffDetail from './StaffDetailComponent';

class ListStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null
    };
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff });
  }

  render() {
    const list = this.props.staff.map((staff) => {
      return (
        <div
          key={`staff-${staff.id}`}
          className={`col-12 col-sm-4 col-md-2 my-1`}
        >
          <Card onClick={() => this.onStaffSelect(staff)}>
            <CardImg src={staff.image} alt={staff.name} />
            <CardBody>
              <CardText style={{textAlign: "center"}}>{staff.name}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className='row'>
          <SearchStaff />
        </div>
        
        <div className="row">
          <StaffDetail staff={this.state.selectedStaff} />
        </div>
        <div className="row">{list}</div>
      </div>
    );
  }
}

export default ListStaff;