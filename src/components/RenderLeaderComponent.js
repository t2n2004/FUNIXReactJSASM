import React from "react";
import { Media } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

function RenderLeader({ leaders }) {
  if (leaders != null)
    return (
      <div>
        {leaders.map((leader) => {
          return (
            <div key={`leader-${leader.id}`}>
              <Media tag="li">
                <Media left middle className="m-3">
                  <Media
                    object
                    src={baseUrl + leader.image}
                    alt={leader.name}
                  />
                </Media>
                <Media body className="m-3">
                  <Media heading>{leader.name}</Media>
                  <p>{leader.designation}</p>
                  <p>{leader.description}</p>
                </Media>
              </Media>
            </div>
          );
        })}
      </div>
    );
  else {
    return <div>1</div>;
  }
}

const Leaders = (props) => {
  if (props.leaders.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.leaders.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{props.leaders.errMess}</h4>
          </div>
        </div>
      </div>
    );
  } else if (props.leaders != null) {
    return (
      <div className="container">
        <div className="row">
          <RenderLeader leaders={props.leaders} />
        </div>
      </div>
    );
  } else {
    return <div>2</div>;
  }
};

export default Leaders;
