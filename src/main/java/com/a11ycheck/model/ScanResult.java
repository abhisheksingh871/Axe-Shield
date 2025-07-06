package com.a11ycheck.model;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ScanResult {
    private String url;
    private List<Violation> violations;

    // ✅ Add this constructor
    public ScanResult(String url) {
        this.url = url;
    }

    public ScanResult() {}

    // Getters and setters
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<Violation> getViolations() {
        return violations;
    }

    public void setViolations(List<Violation> violations) {
        this.violations = violations;
    }
}
