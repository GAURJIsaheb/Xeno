# Part 3: Prompt Preparation

**Repository:** aiokafka  
**Pull Request:** https://github.com/aio-libs/aiokafka/pull/1115  
**PR Title:** Make KafkaStorageError retriable after metadata refresh


### 3.1.1 Repository Context

aiokafka is a Python library used to build distributed applications that communicate asynchronously using Apache Kafka.

The main users of this repository are backend developers and system engineers who build real-time data processing systems and event-driven architectures.

The repository solves the problem of reliable communication in distributed systems using Kafka brokers. It provides abstractions for producers, consumers, and structured error handling.

Since Kafka operates in distributed environments, failures such as network issues or broker errors are common. Therefore, robust error handling is essential to ensure that temporary failures do not break the system.


### 3.1.2 Pull Request Description

This pull request updates how KafkaStorageError is handled in the aiokafka library. Previously, this error was not treated as retriable, meaning the client would fail instead of retrying the operation.

However, in distributed systems like Kafka, some errors are temporary and should be retried automatically. Other implementations like the Java client and kafka-python already treat this error as retriable.

This PR updates KafkaStorageError by marking it as retriable and indicating that metadata may be invalid. This allows the client to refresh metadata and retry the request instead of failing immediately.


### 3.1.3 Acceptance Criteria

- When KafkaStorageError occurs, the system should automatically retry the operation  
- The system should refresh metadata before retrying the request  
- KafkaStorageError must be marked as retriable in the error class  
- Existing retry mechanisms should handle this error without requiring additional logic  
- The change should not affect handling of other error types  
- The system should remain backward compatible  


### 3.1.4 Edge Cases

- Repeated KafkaStorageError occurrences leading to multiple retries  
- Metadata refresh fails before retry  
- Error incorrectly classified as retriable causing infinite retry loops  
- Network instability during retry attempts  


### 3.1.5 Initial Prompt

You are working on the aiokafka repository, which is an asynchronous Python client for Apache Kafka.

Your task is to update the KafkaStorageError so that it is treated as a retriable error. Currently, this error causes the client to fail instead of retrying.

Modify the KafkaStorageError class so that:
- It is marked as retriable
- It indicates that metadata may be invalid

Ensure that:
- The client refreshes metadata before retrying
- The retry uses existing retry mechanisms

Requirements:
- Do not affect other error handling behavior  
- Maintain backward compatibility  

Edge cases to handle:
- Prevent infinite retry loops  
- Handle metadata refresh failures  
- Avoid performance issues due to excessive retries  

Testing:
- Simulate KafkaStorageError  
- Verify retry behavior  
- Ensure no regressions  

Keep the implementation minimal and aligned with the current architecture.
