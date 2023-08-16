import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
  // background: ${({ scrollnav }) => (scrollnav ? "black" : "#f9f9f9")};
  background-color : #83c2b5c2;

  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  position: sticky;
  top: 0;
  z-index: 20;
  @media screen and(max-width:960px) {
    transition: 0.8s all ease;
  }
`;

export const NavbarContainer = styled.div`
  display: flex;
  // background: ${({ scrollnav }) => (scrollnav ? "black" : "#f9f9f9")};
  background-color : #83c2b5c2;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
  max-width: 1100px;
`;

export const NavLogo = styled(LinkR)`
  color: white;
  justify-self: flex-start;
  cursor: pointer;
  display: flex;
  padding: -3px;
  align-items: center;
  font-weight: bolder;
  text-decoration: none;
  font-size: 1.8rem;
  @media screen and (max-width: 1200px) {
    margin-right: 2%;
  }
  @media screen and (max-width: 800px) {
    margin-right: 0;
  }
`;

export const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
    color: white;
  }
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -2%;
  margin-left: 17%;
  @media screen and (max-width: 1080px) {
    margin-left: 14%;
  }
  @media screen and (max-width: 990px) {
    margin-left: 4%;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  height: 80px;
`;

export const NavLinks = styled(LinkS)`
  color : white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.5rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    color: #12f84d;
  }
`;
export const NavLinkR = styled(LinkR)`
  color : white;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1.5rem;
  height: 100%;
  cursor: pointer;

  &:hover {
    color: #12f84d;
  }
`;

export const NavBtn1 = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn2 = styled.nav`
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink1 = styled(LinkR)`
  border-radius: 5px;
  background-color : #dc4c64;
  white-space: nowrap;
  padding: 10px 18px;
  color: white;
  font-size: 16px;
  outline: none;
  border: 0.2px solid black;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  float: left;

  &:hover {
    background: #12f84d;
    color: #f9f9f9;
    border: none;
    border: 0.2px solid #12f84d;
  }
`;

export const NavBtnLink2 = styled(LinkR)`
  border-radius: 5px;
  background: #4169e1;
  white-space: nowrap;
  padding: 10px 18px;
  color: #f9f9f9;
  font-size: 16px;
  outline: none;
  border: 0.2px solid #4169e1;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  float: left;

  &:hover {
    transition: all 0.2s ease-in-out;
    background: #12f84d;
    border: none;
  }
`;

export const NavBtnWrap = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};
`;

export const Image = styled.img`
  width: 50px;
  border-radius: 50%;
  margin-right: 2rem;
  cursor: pointer;
`;
