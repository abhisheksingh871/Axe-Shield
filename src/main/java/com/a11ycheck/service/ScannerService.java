package com.a11ycheck.service;

import com.a11ycheck.model.ScanResult;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class ScannerService {

    public ScanResult scanUrl(String url) {
        try {
            ProcessBuilder pb = new ProcessBuilder("node", "scanner.js", url);
            pb.directory(new File("node-scanner"));
            pb.redirectErrorStream(true);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line);
            }

            process.waitFor();

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(output.toString(), ScanResult.class);

        } catch (Exception e) {
            e.printStackTrace();
            return new ScanResult("Error running scan: " + e.getMessage());
        }
    }
}
