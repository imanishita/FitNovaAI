package com.fitness.aiservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recommendation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityAIService {
    private final GeminiService geminiService;

    public Recommendation generateRecommendation(Activity activity) {
        String prompt = createPromptForActivity(activity);
        try {
            String aiResponse = geminiService.getAnswer(prompt);
            log.info("RESPONSE FROM AI: {} ", aiResponse);
            return processAiResponse(activity, aiResponse);
        } catch (Exception e) {
            log.error("Error calling Gemini API for activity {}: {}", activity.getId(), e.getMessage());
            return createDefaultRecommendation(activity);
        }
    }

    private Recommendation processAiResponse(Activity activity, String aiResponse) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(aiResponse);

            JsonNode textNode = rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");

            String jsonContent = textNode.asText()
                    .replaceAll("```json\\n","")
                    .replaceAll("\\n```", "")
                    .trim();

//            log.info("PARSED RESPONSE FROM AI: {} ", jsonContent);

            JsonNode analysisJson = mapper.readTree(jsonContent);
            JsonNode analysisNode = analysisJson.path("analysis");
            
            StringBuilder fullAnalysis = new StringBuilder();
            addAnalysisSection(fullAnalysis, analysisNode, "overall", "Overall:");
            addAnalysisSection(fullAnalysis, analysisNode, "pace", "Pace:");
            addAnalysisSection(fullAnalysis, analysisNode, "heartRate", "Heart Rate:");
            addAnalysisSection(fullAnalysis, analysisNode, "caloriesBurned", "Calories:");

            List<String> improvements = extractImprovements(analysisJson.path("improvements"));
            List<String> suggestions = extractSuggestions(analysisJson.path("suggestions"));
            List<String> safety = extractSafetyGuidelines(analysisJson.path("safety"));

            return Recommendation.builder()
                    .activityId(activity.getId())
                    .userId(activity.getUserId())
                    .activityType(activity.getType())
                    .recommendation(fullAnalysis.toString().trim())
                    .improvements(improvements)
                    .suggestions(suggestions)
                    .safety(safety)
                    .createdAt(LocalDateTime.now())
                    .build();
            
        } catch (Exception e) {
            e.printStackTrace();
            return createDefaultRecommendation(activity);
        }
    }

    private Recommendation createDefaultRecommendation(Activity activity) {
        String activityType = activity.getType() != null ? activity.getType().toUpperCase() : "UNKNOWN";
        
        String mockRecommendation;
        List<String> mockImprovements;
        List<String> mockSuggestions;
        List<String> mockSafety;

        switch (activityType) {
            case "RUNNING":
                mockRecommendation = String.format("Great running session! You burned %d calories in %d minutes. Your pace seems steady. Running regularly improves cardiovascular health.", activity.getCaloriesBurned(), activity.getDuration());
                mockImprovements = Arrays.asList("Try incorporating interval training to improve your pace.", "Focus on your breathing rhythm.");
                mockSuggestions = Arrays.asList("Recovery Walk: 20 mins to ease muscles", "Core Workout: Strengthen your core to improve running posture");
                mockSafety = Arrays.asList("Wear proper running shoes to prevent joint stress.", "Always warm up with dynamic stretches.", "Stay hydrated before and after your run.");
                break;
            case "CYCLING":
                mockRecommendation = String.format("Solid cycling workout! Burning %d calories in %d minutes shows good endurance. Cycling is excellent for leg strength and stamina.", activity.getCaloriesBurned(), activity.getDuration());
                mockImprovements = Arrays.asList("Try adjusting your gear ratios to maintain a consistent cadence.", "Include some hill climbs to build leg power.");
                mockSuggestions = Arrays.asList("Light Yoga: 15 mins focusing on hip flexors and lower back", "Upper Body Strength: To balance your fitness profile");
                mockSafety = Arrays.asList("Always wear a properly fitted helmet.", "Check tire pressure and brakes before riding.", "Ensure your bike seat is at the correct height.");
                break;
            case "WALKING":
                mockRecommendation = String.format("Nice walking session! You burned %d calories over %d minutes. Walking is a fantastic low-impact way to stay active.", activity.getCaloriesBurned(), activity.getDuration());
                mockImprovements = Arrays.asList("Try increasing your walking pace slightly to elevate your heart rate.", "Incorporate arm movements or light weights.");
                mockSuggestions = Arrays.asList("Power Walk: Try a 30 min power walk tomorrow", "Stretching Routine: 10 mins focusing on calves and hamstrings");
                mockSafety = Arrays.asList("Wear comfortable, supportive walking shoes.", "Stay visible if walking early morning or late evening.", "Maintain good posture while walking.");
                break;
            default:
                mockRecommendation = String.format("Good job completing your %s activity! You burned %d calories in %d minutes. Keep up the consistent effort.", activity.getType(), activity.getCaloriesBurned(), activity.getDuration());
                mockImprovements = Arrays.asList("Gradually increase the duration or intensity of your workouts.", "Focus on maintaining proper form.");
                mockSuggestions = Arrays.asList("Cross-training: Mix up your routine to prevent plateaus", "Active Recovery: Take a day to do light mobility work");
                mockSafety = Arrays.asList("Always warm up before exercise.", "Stay hydrated throughout the day.", "Listen to your body and rest when needed.");
                break;
        }

        return Recommendation.builder()
                .activityId(activity.getId())
                .userId(activity.getUserId())
                .activityType(activity.getType())
                .recommendation("[MOCK AI RESPONSE] " + mockRecommendation)
                .improvements(mockImprovements)
                .suggestions(mockSuggestions)
                .safety(mockSafety)
                .createdAt(LocalDateTime.now())
                .build();
    }

    private List<String> extractSafetyGuidelines(JsonNode safetyNode) {
        List<String> safety = new ArrayList<>();
        if (safetyNode.isArray()) {
            safetyNode.forEach(item -> safety.add(item.asText()));
        }
        return safety.isEmpty() ?
                Collections.singletonList("Follow general safety guidelines") :
                safety;
    }

    private List<String> extractSuggestions(JsonNode suggestionsNode) {
        List<String> suggestions = new ArrayList<>();
        if (suggestionsNode.isArray()) {
            suggestionsNode.forEach(suggestion -> {
                String workout = suggestion.path("workout").asText();
                String description = suggestion.path("description").asText();
                suggestions.add(String.format("%s: %s", workout, description));
            });
        }
        return suggestions.isEmpty() ?
                Collections.singletonList("No specific suggestions provided") :
                suggestions;
    }

    private List<String> extractImprovements(JsonNode improvementsNode) {
        List<String> improvements = new ArrayList<>();
        if (improvementsNode.isArray()) {
            improvementsNode.forEach(improvement -> {
                String area = improvement.path("area").asText();
                String detail = improvement.path("recommendation").asText();
                improvements.add(String.format("%s: %s", area, detail));
            });
        }
        return improvements.isEmpty() ?
                Collections.singletonList("No specific improvements provided") :
                improvements;
    }

    private void addAnalysisSection(StringBuilder fullAnalysis, JsonNode analysisNode, String key, String prefix) {
        if (!analysisNode.path(key).isMissingNode()) {
            fullAnalysis.append(prefix)
                    .append(analysisNode.path(key).asText())
                    .append("\n\n");
        }
    }

    private String createPromptForActivity(Activity activity) {
        return String.format("""
        Analyze this fitness activity and provide detailed recommendations in the following EXACT JSON format:
        {
          "analysis": {
            "overall": "Overall analysis here",
            "pace": "Pace analysis here",
            "heartRate": "Heart rate analysis here",
            "caloriesBurned": "Calories analysis here"
          },
          "improvements": [
            "Detailed improvement 1",
            "Detailed improvement 2"
          ],
          "suggestions": [
            "Detailed suggestion 1",
            "Detailed suggestion 2"
          ],
          "safety": [
            "Safety point 1",
            "Safety point 2"
          ]
        }

        Analyze this activity:
        Activity Type: %s
        Duration: %d minutes
        Calories Burned: %d
        Additional Metrics: %s
        
        Provide detailed analysis focusing on performance, improvements, next workout suggestions, and safety guidelines.
        Ensure the response follows the EXACT JSON format shown above.
        """,
                activity.getType(),
                activity.getDuration(),
                activity.getCaloriesBurned(),
                activity.getAdditionalMetrics()
        );
    }
}
