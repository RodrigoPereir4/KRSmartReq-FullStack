package com.krsoftwares.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.krsoftwares.demo.role.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
}
