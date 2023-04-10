import {css} from "styled-components"

export const mobile=(props)=>{
    return css`
        @media only screen and (max-width:600px){
            ${props}
        }
    `
};
export const tab=(props)=>{
    return css`
        @media only screen and (max-width:1000px){
            ${props}
        }
    `
};

export default mobile; 