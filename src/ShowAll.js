import React, { Component, useState  } from 'react';
import ReactDOM from 'react-dom';
import data from './data/file.js';
import { Card, Button, CardTitle, CardText, Row, Col, Table , ButtonGroup , CardBody, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
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


export default class ShowAll extends Component{
  constructor (props){
    super(props)
    this.aparcamientos = data.item;

    this.state = {
      modalinfo: "",
      modaltitle: ""
    }
    this.handleShow = this.handleShow.bind(this);

    this.show = false
  }
  handleShow(e, id, info) {
    if(info == null){
      this.setState({ 
        modalinfo: "There is no information",
        modaltitle: id.NOMBRE
      })
    } else {
      console.log(id)
      this.setState({ 
        modalinfo: info,
        modaltitle: id.NOMBRE
      })
    }
     
    this.show = !this.show;
    console.log(this.show)
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
            <th>Adress</th>
            <th>P.C.</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
        {this.aparcamientos.map(element => {
          const name_p = element.NOMBRE.split(".")
          return (
            // <Col xs="5" sm="4" md="3" key={element.PK}>
              <tr key={element.PK}>
                <td>{name_p[1]}</td>
                {/* <td>{element.NOMBRE[0]}</td> */}
                <td>{element.BARRIO}</td>
                <td>{element.DISTRITO}</td>
                <td>{element.DIRECCION}</td>
                <td>{element["CODIGO-POSTAL"]}</td>
                <td>
                  {/* <Button color="primary" id={"toggler" + element.PK} style={{ marginBottom: '1rem' }}> + </Button> */}
                  <ButtonGroup size="sm">
                    <Button onClick={(e)=>this.handleShow(e, element, element.TELEFONO)} ><FaPhone/></Button>
                    <Button onClick={(e)=>this.handleShow(e, element, element.EMAIL)}><FaRegEnvelope/></Button>
                    <Button onClick={(e)=>this.handleShow(e, element, element.DIRECCION + ", " + element["CODIGO-POSTAL"] + ", Madrid")}><FaMapMarkerAlt/></Button>
                  </ButtonGroup>
                  <Modal isOpen={this.show} >
                    <ModalHeader>{this.state.modaltitle}</ModalHeader>
                    <ModalBody>{this.state.modalinfo}</ModalBody>
                    <ModalFooter>
                      <Button color="secondary" onClick={(e)=>this.handleShow(e, "" , "" )}>Cancel</Button>
                    </ModalFooter>
                  </Modal>
                  {/* <infomodal/> */}

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


function AllParkings() {


  // const infomodal = (datainfo) => {
  //   return(
  //     <Modal show={show} onHide={handleClose}>
  //       <ModalBody>{datainfo}</ModalBody>
  //     </Modal>
  //   )
  // }

  // const toggle = () => setModal(!modal);
  
  // return (
    
  //   )
}





{/* 
            <Card className="card text-white bg-info mb-3 parkings-card" >
              <div className="card-header card-title">{element.NOMBRE[1]}</div>
              <div className="card-content">
                <CardText>{element.DIRECCION}</CardText>
                <CardText>{element.BARRIO}, {element.DISTRITO}</CardText>
                 <Link to={`/parking/${element.PK}`}> <Button >See on map</Button> </Link> 
                <a className="btn btn-primary" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseExample">
    Link with href
  </a>
              </div>
            </Card>
            <div className="collapse" id="collapseExample">
              <div className="card card-body">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
              </div>
            </div> 
          </Col>*/}



// ReactDOM.render(<ShowAll/>, document.getElementById('app'));
