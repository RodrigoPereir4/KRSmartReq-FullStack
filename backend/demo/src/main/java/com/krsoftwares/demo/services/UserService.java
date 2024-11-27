package com.krsoftwares.demo.services;

import com.krsoftwares.demo.models.UserModel;

public interface UserService {
    UserModel create(UserModel user);
    Boolean update(UserModel user, int id);
    String inativar(int id);
}
