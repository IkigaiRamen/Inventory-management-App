package com.strachange.stokkia.devis;

import com.strachange.stokkia.config.ApiResponse;
import com.strachange.stokkia.devis.model.DevisDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devis")
public record DevisController(DevisService devisService) {


    // Create a new Devis
    @PostMapping
    public ResponseEntity<ApiResponse<DevisDTO>> createDevis(@RequestBody DevisDTO devisDTO) {
        DevisDTO createdDevis = devisService.createDevis(devisDTO);
        ApiResponse<DevisDTO> response = new ApiResponse<>(createdDevis, "Devis created successfully.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get a Devis by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<DevisDTO>> getDevisById(@PathVariable Long id) {
        DevisDTO devisDTO = devisService.getDevisById(id);
        if (devisDTO != null) {
            ApiResponse<DevisDTO> response = new ApiResponse<>(devisDTO, "Devis retrieved successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(null, "Devis not found"));
    }

    // Get all Devis
    @GetMapping
    public ResponseEntity<ApiResponse<List<DevisDTO>>> getAllDevis() {
        List<DevisDTO> devisList = devisService.getAllDevis();
        ApiResponse<List<DevisDTO>> response = new ApiResponse<>(devisList, "All devis retrieved successfully.");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Update an existing Devis
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<DevisDTO>> updateDevis(@PathVariable Long id, @RequestBody DevisDTO devisDTO) {
        DevisDTO updatedDevis = devisService.updateDevis(id, devisDTO);
        if (updatedDevis != null) {
            ApiResponse<DevisDTO> response = new ApiResponse<>(updatedDevis, "Devis updated successfully.");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(null, "Devis not found"));
    }

    // Delete a Devis by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDevis(@PathVariable Long id) {
        boolean isDeleted = devisService.deleteDevis(id);
        if (isDeleted) {
            ApiResponse<Void> response = new ApiResponse<>(null, "Devis deleted successfully.");
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ApiResponse<>(null, "Devis not found"));
    }
}
