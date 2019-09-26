package com.di.inventory.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class DiInventoryKafkaConsumer {

    private final Logger log = LoggerFactory.getLogger(DiInventoryKafkaConsumer.class);
    private static final String TOPIC = "topic_diinventory";

    @KafkaListener(topics = "topic_diinventory", groupId = "group_id")
    public void consume(String message) throws IOException {
        log.info("Consumed message in {} : {}", TOPIC, message);
    }
}
