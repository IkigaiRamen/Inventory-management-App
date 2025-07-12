package com.strachange.stokkia.commande;


import com.strachange.stokkia.commande.model.*;

import com.strachange.stokkia.detailcommande.DetailCommandeMapper;
import com.strachange.stokkia.detailcommande.model.DetailCommande;
import com.strachange.stokkia.devis.DevisMapper;
import com.strachange.stokkia.devis.DevisRepository;
import com.strachange.stokkia.devis.model.Devis;
import com.strachange.stokkia.facture.FactureRepository;
import com.strachange.stokkia.facture.model.Facture;
import com.strachange.stokkia.personne.Model.Personne;
import com.strachange.stokkia.personne.PersonneRepository;
import com.strachange.stokkia.personne.TypePersonne;
import com.strachange.stokkia.produit.ProduitMapper;
import com.strachange.stokkia.produit.ProduitService;
import com.strachange.stokkia.produit.model.Produit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.function.Consumer;


@Service
public class CommandeService {

    private final CommandeRepository commandeRepository;
    private final PersonneRepository personneRepository;
    private final CommandeMapper commandeMapper;
    private final ProduitService produitService;
    private final ProduitMapper produitMapper;
    private final DetailCommandeMapper detailCommandeMapper;
    private final DevisMapper devisMapper;
    private final DevisRepository devisRepository;
    private final FactureRepository factureRepository;

    public CommandeService(CommandeRepository commandeRepository, PersonneRepository personneRepository,
                           CommandeMapper commandeMapper, ProduitService produitService, ProduitMapper produitMapper,
                           DetailCommandeMapper detailCommandeMapper, DevisMapper devisMapper,
                           DevisRepository devisRepository, FactureRepository factureRepository) {
        this.commandeRepository = commandeRepository;
        this.personneRepository = personneRepository;
        this.commandeMapper = commandeMapper;
        this.produitService = produitService;
        this.produitMapper = produitMapper;
        this.detailCommandeMapper = detailCommandeMapper;
        this.devisMapper = devisMapper;
        this.devisRepository = devisRepository;
        this.factureRepository = factureRepository;
    }

    public CommandeDTO fillAdditionalCommandeFields(Long commandeId, CommandeAdditionalDetails additionalDetails) {
        System.out.println("Starting fillAdditionalCommandeFields for Commande ID: " + commandeId);

        // Retrieve Commande and handle potential absence
        Commande commande = commandeRepository.findById(commandeId)
                .orElseThrow(() -> new RuntimeException("Commande not found with ID: " + commandeId));
        System.out.println("Commande retrieved with ID: " + commande.getId());

        // Retrieve Personne and handle potential absence
        Personne personne = personneRepository.findById(additionalDetails.getPersonneId())
                .orElseThrow(() -> new RuntimeException("Personne non trouvée avec ID : " + additionalDetails.getPersonneId()));
        System.out.println("Personne retrieved with ID: " + personne.getId());
        System.out.println("Personne type: " + personne.getType());

        // Handle specific actions based on the Personne type
        if (personne.getType() == TypePersonne.CUSTOMER) {
            System.out.println("Personne type is CUSTOMER. Calling handleCustomerType...");
            handleCustomerType(commande, additionalDetails);
        } else if (personne.getType() == TypePersonne.SUPPLIER) {
            System.out.println("Personne type is SUPPLIER. Calling handleSupplierType...");
            handleSupplierType(commande, additionalDetails);
        } else {
            System.out.println("Unhandled Personne type: " + personne.getType());
        }


        // Set Personne on the Commande
        commande.setPersonne(personne);
        commande.setDateDebutCommande( LocalDate.now());
        commande.setDateFinCommande(LocalDate.now().plusDays(30));
        System.out.println("Personne set on Commande with ID: " + commande.getId());

        // Set general fields for Commande
        System.out.println("Setting general fields for Commande...");
        setCommandeGeneralFields(commande, additionalDetails);

        // Save the updated Commande
        System.out.println("Saving updated Commande...");
        commande = commandeRepository.save(commande);
        System.out.println("Commande saved with ID: " + commande.getId());

        // Convert to CommandeDTO and return
        CommandeDTO commandeDTO = commandeMapper.commandeToCommandeDTO(commande);
        System.out.println("Returning CommandeDTO with ID: " + commandeDTO.getCommandeId());

        return commandeDTO;
    }


    private void handleCustomerType(Commande commande, CommandeAdditionalDetails additionalDetails) {
        System.out.println("Entering handleCustomerType for Commande ID: " + commande.getId());

        // Check if Devis already exists
        Devis devis = commande.getDevis();
        System.out.println("Existing Devis for Commande: " + (devis != null ? devis.getNumeroDevis() : "No Devis attached"));

        if (devis == null) {
            devis = new Devis();
            String numeroDevis = "DEV-" + commande.getId();
            devis.setNumeroDevis(numeroDevis);
            System.out.println("New Devis Numero: " + numeroDevis);

            LocalDate dateCreation = LocalDate.now();
            devis.setDateCreation(dateCreation);
            System.out.println("Devis Creation Date: " + dateCreation);

            LocalDate dateExpiration = additionalDetails.getDateExpirationDevis() != null
                    ? additionalDetails.getDateExpirationDevis()
                    : LocalDate.now().plusDays(30);
            devis.setDateExpiration(dateExpiration);
            System.out.println("Devis Expiration Date: " + dateExpiration);

            BigDecimal totalAmount = commande.getPrixCommande();
            devis.setTotalAmount(totalAmount);
            System.out.println("Devis Total Amount: " + totalAmount);

            BigDecimal taxAmount = BigDecimal.valueOf(20);
            devis.setTaxAmount(taxAmount);
            System.out.println("Devis Tax Amount: " + taxAmount);

            // Persist Devis before associating it with Commande
            devisRepository.save(devis);
            System.out.println("Devis saved with ID: " + devis.getId());

            // Associate Devis with Commande
            commande.setDevis(devis);
            System.out.println("Devis associated with Commande ID: " + commande.getId());
        } else {
            System.out.println("Commande already has an associated Devis: " + devis.getNumeroDevis());
        }

        System.out.println("Exiting handleCustomerType for Commande ID: " + commande.getId());
    }


    private void handleSupplierType(Commande commande, CommandeAdditionalDetails additionalDetails) {
        // Retrieve or create a new Facture if it doesn't exist
        Facture facture = commande.getFacture();
        if (facture == null) {
            facture = new Facture();
            facture.setNumeroFacture("F-" + commande.getId());
            facture.setDescription("Facture for Commande ID: " + commande.getId());
            facture.setDateEmission(LocalDate.now());
            facture.setDateEcheance(additionalDetails.getDateEcheanceFacture() != null ?
                    additionalDetails.getDateEcheanceFacture() : LocalDate.now().plusDays(30));
            facture.setStatutPaiement(additionalDetails.getStatutPaiement());
            facture.setModePaiement(additionalDetails.getModePaiement());
            facture.setTotalAmount(commande.getPrixCommande());
            facture.setTaxAmount(BigDecimal.valueOf(20));  // Set tax amount

            // Debugging: Print Facture details before saving
            System.out.println("Creating Facture for Commande ID: " + commande.getId());
            System.out.println("Facture Numero: " + facture.getNumeroFacture());
            System.out.println("Facture Description: " + facture.getDescription());
            System.out.println("Facture Date Emission: " + facture.getDateEmission());
            System.out.println("Facture Date Echeance: " + facture.getDateEcheance());
            System.out.println("Facture Statut Paiement: " + facture.getStatutPaiement());
            System.out.println("Facture Mode Paiement: " + facture.getModePaiement());
            System.out.println("Facture Total Amount: " + facture.getTotalAmount());
            System.out.println("Facture Tax Amount: " + facture.getTaxAmount());

            // Attempt to save Facture and check for success
            facture = factureRepository.save(facture);
            if (facture.getId() != null) {
                System.out.println("Facture saved successfully with ID: " + facture.getId());
            } else {
                System.out.println("Failed to save Facture.");
            }

            // Associate Facture with Commande
            commande.setFacture(facture);
            System.out.println("Facture associated with Commande ID: " + commande.getId());

            // Verify the association
            if (commande.getFacture() != null && commande.getFacture().getId() != null) {
                System.out.println("Commande now has associated Facture ID: " + commande.getFacture().getId());
            } else {
                System.out.println("Failed to associate Facture with Commande.");
            }
        } else {
            System.out.println("Facture already exists for Commande ID: " + commande.getId());
        }
    }


    private void setCommandeGeneralFields(Commande commande, CommandeAdditionalDetails additionalDetails) {
        commande.setReferenceCommande(additionalDetails.getReferenceCommande());
        commande.setSens(additionalDetails.getSens());

        // Only set dates for rental type commands
        if (commande.getTypeCommande().equals(TypeCommande.RENTAL)) {
            commande.setDateDebutCommande(additionalDetails.getDateDebutCommande());
            commande.setDateFinCommande(additionalDetails.getDateFinCommande());
        }
    }


    public CommandeDTO progressCommande(Long commandeId) {
        Commande commande = commandeRepository.findById(commandeId)
                .orElseThrow(() -> new IllegalStateException("Commande non trouvée"));
        if (commande.getStatutCommande() != StatutCommande.START) {
            throw new IllegalStateException("La commande n'est pas dans l'état valide pour être validée");
        }
        commande.setStatutCommande(StatutCommande.IN_PROGRESS);
        Commande updatedCommande = commandeRepository.save(commande);
        return commandeMapper.getCommandeDTOFromCommande(updatedCommande);

    }

    public CommandeDTO validerCommande(Long commandeId) {
        Commande commande = commandeRepository.findById(commandeId)
                .orElseThrow(() -> new IllegalStateException("Commande non trouvée"));

        // Vérifier l'état de la commande
        if (commande.getStatutCommande() != StatutCommande.IN_PROGRESS) {
            throw new IllegalStateException("La commande n'est pas dans l'état valide pour être validée");
        }

        // Check that each produit's categorie is not null
        for (DetailCommande detail : commande.getDetailsCommande()) {
            Produit produit = detail.getProduit();
            if (produit.getCategorie() == null) {
                throw new IllegalStateException("Le produit avec l'ID " + produit.getId() + " n'a pas de catégorie assignée.");
            }
        }

        // Mettre à jour le statut de la commande
        commande.setStatutCommande(StatutCommande.VALIDATED);

        // Mettre à jour les quantités des produits
        commande.getDetailsCommande().forEach(getDetailCommandeConsumer(commande));

        // Sauvegarder la commande avec le nouveau statut
        Commande updatedCommande = commandeRepository.save(commande);

        // Convertir en CommandeDTO et retourner
        return commandeMapper.getCommandeDTOFromCommande(updatedCommande);
    }


    private Consumer<DetailCommande> getDetailCommandeConsumer(Commande commande) {
        return detail -> {
            Produit produit = detail.getProduit();

            // Check if the produit has a valid categorie before proceeding
            if (produit.getCategorie() == null) {
                throw new IllegalArgumentException("Le produit avec l'ID " + produit.getId() + " n'a pas de catégorie assignée.");
            }

            // Handling the credit case
            if (commande.getSens().equals(Sens.CREDIT)) {
                if (produit.getQuantiteDisponible() < detail.getQuantite()) {
                    throw new IllegalArgumentException("Quantité insuffisante pour le produit: " + produit.getId());
                }

                // Update the available quantity for the product
                produit.setQuantiteDisponible(produit.getQuantiteDisponible() - detail.getQuantite());
            } else {
                // Handling the debit case
                produit.setQuantiteDisponible(produit.getQuantiteDisponible() + detail.getQuantite());
                produit.setQuantiteTotale(produit.getQuantiteTotale() + detail.getQuantite());
            }

            // Save or update the produit with the updated values
            produitService.saveOrUpdateProduit(produitMapper.produitToProduitDTO(produit));
        };
    }


    public CommandeDTO getCommandeById(Long id) {
        Commande commande = commandeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée avec ID: " + id));
        CommandeDTO commandeDTO = commandeMapper.commandeToCommandeDTO(commande);
        commandeDTO.setDetailsCommande(detailCommandeMapper.detailCommandesToDetailCommandeDTOs(commande.getDetailsCommande()));
        return commandeDTO;
    }

    public Page<CommandeDTO> getPaginatedCommandes(int page, int size, String searchTerm) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Order.desc("dateCommande")));

        // Check if search term is provided
        Page<Commande> commandes;
        if (searchTerm != null && !searchTerm.isEmpty()) {
            // Assuming you want to search by 'referenceCommande', you can adjust this to any field you need
            commandes = commandeRepository.findByReferenceCommandeContainingIgnoreCase(searchTerm, pageable);
        } else {
            commandes = commandeRepository.findAll(pageable);
        }

        // Convert Commande entities to CommandeDTOs
        return commandes.map(commande -> {
            CommandeDTO dto = commandeMapper.commandeToCommandeDTO(commande);
            dto.setDetailsCommande(detailCommandeMapper.detailCommandesToDetailCommandeDTOs(commande.getDetailsCommande()));
            return dto;
        });
    }

    // Add the cancelCommande method
    public CommandeDTO cancelCommande(Long commandeId) {
        Commande commande = commandeRepository.findById(commandeId)
                .orElseThrow(() -> new RuntimeException("Commande non trouvée avec ID: " + commandeId));

        // Check if the commande can be canceled
        if (commande.getStatutCommande() == StatutCommande.VALIDATED) {
            throw new IllegalStateException("La commande validée ne peut pas être annulée");
        }

        // Update the status to CANCELED
        commande.setStatutCommande(StatutCommande.CANCELLED);

        // Restore product quantities if necessary (assuming 'credit' orders need this logic)
        if (commande.getSens().equals(Sens.CREDIT)) {
            for (DetailCommande detail : commande.getDetailsCommande()) {
                Produit produit = detail.getProduit();
                produit.setQuantiteDisponible(produit.getQuantiteDisponible() + detail.getQuantite());
                produit.setQuantiteTotale(produit.getQuantiteTotale() + detail.getQuantite());

                // Save or update the produit with the updated values
                produitService.saveOrUpdateProduit(produitMapper.produitToProduitDTO(produit));
            }
        }

        // Save the updated commande
        Commande updatedCommande = commandeRepository.save(commande);

        // Convert to CommandeDTO and return
        return commandeMapper.commandeToCommandeDTO(updatedCommande);
    }

    public void deleteCommande(Long id) {

        commandeRepository.deleteById(id);
    }

    public CommandeDTO updateCommande(Long id, CommandeAdditionalDetails additionalDetails) {
        return fillAdditionalCommandeFields(id, additionalDetails);
    }
}
