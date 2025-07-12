package com.strachange.stokkia.client;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.strachange.stokkia.client.model.ClientDTO;
import com.strachange.stokkia.config.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/clients")
public record ClientController(ClientService clientService) {

    @GetMapping
    public ResponseEntity<ApiResponse<List<ClientDTO>>> getAllClients() {
        List<ClientDTO> clientDTOList = clientService.getAllClients();
        ApiResponse<List<ClientDTO>> response = new ApiResponse<>(clientDTOList, "All clients retrieved successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ClientDTO>> getClientById(@PathVariable Long id) {
        ClientDTO clientDTO = clientService.getClientById(id);
        ApiResponse<ClientDTO> response = new ApiResponse<>(clientDTO, "Client retrieved successfully.");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<ClientDTO>> saveClient(
            @RequestParam("file") MultipartFile file,
            @RequestParam("file2") MultipartFile file2,
            @RequestPart("clientDTO") String clientDTOJson) throws IOException {

        // Convert JSON string to ClientDTO object
        ObjectMapper objectMapper = new ObjectMapper();
        ClientDTO clientDTO = objectMapper.readValue(clientDTOJson, ClientDTO.class);

        ClientDTO savedClient = clientService.saveClient(clientDTO, file,file2);
        ApiResponse<ClientDTO> response = new ApiResponse<>(savedClient, "Client created successfully.");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<ApiResponse<ClientDTO>> updateClient(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "file2", required = false) MultipartFile file2,
            @RequestPart("clientDTO") String clientDTOJson) throws IOException {

        // Convert JSON string to ClientDTO object
        ObjectMapper objectMapper = new ObjectMapper();
        ClientDTO clientDTO = objectMapper.readValue(clientDTOJson, ClientDTO.class);

        // Call the service method with the updated client data and optional file
        ClientDTO updatedClient = clientService.updateClient(id, clientDTO, file,file2);
        ApiResponse<ClientDTO> response = new ApiResponse<>(updatedClient, "Client updated successfully.");
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        ApiResponse<Void> response = new ApiResponse<>(null, "Client deleted successfully.");
        return ResponseEntity.ok(response);
    }
}
