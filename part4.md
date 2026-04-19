# Part 4: Technical Communication

The PR in question is a clearly formulated problem and its solution. Even though changes were relatively small, it affects how the system manages failures, which made this PR quite interesting to analyze. I found this PR especially appealing due to its focus on solving the problems associated with system functionality, rather than implementing any features. Furthermore, the logic of the proposed fix was clear from the start.

I can relate this topic to some of the concepts studied throughout the course in relation to backend development, like error handling, retry, and fault tolerance. As Kafka is distributed, temporary errors are expected, so I found it relatively easy to comprehend why marking KafkaStorageError as retriable was required in the first place.

Moreover, the PR in question included relatively minor changes in the existing error class, which meant that there was no need to introduce additional complexities in order to understand what had been done to the system.

The major difficulty in implementation is the correct management of retry logic, as incorrect labeling of retriable errors might cause the system to try to complete the process infinitely or multiple times, reducing performance.

To overcome these challenges, I would rely on the existing retry mechanisms already implemented in the repository rather than introducing new logic. I would also ensure that safeguards such as retry limits and proper error classification are in place. Finally, I would validate the implementation by testing different scenarios to confirm that retries work correctly and do not affect other parts of the system.


### Integrity Declaration

"I declare that all written content in this assessment is my own work, created without the use of AI language models or automated writing tools. All technical analysis and documentation reflects my personal understanding and has been written in my own words."
