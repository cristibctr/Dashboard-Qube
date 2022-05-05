package com.ness;
import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
@EnableJpaRepositories(basePackages = { "com.ness.repositories" })
public class DashboardQubeAppApplication {
    public static void main(String[] args) {

        SpringApplication.run(DashboardQubeAppApplication.class, args);

    }
}
