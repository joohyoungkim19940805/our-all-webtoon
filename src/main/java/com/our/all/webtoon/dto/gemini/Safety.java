package com.our.all.webtoon.dto.gemini;

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
 * @author kim.joohyoung gemini가 평가하는 request의 안전 수치(폭력성 선정성 등), response의 안전 수치(폭력성 선정성 등 gemini가 평가한 자신의 응답에 대한 레벨)
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
public class Safety {
    private SafetyCategory category;

    private SafetySttingValue threshold;

    private SafetyLevel probability;

    public enum SafetyCategory {
        HARM_CATEGORY_HARASSMENT, // Harassment Negative or harmful comments targeting identity and/or protected attributes.
        HARM_CATEGORY_HATE_SPEECH, // Hate speech Content that is rude, disrespectful, or profane.
        HARM_CATEGORY_SEXUALLY_EXPLICIT, // Sexually explicit Contains references to sexual acts or other lewd content.
        HARM_CATEGORY_DANGEROUS_CONTENT // Dangerous Promotes, facilitates, or encourages harmful acts.
    }

    public enum SafetySttingValue {
        BLOCK_NONE, // Always show regardless of probability of unsafe content
        BLOCK_ONLY_HIGH, // Block when high probability of unsafe content
        BLOCK_MEDIUM_AND_ABOVE, // Block when medium or high probability of unsafe content
        BLOCK_LOW_AND_ABOVE, // Block when low, medium or high probability of unsafe content
        HARM_BLOCK_THRESHOLD_UNSPECIFIED // Threshold is unspecified, block using default threshold
    }

    public enum SafetyLevel {
        NEGLIGIBLE, // Content has a negligible probability of being unsafe
        LOW, // Content has a low probability of being unsafe
        MEDIUM, // Content has a medium probability of being unsafe
        HIGH// Content has a high probability of being unsafe
    }
}
