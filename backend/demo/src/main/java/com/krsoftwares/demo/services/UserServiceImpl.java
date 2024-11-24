package com.krsoftwares.demo.services;




import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.krsoftwares.demo.models.UserModel;
import com.krsoftwares.demo.repository.RoleRepository;
import com.krsoftwares.demo.repository.UserRepository;
import com.krsoftwares.demo.role.Role;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

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

        definirRole(user);
        
        UserModel createdUser = userRepository.save(user);

        return createdUser;
    }

    public void definirRole(UserModel user){
        if(user.getRoles() == null){
            user.setRoles(new ArrayList<>());
        }

        Role role = null;

        if(user.getSetor().getSetorId() == 1){//setor de adm
            role = roleRepository.findByName("ADMIN");
        }else if(user.getSetor().getSetorId() == 2){//setor do estoque
            role = roleRepository.findByName("ALMOXARIFE");
        } else{ // qualquer outro setor
            role = roleRepository.findByName("USER");
        }

        if(role != null && !user.getRoles().contains(role)){
            user.getRoles().add(role);
        }
    }
    
}
