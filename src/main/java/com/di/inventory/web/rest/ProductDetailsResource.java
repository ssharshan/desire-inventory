package com.di.inventory.web.rest;

import com.di.inventory.domain.ProductDetails;
import com.di.inventory.service.ProductDetailsService;
import com.di.inventory.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.di.inventory.domain.ProductDetails}.
 */
@RestController
@RequestMapping("/api")
public class ProductDetailsResource {

    private final Logger log = LoggerFactory.getLogger(ProductDetailsResource.class);

    private static final String ENTITY_NAME = "productDetails";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProductDetailsService productDetailsService;

    public ProductDetailsResource(ProductDetailsService productDetailsService) {
        this.productDetailsService = productDetailsService;
    }

    /**
     * {@code POST  /product-details} : Create a new productDetails.
     *
     * @param productDetails the productDetails to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new productDetails, or with status {@code 400 (Bad Request)} if the productDetails has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/product-details")
    public ResponseEntity<ProductDetails> createProductDetails(@Valid @RequestBody ProductDetails productDetails) throws URISyntaxException {
        log.debug("REST request to save ProductDetails : {}", productDetails);
        if (productDetails.getId() != null) {
            throw new BadRequestAlertException("A new productDetails cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductDetails result = productDetailsService.save(productDetails);
        return ResponseEntity.created(new URI("/api/product-details/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /product-details} : Updates an existing productDetails.
     *
     * @param productDetails the productDetails to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated productDetails,
     * or with status {@code 400 (Bad Request)} if the productDetails is not valid,
     * or with status {@code 500 (Internal Server Error)} if the productDetails couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/product-details")
    public ResponseEntity<ProductDetails> updateProductDetails(@Valid @RequestBody ProductDetails productDetails) throws URISyntaxException {
        log.debug("REST request to update ProductDetails : {}", productDetails);
        if (productDetails.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductDetails result = productDetailsService.save(productDetails);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, productDetails.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /product-details} : get all the productDetails.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of productDetails in body.
     */
    @GetMapping("/product-details")
    public ResponseEntity<List<ProductDetails>> getAllProductDetails(Pageable pageable) {
        log.debug("REST request to get a page of ProductDetails");
        Page<ProductDetails> page = productDetailsService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /product-details/:id} : get the "id" productDetails.
     *
     * @param id the id of the productDetails to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the productDetails, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/product-details/{id}")
    public ResponseEntity<ProductDetails> getProductDetails(@PathVariable Long id) {
        log.debug("REST request to get ProductDetails : {}", id);
        Optional<ProductDetails> productDetails = productDetailsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(productDetails);
    }

    /**
     * {@code DELETE  /product-details/:id} : delete the "id" productDetails.
     *
     * @param id the id of the productDetails to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/product-details/{id}")
    public ResponseEntity<Void> deleteProductDetails(@PathVariable Long id) {
        log.debug("REST request to delete ProductDetails : {}", id);
        productDetailsService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/product-details?query=:query} : search for the productDetails corresponding
     * to the query.
     *
     * @param query the query of the productDetails search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/product-details")
    public ResponseEntity<List<ProductDetails>> searchProductDetails(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of ProductDetails for query {}", query);
        Page<ProductDetails> page = productDetailsService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
