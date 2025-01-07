"use client"
import styled from "styled-components";

import capaLogin from "/images/CapaLoginGrande.png"
import iconeUser from "/images/user.png"
import iconeLock from "/images/lock.png"

import Image from "next/image";
import "./styles/page.css";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/useLogin";

const Container = styled.div`
    display: flex;
    max-height: 100%; /* Garante que o contêiner não exceda a largura da tela */
    overflow: hidden; /* Oculta qualquer parte que sair do contêiner */
    
    justify-content: center; /* Centraliza a imagem horizontalmente */
    align-items: center;

    .homeImage{
        min-width: 800px;
        height: auto;
        object-fit: fill;
    }
`;

const Login = styled.form`
    width: 785px;
    height: auto;
    padding: 0px 102px;
    
    display:flex;
    flex-direction: column;
    justify-content: center;

    margin-right: 40px;
    
    h1 {
        text-align: center;
        font-size: 48px;
    }

    label {
        display: block;
        font-size: 32px;
    }

   @media (max-width: 1530px) {
        padding: 0px 82px 0px 120px;
        margin-right: 20px;

        h1{
            font-size: 45px;
        }

        label {
            font-size: 30px;
        }
    }
`;

const CampoTexto = styled.div`
    position: relative;

    display: flex;
    justify-content: space-between;
    margin-top: 104px;
    transition: 1.2s ease-in-out;
    
    input {
        width: 582px;
        height: 60px;
        
        border: none;
        border-bottom: 1.5px solid #584439; 
        padding: 8px 32px 8px 0px;
        transition: 0.4s cubic-bezier(0.4, 0, 0.4, 0.97);

        outline: none
    }

    label {
        position: absolute;
        top: 0px;

        cursor: auto;
        transition: 0.5s ease-in-out;
    }
    

    img {
        position: relative;
        right: 30px;
        top: 10px;
    }

    input:focus,
    input:valid {
        border-bottom: 1.5px solid #FCAF33;
        font-size: 18px;
    }
    
    input:focus + label,
    input:valid + label{
        top: -40px;
    }

    input[type="password"]::-ms-reveal {
        display: none; /* Para Edge */
    }

    input[type="password"]::-ms-clear {
        display: none; /* Para Edge */
    }

    @media (max-width: 1530px) {
        img {
            width: 30px;
            height: 30px;
            right: 25px;
        }
    }
`;

const CheckboxContainer = styled.div`
    margin: 37px 0px 95px 0px;

    input {
        width: 32px;
        height: 32px;

        display: none;
        border-radius: 8px;
    }

    label {
        display: flex;
        align-items: center;
        gap: 5px;

        font-size: 32px;
        user-select: none; /* Para navegadores modernos */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
    }

    input, label {
        cursor: pointer;
    }

    
    @media (max-width: 1530px) {
        margin: 37px 0px 35px 0px;

        label {
            font-size: 26px;
        }
    }
`

const Checkbox = styled.label`
    cursor: pointer;
`;

const HiddenCheckbox = styled.input`
    display: none; /* Oculta o checkbox padrão */
`;

const CustomCheckbox = styled.span`
    display: flex;

    width: 30px;
    height: 30px;
    border: 2px solid #000000;
    border-radius: 4px;
    margin-right: 10px;
    position: relative;
    background-color: ${props => (props.checked ? '#F8AE27' : 'transparent')}; /* Cor de fundo do checkbox */
    transition: opacity 0.4s ease;

    /* Animação quando marcado */
    &::after {

        content: '';
        position: absolute;
        width: 6px;
        height: 12px;
        border: solid #584439;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        left: 9px;
        top: 4px;
        opacity: 0; /* Inicialmente invisível */
        transition: opacity 0.2s ease;
    }

    ${HiddenCheckbox}:checked + &::after{
        opacity: 1; /* Mostra quando marcado */
    }

    
    @media (max-width: 1530px) {
        width: 26px;
        height: 26px;
    }
`;

const BotaoAmarelo = styled.button`
    width: 330px;
    height: 95px;
    background-color: #F8AE27;
    
    border-radius: 8px;
    border: none;
    
    font-size: 40px;
    font-weight: 500;

    cursor: pointer;

    &:hover{
        background-color: #D2922A;
    }

    
    @media (max-width: 1530px) {
        font-size: 36px;
        margin-top: 40px;

        width: 300px;
        height: 85px;
    }
`

export default function Home() {

    const {email, setEmail, password, setPassword, erro, setErro, checked, setChecked, handleSubmit, handleEmailChange, handlePasswordChange, handleCheckboxChange} = useLogin();

    useEffect(() => {
        if (erro) {
          alert(erro.toString());
        }
    }, [erro]);

    return (
        <Container>
            <Login onSubmit={handleSubmit}>

                <h1>Iniciar Sessão</h1>

                <CampoTexto>
                    <div>
                        <input required type="text" id="usuarios" onChange={handleEmailChange}/>
                        <label className="label" htmlFor="usuarios">Usuário</label>
                    </div>
                    <Image
                        src={iconeUser}
                        alt="Descrição da imagem"
                        width={35}
                        height={35}
                    />
                </CampoTexto>

                <CampoTexto>
                    <div>
                        <input required 
                        type={checked ? 'text' : 'password'}
                        id="senha" 
                        onChange={handlePasswordChange}
                        />
                        <label htmlFor="senha">Senha</label>
                    </div>
                    <Image
                        src={iconeLock}
                        alt="Descrição da imagem"
                        width={35}
                        height={35}

                    />
                </CampoTexto>

                <CheckboxContainer>
                    <Checkbox>
                        <HiddenCheckbox 
                            type="checkbox"
                            checked={checked}
                            onChange={handleCheckboxChange}
                        />
                        <CustomCheckbox checked={checked}/>
                        <span>Mostrar senha</span>
                    </Checkbox>
                </CheckboxContainer>

                {erro && <p style={{fontSize:18,color:"red",marginBottom: 20}}>{erro.toString()}</p>}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <BotaoAmarelo type="submit">Confirmar</BotaoAmarelo>
                </div>
            </Login>

            <Image
                src={capaLogin}
                alt="Descrição da imagem"
                className="homeImage"
                style={{width: 1095, height: 1128}}
            />

        </Container>
    );
}