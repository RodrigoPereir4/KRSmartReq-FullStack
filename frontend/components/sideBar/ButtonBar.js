'use client'

import styled from "styled-components";
import Image from "next/image";

const Button = styled.button`
    width: 100%;
    height: 35px;

    border: none;
    border-radius: 4px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;

    background-color: #584438;
    color: white;
    
    cursor: pointer;

  &:hover {
    background-color: white;
  }
`

export default function ButtonBar(props){
    return(
        <Button>
          <Image width={35} height={35} src={props.imageSrc} />
          {props.text}
        </Button>
    );
}