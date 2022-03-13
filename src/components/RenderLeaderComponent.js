import React from "react";
import { Media } from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import { CSSTransition, TransitionGroup } from "react-transition-group";



function RenderLeader({leader}) {
  return(
    <TransitionGroup className="todo-list" component="ul">
          <CSSTransition key={leader.id} timeout={500} classNames="fade">
            <Media tag="li">
              <Media left middle className="m-3">
                <Media object src={baseUrl + leader.image} alt={leader.name} />
              </Media>
              <Media body className="m-3">
                <Media heading>{leader.name}</Media>
                <p>{leader.designation}</p>
                <p>{leader.description}</p>
              </Media>
            </Media>
          </CSSTransition>
      </TransitionGroup>
  );
}

const Leaders = (props) => {
  console.log(props)
  const leaders = props.leaders.leaders.map((leader) => {
    return (
      <div key={`leader-${leader.id}`} className="col-12 m-1">
        <RenderLeader leader={leader} />
      </div>
    );
  
});
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
}   else
return (
  <div className="row">
    {leaders}
  </div>
)
}



export default Leaders;
