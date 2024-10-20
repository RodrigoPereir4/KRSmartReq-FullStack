package com.krsoftwares.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.krsoftwares.demo.models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Integer> {
    Optional<UserModel> findByEmail(String userName);
    
    boolean existsByEmail(String email);

    @Query("SELECT u.email FROM UserModel u")
    Iterable<String> findAllUserEmail();

    @Query("SELECT u.email FROM UserModel u WHERE u.setor.id = :setor")
    Iterable<String> findBySetor(Integer setor);
}