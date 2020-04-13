import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import data from './data/file.js';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";


export default function ShowAll() {
    return (
      <div className="showall">
        <AllParkings />
      </div>
    )
}

function AllParkings(){
  const aparcamientos = data.item;
  return (
      <Row >
        {aparcamientos.map(element => (
          <Col xs="5" sm="4" md="3" key={element.PK}>
            <Card className="cardsType" body>
              <CardTitle>{element.NOMBRE}</CardTitle>
              <CardText>{element.DIRECCION}</CardText>
              <CardText>{element.BARRIO}, {element.DISTRITO}</CardText>
              <Link to={`/parking/${element.PK}`}> <Button >See on map</Button> </Link>
            </Card>
          </Col>
        ))}
      </Row>
  )
}

// ReactDOM.render(<ShowAll/>, document.getElementById('app'));
