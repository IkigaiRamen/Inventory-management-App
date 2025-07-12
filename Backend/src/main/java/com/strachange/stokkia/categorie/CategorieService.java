package com.strachange.stokkia.categorie;


import com.strachange.stokkia.categorie.model.Categorie;
import com.strachange.stokkia.categorie.model.CategorieDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategorieService {

    private final CategorieRepository categorieRepository;
    private final CategorieMapper categorieMapper;

    public CategorieService(CategorieRepository categorieRepository, CategorieMapper categorieMapper) {
        this.categorieRepository = categorieRepository;
        this.categorieMapper = categorieMapper;
    }


    public CategorieDTO save(CategorieDTO categorieDTO) {
        Categorie categorie = categorieMapper.categorieDTOToDCategorie(categorieDTO) ;
        categorieRepository.save(categorie);
        return categorieMapper.categorieTCategorieDTO(categorie);
    }
    public List<CategorieDTO> getAllCategories() {
        List<Categorie> categorieList = categorieRepository.findAll() ;
        return categorieMapper.categorieListToCategorieDTOList(categorieList);
    }

    public CategorieDTO updateCategorie(Long id, CategorieDTO categorieDTO) {
        Categorie categorie = categorieRepository.findById(id).orElseThrow();
        categorie.setLibelle(categorieDTO.getLibelle());
        categorie.setDescription(categorieDTO.getDescription());
        return categorieMapper.categorieTCategorieDTO(categorieRepository.save(categorie));
    }

    public void deleteCategorie(Long id) {
        categorieRepository.deleteById(id);
    }

}
