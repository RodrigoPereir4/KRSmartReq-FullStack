'use client'

import styled from "styled-components";

import userImage from "/images/user2.png";

import Navbar from "@/components/Navbar";

const GridMain = styled.div`
    width:100%;
    height: 100vh;
    padding: 20px;

    display: grid;
    grid-template-columns: 1fr 0.5fr;
    grid-template-rows: 80px 1fr 0.5fr 0.5fr;
    grid-template-areas: "text blue"
    "red blue"
    "green blue"
    "purple blue";

    gap: 20px;

    div{
        border-radius: 8px;
    }

    @media (max-width: 800px){
        grid-template-columns: 1frt;
    }
`

export default function BoasVindas(){
    return(
        <div style={{display: "flex"}}>
            <Navbar></Navbar>
                <GridMain>
                    <div style={{display: "flex", gridArea: "text"}} id="body">
                        <div>
                            <h1>Olá usuário</h1>
                            <h2>Terça feira, 13 de junho de 2024</h2>

                            
                        </div>
                        <>
                            <h3>13:45</h3>
                        </>
                        <button>Realizar Requisição</button>
                    </div>  

                    <div className="red" style={{background: "red", gridArea:"red"}}></div>

                    <div className="green" style={{background: "green"}}></div>

                    <div className="purple" style={{background: "purple"}}></div>

                    <div className="blue" style={{background: "blue", gridArea:"blue"}}></div>
                </GridMain>
        </div>
    );
}