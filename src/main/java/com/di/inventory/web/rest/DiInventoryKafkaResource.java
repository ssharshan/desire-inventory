package com.di.inventory.web.rest;

import com.di.inventory.service.DiInventoryKafkaProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/di-inventory-kafka")
public class DiInventoryKafkaResource {

    private final Logger log = LoggerFactory.getLogger(DiInventoryKafkaResource.class);

    private DiInventoryKafkaProducer kafkaProducer;

    public DiInventoryKafkaResource(DiInventoryKafkaProducer kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        log.debug("REST request to send to Kafka topic the message : {}", message);
        this.kafkaProducer.sendMessage(message);
    }
}
