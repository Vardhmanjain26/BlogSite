import React from "react";
import { animateScroll as scroll } from "react-scroll";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavBtnWrap,
  NavBtn1,
  NavBtn2,
  NavBtnLink1,
  NavBtnLink2,
  Image
} from "./NavbarElements";
import profileImg from "./pic.jpg"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const toggleHome = () => {
    scroll.scrollToTop();
  };

  const RenderMenu = () => {
    if (window.localStorage.getItem("jwtToken")) {
      return (
        <>
          <NavBtn1>
            <Image src={profileImg} onClick={() => navigate("/myDetails")}></Image>
          </NavBtn1>
          <NavBtn2>
            <NavBtnLink1  to="/logout">Log Out</NavBtnLink1>
          </NavBtn2>
        </>
      )
    }
    else {
      return (
        <>
          <NavBtn1>
            <NavBtnLink1  to="/signup">Sign Up</NavBtnLink1>
          </NavBtn1>
          <NavBtn2>
            <NavBtnLink2  to="/signin">Sign In</NavBtnLink2>
          </NavBtn2>
        </>
      )
    }
  }
  return (
    <>
      <Nav >
        <NavbarContainer>
          <NavLogo  to="/" onClick={toggleHome}>
            BlogSite
          </NavLogo >
          <NavBtnWrap>
            <RenderMenu />
          </NavBtnWrap>
        </NavbarContainer>
      </Nav>
    </>
  );
};

export default Navbar;
