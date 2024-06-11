package com.our.all.webtoon.entity;


import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.With;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@With
public class BaseEntity {

	@Id
	private String id;

	@CreatedDate
	private LocalDateTime createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;
}
