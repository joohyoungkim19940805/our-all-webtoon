package com.our.all.webtoon.web.handler;


import static com.our.all.webtoon.util.ResponseWrapper.response;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import com.our.all.webtoon.dto.Editor;
import com.our.all.webtoon.repository.terms.TermOfServiceRepository;
import com.our.all.webtoon.util.ResponseWrapper;
import com.our.all.webtoon.util.exception.BirdPlusException.Result;
import reactor.core.publisher.Mono;


@Component
public class TermsHandler {

	@Autowired
	private TermOfServiceRepository termsRepository;

	private static record TermsResponse(
		String name,
		List<Editor> content
	) {}
	public Mono<ServerResponse> getWebtoonTerms(
		ServerRequest request
	) {

		Mono<TermsResponse> result = termsRepository
			.findByName( "웹툰 운영원칙" )
			.map( e -> new TermsResponse( e.getName(), e.getContent() ) );

		return ok()
			.contentType( MediaType.APPLICATION_JSON )
			.body( response( Result._0, result ), ResponseWrapper.class );
	}

}
