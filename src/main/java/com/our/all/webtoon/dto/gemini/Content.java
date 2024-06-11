
package com.our.all.webtoon.dto.gemini;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.With;

/**
 * 
 * @author kim.joohyoung
 *
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@With
@Builder(toBuilder = true)
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(Include.NON_NULL)
public class Content {
    private Role role;
    private List<Part> parts;

    public enum Role {
        user, model
    }

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @With
    @Builder(toBuilder = true)
    @ToString
    @JsonIgnoreProperties(ignoreUnknown = true)
    @JsonInclude(Include.NON_NULL)
    public static class Part {
        private String text;
    }
}
