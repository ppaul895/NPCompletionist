package npc.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // This method allows configuring web based security for specific http requests.

        // we're not using HTML forms in our app
        //so disable CSRF (Cross Site Request Forgery)
        http.csrf().disable();

        // this configures Spring Security to allow
        //CORS related requests (such as preflight checks)
        http.cors();

        // the order of the antMatchers() method calls is important
        // as they're evaluated in the order that they're added
        http.authorizeRequests()
                .antMatchers("/authenticate").permitAll()
                .antMatchers("/create_account").permitAll()

                .antMatchers(HttpMethod.GET, "/api/user", "/api/user/*").permitAll()

                .antMatchers(HttpMethod.GET, "/api/platform", "/api/platform/*").permitAll()

                .antMatchers(HttpMethod.GET, "/api/game", "/api/game/*").permitAll()
                .antMatchers(HttpMethod.POST, "/api/game").permitAll()

                .antMatchers(HttpMethod.GET, "/api/gameplatform", "/api/gameplatform/*").permitAll()
                .antMatchers(HttpMethod.POST, "/api/gameplatform").permitAll()

                .antMatchers(HttpMethod.GET, "/api/media", "/api/media/*").permitAll()
                .antMatchers(HttpMethod.POST, "/api/media").permitAll()

                .antMatchers(HttpMethod.GET, "/api/backlog/user-backlog/*", "/api/backlog/*").hasAnyRole("USER")
                .antMatchers(HttpMethod.POST, "/api/backlog").hasAnyRole("USER")
                .antMatchers(HttpMethod.PUT, "/api/backlog/*").hasAnyRole("USER")
                .antMatchers(HttpMethod.DELETE, "/api/backlog/*").hasAnyRole("USER")
                .antMatchers("/**").denyAll()
                // if we get to this point, let's deny all requests
                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    @Bean
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
}