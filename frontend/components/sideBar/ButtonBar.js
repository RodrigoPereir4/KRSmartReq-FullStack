'use client'

import styled from "styled-components";
import Image from "next/image";

const Button = styled.button`
    width: 100%;
    height: 35px;
    padding: 10px 30px;

    border: none;
    border-radius: 4px;

    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 12px;

    background-color: #584438;
    color: white;
    
    cursor: pointer;

  &:hover {
    background-color: #593A39;
  }
`

export default function ButtonBar(props){
    return(
        <Button onClick={props.onClick}>
          <Image width={20} height={20} src={props.imageSrc} alt="Imagem de um Icone"/>
          {props.text}
        </Button>
    );
}