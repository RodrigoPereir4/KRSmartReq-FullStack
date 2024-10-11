'use client'

import { useState } from "react";
import { loginUsuario } from "../services/loginService";

export function useLogin(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState(null);

    const [checked, setChecked] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await loginUsuario({email, password});

            if(response === 'Login realizado com sucesso!'){
                window.location.href = './boas-vindas'
            } else {
                setErro(response);
            }
            
        }catch(error){
            setErro("Erro de comunicação com o servidor!");
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCheckboxChange = () => {
        setChecked(prevChecked => !prevChecked);
    };

    return{
        email,
        setEmail,
        password,
        setPassword,
        erro,
        setErro,
        checked,
        setChecked,
        handleSubmit,
        handleEmailChange,
        handlePasswordChange,
        handleCheckboxChange
    }
}