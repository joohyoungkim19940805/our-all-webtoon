package com.our.all.webtoon.config;

import java.util.Map;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.reactive.error.DefaultErrorAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import com.our.all.webtoon.util.exception.BirdPlusException;
import com.our.all.webtoon.util.exception.BirdPlusException.Result;
import com.our.all.webtoon.util.exception.CommonExceptionResult.CommonResultCode;

@Component
public class GlobalErrorAttributes extends DefaultErrorAttributes {

    @Override
    public Map<String, Object> getErrorAttributes(ServerRequest request,
            ErrorAttributeOptions options) {
        Map<String, Object> map = super.getErrorAttributes(request, options);
        // map.remove("status");
        // map.remove("error");
        Throwable throwable = super.getError(request);
        Class<?> superClass = throwable.getClass().getSuperclass();
        if (superClass.equals(BirdPlusException.class)) {
            BirdPlusException exception = (BirdPlusException) superClass.cast(throwable);
            CommonResultCode error = exception.getResult();
            map.put("code", error.code());
            map.put("message", error.message());
            map.put("summary", error.summary());
            map.put("resultType", "error");
            map.put("redirectUrl", error.redirectUrl());
        } else {
            map.put("message", Result._999.message());// throwable.getMessage());
            map.put("code", Result._999.code());
            map.put("summary", Result._999.summary());
            map.put("resultType", "error");
            map.put("redirectUrl", ".");
        }
        return map;
    }
}
