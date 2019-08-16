package to.kit.program;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Hello controller.
 * @author H.Sasai
 */
@RestController
public class HelloController {
	@RequestMapping("/hello")
	private String hello() {
		return "Hello!!!";
	}
}
