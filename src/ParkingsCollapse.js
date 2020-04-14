import React, { Component, useState  } from 'react';
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
  }
  render() {
    return (
      <div className="parkingscollapse">
        <Row >
          <Accordion>
          { this.elements.map(({name,children},i) => {
            const todoItems = children.map((item,j) => {
              // const parkings = item.children.map((parking,k) => <p key={k}> {parking.NOMBRE} </p> )
            return (<p key={j}> {item.name} </p>)
            } 
            )
            return (
            <Card key={i}>
                <Accordion.Toggle as={Card.Header} variant="link" eventKey={"key_"+i.toString()}>
                  {name}
                </Accordion.Toggle>
              <Accordion.Collapse eventKey={"key_"+i.toString()}>
                {/* {children.map((aaa,j) => <p key={j}> {aaa.name} </p>
                  )} */}
                <Card.Body key={i}>{todoItems}</Card.Body>
                {/* {this.kids.map((item, j) =>
                  
                )}  */}
              </Accordion.Collapse>
            </Card>
    )})}
          </Accordion>
        </Row>       
      </div>
    )
  }
}

//ReactDOM.render(<ParkingsCollapse/>, document.getElementById('app'));

// export default function ParkingsCollapse() {
    
// }

function GetTree(){
  
  const [open, setOpen] = useState(false);
  
  return (
    <Row >
      <Accordion>
      {this.elements.map(({name,children},i) => (
      <Card key={i}>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey={"key_"+i.toString()}>
            {name}
          </Accordion.Toggle>
        <Accordion.Collapse eventKey={"key_"+i.toString()}>
          <Card.Body>sdsdsd</Card.Body>
          {/* {this.kids.map((item, j) =>
            
           )}  */}
        </Accordion.Collapse>
      </Card>
      ))}
    </Accordion>
    </Row>
  )

}
// ReactDOM.render(<ParkingsCollapse/>, document.getElementById('app'));
