package com.fitness.activityservice.dto;

import lombok.Data;
import java.util.List;

@Data
public class RecommendationDTO {
    private String recommendation;
    private List<String> improvements;
    private List<String> suggestions;
    private List<String> safety;
}
