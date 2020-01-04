import React, { Component } from 'react';
import data from './data/file.js';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import "./css/MainAparcamientos.css"

const aparcamientos = data.item

const cardsStyle = {
  height: '220',
  // minHeight: '220px',
  // maxHeight: '220px'
};



export default class MainAparcamientos extends Component {

  constructor(){
    super()
  }
  render() {
    return (
    <Row className="mainaparcamientos">
      {aparcamientos.map( element => (
        <Col sm="3" key={element.PK}>
          <Card className="cardsType" body>
            <CardTitle>{element.NOMBRE}</CardTitle>
            <CardText>{element.DIRECCION}</CardText>
            <CardText>{element.BARRIO}, {element.DISTRITO}</CardText>
            <Button>Go somewhere</Button>
          </Card>
        </Col>
        ))}
    </Row>
    )
  }
}
