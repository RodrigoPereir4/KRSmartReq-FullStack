package com.krsoftwares.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.stereotype.Service;

import com.krsoftwares.demo.models.UserModel;
import com.krsoftwares.demo.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserModel create(UserModel user) {

        try {
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new Error("Usuário já existe");
            }
        } catch (Exception e) {
            throw new Error("Preencha todos os campos");
        }

        user.setStatus(true);
        UserModel createdUser = userRepository.save(user);

        return createdUser;
    }

    @Override
    public Boolean update(UserModel user, int id) {
        Optional<UserModel> userOpt = userRepository.findById(id);

        if (userOpt.isPresent()) {
            UserModel userExistente = userOpt.get();

            userExistente.setEmail(user.getEmail());
            userExistente.setPassword(user.getPassword());
            userExistente.setSetor(user.getSetor());
            userExistente.setStatus(user.isStatus());

            userRepository.save(userExistente);
            return true;
        }
        return false;
    }

    @Override
    public String inativar(int id) {
        Optional<UserModel> userOpt = userRepository.findById(id);

        if (userOpt.isEmpty()) {
            return "Usuário não encontrado!";

        }
        userOpt.get().setStatus(false);

        userRepository.save(userOpt.get());

        return "Usuário inativado";

    }

}
