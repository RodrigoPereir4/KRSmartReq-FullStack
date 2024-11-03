"use client";

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import "@/app/styles/globals.css";
import "@/app/styles/hamburguer.css";

import userImagem from "../../images/user2.png";
import logoImage from "../../images/logo.png";

import ButtonBar from "./ButtonBar";

const Container = styled.div`
  min-width: 230px;
  height: 100vh;
  padding: 20px;
  
  display:  ${props => !props.activateHamburguer ? 'none' : 'flex'};
  align-items: center;
  flex-direction: column;
  
  position: ${props => props.activateHamburguer ? 'absolute' : 'none'};
  z-index: ${props => props.activateHamburguer ? 2 : ''};

  background-color: #fcaf38;

  .logo{
    margin: 30px 25px;
  }

  transition: all 0.2s ease-in-out;
`;

const ListaBotoes = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`

const LinhaDividir = styled.div`
  background-color: #584438;

  width: 100%;
  height: 2px;
  margin: 15px;

  border: 0.2px solid black;
`;


export default function Navbar() {

  //HAMBURGER
  const [activateHamburguer, setActivateHamburguer] = useState(false);
    
  const handleActivateHamburger = () => {
      setActivateHamburguer((prev) => !prev);
  };

  return (
    <>
      <ul onClick={handleActivateHamburger} className={activateHamburguer ? 'activate' : ''}>
        <li className="hamburguer"> </li>
        <li className="hamburguer"></li>
        <li className="hamburguer"></li>
      </ul>
      <Container activateHamburguer={activateHamburguer}>
        <Image className="logo" alt="Logo da Dengo" src={logoImage}/>

        <ListaBotoes>
          <ButtonBar imageSrc={userImagem} text="Realizar Requisição"/>

          <LinhaDividir />

          <ButtonBar imageSrc={userImagem} text="Botão 01"/>
          <ButtonBar imageSrc={userImagem} text="Botão 02"/>
          <ButtonBar imageSrc={userImagem} text="Botão 03"/>
          <ButtonBar imageSrc={userImagem} text="Botão 04"/>
          <ButtonBar imageSrc={userImagem} text="Botão 05"/>
          <LinhaDividir />
        

          <ButtonBar imageSrc={userImagem} text="Botão para sair"/>
        </ListaBotoes>
      </Container>
    </>
  );
}
