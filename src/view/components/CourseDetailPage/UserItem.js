import { IconButton } from "@material-ui/core";
import { Delete, Remove } from "@material-ui/icons";
import React from "react";
import UserImage from "../shared/UserImage";

const UserItem = (props) => {
  return (
    <div className="user-item-container">
      <UserImage imgUrl={props.user.avatar} />
      <div>
        <h4 className="user-item-name">{props.user.username}</h4>
        <h4 className="user-item-email">{props.user.email}</h4>
      </div>
      <IconButton>
        <Delete />
      </IconButton>
    </div>
  );
};

export default UserItem;
