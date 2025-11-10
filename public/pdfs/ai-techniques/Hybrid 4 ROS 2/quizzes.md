https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Nodes/Understanding-ROS2-Nodes.html

https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Topics/Understanding-ROS2-Topics.html

https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Services/Understanding-ROS2-Services.html

https://docs.ros.org/en/humble/Tutorials/Beginner-CLI-Tools/Understanding-ROS2-Actions/Understanding-ROS2-Actions.html

**Question 1 (1 point)**
ROS 2 Parameters: Which of the following statements is true about ROS 2 parameters?

A parameter is a configuration value of a node

In ROS 2, each node maintains its own parameters

All of these answers ✓

You can think of parameters as node settings

**Question 2 (1 point)**
ROS 2 Topics: Which of the following statements about ROS 2 topics is true?

All topics require messages to be of type String

All topics require messages to be of type Integer

Nodes send data over topics using messages, so publishers and subscribers must send and receive the same type of message to communicate ✓

Topics translate data from one message type to another, to match publisher and subscriber needs

**Question 3 (1 point)**
ROS 2 Services: Which of the following statements about ROS 2 services is true?

All of these answers ✓

Services have types that describe how the request and response data of a service is structured

Service types have two parts: one message for the request and another for the response

Service types are defined similarly to topic types

**Question 4 (1 point)**
ROS 2 Topics: Which of the following statements about ROS 2 topics is true?

Topics move data only within a single node

Topics act as a bus for nodes to exchange messages ✓

One node can subscribe to only one topic

One node can publish to only one topic

**Question 5 (1 point)**
ROS 2 Services: What command could be used to see the types of all active services at the same time?

ros2 service types

ros2 topic list

ros2 service list -t ✓

ros2 types services

**Question 6 (1 point)**
ROS 2 Actions: Which of the following statements about ROS 2 actions is true?

Actions use a client-server model, similar to the publisher-subscriber model
Actions are one of the communication types in ROS 2 and are intended for long running tasks ✓
Actions are built on topics and services ✓
All of these answers

**Question 7 (1 point)**
ROS 2 Services: Which of the following statements about ROS 2 services is true?

Services are special publishers that can publish to more than one topic at a time

Services are similar to topics except services publish data continuously

Services are based on a call-and-response model, versus topics' publisher-subscriber model ✓

Services are based on a publisher-subscriber model, versus topics' call-and-response model

**Question 8 (1 point)**
ROS 2 Services: Which of the following statements about ROS 2 Services is true?

There can be many service clients using the same service, but there can be only one service server for a service ✓

There can be many service clients using the same service, and many service servers for a service

There can be only one client for a single service, so there can be many service servers for a service

There can be only one service client for a service, and only one service server for a service

**Question 9 (1 point)**
ROS 2 Topics: Which command will return a list of all the topics currently active in the system?

ros2 node topics

ros2 node list topics

ros2 list topics

ros2 topic list ✓

**Question 10 (1 point)**
ROS 2 Nodes: which statement about ROS 2 nodes is true?

Each node should be responsible for a single module purpose

A full robotic system is comprised of many nodes working in concert

Each node can send and receive data to other nodes via topics, services, actions, or parameters

All of these answers ✓
