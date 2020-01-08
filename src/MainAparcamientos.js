import React from 'react';
import data from './data/file.js';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import "./css/MainAparcamientos.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import ParkingView from './ParkingView.js';
import ParkingsTree from './ParkingsTree.js';

const aparcamientos = data.item

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
        <Route path="/districts" children={<ParkingsTree />} />
        <Route path="/parking/:id" children={<ParkingView />} />
      </Switch>

      {/* Show the modal when a background page is set */}
      {/* {background && <Route path="/parking/:id" children={<Modal />} />} */}
    </div>
  );
}

function Home() {
  return (
    <div className="mainaparcamientos">
      <Link to="/districts"> <Button >By Districts</Button> </Link>

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
    </div>
  )
}

