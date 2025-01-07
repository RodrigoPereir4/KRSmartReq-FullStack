"use client";
import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

import userImagem from "../../images/user2.png";
import logoImage from "../../images/logo.png";
import estoque from "../../images/estoque-bar.png";
import estoqueBrilhante from "../../images/estoque-barC.png";

import produtos from "../../images/produtos-bar.png";
import produtosBrilhante from "../../images/produtos-barC.png";

import relatorio from "../../images/relatorio-bar.png";
import relatorioBrilhante from "../../images/relatorio-barC.png";

import requisicao from "../../images/requisicao-bar.png";
import requisicaoBrilhante from "../../images/requisicao-barC.png";

import usuarios from "../../images/usuarios-bar.png";
import usuariosBrilhante from "../../images/usuarios-barC.png";

import sair from "../../images/sair.png";

import ButtonBar from "./ButtonBar";
import styles from "@/app/styles/hamburguer.css";

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'activateHamburguer' // Não passar a prop 'activateBodyHamburguer' para o DOM
})`
  min-width: 230px;
  height: 100vh;
  padding: 20px;
  
  display:  ${props => !props.activateHamburguer ? 'none' : 'flex'};
  align-items: center;
  flex-direction: column;
  
  position: ${props => props.activateHamburguer ? 'absolute' : 'none'};
  z-index: ${props => props.activateHamburguer ? 2 : ''};

  background-color: #fcaf38;

  transition: all 0.3s ease-out;

  .logo{
    margin: 30px 25px;
  }

  @media (max-width: 1250px){
    height: 114.3vh;
  }

  @media (min-width: 920px){
    display: flex;
  }

  @media (max-width: 400px){
    height: 100vh;
  }

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


export default function Navbar(props) {

  //HAMBURGER
  const [activateHamburguer, setActivateHamburguer] = useState(false);
    
  const handleActivateHamburger = () => {
      setActivateHamburguer((prev) => !prev);
      props.onToggleBody();
  };

  return (
    <>
      <ul onClick={handleActivateHamburger} className='menu' {...activateHamburguer ? 'activate' : ''}>
        <li className="hamburguer"></li>
        <li className="hamburguer"></li>
        <li className="hamburguer"></li>
      </ul>
      <Container activateHamburguer={activateHamburguer}>
        <Image style={{width: 179, height: 170}} className="logo" alt="Logo da Dengo" src={logoImage}/>

        <ListaBotoes>
          <ButtonBar onClick={() => {window.location.href = './requisicao'}} imageSrc={requisicaoBrilhante} text="Realizar Requisição"/>

          <LinhaDividir />

          <ButtonBar onClick={() => {window.location.href = './relatorio'}} imageSrc={relatorioBrilhante} text="Relatório"/>
          <ButtonBar onClick={() => {window.location.href = './usuarios'}} imageSrc={usuariosBrilhante} text="Usuários"/>
          <ButtonBar onClick={() => {window.location.href = './estoque'}} imageSrc={estoqueBrilhante} text="Estoque"/>
          <ButtonBar onClick={() => {window.location.href = './produtos'}} imageSrc={produtosBrilhante} text="Produtos"/>
          <ButtonBar onClick={() => {window.location.href = './requisicao'}} imageSrc={requisicaoBrilhante} text="Requisição"/>
          <LinhaDividir />
        

          <ButtonBar onClick={() => {window.location.href = './'}} imageSrc={sair} text="Botão para sair"/>
        </ListaBotoes>
      </Container>
    </>
  );
}
