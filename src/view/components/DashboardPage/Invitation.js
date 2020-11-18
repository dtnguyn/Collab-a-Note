import { Button } from "@material-ui/core";
import React from "react";

const Invitation = (props) => {
  const buttonStyle = {
    margin: "10px 20px 0",
  };

  return (
    <div className="invitation-container">
      <h4>
        {props.invite.from.username} invites you to {props.invite.course.name}{" "}
        course
      </h4>
      <div className="invitation-buttons-container">
        <Button
          style={buttonStyle}
          onClick={props.onAcceptClick}
          color="primary"
        >
          Accept
        </Button>
        <Button style={buttonStyle} color="secondary">
          Deny
        </Button>
      </div>
    </div>
  );
};

export default Invitation;
