package com.di.inventory.service;

import com.di.inventory.domain.ProductDetails;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link ProductDetails}.
 */
public interface ProductDetailsService {

    /**
     * Save a productDetails.
     *
     * @param productDetails the entity to save.
     * @return the persisted entity.
     */
    ProductDetails save(ProductDetails productDetails);

    /**
     * Get all the productDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProductDetails> findAll(Pageable pageable);


    /**
     * Get the "id" productDetails.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProductDetails> findOne(Long id);

    /**
     * Delete the "id" productDetails.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

    /**
     * Search for the productDetails corresponding to the query.
     *
     * @param query the query of the search.
     * 
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ProductDetails> search(String query, Pageable pageable);
}
