package com.krsoftwares.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    @Autowired
    private CustomBasicAuthenticationFilter customBasicAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .authorizeRequests((request) -> request
                        .requestMatchers(HttpMethod.POST, "/requisicao/requisitar").hasAnyRole("ADMIN", "USER")
                        .requestMatchers(HttpMethod.GET, "/requisicao/listar").hasAnyRole("ADMIN", "ALMOXARIFE")
                        .requestMatchers(HttpMethod.DELETE, "/requisicao/{id}").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/produto/cadastrar").hasAnyRole("ADMIN", "ALMOXARIFE")
                        .requestMatchers(HttpMethod.GET, "/produto/listar").hasAnyRole("ADMIN", "ALMOXARIFE")
                        .requestMatchers(HttpMethod.PUT, "/produto/**").hasAnyRole("ADMIN", "ALMOXARIFE")

                        .requestMatchers(HttpMethod.POST, "/users/login").permitAll()
                        .requestMatchers(HttpMethod.POST, "/users/cadastrar").permitAll()
                        .requestMatchers(HttpMethod.GET, "/users/listar").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST, "/setor/cadastrar").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/setor/listar").hasRole("ADMIN")

                        .anyRequest().authenticated())
                .addFilterBefore(customBasicAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .build();
    }
}
