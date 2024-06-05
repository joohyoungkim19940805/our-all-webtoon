package com.our.all.webtoon.util;


import com.our.all.webtoon.util.exception.BirdPlusException.Result;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
	

@Data
@SuperBuilder
@NoArgsConstructor
public class ResponseWrapper<T> {

	private Integer code;// = 00;

	private String message;// = "처리에 성공하였습니다.";

	private String summary;// = "SUCCESS";

	private T data;

	private Mono<ResponseWrapper<T>> setResult(
		Result result
	) {

		this.code = result.code();
		this.message = result.message();
		this.summary = result.summary();
		return Mono.just( this );

	}

	@SuppressWarnings("unchecked")
	private Mono<ResponseWrapper<T>> setResult(
		Result result, T data
	) {

		this.code = result.code();
		this.message = result.message();
		this.summary = result.summary();
		this.data = data;
		if (data == null || data instanceof ResponseWrapper)
			return deleteData();
		
		if(data instanceof Mono mono ) {
			return mono.flatMap( e -> this.setResult( result, (T) e ) );

		} else if (data instanceof Flux flux) { 
			return flux
				.collectList()
				.flatMap( e -> this.setResult( result, (T) e ) );

		}

		return Mono.just( this );
	}

	private Mono<ResponseWrapper<T>> deleteData() {

		this.data = null;
		return Mono.just( this );

	}

	public static <T> Mono<ResponseWrapper<T>> response(
		Result result
	) {

		return new ResponseWrapper<T>().setResult( result );

	}

	public static <T> Mono<ResponseWrapper<T>> response(
		T data
	) {

		if (data instanceof Result result)
			return new ResponseWrapper<T>().setResult( result );

		return new ResponseWrapper<T>().setResult( Result._0, data );

	}

	public static <T> Mono<ResponseWrapper<T>> response(
		Result result, T data
	) {

		return new ResponseWrapper<T>().setResult( result, data );

	}

	public ResponseWrapper<T> data(
		T data
	) {

		this.data = data;
		return this;

	}

}
