package com.strachange.stokkia.produit;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.strachange.stokkia.config.ApiResponse;
import com.strachange.stokkia.produit.model.ProduitDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/produit")
public record ProduitControlleur(ProduitService produitService, PagedResourcesAssembler<ProduitDTO> assembler) {

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<ProduitDTO>> createProduct(@RequestParam("file") MultipartFile file,
                                                                 @RequestParam("produit") String produitDTOString) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ProduitDTO produitDTO = objectMapper.readValue(produitDTOString, ProduitDTO.class);

        ProduitDTO createdProduct = produitService.save(produitDTO, file);
        ApiResponse<ProduitDTO> response = new ApiResponse<>(createdProduct, "Product created successfully.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<ProduitDTO>> updateProduct(@PathVariable Long id,
                                                                 @RequestParam(value = "file", required = false) MultipartFile file,
                                                                 @RequestParam("produit") String produitDTOString) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ProduitDTO produitDTO = objectMapper.readValue(produitDTOString, ProduitDTO.class);

        ProduitDTO updatedProduct = produitService.updateProduit(id, produitDTO, file);
        ApiResponse<ProduitDTO> response = new ApiResponse<>(updatedProduct, "Product updated successfully.");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduit(@PathVariable Long id) {
        produitService.deleteProduit(id);
        ApiResponse<Void> response = new ApiResponse<>(null, "Product deleted successfully.");
        return ResponseEntity.ok(response);
    }


    @GetMapping("/category1/{categorieId}")
    public ResponseEntity<ApiResponse<List<ProduitDTO>>> getAllProduitByCategory(@PathVariable Long categorieId) {
        List<ProduitDTO> products = produitService.getAllProduisByCategory(categorieId);
        ApiResponse<List<ProduitDTO>> response = new ApiResponse<>(products, "Products retrieved by category successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }
    @GetMapping("/All")
    public ResponseEntity<ApiResponse<List<ProduitDTO>>> getAllProduit() {
        List<ProduitDTO> produitDTOList = produitService.getAllProduits();
        ApiResponse<List<ProduitDTO>> response = new ApiResponse<>(produitDTOList, "All products retrieved successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    // Fix for ambiguous mapping: this method now retrieves a single product by its ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProduitDTO>> getProduitById(@PathVariable Long id) {
        ProduitDTO produitDTO = produitService.getProduitById(id);
        ApiResponse<ProduitDTO> response = new ApiResponse<>(produitDTO, "Product retrieved successfully.");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // New methods with pagination and search
    @GetMapping("/paginated")
    public ResponseEntity<ApiResponse<PagedModel<EntityModel<ProduitDTO>>>> getAllProduitWithPagination(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        // Fetch the paginated products
        Page<ProduitDTO> produitPage = produitService.getAllProduitsWithPagination(search, page, size);
        // Wrap the page into PagedModel<EntityModel<ProduitDTO>> using PagedResourcesAssembler
        PagedModel<EntityModel<ProduitDTO>> pagedModel = assembler.toModel(produitPage);
        // Return the response as ApiResponse with PagedModel
        ApiResponse<PagedModel<EntityModel<ProduitDTO>>> response = new ApiResponse<>(pagedModel, "Paginated products retrieved successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @GetMapping("/category/{categorieId}/paginated")
    public ResponseEntity<ApiResponse<PagedModel<EntityModel<ProduitDTO>>>> getAllProduitByCategoryWithPagination(
            @PathVariable Long categorieId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        // Fetch the paginated products by category
        Page<ProduitDTO> produitPage = produitService.getAllProduitsByCategoryWithPagination(categorieId, search, page, size);

        // Wrap the page into PagedModel<EntityModel<ProduitDTO>> using PagedResourcesAssembler
        PagedModel<EntityModel<ProduitDTO>> pagedModel = assembler.toModel(produitPage);

        // Return the response as ApiResponse with PagedModel
        ApiResponse<PagedModel<EntityModel<ProduitDTO>>> response = new ApiResponse<>(pagedModel, "Paginated products by category retrieved successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }
}