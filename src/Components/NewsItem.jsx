import React from 'react'
import styled from 'styled-components'
import mobile, { tab } from '../responsive'
const Container=styled.div`
    width:30%;
    margin:1rem;
    position: relative;
    background-color: white;
    /* webkitBoxShadow:0px 0px 10px -10px rgba(0, 0, 0, 0.75); */
    box-shadow: 0px 0px 25px -10px rgba(0, 0, 0, 0.75);
    ${tab({
        width:'45%',
        margin:'0.5rem'
    })}
    img{
        width:100%;
    }
    span{
        background-color: #cc3333;
        position: absolute;
        top:0;
        left:0;
        color:white;
        font-weight:700;
        padding:0.1rem 0.4rem;
        font-size:0.8rem;
        border-radius:40px;
        transform: translate(-10%,-30%);
        ${mobile({
            fontSize:'0.4rem'
        })}
    }
    >div{
        margin:0 1rem;
        display: flex;
        flex-direction: column;
        >h5{
            font-size:1.2rem;
            margin:0.4rem 0;
            ${mobile({
                fontSize:'0.6rem'
            })}
        }
        >p{
            margin:0;
            ${mobile({
                fontSize:'0.5rem'
            })}
        }
        >a{
            background-color: #0dcaf0;
            color:black;    
            font-decoration:none;
            width:max-content;
            text-decoration: none;
            font-size: 0.8rem;
            padding: 0.1rem 0.2rem;
            margin: 0.5rem 0;
            font-weight: 600;
            border-radius:5px;
            ${mobile({
                fontSize:'0.5rem'
            })}
        }
    }
   
`
const NewsItem = ({tittle,description,imageUrl,url,author,date,source}) => {
    return (
        <Container>
                <span>
                    {source}
                </span>
                <img src={imageUrl?imageUrl:"https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE="}  alt="..."/>

                <div>
                    <h5>{tittle}</h5>
                    <p>{description}...</p>
                    <a href={url} target="_blank">Read More</a>
                    <p style={{color:'gray'}}><small className="text-muted">By {!author?"Unknown":author} - {new Date(date).toGMTString()}</small></p>
                </div>
        </Container>
      )
}

export default NewsItem
