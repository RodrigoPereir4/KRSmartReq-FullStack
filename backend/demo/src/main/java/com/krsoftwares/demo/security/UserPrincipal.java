package com.krsoftwares.demo.security;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.krsoftwares.demo.models.SetorModel;
import com.krsoftwares.demo.models.UserModel;

import lombok.Getter;

@Getter
public class UserPrincipal {
    private String username;
    private String password;
    private SetorModel setor;
    private UserModel user;
    private Collection<? extends GrantedAuthority> authorities;

    private UserPrincipal(UserModel user){
        this.username = user.getEmail();
        this.password = user.getPassword();
        this.setor = user.getSetor();
        this.user = user;

        this.authorities = user.getRoles().stream().map(role -> {
            return new SimpleGrantedAuthority("ROLE_".concat(role.getName()));
        }).collect(Collectors.toList());
        }

        public static UserPrincipal create(UserModel user){
            return new UserPrincipal(user);
        }

        public UserModel getUserModel(){
            return this.user;
        }
    }

