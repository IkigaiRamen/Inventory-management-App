package com.strachange.stokkia.categorie;

import com.strachange.stokkia.config.ApiResponse;
import com.strachange.stokkia.categorie.model.CategorieDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorie")
public record CategorieControlleur(CategorieService categorieService) {

    @PostMapping(value = "/create")
    public ResponseEntity<ApiResponse<CategorieDTO>> createCategorie(@RequestBody CategorieDTO categorieDTO) {
        CategorieDTO savedCategorie = categorieService.save(categorieDTO);
        ApiResponse<CategorieDTO> response = new ApiResponse<>(savedCategorie, "Categorie created successfully.");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<CategorieDTO>> updateCategorie(@PathVariable Long id, @RequestBody CategorieDTO categorieDTO) {
        CategorieDTO updatedCategorie = categorieService.updateCategorie(id, categorieDTO);
        ApiResponse<CategorieDTO> response = new ApiResponse<>(updatedCategorie, "Categorie updated successfully.");
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCategorie(@PathVariable Long id) {
        categorieService.deleteCategorie(id);
        ApiResponse<Void> response = new ApiResponse<>(null, "Categorie deleted successfully.");
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategorieDTO>>> getAllCategorie() {
        List<CategorieDTO> categorieDTOList = categorieService.getAllCategories();
        ApiResponse<List<CategorieDTO>> response = new ApiResponse<>(categorieDTOList, "All categories retrieved successfully.");
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }
}
