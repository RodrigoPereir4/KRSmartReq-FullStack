"use client";

import Image from "next/image";
import styled from "styled-components";

import userImagem from "../images/user2.png";
import logoImage from "../images/logo.png";

import ButtonBar from "./ButtonBar";

const Container = styled.div`
  width: 280px;
  height: 100vh;
  padding: 30px;

  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  background-color: #fcaf38;

  .logo{
    margin: 25px;
  }

`;

const LinhaDividir = styled.div`
  background-color: #584438;

  width: 100%;
  height: 2px;
  margin: 10px;
`;

export default function Navbar() {
  return (
    <Container>
      <Image className="logo" src={logoImage}/>

      <>
        <ButtonBar imageSrc={userImagem} text="Realizar Requisição"/>

        <LinhaDividir />

        <ButtonBar imageSrc={userImagem} text="Botão 01"/>
        <ButtonBar imageSrc={userImagem} text="Botão 02"/>
        <ButtonBar imageSrc={userImagem} text="Botão 03"/>
        <ButtonBar imageSrc={userImagem} text="Botão 04"/>
        <ButtonBar imageSrc={userImagem} text="Botão 05"/>
        <LinhaDividir />
      </>

      <ButtonBar imageSrc={userImagem} text="Botão para sair"/>
    </Container>
  );
}
