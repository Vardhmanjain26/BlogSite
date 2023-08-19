import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const Container = styled.div`
  background-color: #F8F8F8;
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  grid-template-areas: 'col1 col2';
  margin: 0rem calc((100vw - 1300px) / 2);
`;

export const SearchInput = styled.input`
    padding: 10px 15px;
    border: 1px solid grey;
    width: 8rem;
    background-color: white;
    border-radius: 5px;
    transition: .2s;
`;

export const Wrapper1 = styled.div`
    position: fixed;
    grid-area: col1;
    padding: 2rem;
`;

export const Wrapper2 = styled.div`
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0rem 5rem 0  0;
  padding: 2rem;
  grid-area: col2;
  z-index: 10;
`;

export const PostWrapper = styled.div`
    background-color : #b78c3a4d;
    box-shadow: 5px 6px 40px rgba(0, 0, 0, 0.5);
    font-size: 18px;
    padding: 1rem;
    word-spacing: 6px;
    margin: 0 0 5rem;
`;

export const PostWrapper2 = styled.div`
    background-color : lightyellow;
    box-shadow: 5px 6px 40px rgba(0, 0, 0, 0.5);
    font-size: 18px;
    padding: 1rem;
    word-spacing: 6px;
    margin-bottom : 20px;
`;

export const Starting = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 0 1rem;
    margin-bottom : 15px;
`
export const Heading = styled.div`
    font-size: 25px;
    font-weight : 700;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
`
export const ReadTime = styled.div`
    
`
export const Title = styled(LinkR)`
  font-size: 24px;
  font-weight: bolder;
  text-decoration: none;
  color: black;
  margin: 0 0 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom : 100px;
`
export const Description = styled.div`
    margin: 0 0 1rem;
    
`
export const Ending = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`
export const Likes = styled.div`
    
`
export const Comments = styled.div`
    
`
export const Date = styled.div`
    
`
export const Name = styled.h3`
    color : grey;
`
export const Email = styled.span` 
    color : gray;
`
export const Gender = styled.span`
  
`
export const Image = styled.img`
  margin: 1rem 0;
  width: 9rem;
  border-radius: 10000px;
  cursor: pointer;
`
export const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: none;
    font-size: 20px;
    margin-bottom: 1rem;
    background-color : lightgrey;
`
export const Button = styled.button`
  padding: 8px;
  font-size: 16px;
  font-weight: bolder;
  cursor: pointer;
  border-radius: 5px;
  background: #5be505;
  color: white;
  border: none;
  background: ${({ green }) => (green ? "#5be505" : "black")};
  margin-bottom : 20px;
`

export const InputWrapper = styled.div`
  display: ${({ show }) => (show === 1 ? "" : "none")};
  margin: 2rem 1rem;
`

export const EButton = styled.button`
font-size: 30px;
border-radius: 4px;
cursor: pointer;
border-radius: 5px;
background: #f8f8f8;
border: none;
`

export const LastWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 10rem;
  margin: 1rem 0 0;
  grid-gap: 10px;
`
export const Topic = styled.div`
    font-size : 30px;
    font-weight : 700;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`