import Card from "react-bootstrap/Card";
import React from 'react';
import "../../styles/DashBoard.css"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


const options = [
    "Edit",
    "Change cover image",
    "Delete"
]

const ITEM_HEIGHT = 48;

const CardItem = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  

    return (
        // <div className="card-item-container"
        //     onClick={props.onClick}
        // >
        //     <img 
        //         className="card-item-image"
        //         src={props.imgUrl}/>
        //     <h3 className="card-item-title">{props.title}</h3>
        //     <p className="card-item-subtitle">{props.subtitleOne}</p>
        //     <p className="card-item-subtitle">{props.subtitleTwo}</p>
        //     <p className="card-item-subtitle">{props.subtitleThree}</p>
        // </div>

        <Card className="card-item-container" >
            <div onClick={props.onClick}>
                <Card.Img variant="top" src={props.course.coverImg} className="card-item-image" />
                <Card.Body>
                    <Card.Title className="card-item-title">{props.course.name}</Card.Title>
                    <Card.Subtitle className="card-subtitle">{props.course.teacher}</Card.Subtitle>
                </Card.Body>
            </div>
            
            <div className="card-item-menu">
                <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                    }}
                >
                    <MenuItem onClick={() => {
                        props.openEditForm()
                        handleClose()
                    }}>
                        Edit
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        Change cover image
                    </MenuItem>

                    <MenuItem onClick={() => props.deleteCourse(props.course.id)}>
                        Delete
                    </MenuItem>
                </Menu>
            </div>
            

        </Card>
    )
}


export default CardItem