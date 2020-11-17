import React from "react";
import UserImage from "../shared/UserImage";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons/";

const CommentItem = (props) => {
  const deleteButtonStyle = {
    width: "30px",
    height: "30px",
    margin: "5px",
  };

  return (
    <div className="row">
      <div className="col-lg-1 col-md-0">
        <UserImage imgUrl={props.comment.author.avatar} />
      </div>

      <div className="col-lg-11 col-md-12">
        <div className="comment-content-container">
          <p className="comment-username">{props.comment.author.username}</p>
          <p className="comment-creation-date">
            {props.comment.creationDate.toLocaleDateString("en-US")}
          </p>
          <p className="comment-content">{props.comment.content}</p>
          <div className="comment-buttons">
            <IconButton
              onClick={() => {
                props.onClickDelete(props.comment.id);
              }}
              style={deleteButtonStyle}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
