package com.our.all.webtoon.util.exception;


@SuppressWarnings("serial")
public class ForgotPasswordException extends BirdPlusException {

	public ForgotPasswordException(Result result) {
		super(result);
		// TODO Auto-generated constructor stub
	}

	@Override
	public Result getResult() {
		// TODO Auto-generated method stub
		return super.result;
	}
	@Override
	public Result getResult(int code) {
		// TODO Auto-generated method stub
		return Result.valueOf("_" + code);
	}

}
