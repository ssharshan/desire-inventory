package com.di.inventory.service.impl;

import com.di.inventory.service.ProductDetailsService;
import com.di.inventory.domain.ProductDetails;
import com.di.inventory.repository.ProductDetailsRepository;
import com.di.inventory.repository.search.ProductDetailsSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link ProductDetails}.
 */
@Service
@Transactional
public class ProductDetailsServiceImpl implements ProductDetailsService {

    private final Logger log = LoggerFactory.getLogger(ProductDetailsServiceImpl.class);

    private final ProductDetailsRepository productDetailsRepository;

    private final ProductDetailsSearchRepository productDetailsSearchRepository;

    public ProductDetailsServiceImpl(ProductDetailsRepository productDetailsRepository, ProductDetailsSearchRepository productDetailsSearchRepository) {
        this.productDetailsRepository = productDetailsRepository;
        this.productDetailsSearchRepository = productDetailsSearchRepository;
    }

    /**
     * Save a productDetails.
     *
     * @param productDetails the entity to save.
     * @return the persisted entity.
     */
    @Override
    public ProductDetails save(ProductDetails productDetails) {
        log.debug("Request to save ProductDetails : {}", productDetails);
        ProductDetails result = productDetailsRepository.save(productDetails);
        productDetailsSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the productDetails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProductDetails> findAll(Pageable pageable) {
        log.debug("Request to get all ProductDetails");
        return productDetailsRepository.findAll(pageable);
    }


    /**
     * Get one productDetails by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ProductDetails> findOne(Long id) {
        log.debug("Request to get ProductDetails : {}", id);
        return productDetailsRepository.findById(id);
    }

    /**
     * Delete the productDetails by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductDetails : {}", id);
        productDetailsRepository.deleteById(id);
        productDetailsSearchRepository.deleteById(id);
    }

    /**
     * Search for the productDetails corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProductDetails> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ProductDetails for query {}", query);
        return productDetailsSearchRepository.search(queryStringQuery(query), pageable);    }
}
