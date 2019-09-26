package com.di.inventory.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ProductDetailsSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ProductDetailsSearchRepositoryMockConfiguration {

    @MockBean
    private ProductDetailsSearchRepository mockProductDetailsSearchRepository;

}
