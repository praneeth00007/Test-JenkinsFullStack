package com.art;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

// This class can be removed since OnlineItemStoreApplication already extends SpringBootServletInitializer
// However, leaving it for compatibility with existing references
public class ServletInitializer extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(OnlineItemStoreApplication.class);
	}
}
