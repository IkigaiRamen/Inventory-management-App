package com.strachange.stokkia.config;

import com.strachange.stokkia.commande.model.CommandeDTO;
import com.strachange.stokkia.produit.model.ProduitDTO;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.data.web.config.EnableSpringDataWebSupport;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableSpringDataWebSupport
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:///C:/upload/");
    }
    @Bean
    public PageableHandlerMethodArgumentResolver pageableHandlerMethodArgumentResolver() {
        return new PageableHandlerMethodArgumentResolver();
    }

    @Bean
    public PagedResourcesAssembler<CommandeDTO> customPagedResourcesAssembler() {
        return new PagedResourcesAssembler<>(null, null);
    }
    @Bean
    public PagedResourcesAssembler<ProduitDTO> produitPagedResourcesAssembler() {
        return new PagedResourcesAssembler<>(null, null);  // You can provide a resource processor if needed
    }
}