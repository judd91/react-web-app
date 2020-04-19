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


export default function ShowAll() {
    return (
      <div className="showall">
        <AllParkings />
      </div>
    )
}
// function infomodal(datainfo){
//   return(
//     <Modal isOpen={modal} fade={false}>
//       <ModalBody>datainfo</ModalBody>
//     </Modal>
//   )
// }

function AllParkings() {
  const aparcamientos = data.item;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const infomodal = (datainfo) => {
    return(
      <Modal isOpen={modal} fade={false}>
        <ModalBody>{datainfo}</ModalBody>
      </Modal>
    )
  }
  return (
    <Row >
      <Table className="parkings-table">
        <thead>
          <tr>
            <th>Name</th>
            {/* <th>Type</th> */}
            <th>Area</th>
            <th>District</th>
            <th>Adress</th>
            <th>P.C.</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
        {aparcamientos.map(element => {
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
                    <Button onClick={infomodal(element.TELEFONO)}><FaPhone/></Button>
                    <Button onClick={toggle}><FaRegEnvelope/></Button>
                    <Button onClick={toggle}><FaMapMarkerAlt/></Button>
                  </ButtonGroup>
                  <infomodal/>

                  {/* <Button color="primary" onClick={toggle}>+</Button> */}
                  {/* <Modal isOpen={modal} fade={false} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{name_p[1]}</ModalHeader>
                    <ModalBody>
                      <div className="modalitem">
                        <p>Time: {element.HORARIO}</p>
                        <p>Telephone: {element.TELEFONO}</p>
                        <p>Type: {element.DESCRIPCION}</p>
                        <p>Email: {element.EMAIL}</p>
                        <p>Url: {element["CONTENT-URL"]}</p>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                      <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                  </Modal> */}
                  {/* <UncontrolledCollapse toggler={"#toggler" + element.PK}>
                    <Card>
                      <CardBody>
                        <p>{element.NOMBRE[0]}</p>
                        <p>{element.HORARIO}</p>
                        <p>{element.TELEFONO}</p>
                        <p>{element.TIPO}</p>
                        <p>{element.EMAIL}</p>
                        <p>{element["CONTENT-URL"]}</p>

                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>  */}
                
                </td>
                           
              </tr>
                )})}
          </tbody>
        </Table>
      </Row>
    )
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
