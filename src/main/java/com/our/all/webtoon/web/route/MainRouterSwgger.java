package com.our.all.webtoon.web.route;

import org.springdoc.core.annotations.RouterOperation;
import org.springdoc.core.annotations.RouterOperations;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;
import com.our.all.webtoon.config.security.Token;
import com.our.all.webtoon.entity.account.AccountEntity;
import com.our.all.webtoon.util.ResponseWrapper;
import com.our.all.webtoon.web.handler.IndexHandler;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

public interface MainRouterSwgger {
  @RouterOperations({//
      @RouterOperation(//
          path = "/login-processing", //
          produces = {MediaType.APPLICATION_JSON_VALUE}, //
          beanClass = IndexHandler.class, //
          beanMethod = "loginProcessing", //
          method = RequestMethod.POST, //
          operation = @Operation(operationId = "loginProcessing", //
              /*
               * GET인 경우 사용 parameters = {
               * 
               * @Parameter( name = "accountName", description = "account name", in =
               * ParameterIn.QUERY, schema = @Schema(type = "String"), example = "test" ),
               * 
               * @Parameter( name = "password", description = "password", in = ParameterIn.QUERY,
               * schema = @Schema(type = "String"), example = "rlawngud1" ) },
               */
              responses = {//
                  @ApiResponse(//
                      responseCode = "0", //
                      description = "data is always inside wrappering", //
                      useReturnTypeSchema = true, //
                      content = @Content(//
                          schema = @Schema(//
                              implementation = ResponseWrapper.class, //
                              subTypes = Token.class//
                          ), //
                          mediaType = MediaType.APPLICATION_JSON_VALUE//
                      )//
                  ), //
                  @ApiResponse(//
                      responseCode = "200", //
                      description = "is login ok.", //
                      content = @Content(//
                          schema = @Schema(//
                              implementation = Token.class//
                          ), //
                          mediaType = MediaType.APPLICATION_JSON_VALUE//
                      )//
                  )//
              }, //
              requestBody = @RequestBody(//
                  content = @Content(schema = @Schema(implementation = AccountEntity.class))//
              )//
          )//
      )//
  })
  public RouterFunction<ServerResponse> index(IndexHandler mainHandler);
}
