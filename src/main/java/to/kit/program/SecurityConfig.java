package to.kit.program;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * SecurityConfig.
 * @author H.Sasai
 */
@Configuration
@ConfigurationProperties(prefix = "security")
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private DataSource dataSource;

	private boolean requiresSecure;

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
			.antMatchers("/", "/h2-console/**").permitAll()
			.anyRequest().authenticated()
			.and()
			.formLogin().loginProcessingUrl("/logon").permitAll();
		http.csrf().disable();
		http.headers().frameOptions().disable();
		if (this.requiresSecure) {
			http.requiresChannel().anyRequest().requiresSecure();
		}
	}

	/**
	 * Authenticate.
	 * @param auth AuthenticationManagerBuilder
	 * @throws Exception exception
	 */
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//		UserBuilder users = User.withDefaultPasswordEncoder();

		auth.jdbcAuthentication().dataSource(this.dataSource)
//			.withDefaultSchema()
//			.withUser(users.username("user").password("password").roles("USER"))
//			.withUser(users.username("admin").password("password").roles("USER", "ADMIN"))
		;
	}

	/**
	 * @param requiresSecure the requiresSecure to set
	 */
	public void setRequiresSecure(boolean requiresSecure) {
		this.requiresSecure = requiresSecure;
	}
}
