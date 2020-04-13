import React, { Component, useState  } from 'react';
import ReactDOM from 'react-dom';
import data from './data/treeData.js'
import "./css/ParkingsCollapse.css"
import { Button, CardBody, CardText, Row, Col, Collapse } from 'reactstrap';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

export default function ParkingsCollapse() {
    return (
      <div className="parkingscollapse">
        <GetTree />        
      </div>
    )
}

function GetTree(){
  const elements = data.children;
  const [open, setOpen] = useState(false);
  return (
    <Row >
      <Accordion>
      {elements.map((element,i) => ( 
      <Card>
          <Accordion.Toggle as={Card.Header} variant="link" eventKey={"key_"+i.toString()}>
            {element.name}
          </Accordion.Toggle>
        <Accordion.Collapse eventKey={"key_"+i.toString()}>
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Card>
      ))}
    </Accordion>
    </Row>
  )

}
// ReactDOM.render(<ParkingsCollapse/>, document.getElementById('app'));
