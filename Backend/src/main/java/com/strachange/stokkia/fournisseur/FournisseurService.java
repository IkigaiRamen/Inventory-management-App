package com.strachange.stokkia.fournisseur;
import com.strachange.stokkia.fournisseur.model.Fournisseur;
import com.strachange.stokkia.fournisseur.model.FournisseurDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;
@Service
public class FournisseurService {

    private final FournisseurRepository fournisseurRepository;

    private final FournisseurMapper fournisseurMapper;

    public FournisseurService(FournisseurRepository fournisseurRepository, FournisseurMapper fournisseurMapper) {
        this.fournisseurRepository = fournisseurRepository;
        this.fournisseurMapper = fournisseurMapper;
    }


    public List<FournisseurDTO> getAllFournisseurs() {
        return fournisseurRepository.findAll().stream()
                .map(fournisseurMapper::toDTO)
                .collect(Collectors.toList());
    }


    public FournisseurDTO getFournisseurById(Long id) {
        return fournisseurRepository.findById(id)
                .map(fournisseurMapper::toDTO)
                .orElse(null);
    }


    public FournisseurDTO saveFournisseur(FournisseurDTO fournisseurDTO) {
        Fournisseur fournisseur = fournisseurMapper.toEntity(fournisseurDTO);
        Fournisseur savedFournisseur = fournisseurRepository.save(fournisseur);
        return fournisseurMapper.toDTO(savedFournisseur);
    }
    public FournisseurDTO updateFournisseur(Long id, FournisseurDTO fournisseurDTO) {
        return fournisseurRepository.findById(id)
                .map(getFournisseurFournisseurDTOFunction(fournisseurDTO))
                .orElse(null);
    }


    public void deleteFournisseur(Long id) {
        fournisseurRepository.deleteById(id);
    }


    ////////////////////////////////////// private methodes /////////////
    private Function<Fournisseur, FournisseurDTO> getFournisseurFournisseurDTOFunction(FournisseurDTO fournisseurDTO) {
        return existingFournisseur -> {

            existingFournisseur.setPrenom(fournisseurDTO.getPrenom());
            existingFournisseur.setNom(fournisseurDTO.getNom());
            existingFournisseur.setSociete(fournisseurDTO.getSociete());
            existingFournisseur.setSiren(fournisseurDTO.getSiren());
            existingFournisseur.setNumero(fournisseurDTO.getNumero());
            Fournisseur updatedFournisseur = fournisseurRepository.save(existingFournisseur);
            return fournisseurMapper.toDTO(updatedFournisseur);
        };
    }

}
