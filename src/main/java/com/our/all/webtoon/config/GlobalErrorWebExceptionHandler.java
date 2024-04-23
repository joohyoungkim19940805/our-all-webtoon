package com.our.all.webtoon.config;

import java.net.URI;
import java.util.Map;
import org.springframework.boot.autoconfigure.web.WebProperties;
import org.springframework.boot.autoconfigure.web.reactive.error.AbstractErrorWebExceptionHandler;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.reactive.error.ErrorAttributes;
import org.springframework.context.ApplicationContext;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.reactive.function.server.ServerResponse.BodyBuilder;
import com.our.all.webtoon.util.exception.BirdPlusException.Result;
import reactor.core.publisher.Mono;


@Component
@Order(-2)
public class GlobalErrorWebExceptionHandler extends AbstractErrorWebExceptionHandler {

    public GlobalErrorWebExceptionHandler(
                                          GlobalErrorAttributes errorAttribute,
                                          ApplicationContext applicationContext,
                                          ServerCodecConfigurer serverCodecConfigurer) {
        super(errorAttribute, new WebProperties.Resources(), applicationContext);
        super.setMessageWriters(serverCodecConfigurer.getWriters());
        super.setMessageReaders(serverCodecConfigurer.getReaders());
    }

    @Override
    protected RouterFunction<ServerResponse> getRoutingFunction(final ErrorAttributes errorAttributes) {
        return RouterFunctions.route(RequestPredicates.all(), (req) -> {
            errorAttributes.getError(req).printStackTrace();
            return this.renderErrorResponse(req);
        });
    }

    private Mono<ServerResponse> renderErrorResponse(final ServerRequest request) {

        final Map<String, Object> errorPropertiesMap = getErrorAttributes(request, ErrorAttributeOptions.defaults());
        HttpStatus status;
        int code = (Integer) errorPropertiesMap.get("code");
        if (code == Result._999.code()) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        } else {
            status = HttpStatus.OK;
        }

        boolean isHTML = request.headers().accept().stream().filter(e -> e.equals(MediaType.TEXT_HTML)).findFirst().isPresent();

        BodyBuilder bodyBuilder;

        if (isHTML) {
            bodyBuilder = ServerResponse.temporaryRedirect(URI.create("/login-page"));
        } else {
            bodyBuilder = ServerResponse.status(status);
        }

        if (code == Result._100.code() || code == Result._105.code() || code == Result._106.code() || code == Result._107.code()) {
            bodyBuilder.cookie(ResponseCookie.fromClientResponse(HttpHeaders.AUTHORIZATION, "").httpOnly(true).secure(true).sameSite("Strict").path("/").build());
        }

        if (isHTML) {
            /*
             * return bodyBuilder .contentType(MediaType.parseMediaType("text/html;charset=UTF-8"))
             * .render("content/loginPage.html", Map.of("loginStatus", "FAILED", "resourcesNameList",
             * List.of("loginPage")));
             */
            return bodyBuilder.build();
        } else {
            return bodyBuilder.contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromValue(errorPropertiesMap));
        }

        /*
         * BodyBuilder bodyBuilder = ServerResponse.status(status)
         * .cookie(ResponseCookie.fromClientResponse(HttpHeaders.AUTHORIZATION, "") .httpOnly(true)
         * .secure(true) .sameSite("Strict") .path("/") .build());
         * 
         * return null;
         * 
         * .contentType(MediaType.APPLICATION_JSON) .body(BodyInserters.fromValue(errorPropertiesMap));
         */
    }

}
