package com.our.all.webtoon.dto;


import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import lombok.Getter;

@Getter
public abstract class ServerSentStreamTemplate<T> {

	private T content;

	private Class<T> contentClass;

	private final ServerSentStreamType serverSentStreamType;

	public ServerSentStreamTemplate(
									T content,
									ServerSentStreamType serverSentStreamType
	) {

		Type type = this.getClass().getGenericSuperclass();
		var c = ((ParameterizedType) type).getActualTypeArguments()[0];
		var t = (Class<T>) com.fasterxml.jackson.databind.type.TypeFactory.rawClass( c );
		System.out.println( "kjh test ::: " + t );
		this.content = content;
		System.out.println( "kjh test ::: " + content.getClass() );
		this.serverSentStreamType = serverSentStreamType;

	}

	public enum ServerSentStreamType {
		VOID;
	}

}
