import React from 'react';
import data from './data/file.js';
import { Card, Button, CardTitle, CardText, Row, Col, Alert } from 'reactstrap';
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
import {FaSistrix} from "react-icons/fa";


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
   
      {/* <SearchingBar /> */}
    </div>
  )
}

// function SearchingBar(){
//   const [searchTerm, setSearchTerm, isOpen] = React.useState("");
//  const [searchResults, setSearchResults] = React.useState([]);
//  const handleChange = event => {
//     setSearchTerm(event.target.value);
//   };
//   React.useEffect(() => {
//     const results = aparcamientos.filter(parking =>
//       // console.log(parking)
//       parking.NOMBRE.toLowerCase().includes(searchTerm)
//     );
//     setSearchResults(results);
//   }, [searchTerm]);

//   const showSearching = event => {
//     // isOpen = !isOpen
//   };
//   return(
//     <div>


// <form className="form-inline justify-content-center">
//           <input className="form-control mr-sm-2" type="search" placeholder="Search" value={searchTerm}
//         onChange={handleChange}aria-label="Search"></input>
//           <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={showSearching} ><FaSistrix/></button>
//         </form>
//         <div>
//       <Alert>
//       {searchResults.map((item,i) => (
//         <p key={i}>{item.NOMBRE}</p>
//       ))}
//     </Alert>
//     </div>
//     </div>

//   )

// }

function IntroJumbo(){
 
  return(

    <div className="jumbotron ">
        <h1 className="display-4">Find your perfect parking in Madrid!</h1>
        <p className="lead">You can search the best parking option for you in each area of Madrid.</p>
        <hr className="my-4"></hr>
        <div className="btn-group">
        <Link to="/all" type="button" className="btn btn-secondary butcustom">Search</Link>
        <Link to="/districts" type="button" className="btn btn-secondary butcustom">Districts</Link>
        <Link to="/parking/:id" type="button" className="btn btn-secondary butcustom">Map</Link>

      </div>   
      </div>
      

  )
}

