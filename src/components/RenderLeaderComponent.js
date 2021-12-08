import React  from "react";
import {  Media } from "reactstrap";

    function RenderLeader({ leaders }) {
        if (leaders != null) {
            return( 
                <div>
                    <div className="col-12 col-md-4 mt-5">
                        <Media left middle>
                            <Media object src={leaders.image} alt={leaders.name} />
                        </Media>
                        <Media body className='col-12 col-md-8 m-1'>
                            <Media heading>{leaders.name}</Media>
                            <p>{leaders.designation}</p>
                            <p>{leaders.description}</p>
                        </Media>
                    </div>
                </div>  
            )

        } else {
            return(
                <div>1</div>
            )
        }
    }


    const Leaders = (props) => {
        if (props.leaders != null) {
        return(
            <div className="container">
                <div className="row">
                    <RenderLeader leaders={props.leaders} />
                </div>
            </div>
        )

        } else {
            return(
                <div>2</div>
            )
        }
        
    } 

export default Leaders;