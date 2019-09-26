package com.di.inventory.web.rest;

import com.di.inventory.DiInventoryApp;
import com.di.inventory.domain.ProductDetails;
import com.di.inventory.repository.ProductDetailsRepository;
import com.di.inventory.repository.search.ProductDetailsSearchRepository;
import com.di.inventory.service.ProductDetailsService;
import com.di.inventory.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.kafka.test.context.EmbeddedKafka;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static com.di.inventory.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProductDetailsResource} REST controller.
 */
@EmbeddedKafka
@SpringBootTest(classes = DiInventoryApp.class)
public class ProductDetailsResourceIT {

    private static final Integer DEFAULT_WEIGHT = 1;
    private static final Integer UPDATED_WEIGHT = 2;
    private static final Integer SMALLER_WEIGHT = 1 - 1;

    private static final Float DEFAULT_MRP = 1F;
    private static final Float UPDATED_MRP = 2F;
    private static final Float SMALLER_MRP = 1F - 1F;

    private static final Float DEFAULT_DISTRIBUTOR_PRICE = 1F;
    private static final Float UPDATED_DISTRIBUTOR_PRICE = 2F;
    private static final Float SMALLER_DISTRIBUTOR_PRICE = 1F - 1F;

    private static final Float DEFAULT_DISTRIBUTOR_MARGIN = 1F;
    private static final Float UPDATED_DISTRIBUTOR_MARGIN = 2F;
    private static final Float SMALLER_DISTRIBUTOR_MARGIN = 1F - 1F;

    private static final Integer DEFAULT_LOT_COUNT = 1;
    private static final Integer UPDATED_LOT_COUNT = 2;
    private static final Integer SMALLER_LOT_COUNT = 1 - 1;

    private static final Integer DEFAULT_AVAILABLE = 1;
    private static final Integer UPDATED_AVAILABLE = 2;
    private static final Integer SMALLER_AVAILABLE = 1 - 1;

    private static final String DEFAULT_SHORTCUT = "AAAAAAAAAA";
    private static final String UPDATED_SHORTCUT = "BBBBBBBBBB";

    @Autowired
    private ProductDetailsRepository productDetailsRepository;

    @Autowired
    private ProductDetailsService productDetailsService;

    /**
     * This repository is mocked in the com.di.inventory.repository.search test package.
     *
     * @see com.di.inventory.repository.search.ProductDetailsSearchRepositoryMockConfiguration
     */
    @Autowired
    private ProductDetailsSearchRepository mockProductDetailsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restProductDetailsMockMvc;

    private ProductDetails productDetails;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductDetailsResource productDetailsResource = new ProductDetailsResource(productDetailsService);
        this.restProductDetailsMockMvc = MockMvcBuilders.standaloneSetup(productDetailsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductDetails createEntity(EntityManager em) {
        ProductDetails productDetails = new ProductDetails()
            .weight(DEFAULT_WEIGHT)
            .mrp(DEFAULT_MRP)
            .distributorPrice(DEFAULT_DISTRIBUTOR_PRICE)
            .distributorMargin(DEFAULT_DISTRIBUTOR_MARGIN)
            .lotCount(DEFAULT_LOT_COUNT)
            .available(DEFAULT_AVAILABLE)
            .shortcut(DEFAULT_SHORTCUT);
        return productDetails;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProductDetails createUpdatedEntity(EntityManager em) {
        ProductDetails productDetails = new ProductDetails()
            .weight(UPDATED_WEIGHT)
            .mrp(UPDATED_MRP)
            .distributorPrice(UPDATED_DISTRIBUTOR_PRICE)
            .distributorMargin(UPDATED_DISTRIBUTOR_MARGIN)
            .lotCount(UPDATED_LOT_COUNT)
            .available(UPDATED_AVAILABLE)
            .shortcut(UPDATED_SHORTCUT);
        return productDetails;
    }

    @BeforeEach
    public void initTest() {
        productDetails = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductDetails() throws Exception {
        int databaseSizeBeforeCreate = productDetailsRepository.findAll().size();

        // Create the ProductDetails
        restProductDetailsMockMvc.perform(post("/api/product-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDetails)))
            .andExpect(status().isCreated());

        // Validate the ProductDetails in the database
        List<ProductDetails> productDetailsList = productDetailsRepository.findAll();
        assertThat(productDetailsList).hasSize(databaseSizeBeforeCreate + 1);
        ProductDetails testProductDetails = productDetailsList.get(productDetailsList.size() - 1);
        assertThat(testProductDetails.getWeight()).isEqualTo(DEFAULT_WEIGHT);
        assertThat(testProductDetails.getMrp()).isEqualTo(DEFAULT_MRP);
        assertThat(testProductDetails.getDistributorPrice()).isEqualTo(DEFAULT_DISTRIBUTOR_PRICE);
        assertThat(testProductDetails.getDistributorMargin()).isEqualTo(DEFAULT_DISTRIBUTOR_MARGIN);
        assertThat(testProductDetails.getLotCount()).isEqualTo(DEFAULT_LOT_COUNT);
        assertThat(testProductDetails.getAvailable()).isEqualTo(DEFAULT_AVAILABLE);
        assertThat(testProductDetails.getShortcut()).isEqualTo(DEFAULT_SHORTCUT);

        // Validate the ProductDetails in Elasticsearch
        verify(mockProductDetailsSearchRepository, times(1)).save(testProductDetails);
    }

    @Test
    @Transactional
    public void createProductDetailsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productDetailsRepository.findAll().size();

        // Create the ProductDetails with an existing ID
        productDetails.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductDetailsMockMvc.perform(post("/api/product-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDetails)))
            .andExpect(status().isBadRequest());

        // Validate the ProductDetails in the database
        List<ProductDetails> productDetailsList = productDetailsRepository.findAll();
        assertThat(productDetailsList).hasSize(databaseSizeBeforeCreate);

        // Validate the ProductDetails in Elasticsearch
        verify(mockProductDetailsSearchRepository, times(0)).save(productDetails);
    }


    @Test
    @Transactional
    public void checkMrpIsRequired() throws Exception {
        int databaseSizeBeforeTest = productDetailsRepository.findAll().size();
        // set the field null
        productDetails.setMrp(null);

        // Create the ProductDetails, which fails.

        restProductDetailsMockMvc.perform(post("/api/product-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDetails)))
            .andExpect(status().isBadRequest());

        List<ProductDetails> productDetailsList = productDetailsRepository.findAll();
        assertThat(productDetailsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProductDetails() throws Exception {
        // Initialize the database
        productDetailsRepository.saveAndFlush(productDetails);

        // Get all the productDetailsList
        restProductDetailsMockMvc.perform(get("/api/product-details?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)))
            .andExpect(jsonPath("$.[*].mrp").value(hasItem(DEFAULT_MRP.doubleValue())))
            .andExpect(jsonPath("$.[*].distributorPrice").value(hasItem(DEFAULT_DISTRIBUTOR_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].distributorMargin").value(hasItem(DEFAULT_DISTRIBUTOR_MARGIN.doubleValue())))
            .andExpect(jsonPath("$.[*].lotCount").value(hasItem(DEFAULT_LOT_COUNT)))
            .andExpect(jsonPath("$.[*].available").value(hasItem(DEFAULT_AVAILABLE)))
            .andExpect(jsonPath("$.[*].shortcut").value(hasItem(DEFAULT_SHORTCUT.toString())));
    }
    
    @Test
    @Transactional
    public void getProductDetails() throws Exception {
        // Initialize the database
        productDetailsRepository.saveAndFlush(productDetails);

        // Get the productDetails
        restProductDetailsMockMvc.perform(get("/api/product-details/{id}", productDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productDetails.getId().intValue()))
            .andExpect(jsonPath("$.weight").value(DEFAULT_WEIGHT))
            .andExpect(jsonPath("$.mrp").value(DEFAULT_MRP.doubleValue()))
            .andExpect(jsonPath("$.distributorPrice").value(DEFAULT_DISTRIBUTOR_PRICE.doubleValue()))
            .andExpect(jsonPath("$.distributorMargin").value(DEFAULT_DISTRIBUTOR_MARGIN.doubleValue()))
            .andExpect(jsonPath("$.lotCount").value(DEFAULT_LOT_COUNT))
            .andExpect(jsonPath("$.available").value(DEFAULT_AVAILABLE))
            .andExpect(jsonPath("$.shortcut").value(DEFAULT_SHORTCUT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProductDetails() throws Exception {
        // Get the productDetails
        restProductDetailsMockMvc.perform(get("/api/product-details/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductDetails() throws Exception {
        // Initialize the database
        productDetailsService.save(productDetails);
        // As the test used the service layer, reset the Elasticsearch mock repository
        reset(mockProductDetailsSearchRepository);

        int databaseSizeBeforeUpdate = productDetailsRepository.findAll().size();

        // Update the productDetails
        ProductDetails updatedProductDetails = productDetailsRepository.findById(productDetails.getId()).get();
        // Disconnect from session so that the updates on updatedProductDetails are not directly saved in db
        em.detach(updatedProductDetails);
        updatedProductDetails
            .weight(UPDATED_WEIGHT)
            .mrp(UPDATED_MRP)
            .distributorPrice(UPDATED_DISTRIBUTOR_PRICE)
            .distributorMargin(UPDATED_DISTRIBUTOR_MARGIN)
            .lotCount(UPDATED_LOT_COUNT)
            .available(UPDATED_AVAILABLE)
            .shortcut(UPDATED_SHORTCUT);

        restProductDetailsMockMvc.perform(put("/api/product-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductDetails)))
            .andExpect(status().isOk());

        // Validate the ProductDetails in the database
        List<ProductDetails> productDetailsList = productDetailsRepository.findAll();
        assertThat(productDetailsList).hasSize(databaseSizeBeforeUpdate);
        ProductDetails testProductDetails = productDetailsList.get(productDetailsList.size() - 1);
        assertThat(testProductDetails.getWeight()).isEqualTo(UPDATED_WEIGHT);
        assertThat(testProductDetails.getMrp()).isEqualTo(UPDATED_MRP);
        assertThat(testProductDetails.getDistributorPrice()).isEqualTo(UPDATED_DISTRIBUTOR_PRICE);
        assertThat(testProductDetails.getDistributorMargin()).isEqualTo(UPDATED_DISTRIBUTOR_MARGIN);
        assertThat(testProductDetails.getLotCount()).isEqualTo(UPDATED_LOT_COUNT);
        assertThat(testProductDetails.getAvailable()).isEqualTo(UPDATED_AVAILABLE);
        assertThat(testProductDetails.getShortcut()).isEqualTo(UPDATED_SHORTCUT);

        // Validate the ProductDetails in Elasticsearch
        verify(mockProductDetailsSearchRepository, times(1)).save(testProductDetails);
    }

    @Test
    @Transactional
    public void updateNonExistingProductDetails() throws Exception {
        int databaseSizeBeforeUpdate = productDetailsRepository.findAll().size();

        // Create the ProductDetails

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductDetailsMockMvc.perform(put("/api/product-details")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productDetails)))
            .andExpect(status().isBadRequest());

        // Validate the ProductDetails in the database
        List<ProductDetails> productDetailsList = productDetailsRepository.findAll();
        assertThat(productDetailsList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ProductDetails in Elasticsearch
        verify(mockProductDetailsSearchRepository, times(0)).save(productDetails);
    }

    @Test
    @Transactional
    public void deleteProductDetails() throws Exception {
        // Initialize the database
        productDetailsService.save(productDetails);

        int databaseSizeBeforeDelete = productDetailsRepository.findAll().size();

        // Delete the productDetails
        restProductDetailsMockMvc.perform(delete("/api/product-details/{id}", productDetails.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProductDetails> productDetailsList = productDetailsRepository.findAll();
        assertThat(productDetailsList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ProductDetails in Elasticsearch
        verify(mockProductDetailsSearchRepository, times(1)).deleteById(productDetails.getId());
    }

    @Test
    @Transactional
    public void searchProductDetails() throws Exception {
        // Initialize the database
        productDetailsService.save(productDetails);
        when(mockProductDetailsSearchRepository.search(queryStringQuery("id:" + productDetails.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(productDetails), PageRequest.of(0, 1), 1));
        // Search the productDetails
        restProductDetailsMockMvc.perform(get("/api/_search/product-details?query=id:" + productDetails.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productDetails.getId().intValue())))
            .andExpect(jsonPath("$.[*].weight").value(hasItem(DEFAULT_WEIGHT)))
            .andExpect(jsonPath("$.[*].mrp").value(hasItem(DEFAULT_MRP.doubleValue())))
            .andExpect(jsonPath("$.[*].distributorPrice").value(hasItem(DEFAULT_DISTRIBUTOR_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].distributorMargin").value(hasItem(DEFAULT_DISTRIBUTOR_MARGIN.doubleValue())))
            .andExpect(jsonPath("$.[*].lotCount").value(hasItem(DEFAULT_LOT_COUNT)))
            .andExpect(jsonPath("$.[*].available").value(hasItem(DEFAULT_AVAILABLE)))
            .andExpect(jsonPath("$.[*].shortcut").value(hasItem(DEFAULT_SHORTCUT)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductDetails.class);
        ProductDetails productDetails1 = new ProductDetails();
        productDetails1.setId(1L);
        ProductDetails productDetails2 = new ProductDetails();
        productDetails2.setId(productDetails1.getId());
        assertThat(productDetails1).isEqualTo(productDetails2);
        productDetails2.setId(2L);
        assertThat(productDetails1).isNotEqualTo(productDetails2);
        productDetails1.setId(null);
        assertThat(productDetails1).isNotEqualTo(productDetails2);
    }
}
