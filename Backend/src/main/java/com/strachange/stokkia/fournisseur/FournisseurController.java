package com.strachange.stokkia.fournisseur;

import com.strachange.stokkia.config.ApiResponse;
import com.strachange.stokkia.fournisseur.model.FournisseurDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fournisseurs")
public record FournisseurController(FournisseurService fournisseurService) {

    @GetMapping
    public ResponseEntity<ApiResponse<List<FournisseurDTO>>> getAllFournisseurs() {
        List<FournisseurDTO> fournisseurDTOList = fournisseurService.getAllFournisseurs();
        ApiResponse<List<FournisseurDTO>> response = new ApiResponse<>(fournisseurDTOList, "All fournisseurs retrieved successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<FournisseurDTO>> getFournisseurById(@PathVariable Long id) {
        FournisseurDTO fournisseurDTO = fournisseurService.getFournisseurById(id);
        ApiResponse<FournisseurDTO> response = new ApiResponse<>(fournisseurDTO, "Fournisseur retrieved successfully.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<FournisseurDTO>> saveFournisseur(@RequestBody FournisseurDTO fournisseurDTO) {
        FournisseurDTO savedFournisseur = fournisseurService.saveFournisseur(fournisseurDTO);
        ApiResponse<FournisseurDTO> response = new ApiResponse<>(savedFournisseur, "Fournisseur created successfully.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<FournisseurDTO>> updateFournisseur(@PathVariable Long id, @RequestBody FournisseurDTO fournisseurDTO) {
        FournisseurDTO updatedFournisseur = fournisseurService.updateFournisseur(id, fournisseurDTO);
        ApiResponse<FournisseurDTO> response = new ApiResponse<>(updatedFournisseur, "Fournisseur updated successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteFournisseur(@PathVariable Long id) {
        fournisseurService.deleteFournisseur(id);
        ApiResponse<Void> response = new ApiResponse<>(null, "Fournisseur deleted successfully.");
        return ResponseEntity.ok(response);
    }
}
