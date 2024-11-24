package com.krsoftwares.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.krsoftwares.demo.models.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Integer> {
   Optional<UserModel> findByEmail(String userName);

    boolean existsByEmail(String email);
    
    @Query("SELECT u.email FROM UserModel u")
    Iterable<String> findAllUserEmail();

    @Query("SELECT u.email FROM UserModel u WHERE u.setor.id = :setor")
    Iterable<String> findBySetor(Integer setor);

    @Query("SELECT u FROM UserModel u JOIN FETCH u.roles WHERE u.email = :email")
    UserModel findByEmailFetchRoles(@Param("email") String email);
}