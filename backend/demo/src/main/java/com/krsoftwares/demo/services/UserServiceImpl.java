package com.krsoftwares.demo.services;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.krsoftwares.demo.models.UserModel;
import com.krsoftwares.demo.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


    @Override
    public UserModel create(UserModel user) {
        
        try {
            if(userRepository.existsByEmail(user.getEmail())){
                throw new Error("Usuário já existe");
            }
        } catch (Exception e) {
            throw new Error("Preencha todos os campos");
        }
        

        user.setPassword(passwordEncoder().encode(user.getPassword()));
        
        UserModel createdUser = userRepository.save(user);

        return createdUser;
    }
    
}
