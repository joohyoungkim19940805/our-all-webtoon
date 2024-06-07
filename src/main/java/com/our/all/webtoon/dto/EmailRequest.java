package com.our.all.webtoon.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailRequest {
	private String content;
	private String to;
	private String subject;
	private boolean isMultipart;
	private boolean isHtml;
}