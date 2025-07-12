package com.strachange.stokkia.detailcommande;

import com.strachange.stokkia.commande.CommandeMapper;
import com.strachange.stokkia.commande.CommandeRepository;
import com.strachange.stokkia.commande.model.Commande;
import com.strachange.stokkia.commande.model.CommandeDTO;
import com.strachange.stokkia.commande.model.StatutCommande;
import com.strachange.stokkia.commandeachat.CommandeAchat;
import com.strachange.stokkia.commandelocation.CommandeLocation;
import com.strachange.stokkia.commandevente.CommandeVente;
import com.strachange.stokkia.detailcommande.model.CommandeDetailCreation;
import com.strachange.stokkia.detailcommande.model.DetailCommande;
import com.strachange.stokkia.produit.ProduitRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class DetailCommandeService {

    private final CommandeRepository commandeRepository;
    private final ProduitRepository produitRepository;
    private final CommandeMapper commandeMapper;
    private final DetailCommandeRepository detailCommandeRepository;

    public DetailCommandeService(CommandeRepository commandeRepository, ProduitRepository produitRepository, CommandeMapper commandeMapper, DetailCommandeRepository detailCommandeRepository) {
        this.commandeRepository = commandeRepository;
        this.produitRepository = produitRepository;
        this.commandeMapper = commandeMapper;
        this.detailCommandeRepository = detailCommandeRepository;
    }

    public CommandeDTO createCommandeFromCommandeDetail(CommandeDetailCreation commandeDetailCreation) {

        Commande commande = switch (commandeDetailCreation.getTypeCommande()) {
            case PURCHASE -> new CommandeAchat();
            case SALE -> new CommandeVente();
            case RENTAL -> new CommandeLocation();
            default ->
                    throw new IllegalArgumentException("Type de commande inconnu : "
                            + commandeDetailCreation.getTypeCommande());
        };
        // Set the current date as the commande date
        commande.setDateCommande(LocalDateTime.now());
        commande.setStatutCommande(StatutCommande.START);

        // Check if detailCommandeDTOList is null or empty
        if (commandeDetailCreation.getDetailCommandeDTOList() == null ||
                commandeDetailCreation.getDetailCommandeDTOList().isEmpty()) {
            throw new IllegalArgumentException("La liste des détails de commande ne peut pas être vide.");
        }
        final BigDecimal[] prixCommandeHTHolder = { BigDecimal.ZERO }; // Using a holder array for prixCommandeHT (BigDecimal)
        final BigDecimal taxRate = BigDecimal.valueOf(0.2);

        List<DetailCommande> details = commandeDetailCreation.getDetailCommandeDTOList().stream().map(produitDTO -> {
            DetailCommande detail = new DetailCommande();
            detail.setCommande(commande);
            detail.setProduit(produitRepository.findById(produitDTO.getProduitId())
                    .orElseThrow(() -> new RuntimeException("Produit non trouvé avec ID : "
                            + produitDTO.getProduitId())));
            detail.setQuantite(produitDTO.getQuantite());
            // Calculate total price without tax for each product and accumulate it in prixCommandeHTHolder
            BigDecimal productPriceHT = BigDecimal.valueOf(detail.getProduit().getPrix())
                    .multiply(BigDecimal.valueOf(detail.getQuantite()));
            prixCommandeHTHolder[0] = prixCommandeHTHolder[0].add(productPriceHT);
            return detail;
        }).toList();

        // Calculate total price with tax
        BigDecimal prixCommandeHT = prixCommandeHTHolder[0];
        BigDecimal prixCommande = prixCommandeHT.multiply(BigDecimal.ONE.add(taxRate));

        // Set the calculated prices in the Commande
        commande.setPrixCommandeHT(prixCommandeHT);
        commande.setPrixCommande(prixCommande);

        detailCommandeRepository.saveAll(details);
        return commandeMapper.commandeToCommandeDTO(commande);
    }

}
