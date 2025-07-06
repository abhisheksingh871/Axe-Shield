package com.a11ycheck.controller;

import com.a11ycheck.model.ScanRequest;
import com.a11ycheck.model.ScanResult;
import com.a11ycheck.service.ScannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ScanController {

    @Autowired
    private ScannerService scannerService;

    @PostMapping("/scan")
    public ResponseEntity<ScanResult> scanUrl(@RequestBody ScanRequest request) {
        return ResponseEntity.ok(scannerService.scanUrl(request.getUrl()));
    }
}

