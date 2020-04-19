import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import data from './data/treeData.js'
import "./css/ParkingsCollapse.css"
import { Button, CardBody, CardText, Row, Col, Collapse } from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'


export default class ParkingsCollapse extends Component {
  constructor(props) {
    super(props)
    this.elements = data.children;
    this.parkings = [];
    this.state = { 
      region:"",
      input:"" 
    };
  }

  showParkings = (parkings, reg) => () => {
    const park = parkings.map((element, k) => { const x = element.split("."); return <p key={k}>{x[1]}</p> })
    this.setState({ 
      region: <h3> Parkings in {reg}: </h3>,
      input: park
    })
  };
  
  render() {
    return (
      <div className="parkingscollapse">
        <Row>
          <Col xs="6" sm="3">
            <Accordion>
              {this.elements.map(({ name, children }, i) => {
                const todoItems = children.map((item, j) => {
                  this.parkings = item.children.map( (parking,k) => {return parking.NOMBRE } )                  
                  return (
                  <div className="btn btn-light area" key={j} onClick={this.showParkings(this.parkings, item.name)}> {item.name} </div>
                  )
                }
                )
                return (
                  <Card key={i}>
                    <Accordion.Toggle as={Card.Header} variant="link" className="cardtopark" eventKey={"key_" + i.toString()}>
                      {name}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={"key_" + i.toString()}>
                      {/* {children.map((aaa,j) => <p key={j}> {aaa.name} </p>
                  )} */}
                      <Card.Body key={i}>{todoItems}</Card.Body>
                      {/* {this.kids.map((item, j) =>                  
                )}  */}
                    </Accordion.Collapse>
                  </Card>
                )
              })}
            </Accordion>
          </Col>
          <Col>{this.state.region} {this.state.input}</Col>
        </Row>
      </div>
    )
  }
}

//ReactDOM.render(<ParkingsCollapse/>, document.getElementById('app'));

// export default function ParkingsCollapse() {

// }

// function GetTree() {

//   const [open, setOpen] = useState(false);

//   return (
//     <Row >
//       <Accordion>
//         {this.elements.map(({ name, children }, i) => (
//           <Card key={i}>
//             <Accordion.Toggle as={Card.Header} variant="link" eventKey={"key_" + i.toString()}>
//               {name}
//             </Accordion.Toggle>
//             <Accordion.Collapse eventKey={"key_" + i.toString()}>
//               <Card.Body>sdsdsd</Card.Body>
//               {/* {this.kids.map((item, j) =>
            
//            )}  */}
//             </Accordion.Collapse>
//           </Card>
//         ))}
//       </Accordion>
//     </Row>
//   )

// }
// ReactDOM.render(<ParkingsCollapse/>, document.getElementById('app'));
