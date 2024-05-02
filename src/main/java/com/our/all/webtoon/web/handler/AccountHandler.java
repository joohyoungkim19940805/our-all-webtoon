package com.our.all.webtoon.web.handler;


import static com.our.all.webtoon.util.ResponseWrapper.response;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import com.our.all.webtoon.config.security.JwtVerifyHandler;
import com.our.all.webtoon.entity.account.AccountEntity;
import com.our.all.webtoon.repository.account.AccountRepository;
import com.our.all.webtoon.service.AccountService;
import com.our.all.webtoon.service.MailService;
import com.our.all.webtoon.util.ResponseWrapper;
import com.our.all.webtoon.util.exception.BirdPlusException.Result;
import reactor.core.publisher.Mono;


@Component
public class AccountHandler {

	@Autowired
	private AccountService accountService;

	@Autowired
	private MailService mailService;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private JwtVerifyHandler jwtVerifyHandler;

	protected record CreateUserRequest(String email, String password, String newPassword) {}

	public Mono<ServerResponse> create(
		ServerRequest request
	) {

		/* return ok() .contentType(MediaType.APPLICATION_JSON)
		 * .body(accountService.createUser(request.bodyToMono(AccountEntity.class)) .map(e ->
		 * response(Result._0, e)), Response.class ) .onErrorResume(e -> Mono.error(new
		 * UnauthorizedException(Result._110))); */
		return accountService
			.createUser( request.bodyToMono( AccountEntity.class ), true )//
			.flatMap(
				account -> ok()
					.contentType( MediaType.APPLICATION_JSON )
					.body( response( Result._0 ), ResponseWrapper.class )
			);

	}


}
