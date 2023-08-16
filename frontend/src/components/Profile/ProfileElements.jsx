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
    font-size: 18px;
    padding: 1rem;
    word-spacing: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
    margin: 0 0 5rem;
    margin-top : 10px;
`;
export const Starting = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0 0 1rem;
`
export const Heading = styled.div`
    font-size: 16px;
    
`
export const ReadTime = styled.div`
    
`
export const Title = styled(LinkR)`
    font-size: 24px;
    font-weight: bolder;
    text-decoration: none;
    color: black;
    margin: 0 0 1rem;
`
export const Description = styled.div`
    margin: 0 0 1rem;
    
`
export const Ending = styled.div`
    
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`
export const Likes = styled.div`
    
`
export const Comments = styled.div`
    
`
export const Date = styled.div`
    
`
export const Name = styled.h3`
`
export const Email = styled.span`
  
`
export const Gender = styled.span`
  
`
export const Followers = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  background: #4169e1;
  color: white;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 10rem;
    border: none;
`
export const Following = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  background: white;
  color: black;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 10rem;
  margin-top: -0.5rem;
  border: 0.5px solid black;
`
export const FollowWrapper = styled.div`
  display: grid;
  width: 50rem;
  grid-gap: 0;
`
export const Image = styled.img`
  margin: 1rem 0;
  width: 9rem;
  border-radius: 10000px;
  cursor: pointer;
`
export const Input = styled.input`
  color: black;
    width: 90%;
    padding: 8px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    margin-bottom: 0.5rem;
    background-color: rgba(39, 39, 39, 0.2);
`
export const Button = styled.button`
    padding: 8px;
  font-size: 16px;
  font-weight: bolder;
  border-radius: 4px;
  cursor: pointer;
  border-radius: 5px;
  background: #5be505;
  color: white;
  border: none;
  background: ${({ green }) => (green ? "#5be505" : "black")};
`

export const InputWrapper = styled.div`
  display: ${({ show }) => (show === 1 ? "" : "none")};
  margin: 2rem 1rem;
`

export const EButton = styled.button`
font-size: 16px;
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
    background-color: #d9d9d9;
    border-radius: 5px;
    text-align: center;
`