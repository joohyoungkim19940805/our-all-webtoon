package com.our.all.webtoon.util.stream;

import lombok.Getter;
import lombok.ToString;

@ToString
public class ServerSentStreamTemplate<T> {
	
	@Getter
	private T content;
	
	@Getter
	private final ServerSentStreamType serverSentStreamType;
	
	@Getter
	private final Class<? extends Object> dataType;
	
	//@Getter
	//@Transient
	//private final Class<?> dataClass;

	public ServerSentStreamTemplate(
									T content,
									ServerSentStreamType serverSentStreamType
	) {
		this.content = content;
		this.dataType = content.getClass();
		this.serverSentStreamType = serverSentStreamType;
	}
	
	public enum ServerSentStreamType{
		VOID, 
		ACCOUNT_INFO_CHANGE_ACCEPT,
		
		CHATTING_ACCEPT, 
		CHATTING_REACTION_ACCEPT,
		CHATTING_DELETE_ACCEPT,
		
		ROOM_ACCEPT, 
		ROOM_DELETE_ACCEPT,
		ROOM_IN_ACCOUNT_ACCEPT, 
		ROOM_IN_ACCOUNT_DELETE_ACCEPT,
		
		NOTICE_BOARD_ACCEPT, 
		NOTICE_BOARD_DELETE_ACCEPT,
		NOTICE_BOARD_DETAIL_ACCEPT,
		
		WORKSPACE_PERMIT_REQUEST_ACCEPT,
		WORKSPACE_PERMIT_RESULT_ACCEPT
		;

	}
}