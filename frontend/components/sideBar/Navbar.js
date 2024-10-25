"use client";

import Image from "next/image";
import styled from "styled-components";

import userImagem from "../../images/user2.png";
import logoImage from "../../images/logo.png";

import ButtonBar from "./ButtonBar";

const Container = styled.div`
  min-width: 230px;
  height: 100vh;
  padding: 20px;

  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: #fcaf38;

  .logo{
    margin: 30px 25px;
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

export default function Navbar() {
  return (
    <Container>
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
  );
}
