package com.our.all.webtoon.util;

import org.tinylog.configuration.ConfigurationLoader;
import org.tinylog.runtime.RuntimeProvider;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesConfigurationLoader implements ConfigurationLoader {

    @Override
    public Properties load() throws IOException {
        Properties properties = new Properties();
		String profiles = System.getenv("MY_SERVER_PROFILES");
		if(profiles == null) profiles = "local";
        ClassLoader classLoader = RuntimeProvider.class.getClassLoader();
        try (InputStream stream = classLoader.getResourceAsStream("tinylog.%s.properties".formatted(profiles))) {
            if (stream != null) {
                properties.load(stream);
            }
        }

        return properties;
    }

}