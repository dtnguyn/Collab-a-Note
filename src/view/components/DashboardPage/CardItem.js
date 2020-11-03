import Card from "react-bootstrap/Card";
import React from 'react';
import "../../styles/DashBoard.css"

const CardItem = (props) => {

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

        <Card
            className="card-item-container"
            onClick={props.onClick}
            >
            <Card.Img variant="top" src={props.imgUrl} className="card-item-image" />
            <Card.Body>
                <Card.Title className="card-item-title">{props.title}</Card.Title>
                <Card.Subtitle className="card-subtitle">{props.subtitle}</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}


export default CardItem