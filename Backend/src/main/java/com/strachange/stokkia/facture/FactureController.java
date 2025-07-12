package com.strachange.stokkia.facture;

import com.strachange.stokkia.config.ApiResponse;
import com.strachange.stokkia.facture.model.FactureDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/facture")
public record FactureController(FactureService factureService) {
    @PostMapping
    public ResponseEntity<ApiResponse<FactureDTO>> createFacture(@RequestBody FactureDTO factureDTO) {
        FactureDTO createdFacture = factureService.createFacture(factureDTO);
        ApiResponse<FactureDTO> response = new ApiResponse<>(createdFacture, "Facture created successfully.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get a Facture by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FactureDTO>> getFactureById(@PathVariable Long id) {
        FactureDTO facture = factureService.getFactureById(id);
        ApiResponse<FactureDTO> response = new ApiResponse<>(facture, "Facture retrieved successfully.");
        return ResponseEntity.ok(response);
    }

    // Update a Facture by ID
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<FactureDTO>> updateFacture(
            @PathVariable Long id,
            @RequestBody FactureDTO factureDTO) {
        FactureDTO updatedFacture = factureService.updateFacture(id, factureDTO);
        ApiResponse<FactureDTO> response = new ApiResponse<>(updatedFacture, "Facture updated successfully.");
        return ResponseEntity.ok(response);
    }

    // Delete a Facture by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFacture(@PathVariable Long id) {
        factureService.deleteFacture(id);
        ApiResponse<Void> response = new ApiResponse<>(null, "Facture deleted successfully.");
        return ResponseEntity.ok(response);
    }
}

