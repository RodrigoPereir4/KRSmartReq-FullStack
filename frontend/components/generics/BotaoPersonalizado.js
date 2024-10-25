import styled from "styled-components";

const Botao = styled.button`
    width: 150px;
    height: 45px;
    background-color:${(props) => (props.color === "amarelo" ? "#F8AE27" : "#FF2600")};
    color: ${(props) => (props.color !== "amarelo" ? "#ffffff" : "#584439")};

    border-radius: 8px;
    border: none;
    
    font-size: 18px;
    font-weight: 500;
    
    cursor: pointer;

    &:hover{
        background-color:${(props) => (props.color === "amarelo" ? "#D2922A" : "#911600")};
    }
`

export default function BotaoPersonalizado(props){
    return(
        <Botao color={props.color}>{props.text}</Botao>
    );
}