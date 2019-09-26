package com.di.inventory.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "shortcut")
    private String shortcut;

    @NotNull
    @Column(name = "cgst", nullable = false)
    private Float cgst;

    @NotNull
    @Column(name = "sgst", nullable = false)
    private Float sgst;

    @Column(name = "hsn")
    private String hsn;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Company company;

    @OneToOne
    @JoinColumn(unique = true)
    private Category category;

    @OneToMany(mappedBy = "product")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ProductDetails> types = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Product name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getShortcut() {
        return shortcut;
    }

    public Product shortcut(String shortcut) {
        this.shortcut = shortcut;
        return this;
    }

    public void setShortcut(String shortcut) {
        this.shortcut = shortcut;
    }

    public Float getCgst() {
        return cgst;
    }

    public Product cgst(Float cgst) {
        this.cgst = cgst;
        return this;
    }

    public void setCgst(Float cgst) {
        this.cgst = cgst;
    }

    public Float getSgst() {
        return sgst;
    }

    public Product sgst(Float sgst) {
        this.sgst = sgst;
        return this;
    }

    public void setSgst(Float sgst) {
        this.sgst = sgst;
    }

    public String getHsn() {
        return hsn;
    }

    public Product hsn(String hsn) {
        this.hsn = hsn;
        return this;
    }

    public void setHsn(String hsn) {
        this.hsn = hsn;
    }

    public Company getCompany() {
        return company;
    }

    public Product company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Category getCategory() {
        return category;
    }

    public Product category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<ProductDetails> getTypes() {
        return types;
    }

    public Product types(Set<ProductDetails> productDetails) {
        this.types = productDetails;
        return this;
    }

    public Product addTypes(ProductDetails productDetails) {
        this.types.add(productDetails);
        productDetails.setProduct(this);
        return this;
    }

    public Product removeTypes(ProductDetails productDetails) {
        this.types.remove(productDetails);
        productDetails.setProduct(null);
        return this;
    }

    public void setTypes(Set<ProductDetails> productDetails) {
        this.types = productDetails;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", shortcut='" + getShortcut() + "'" +
            ", cgst=" + getCgst() +
            ", sgst=" + getSgst() +
            ", hsn='" + getHsn() + "'" +
            "}";
    }
}
