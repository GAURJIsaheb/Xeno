# Part 3: Prompt Preparation

**Repository:** aiokafka  
**Pull Request:** https://github.com/aio-libs/aiokafka/pull/1115  
**PR Title:** Make KafkaStorageError retriable after metadata refresh


###3.1.1 Repository Context

aiokafka is a library for Python which is used to create a distributed application to communicate in an asynchronous manner using Apache Kafka technology.

The main users of the software presented in this repository are back-end developers and system engineers, who use Python to develop their systems. The repository can be used when developing applications that involve real-time data transfer and processing, or systems based on events.

The main problem solved by the library is related to reliable communication in distributed systems using Kafka brokers. Therefore, it introduces abstractions for working with producers, consumers, and error handling procedures. Failures of various kinds including failures in the network or the broker itself are frequent since Kafka runs in a distributed system.

Thus, error handling procedures are essential in order to be able to recover from temporary system failures without breaking down the whole program. The repository introduces error handling abstractions in the form of classes and other types of error definition structures.



###3.1.2 Pull Request Description
This particular Pull request changes the behaviour for how the KafkaStorageError is handled in the aiokafka library. Before, this type of error wasn't considered a retriable one, meaning that upon its occurrence, the client would stop processing instead of trying to handle it again.

In distributed systems like Kafka, however, some types of errors are indeed temporary in nature and thus need to be retried automatically. This is the case for the Java-based implementation of the Kafka library as well as for the Python library known as kafka-python.

Since both libraries handle KafkaStorageError as a retriable one, the inconsistency of the implementation could cause problems to the application. That's why this PR introduces an updated KafkaStorageError where the error is now retriable, and metadata could be considered outdated.



###3.1.3 Acceptance Criteria
✓ When KafkaStorageError occurs, the system should automatically retry the operation  
✓ The system should refresh metadata before retrying the request  
✓ KafkaStorageError must be marked as retriable in the error class  
✓ Existing retry mechanisms should handle this error without requiring additional logic  
✓ The change should not affect handling of other error types  
✓ The system should remain backward compatible with existing behavior  



###3.1.4 Edge Cases
- Repeated KafkaStorageError occurrences leading to multiple retries  
- Metadata refresh fails before retry  .
- Error incorrectly classified as retriable causing infinite retry loops  
- Network instability during retry attempts  .



###3.1.5 Initial Prompt

You are working on the aiokafka repository, which is an asynchronous Python client used for interacting with Apache Kafka in distributed systems. The system relies heavily on structured error handling to maintain reliability and fault tolerance.

Your task is to update the behavior of the KafkaStorageError so that it is treated as a retriable error. Currently, when this error occurs, the client does not retry the operation, which leads to failures even in cases where the issue is temporary.

Modify the KafkaStorageError class in the error handling module so that:
- The error is marked as retriable
- The system recognizes that metadata may be invalid when this error occurs

Ensure that when KafkaStorageError is raised:
- The client refreshes its metadata before retrying
- The operation is retried using the existing retry mechanisms

Follow these acceptance criteria:
- The system must retry operations when KafkaStorageError occurs  
- Metadata must be refreshed before retrying  
- The implementation must integrate with existing retry logic  
- No other error handling behavior should be affected  
- The system must remain backward compatible  

Also consider the following edge cases:
- Repeated errors should not result in infinite retry loops  
- Metadata refresh failures should be handled gracefully  
- Retry attempts should not significantly impact performance  

Testing requirements:
- Simulate KafkaStorageError and verify retry behavior  
- Confirm that metadata refresh is triggered correctly  
- Ensure no regressions in existing functionality  

Keep the implementation minimal and consistent with the current architecture of the repository.

