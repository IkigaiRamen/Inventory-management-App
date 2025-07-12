package com.strachange.stokkia.client;


import com.strachange.stokkia.client.model.Client;
import com.strachange.stokkia.client.model.ClientDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    private static final String IMAGE_DIR = "C:\\upload";
    private static final Logger logger = LoggerFactory.getLogger(ClientService.class);


    private static String saveImage(MultipartFile imageFile) throws IOException {
        // Save the file to the server or cloud storage
        String fileName = imageFile.getOriginalFilename();
        String filePath = IMAGE_DIR + File.separator + fileName; // Use File.separator for cross-platform compatibility
        File dest = new File(filePath);

        // Transfer the file to the destination
        imageFile.transferTo(dest);
        return "http://localhost:8080/images/" + fileName; // Adjust URL as needed
    }

    public ClientService(ClientRepository clientRepository, ClientMapper clientMapper) {
        this.clientRepository = clientRepository;
        this.clientMapper = clientMapper;
    }

    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll().stream()
                .map(clientMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ClientDTO getClientById(Long id) {
        // Debugging: log the ID to make sure the query is correct
        System.out.println("Fetching client for ID: " + id);
        Client client = clientRepository.findById(id).orElse(null);  // Or your equivalent query logic
        if (client == null) {
            System.out.println("Client not found for ID: " + id);
        }
        return clientMapper.toDTO(client);  // Assuming you have a mapper to convert the entity to DTO
    }


    public ClientDTO saveClient(ClientDTO clientDTO, MultipartFile imageFile, MultipartFile imageFile2) throws IOException {
        Client client = clientMapper.toEntity(clientDTO);

        Client savedClient = clientRepository.save(client);

        // Process images
        if (imageFile != null && !imageFile.isEmpty()) {
            String filePath = saveImage(imageFile);
            client.setCinRecto(filePath);
            savedClient = clientRepository.save(client);
            logger.info("Updated client with first image URL saved. ID: {}", savedClient.getId());
        }
        if (imageFile2 != null && !imageFile2.isEmpty()) {
            String filePath = saveImage(imageFile2);
            client.setCinVerso(filePath); // Override with second image if present
            savedClient = clientRepository.save(client);
            logger.info("Updated client with second image URL saved. ID: {}", savedClient.getId());
        }

        if (imageFile == null && imageFile2 == null) {
            logger.warn("No image files were provided for the client.");
        }

        return clientMapper.toDTO(savedClient);
    }


    public ClientDTO updateClient(Long id, ClientDTO clientDTO, MultipartFile imageFile, MultipartFile imageFile2) {
        return clientRepository.findById(id)
                .map(existingClient -> {
                    // Update basic fields
                    existingClient.setPrenom(clientDTO.getPrenom());
                    existingClient.setNom(clientDTO.getNom());
                    existingClient.setNumeroCin(clientDTO.getNumeroCin());
                    existingClient.setNumero(clientDTO.getNumero());

                    // Update image URLs if new image files are provided
                    updateImageIfProvided(existingClient, imageFile, "recto");
                    updateImageIfProvided(existingClient, imageFile2, "verso");

                    // Save the updated client
                    Client updatedClient = clientRepository.save(existingClient);
                    return clientMapper.toDTO(updatedClient);
                })
                .orElse(null);
    }

    private void updateImageIfProvided(Client existingClient, MultipartFile imageFile, String imageType) {
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String filePath = saveImage(imageFile);
                // Set the correct field based on imageType
                if ("recto".equals(imageType)) {
                    existingClient.setCinRecto(filePath);
                    logger.info("Updated client recto image URL for ID: {}", existingClient.getId());
                } else if ("verso".equals(imageType)) {
                    existingClient.setCinVerso(filePath);
                    logger.info("Updated client verso image URL for ID: {}", existingClient.getId());
                }
            } catch (IOException e) {
                logger.error("Error saving the image file for client ID: {}", existingClient.getId(), e);
                throw new RuntimeException("Failed to save image file", e);
            }
        }
    }


    public void deleteClient(Long id) {
        clientRepository.deleteById(id);
    }

}

