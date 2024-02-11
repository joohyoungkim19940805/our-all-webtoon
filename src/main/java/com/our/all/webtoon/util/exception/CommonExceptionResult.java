package com.our.all.webtoon.util.exception;

import com.our.all.webtoon.util.exception.BirdPlusException.Result;

public sealed interface CommonExceptionResult permits BirdPlusException {

	BirdPlusException.Result getResult();
	BirdPlusException.Result getResult(int code);
	
	public sealed interface CommonResultCode permits BirdPlusException.Result{
		
	
		public int code();
		
		public String message();
		
		public String summary();
		
		public Result withChangeMessage(String newMessage);
	}
	
}
