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
import ShowAll from './ShowAll.js';
import ParkingsCollapse from './ParkingsCollapse.js'

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
        <Route path="/districts" children={<ParkingsCollapse />} />
        {/* <Route path="/districts" children={<ParkingsTree />} /> */}
        <Route path="/all" children={<ShowAll />} />
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
      <IntroJumbo />
      <div className="btn-group">
        <Link to="/districts" type="button" className="btn btn-secondary butcustom">By Districts</Link>
        <Link to="/all" type="button" className="btn btn-secondary butcustom">Show all</Link>
      </div>      
    </div>
  )
}

function IntroJumbo(){
  return(
    <div className="jumbotron ">
        <h1 className="display-4">Find your perfect parking in Madrid!</h1>
        <p className="lead">You can search the best parking option close to you in each area of Madrid</p>
        <hr className="my-4"></hr>
        <div className="searching" >
        <form className="form-inline justify-content-center">
          <input className="form-control mr-sm-2" type="search" placeholder="Search location" aria-label="Search"></input>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        </div>

      </div>
  )
}

