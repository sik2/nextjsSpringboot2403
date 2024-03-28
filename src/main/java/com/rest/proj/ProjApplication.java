package com.rest.proj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ProjApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjApplication.class, args);
	}

}
