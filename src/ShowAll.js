import React, { Component } from 'react';
import data from './data/file.js';
import { Alert, Button, Row, Col, Table , ButtonGroup , Collapse} from 'reactstrap';
import "./css/ShowAll.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import {FaPhone} from "react-icons/fa";
import {FaParking} from "react-icons/fa";
import {FaInfoCircle} from "react-icons/fa";
import {FaSistrix} from "react-icons/fa";



import {FaGlobe} from "react-icons/fa";

export default class ShowAll extends Component{
  constructor (props){
    super(props)
    this.aparcamientos = data.item;

    this.state = {
      index: null,
      activeIndex: null,
      item: null,
      activeButton: null,
      // searchTerm:"",
      searchResults: this.aparcamientos

    }

  }

   handleChange = event => {
    //  console.log(event.target.value)
    if(event.target.value.length > 2){
      const searchTerm = event.target.value.toLowerCase()
      const results = this.aparcamientos.filter(parking =>
       // console.log(parking)
       (parking.NOMBRE.toLowerCase().includes(searchTerm) || parking.DISTRITO.toLowerCase().includes(searchTerm) ||
       parking.BARRIO.toLowerCase().includes(searchTerm))
     );
     this.setState({ 
       // searchTerm: event.target.value,
       searchResults: results
     })
    } else {
      this.setState({ 
        // searchTerm: event.target.value,
        searchResults: this.aparcamientos
      })
     }
    
     
  };

  showCard = (reg, j, i, element) => () => {
      this.setState({ 
        index: reg,
        activeIndex: (this.state.activeIndex === i && this.state.activeButton === j) ? null : i,
        activeButton: j,
        item: element ? element : "No information available."
      })
    
    // console.log(this.state.activeIndex, " ", j, " ", i)
    
  };

  render(){
    return (
      <div className="showall">
        <form className="searching form-inline justify-content-center">
        {/* <FaSistrix/> */}
          <input className="form-control col-sm-6" type="search" placeholder="Search by Name, District or Area" value={this.state.searchTerm}
        onChange={this.handleChange} aria-label="Search"></input>
          {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><FaSistrix/></button> */}
        </form>
        <Row >
      <Table className="parkings-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Area</th>
            <th>District</th>
            <th>Type</th>
            <th>Details</th>
            <th>Information</th>
          </tr>
        </thead>
        <tbody>
        {this.state.searchResults.map((element, i) => {
          const name_p = element.NOMBRE.split(".")
          
          return (
              <tr key={element.PK}>
                <td>{name_p[1]}</td>
                <td>{element.BARRIO}</td>
                <td>{element.DISTRITO}</td>
                <td>{name_p[0]}</td>
                <td>
                  <ButtonGroup size="md">
                    <Button data-toggle="tooltip" data-placement="top" title="Telephone" color="primary" id={"toggle_" + element.PK + "1"} onClick= {this.showCard(element.PK, 1, i, element.TELEFONO) }> <FaPhone/> </Button>
                    <Button data-toggle="tooltip" data-placement="top" title="Email" color="primary" id={"toggle_" + element.PK + "2"} onClick= {this.showCard(element.PK, 2, i, element.EMAIL)}> <FaRegEnvelope/> </Button>
                    <Button data-toggle="tooltip" data-placement="top" title="Address" color="primary" id={"toggle_" + element.PK + "3"} onClick= {this.showCard(element.PK, 3, i, element.DIRECCION) }> <FaMapMarkerAlt/> </Button>
                    <Button data-toggle="tooltip" data-placement="top" title="Details" color="primary" id={"toggle_" + element.PK + "4"} onClick= {this.showCard(element.PK, 4, i, element.DESCRIPCION) }> <FaInfoCircle/> </Button>

                    {/* <Button data-toggle="tooltip" data-placement="top" title="Go to the website" href={window.open(element["CONTENT-URL"])} ><FaGlobe/></Button> */}
                  </ButtonGroup>
                  {/* <Collapse className="cardforinfo" isOpen={this.state.activeIndex === i}> <Alert color="primary">{this.state.item}</Alert> </Collapse > */}
                </td>   
                <td className="details-table"><Collapse className="cardforinfo" isOpen={this.state.activeIndex === i}> <Alert color="primary">{this.state.item}</Alert> </Collapse ></td>
                        
              </tr>
                )})}
          </tbody>
        </Table>
      </Row>
      </div>
    )
  }
}


// class ButtonDropGroup extends Component{
//   constructor (props){
//     super(props)  
//     this.state = {
//       isOpen: false
//     }
//     // this.toggle = this.toggle.bind(this);
//   }
  
//   toggle = () => {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }
  
  
//   render() {
//     console.log("WEP")
//     let but;
//     if(this.props.icon == "iconPhone" ){
//       but = <FaPhone/>
//     } else if ( this.props.icon == "iconMail" ){
//       but = <FaRegEnvelope/>
//     } else if( this.props.icon == "iconAdd" ){
//       but = <FaMapMarkerAlt/>
//     }
//     return (    
//       <div>      
//         {/* <Button color="primary" id={"toggler_" + this.props.pk}>
//         {but}
//         </Button> */}
//         <UncontrolledCollapse toggler={"#toggler_" + this.props.collid}>
//                   <Card>
//                     <CardBody>
//                     {this.props.element}
//                     </CardBody>
//                   </Card>
//                 </UncontrolledCollapse>
//       </div>   
//       // <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
//       //   <DropdownToggle >{but}</DropdownToggle> 
//       //   <DropdownMenu><DropdownItem>{this.props.element}</DropdownItem></DropdownMenu>
//       // </Dropdown >
//     )
//   }


// }