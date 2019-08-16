package to.kit.program;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * SecurityConfig.
 * @author H.Sasai
 */
@Configuration
@ConfigurationProperties(prefix = "security")
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	private boolean requiresSecure;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		if (this.requiresSecure) {
			http.requiresChannel().anyRequest().requiresSecure();
		}
	}

	/**
	 * @param requiresSecure the requiresSecure to set
	 */
	public void setRequiresSecure(boolean requiresSecure) {
		this.requiresSecure = requiresSecure;
	}
}
