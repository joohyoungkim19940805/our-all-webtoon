package com.our.all.webtoon.vo;


import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.With;


@Getter
@Setter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@With
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Editor {

	private List<Editor> childs;

	private Integer type;

	private String name;

	private String tagName;

	private String data;

	private String text;

	private String cursor_offset;

	private String cursor_type;

	private String cursor_index;

	private String cursor_scroll_x;

	private String cursor_scroll_y;
}
