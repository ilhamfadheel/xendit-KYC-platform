### in the case of scaling need:
instead of base64 encoding in db can use CDN like AWS of GC
I use this for easy access to data in the internals self facial recognition

using kubernetes for easy horizontal scaling and easy deployment

implement rate limiting to prevent abuse of the API (safety)

break down into smaller, independent services (implement Microservices)

implement Load Balancing on the server to distribute the load

### what to improve in code as well

secure the endpoint by using bearer token for authentication / authorization to allow api/customers request to not require partner_id in every request

right now my queue is batch processing them depending on the workers timer, in future can use a message broker like RabbitMQ or Kafka to handle the queue

using Kafka i can subscribe to the topic and process the message in real time (useful for checking aml and cft in real time), can benefit the Ops to view the status of specific submission's validation status