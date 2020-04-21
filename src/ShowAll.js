import React, { Component, useState  } from 'react';
import ReactDOM from 'react-dom';
import data from './data/file.js';
import { Dropdown , DropdownToggle, DropdownMenu, DropdownItem, Card, Button, CardTitle, CardText, Row, Col, Table , ButtonGroup , CardBody, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "./css/ShowAll.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import {FaPhone} from "react-icons/fa";
import {FaGlobe} from "react-icons/fa";

export default class ShowAll extends Component{
  constructor (props){
    super(props)
    this.aparcamientos = data.item;

    this.state = {
      isOpen: false,
    }

  }

  render(){
    return (
      <div className="showall">
        <Row >
      <Table className="parkings-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Area</th>
            <th>District</th>
            <th>Type</th>
            <th>Description</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
        {this.aparcamientos.map(element => {
          const name_p = element.NOMBRE.split(".")

          return (
              <tr key={element.PK}>
                <td>{name_p[1]}</td>
                <td>{element.BARRIO}</td>
                <td>{element.DISTRITO}</td>
                <td>{name_p[0]}</td>
                {/* <td>{element.DESCRIPCION}</td> */}
                <td>
                <ButtonGroup size="sm">
                  <ButtonDropGroup element={element.TELEFONO} icon="iconPhone"/>
                  <ButtonDropGroup element={element.EMAIL} icon="iconMail"/>
                  <ButtonDropGroup element={element.DIRECCION} icon="iconAdd"/>
                  <Button href={element["CONTENT-URL"]}><FaGlobe/></Button>
                </ButtonGroup>
                </td>                           
              </tr>
                )})}
          </tbody>
        </Table>
      </Row>
      </div>
    )
  }
}


class ButtonDropGroup extends Component{
  constructor (props){
    super(props)  
    this.state = {
      isOpen: false
    }
    // this.toggle = this.toggle.bind(this);
  }
  
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  
  render() {
    console.log("WEP")
    let but;
    if(this.props.icon == "iconPhone" ){
      but = <FaPhone/>
    } else if ( this.props.icon == "iconMail" ){
      but = <FaRegEnvelope/>
    } else if( this.props.icon == "iconAdd" ){
      but = <FaMapMarkerAlt/>
    }
    return (       
      <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
        <DropdownToggle >{but}</DropdownToggle> 
        <DropdownMenu><DropdownItem>{this.props.element}</DropdownItem></DropdownMenu>
      </Dropdown >
    )
  }


}