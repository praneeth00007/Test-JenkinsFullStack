package com.art;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class OnlineItemStoreApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(OnlineItemStoreApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(OnlineItemStoreApplication.class, args);
		System.out.println("Project is RunningSuccessfully..");
	}
}
