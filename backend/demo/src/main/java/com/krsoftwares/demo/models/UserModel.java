package com.krsoftwares.demo.models;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "users")
public class UserModel {
    private String email;
    private String password;   
}
