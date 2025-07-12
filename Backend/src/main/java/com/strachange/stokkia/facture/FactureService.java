package com.strachange.stokkia.facture;

import com.strachange.stokkia.facture.model.Facture;
import com.strachange.stokkia.facture.model.FactureDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class FactureService {

    private final FactureRepository factureRepository;
    private final FactureMapper factureMapper;

    public FactureService(FactureRepository factureRepository, FactureMapper factureMapper) {
        this.factureRepository = factureRepository;
        this.factureMapper = factureMapper;
    }

    // CREATE Facture
    public FactureDTO createFacture(FactureDTO factureDTO) {
        Facture facture = factureMapper.factureDTOtoFacture(factureDTO);
        Facture savedFacture = factureRepository.save(facture);
        return factureMapper.facturetoFactureDTO(savedFacture);
    }

    // READ Facture by ID
    public FactureDTO getFactureById(Long id) {
        Facture facture = factureRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Facture not found with ID: " + id));
        return factureMapper.facturetoFactureDTO(facture);
    }

    // READ all Factures
    public List<FactureDTO> getAllFactures() {
        List<Facture> factures = factureRepository.findAll();
        return factures.stream()
                .map(factureMapper::facturetoFactureDTO)
                .collect(Collectors.toList());
    }

    // UPDATE Facture
    public FactureDTO updateFacture(Long id, FactureDTO factureDTO) {
        Facture existingFacture = factureRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Facture not found with ID: " + id));
        // Map updated fields from DTO to entity
        existingFacture.setNumeroFacture(factureDTO.getNumeroFacture());
        existingFacture.setDescription(factureDTO.getDescription());
        existingFacture.setDateEmission(factureDTO.getDateEmission());
        existingFacture.setDateEcheance(factureDTO.getDateEcheance());
        existingFacture.setStatutPaiement(factureDTO.getStatutPaiement());
        existingFacture.setModePaiement(factureDTO.getModePaiement());
        existingFacture.setTotalAmount(factureDTO.getTotalAmount());
        existingFacture.setTaxAmount(factureDTO.getTaxAmount());
        Facture updatedFacture = factureRepository.save(existingFacture);
        return factureMapper.facturetoFactureDTO(updatedFacture);
    }

    // DELETE Facture
    public void deleteFacture(Long id) {
        if (!factureRepository.existsById(id)) {
            throw new EntityNotFoundException("Facture not found with ID: " + id);
        }
        factureRepository.deleteById(id);
    }
}

