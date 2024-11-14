import styled from "styled-components";

const Botao = styled.button`
    width: ${(props) => props.width || '150px'}; 
    height: ${(props) => props.height || '45px'};
    background-color:${(props) => (props.color === "amarelo" ? "#F8AE27" : props.color === "marrom" ? "#583939" : "#FF2600")};
    color: ${(props) => (props.color !== "amarelo" ? "#ffffff" : props.color === "marrom" ? "#F8AE27" : "#584439")};

    border-radius: 8px;
    border: none;
    
    font-size: 18px;
    font-weight: 500;
    
    cursor: pointer;

    &:hover{
        background-color:${(props) => (props.color === "amarelo" ? "#D2922A" : props.color === "marrom" ? "#0F3434" : "#911600")};
    }
`

export default function BotaoPersonalizado(props){
    return(
        <Botao width={props.width} height={props.height} type={props.type} onClick={props.onClick} color={props.color}>{props.text}</Botao>
    );
}