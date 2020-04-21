import React, { Component, useState  } from 'react';
import ReactDOM from 'react-dom';
import data from './data/file.js';
import { UncontrolledCollapse, Dropdown , DropdownToggle, DropdownMenu, DropdownItem, Card, Button, CardTitle, CardText, Row, Col, Table , ButtonGroup , CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Collapse} from 'reactstrap';
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
      index: null,
      activeIndex: null,
      item: null,
      activeButton: null
    }

  }

  showCard = (reg, j, i, element) => () => {
    // if(reg != this.state.index){
      // this.state.isOpen = true;
    // }
    // if(this.state.activeButton == j || this.state.activeButton == 0){
      this.setState({ 
        index: reg,
        activeIndex: (this.state.activeIndex === i && this.state.activeButton === j) ? null : i,
        activeButton: j,
        item: element
        // code: <Collapse isOpened={activeIndex === index}> {reg} </Collapse >
      })
    
    console.log(this.state.activeIndex, " ", j, " ", i)
    
  };

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
        {this.aparcamientos.map((element, i) => {
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
                <Button color="primary" id={"toggle_" + element.PK + "1"} onClick= {this.showCard(element.PK, 1, i, element.TELEFONO) }> <FaPhone/> </Button>
                <Button color="primary" id={"toggle_" + element.PK + "2"} onClick= {this.showCard(element.PK, 2, i, element.EMAIL)}> <FaRegEnvelope/> </Button>
                <Button color="primary" id={"toggle_" + element.PK + "3"} onClick= {this.showCard(element.PK, 3, i, element.DIRECCION) }> <FaMapMarkerAlt/> </Button>
                  {/* <ButtonDropGroup element={element.TELEFONO} pk={element.PK + "1"} icon="iconPhone"/>
                  <ButtonDropGroup element={element.EMAIL} pk={element.PK + "2"} icon="iconMail"/>
                  <ButtonDropGroup element={element.DIRECCION} pk={element.PK} icon="iconAdd"/> */}
                  <Button href={element["CONTENT-URL"]}><FaGlobe/></Button>
                </ButtonGroup>
                {/* {console.log(this.state.index)}
                {console.log(this.state.isOpen)} */}
                {/* {this.state.code} */}
                <Collapse isOpen={this.state.activeIndex === i}> {this.state.item} </Collapse >
                {/* {this.state.isOpen ?  : null} */}
                {/* <ButtonDropGroup element={element.TELEFONO} collid={this.index}/> */}
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
      <div>      
        {/* <Button color="primary" id={"toggler_" + this.props.pk}>
        {but}
        </Button> */}
        <UncontrolledCollapse toggler={"#toggler_" + this.props.collid}>
                  <Card>
                    <CardBody>
                    {this.props.element}
                    </CardBody>
                  </Card>
                </UncontrolledCollapse>
      </div>   
      // <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
      //   <DropdownToggle >{but}</DropdownToggle> 
      //   <DropdownMenu><DropdownItem>{this.props.element}</DropdownItem></DropdownMenu>
      // </Dropdown >
    )
  }


}