package com.strachange.stokkia.devis;

import com.strachange.stokkia.devis.model.Devis;
import com.strachange.stokkia.devis.model.DevisDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DevisService {

    private final DevisRepository devisRepository;
    private final DevisMapper devisMapper;

    public DevisService(DevisRepository devisRepository, DevisMapper devisMapper) {
        this.devisRepository = devisRepository;
        this.devisMapper = devisMapper;
    }

    // Create a new Devis
    public DevisDTO createDevis(DevisDTO devisDTO) {
        Devis devis = devisMapper.toDevis(devisDTO);
        Devis savedDevis = devisRepository.save(devis);
        return devisMapper.toDevisDTO(savedDevis);
    }

    // Get a Devis by ID
    public DevisDTO getDevisById(Long id) {
        Optional<Devis> devis = devisRepository.findById(id);
        return devis.map(devisMapper::toDevisDTO).orElse(null);
    }

    // Get all Devis entries
    public List<DevisDTO> getAllDevis() {
        return devisRepository.findAll()
                .stream()
                .map(devisMapper::toDevisDTO)
                .collect(Collectors.toList());
    }

    // Update an existing Devis
    public DevisDTO updateDevis(Long id, DevisDTO devisDTO) {
        Optional<Devis> existingDevis = devisRepository.findById(id);
        if (existingDevis.isPresent()) {
            Devis devis = devisMapper.toDevis(devisDTO);
            devis.setId(id); // Ensure we're updating the right entity
            Devis updatedDevis = devisRepository.save(devis);
            return devisMapper.toDevisDTO(updatedDevis);
        }
        return null;
    }

    // Delete a Devis by ID
    public boolean deleteDevis(Long id) {
        if (devisRepository.existsById(id)) {
            devisRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
