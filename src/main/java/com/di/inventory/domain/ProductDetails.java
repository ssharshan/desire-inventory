package com.di.inventory.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A ProductDetails.
 */
@Entity
@Table(name = "product_details")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "productdetails")
public class ProductDetails implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @Column(name = "weight")
    private Integer weight;

    @NotNull
    @Column(name = "mrp", nullable = false)
    private Float mrp;

    @Column(name = "distributor_price")
    private Float distributorPrice;

    @Column(name = "distributor_margin")
    private Float distributorMargin;

    @Column(name = "lot_count")
    private Integer lotCount;

    @Column(name = "available")
    private Integer available;

    @Column(name = "shortcut")
    private String shortcut;

    @ManyToOne
    @JsonIgnoreProperties("productDetails")
    private Product product;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWeight() {
        return weight;
    }

    public ProductDetails weight(Integer weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public Float getMrp() {
        return mrp;
    }

    public ProductDetails mrp(Float mrp) {
        this.mrp = mrp;
        return this;
    }

    public void setMrp(Float mrp) {
        this.mrp = mrp;
    }

    public Float getDistributorPrice() {
        return distributorPrice;
    }

    public ProductDetails distributorPrice(Float distributorPrice) {
        this.distributorPrice = distributorPrice;
        return this;
    }

    public void setDistributorPrice(Float distributorPrice) {
        this.distributorPrice = distributorPrice;
    }

    public Float getDistributorMargin() {
        return distributorMargin;
    }

    public ProductDetails distributorMargin(Float distributorMargin) {
        this.distributorMargin = distributorMargin;
        return this;
    }

    public void setDistributorMargin(Float distributorMargin) {
        this.distributorMargin = distributorMargin;
    }

    public Integer getLotCount() {
        return lotCount;
    }

    public ProductDetails lotCount(Integer lotCount) {
        this.lotCount = lotCount;
        return this;
    }

    public void setLotCount(Integer lotCount) {
        this.lotCount = lotCount;
    }

    public Integer getAvailable() {
        return available;
    }

    public ProductDetails available(Integer available) {
        this.available = available;
        return this;
    }

    public void setAvailable(Integer available) {
        this.available = available;
    }

    public String getShortcut() {
        return shortcut;
    }

    public ProductDetails shortcut(String shortcut) {
        this.shortcut = shortcut;
        return this;
    }

    public void setShortcut(String shortcut) {
        this.shortcut = shortcut;
    }

    public Product getProduct() {
        return product;
    }

    public ProductDetails product(Product product) {
        this.product = product;
        return this;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProductDetails)) {
            return false;
        }
        return id != null && id.equals(((ProductDetails) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ProductDetails{" +
            "id=" + getId() +
            ", weight=" + getWeight() +
            ", mrp=" + getMrp() +
            ", distributorPrice=" + getDistributorPrice() +
            ", distributorMargin=" + getDistributorMargin() +
            ", lotCount=" + getLotCount() +
            ", available=" + getAvailable() +
            ", shortcut='" + getShortcut() + "'" +
            "}";
    }
}
