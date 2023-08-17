import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  grid-template-areas: 'col1 col2';
  padding: 0rem calc((100vw - 1300px) / 2);
  @media screen and (max-width: 1300px) {
    grid-template-areas: 'col1 col1' 'col2 col2';
  grid-template-columns: 1fr;
  }
`;
export const Wrapper1 = styled.div`
    position: fixed;
    grid-area: col1;
    margin: 0;
    padding: 2rem;
    @media screen and (max-width: 1300px) {
        position: relative;
  }
`;

export const Wrapper2 = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0rem 5rem 0  0;
  padding: 2rem;
  grid-area: col2;
`;

export const SearchInput = styled.input`
    padding: 14px 19px;
    border: 1px solid grey; 
    background-color: white;
    border-radius: 5px;
    transition: .2s;
`

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
    font-size : 17px;
`
export const Title = styled(LinkR)`
    font-size: 24px;
    font-weight: bolder;
    text-decoration: none;
    color: black;
    margin: 0 0 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin-bottom : 10px;
`
export const Description = styled.div`
    margin: 0 0 1rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    
`
export const Ending = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`
export const Likes = styled.div`
    font-size : 30px;
    
`
export const Comments = styled.div`
font-size : 30px;
`
export const Date = styled.div`
    
`
export const Topic = styled.div`
    font-size : 30px;
    font-weight : 700;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`
export const RTopic = styled.div`
    margin: 1rem;
    cursor: pointer;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size : 30px;
`
