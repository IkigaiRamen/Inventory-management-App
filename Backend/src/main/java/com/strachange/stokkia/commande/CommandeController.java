package com.strachange.stokkia.commande;


import com.strachange.stokkia.commande.model.CommandeAdditionalDetails;
import com.strachange.stokkia.commande.model.CommandeDTO;
import com.strachange.stokkia.config.ApiResponse;
import com.strachange.stokkia.detailcommande.DetailCommandeService;
import com.strachange.stokkia.detailcommande.model.CommandeDetailCreation;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/commandes")
public record CommandeController(CommandeService commandeService, DetailCommandeService detailCommandeService,
                                 PagedResourcesAssembler<CommandeDTO> pagedResourcesAssembler) {


    @PostMapping("/create")
    public ResponseEntity<ApiResponse<CommandeDTO>> creerCommandeAvecDetailCommande(@RequestBody CommandeDetailCreation creationCommande) {
        CommandeDTO commandeDTO = detailCommandeService.createCommandeFromCommandeDetail(creationCommande);
        ApiResponse<CommandeDTO> response = new ApiResponse<>(commandeDTO, "commande crée avec succèes");
        return ResponseEntity.ok(response);
    }
    @PutMapping("/fillAdditionalFields/{commandeId}")
    public ResponseEntity<ApiResponse<CommandeDTO>> fillAdditionalFields(@PathVariable Long commandeId,
                                                                         @RequestBody CommandeAdditionalDetails additionalDetails) {
        CommandeDTO updatedCommande = commandeService.fillAdditionalCommandeFields(commandeId, additionalDetails);
        ApiResponse<CommandeDTO> response = new ApiResponse<>(updatedCommande, "Champs supplémentaires remplis avec succès");
        return ResponseEntity.ok(response);
    }
    @PutMapping("/valider/{commandeId}")
    public ResponseEntity<ApiResponse<CommandeDTO>> validerCommande(@PathVariable Long commandeId) {
        CommandeDTO validatedCommande = commandeService.validerCommande(commandeId);
        ApiResponse<CommandeDTO> response = new ApiResponse<>(validatedCommande, "Commande validée avec succès");
        return ResponseEntity.ok(response);
    }
    @PutMapping("/progresser/{commandeId}")
    public ResponseEntity<ApiResponse<CommandeDTO>> progressCommande(@PathVariable Long commandeId) {
        CommandeDTO validatedCommande = commandeService.progressCommande(commandeId);
        ApiResponse<CommandeDTO> response = new ApiResponse<>(validatedCommande, "Commande en progress avec succès");
        return ResponseEntity.ok(response);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CommandeDTO>> getCommandeById(@PathVariable Long id) {
        CommandeDTO commandeDTO = commandeService.getCommandeById(id);
        ApiResponse<CommandeDTO> response = new ApiResponse<>(commandeDTO, "Commande récupérée avec succès");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/commandes")
    public ResponseEntity<PagedModel<EntityModel<CommandeDTO>>> getAllCommandes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(value = "search", required = false) String searchTerm) { // Add the search parameter

        // Call the service to get the paginated and filtered commandes
        Page<CommandeDTO> commandes = commandeService.getPaginatedCommandes(page, size, searchTerm);

        // Use PagedResourcesAssembler to convert the Page<CommandeDTO> to PagedModel<EntityModel<CommandeDTO>>
        PagedModel<EntityModel<CommandeDTO>> pagedModel = pagedResourcesAssembler.toModel(commandes);

        return ResponseEntity.ok(pagedModel);
    }
    @PutMapping("/cancel/{commandeId}")
    public ResponseEntity<ApiResponse<CommandeDTO>> cancelCommande(@PathVariable Long commandeId) {
        CommandeDTO canceledCommande = commandeService.cancelCommande(commandeId);
        ApiResponse<CommandeDTO> response = new ApiResponse<>(canceledCommande, "Commande annulée avec succès");
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteCommande(@PathVariable Long id) {
        commandeService.deleteCommande(id);
        ApiResponse<String> response = new ApiResponse<>(null,"Commande supprimée avec succès");
        return ResponseEntity.ok(response);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<CommandeDTO>> updateCommande(@PathVariable Long id, @RequestBody CommandeAdditionalDetails additionalDetails) {
        CommandeDTO updatedCommande = commandeService.updateCommande(id, additionalDetails);
        ApiResponse<CommandeDTO> response = new ApiResponse<>(updatedCommande, "Commande mise à jour avec succès");
        return ResponseEntity.ok(response);
    }
}
