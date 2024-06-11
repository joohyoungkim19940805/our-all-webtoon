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
public class GeminiResponseVo {
    private List<Candidate> candidates;
    private PromptFeedback promptFeedback;

    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @With
    @Builder(toBuilder = true)
    @ToString
    @JsonIgnoreProperties(ignoreUnknown = true)
    @JsonInclude(Include.NON_NULL)
    public static class Candidate {
        private Content content;
        private String finishReason;
        private Integer index;
        private List<Safety> safetyRatings;
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
    public static class PromptFeedback {
        private List<Safety> safetyRatings;
    }
}
