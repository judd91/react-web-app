import React, { Component } from 'react';
import data from './data/file.js';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import "./css/MainAparcamientos.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";
import ParkingView from './ParkingView.js';

const aparcamientos = data.item

const cardsStyle = {
  height: '220',
  // minHeight: '220px',
  // maxHeight: '220px'
};

export default function MainAparcamientos() {
  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

function ModalSwitch() {
  let location = useLocation();

  let background = location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
        <Route exact path="/" children={<Home />} />
        <Route path="/parking/:id" children={<ParkingView />} />
      </Switch>

      {/* Show the modal when a background page is set */}
      {/* {background && <Route path="/parking/:id" children={<Modal />} />} */}
    </div>
  );
}

function Home() {
  return (
    <Row className="mainaparcamientos">
      {aparcamientos.map(element => (
        <Col sm="3" key={element.PK}>
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

