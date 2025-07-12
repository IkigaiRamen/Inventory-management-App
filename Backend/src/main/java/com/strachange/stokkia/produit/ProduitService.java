package com.strachange.stokkia.produit;


import com.strachange.stokkia.categorie.CategorieRepository;
import com.strachange.stokkia.categorie.model.Categorie;
import com.strachange.stokkia.produit.model.Produit;
import com.strachange.stokkia.produit.model.ProduitDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {

    private static final String IMAGE_DIR = "C:\\upload";
    private static final Logger logger = LoggerFactory.getLogger(ProduitService.class);
    private final ProduitRepository produitRepository;
    private final ProduitMapper produitMapper;
    private final CategorieRepository categorieRepository;

    public ProduitService(ProduitRepository produitRepository, ProduitMapper produitMapper, CategorieRepository
            categorieRepository) {
        this.produitRepository = produitRepository;
        this.produitMapper = produitMapper;
        this.categorieRepository = categorieRepository;

        // Ensure the image directory exists
        createImageDirectory();
    }

    private static String saveImage(MultipartFile imageFile) throws IOException {
        // Save the file to the server or cloud storage
        String fileName = imageFile.getOriginalFilename();
        String filePath = IMAGE_DIR + File.separator + fileName; // Use File.separator for cross-platform compatibility
        File dest = new File(filePath);

        // Transfer the file to the destination
        imageFile.transferTo(dest);
        return "http://localhost:8080/images/" + fileName; // Adjust URL as needed
    }

    // Method to create the image directory if it doesn't exist
    private void createImageDirectory() {
        File directory = new File(IMAGE_DIR);
        if (!directory.exists()) {
            boolean created = directory.mkdirs(); // Create the directory
            if (created) {

                logger.info("Image directory created at: {} ", IMAGE_DIR);
            } else {
                logger.error("Failed to create image directory at: {}", IMAGE_DIR);
            }
        } else {
            System.out.println("Image directory already exists at: " + IMAGE_DIR);
        }
    }

    public ProduitDTO save(ProduitDTO produitDTO, MultipartFile imageFile) throws IOException {

        Produit produit = produitMapper.produitDTOToproduit(produitDTO);
        Optional<Categorie> categorie = categorieRepository.findById(produitDTO.getCategorieId());
        if (categorie.isPresent()) {
            produit.setCategorie(categorie.get());

            if (imageFile != null && !imageFile.isEmpty()) {
                String filePath = saveImage(imageFile);
                produit.setImageurl(filePath);
            }

            produitRepository.save(produit);
            return produitMapper.produitToProduitDTO(produit);
        }

        return null;
    }

    public List<ProduitDTO> getAllProduisByCategory(Long categoryId) {
        List<Produit> produitList = produitRepository.findByCategorieId(categoryId);
        return produitMapper.produitListToProduitDTOList(produitList);
    }
    public List<ProduitDTO> getAllProduits() {
        return produitMapper.produitListToProduitDTOList(produitRepository.findAll());
    }


    public void saveOrUpdateProduit(ProduitDTO produitDTO) {
        // Fetch the Categorie entity based on the provided categorieId from produitDTO
        Optional<Categorie> categorieOpt = categorieRepository.findById(produitDTO.getCategorieId());

        if (categorieOpt.isEmpty()) {
            throw new IllegalArgumentException("La catégorie avec l'ID " + produitDTO.getCategorieId() + " n'a pas été trouvée.");
        }

        // Set the Categorie to the produitDTO (assuming the produitDTO needs the actual Categorie object, not just the ID)
        Categorie categorie = categorieOpt.get();
        Produit produit = produitMapper.produitDTOToproduit(produitDTO);
        produit.setCategorie(categorie);  // Set the category here

        // Save the produit to the repository
        produitRepository.save(produit);
    }


    public ProduitDTO updateProduit(Long id, ProduitDTO produitDTO, MultipartFile imageFile) throws IOException {
        Produit produit = produitRepository.findById(id).orElseThrow();
        produit.setCategorie(categorieRepository.findById(produitDTO.getCategorieId()).orElseThrow());
        produit.setDescription(produitDTO.getDescription());
        produit.setPrix(produitDTO.getPrix());
        produit.setLibelle(produitDTO.getLibelle());
        produit.setImageurl(produitDTO.getImageurl());
        produit.setQuantiteDisponible(produit.getQuantiteDisponible());
        produit.setQuantiteTotale(produitDTO.getQuantiteTotale());
        produit.setPrixLoc(produitDTO.getPrixLoc());
        // Update the image if a new file is provided
        if (imageFile != null && !imageFile.isEmpty()) {
            String filePath = saveImage(imageFile);
            produit.setImageurl(filePath);
        }
        return produitMapper.produitToProduitDTO(produitRepository.save(produit));
    }
    public ProduitDTO getProduitById(Long id) {
        // Fetch the product by ID, or throw an exception if not found
        Produit produit = produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Return the mapped DTO
        return produitMapper.produitToProduitDTO(produit);
    }
    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }


    public Page<ProduitDTO> getAllProduitsWithPagination(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Produit> produitPage;

        if (search.isEmpty()) {
            produitPage = produitRepository.findAll(pageable);
        } else {
            produitPage = produitRepository.findByLibelleContainingIgnoreCaseOrBarcodeContainingIgnoreCase(search, search, pageable);        }

        return produitPage.map(produitMapper::produitToProduitDTO);
    }

    public Page<ProduitDTO> getAllProduitsByCategoryWithPagination(Long categorieId, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Produit> produitPage;

        if (search.isEmpty()) {
            produitPage = produitRepository.findByCategorieId(categorieId, pageable);
        } else {
            produitPage = produitRepository.findByCategorieIdAndLibelleContainingIgnoreCase(categorieId, search, pageable);
        }

        return produitPage.map(produitMapper::produitToProduitDTO);
    }
}