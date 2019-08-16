package to.kit.program;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * アプリケーションメイン.
 * @author H.Sasai
 */
@SpringBootApplication
public class AppMain extends SpringBootServletInitializer {
	/**
	 * メイン.
	 * @param args 引数
	 */
	public static void main(String[] args) {
		SpringApplication.run(AppMain.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		return builder.sources(AppMain.class);
	}
}
