package com.di.inventory.repository.search;
import com.di.inventory.domain.ProductDetails;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ProductDetails} entity.
 */
public interface ProductDetailsSearchRepository extends ElasticsearchRepository<ProductDetails, Long> {
}
