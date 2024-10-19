package com.krsoftwares.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.krsoftwares.demo.models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByEmail(String userName);

    boolean existsByEmail(String email);
}