import React, { Component, useState  } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText
} from 'reactstrap';

const topbarStyle = {
  width: '100%',
  position: 'fixed',
  zIndex: '10' 
};

// export default class Topbar extends Component {
  export default function Topbar () {
    // const [isOpen, setIsOpen] = useState(false);
  
    // const toggle = () => setIsOpen(!isOpen);
  
    return (
      // <div>
        <Navbar color="dark" dark expand="md" style={topbarStyle}>
          <NavbarBrand href="/">Web App React</NavbarBrand>
          {/* <NavbarToggler onClick={toggle} /> */}
          {/* <Collapse isOpen={isOpen} navbar> */}
            <Nav className="mr-auto" navbar>
              <NavItem>
                Distritos
              </NavItem>
              <NavItem>
                {/* <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink> */}
              </NavItem>
            </Nav>
            <NavbarText>Aparcamientos Madrid</NavbarText>
          {/* </Collapse> */}
        </Navbar>
      // </div>
    );
  }







