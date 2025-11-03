# 25F CST8505 Week9 Lecture1

_从 PDF 文档转换生成_

---

## 目录

- ARTIFICIAL INTELLIGENCE
- SOFTWARE DEVELOPMENT
- ❑ A Composite KEY is a primary key composed of multiple columns.
- Database Normal Forms Example
- ▪ Multiple processes running simultaneously
- ❑ Example scenario: Ride Sharing App
- ❑ Example scenario: Ride Sharing App
- ❑ Examples of PubSub based services
- ❑ Examples of Message Que based services
- Example – Machine Learning with Kafka

---

## 第 1 页

ARTIFICIAL INTELLIGENCE
SOFTWARE DEVELOPMENT
Week 11 Lecture 1 Dr. Hari M Koduvely
人工智能项目 1 第 11 周 第 1 讲 Hari M Koduvely 博士

---

## 第 2 页

Agenda for Today
今天的议程

- Theory:
  理论：
  - Fundamentals of Data Engineering – Part 2
    数据工程基础 – 第 2 部分

---

## 第 3 页

Database Normalization
数据库规范化

- Normalization is a Database Design Technique
  规范化是一种数据库设计技术
- Reduces Data Redundancy
  减少数据冗余
- Eliminates Insertion, Update and Deletion anomalies
  消除插入、更新和删除异常
- Divides larger tables into smaller ones linked by relationships
  将较大的表划分为通过关系链接的较小表
- Ensure that data is stored logically
  确保数据逻辑存储

---

## 第 4 页

Database Normal Forms
数据库范式

- 1NF (First Normal Form)
  1NF（第一范式）
- 2NF (Second Normal Form)
  2NF（第二范式）
- 3NF (Third Normal Form)
  3NF（第三范式）
- BCNF (Boyce-Codd Normal Form)
  BCNF（巴科斯-科德范式）
- 4NF (Fourth Normal Form)
  4NF（第四范式）
- 5NF (Fifth Normal Form)
  5NF（第五范式）
- 6NF (Sixth Normal Form)
  6NF（第六范式）

In most practical applications, 3NF is sufficient
在大多数实际应用中，3NF 就足够了

---

## 第 5 页

Database Normal Forms
数据库范式

- A KEY is used to identify records in a database uniquely
  键用于唯一标识数据库中的记录
- A Primary KEY is a single column value used to identify a database
  主键是用于唯一标识数据库

record uniquely
记录的单列值

- A primary key cannot be NULL
  主键不能为 NULL
- A primary key value must be unique
  主键值必须唯一
- The primary key values should rarely be changed
  主键值应该很少改变
- The primary key must be given a value when a new record is
  插入新记录时必须为主键赋值

inserted

- A Composite KEY is a primary key composed of multiple columns.
  复合键是由多列组成的主键。

---

## 第 6 页

Database Normal Forms
数据库范式

- Foreign Key references the primary key of another
  外键引用另一个

Table
表的主键

- It helps connect the two Tables
  它有助于连接两个表
- A foreign key can have a different name from its
  外键可以有不同的名称，与其

primary key
主键不同

- It ensures rows in one table have corresponding
  它确保一个表中的行在另一个

rows in another
表中有对应的行

- Unlike the Primary key, most often they are not
  与主键不同，它们通常不是

unique
唯一的

- Foreign keys can be null even though primary keys
  外键可以为空，但主键

can not
不能

---

## 第 7 页

Database Normal Forms Example
数据库范式示例
Movie Rental Database
电影租赁数据库

---

## 第 8 页

Database Normal Forms 1st Normal Form Rules
数据库范式第一范式规则

- Each table cell should contain a single value
  每个表单元格应包含单个值
- Each record need to be unique
  每条记录需要唯一
- Each column name should be unique
  每个列名应该唯一

---

## 第 9 页

Database Normal Forms 2nd Normal Form Rules
数据库范式第二范式规则

- Be 1NF Primary Key
  是 1NF 主键
- Single Column Primary Key
  单列主键

Foreign Key
外键

---

## 第 10 页

Database Normal Forms 3rd Normal Form Rules
数据库范式第三范式规则

- Be 2NF
  是 2NF
- No transactive functional dependence
  无传递函数依赖
- Transactive dependence is when changing a non-key column, might cause any of the
  传递依赖是指更改非键列时，可能导致

other non-key columns to change
其他非键列更改
Image source [https://www.guru99.com/database-normalization.html](https://www.guru99.com/database-normalization.html)
图片来源

---

## 第 11 页

Database Normal Forms 3rd Normal Form Rules
数据库范式第三范式规则

- Be 2NF
  是 2NF
- No transactive functional dependence
  无传递函数依赖

---

## 第 12 页

Modes of Data Flow
数据流模式

- Typical production scenario:
  典型生产场景：
  - Multiple processes running simultaneously
    多个进程同时运行
  - Without sharing memory between them
    它们之间不共享内存
- How do we pass data between these processes?
  我们如何在这些进程之间传递数据？
- Data passing from one process to another is called Data Flow
  从一个进程传递到另一个进程的数据称为数据流

---

## 第 13 页

Modes of Data Flow Data Passing through Databases
数据流模式 通过数据库传递数据
Process A DB
进程 A 数据库
Process B
进程 B

---

## 第 14 页

Modes of Data Flow Data Passing through Databases
数据流模式 通过数据库传递数据

- Access issues
  访问问题
  - A and B can be part of different accounts
    A 和 B 可以是不同账户的一部分

Process A
进程 A

- Latency issues
  延迟问题
  - Read and write on DB can be slow
    数据库读写可能很慢

DB
数据库
Process B
进程 B

---

## 第 15 页

Modes of Data Flow Data Passing through Services
数据流模式 通过服务传递数据

- Process A send request to Process B for a particular data
  进程 A 向进程 B 发送特定数据的请求

Request Process A Process B
请求 进程 A 进程 B

- Process B returns the requested data through the same network
  进程 B 通过同一网络返回请求的数据

Return Process A Process B
返回 进程 A 进程 B

---

## 第 16 页

Modes of Data Flow Data Passing through Services
数据流模式 通过服务传递数据

- Two popular styles of passing data are
  两种流行的数据传递风格是
  - REST (Representational State Transfer)
    REST（表述性状态传递）
- Used for data request over a network
  用于网络上的数据请求
  - RPC (Remote Procedure Call)
    RPC（远程过程调用）
- Used for data request within a data center
  用于数据中心内的数据请求

---

## 第 17 页

Modes of Data Flow Data Passing through Realtime Transport
数据流模式 通过实时传输传递数据

- Example scenario: Ride Sharing App
  示例场景：乘车共享应用
  - Ride management service
    乘车管理服务
  - Driver management service
    司机管理服务
  - Price optimization service
    价格优化服务

---

## 第 18 页

Modes of Data Flow Data Passing through Realtime Transport
数据流模式 通过实时传输传递数据

- Example scenario: Ride Sharing App
  示例场景：乘车共享应用
  - Request driven data passing is synchronous.
    请求驱动的数据传递是同步的。
  - A service that is down can cause all services that require data from it to be
    服务宕机可能导致所有依赖该服务的服务

down.
宕机。

---

## 第 19 页

Modes of Data Flow Data Passing through Realtime Transport
数据流模式 通过实时传输传递数据

- Solution: A Broker that can co-ordinate data passing between services
  解决方案：可以协调服务之间数据传递的代理
  - Each service only has to communicate with the broker
    每个服务只需要与代理通信
  - Each service broadcast the data to broker as events
    每个服务将数据作为事件广播给代理

---

## 第 20 页

Modes of Data Flow Data Passing through Realtime Transport
数据流模式 通过实时传输传递数据

- Two models of Realtime Transport
  实时传输的两种模型
  - Publish-Subscribe (PubSub)
    发布订阅 (PubSub)
  - Message Queue
    消息队列

---

## 第 21 页

Modes of Data Flow Data Passing through Realtime Transport
数据流模式 通过实时传输传递数据

- PubSub Model
  发布订阅模型
  - Events are arranged into Topics
    事件组织成主题
  - A service can publish events to any number of topics
    服务可以向任意数量的主题发布事件
  - A service that subscribe to a Topic can read all events in that topic
    订阅主题的服务可以读取该主题中的所有事件
  - The service publishing data is not concerned about who is subscribing
    发布数据的服务不关心谁在订阅
  - Data is retained only for a finite interval of time
    数据仅在有限的时间间隔内保留

---

## 第 22 页

Modes of Data Flow Data Passing through Realtime Transport
数据流模式 通过实时传输传递数据

- Message Queue Model
  消息队列模型
  - Each event has an intended set of consumers (message).
    每个事件都有一组预期的消费者（消息）。
  - message queue is responsible for getting the message to the right
    消息队列负责将消息发送给正确的

consumers.
消费者。

---

## 第 23 页

Modes of Data Flow Data Passing through Realtime Transport
数据流模式 通过实时传输传递数据

- Examples of PubSub based services
  基于发布订阅的服务示例
  - Apache Kafka
  - Amazon Kinesis
- Examples of Message Que based services
  基于消息队列的服务示例
  - Apache RocketMQ
  - RabbitMQ

---

## 第 24 页

Batch Processing vs Stream Processing
批处理与流处理

- Historical Data are stored in:
  历史数据存储在：
  - Databases
    数据库
  - Data lakes
    数据湖
  - Data warehouses
    数据仓库
- They are often processed in batches
  它们通常批量处理
- Using distributed computing frameworks like Hadoop or Spark
  使用 Hadoop 或 Spark 等分布式计算框架
- Difference between Hadoop and Spark ?
  Hadoop 和 Spark 之间的区别？

---

## 第 25 页

Batch Processing vs Stream Processing
批处理与流处理

- Data are stored Realtime Transport are called Streaming Data
  存储在实时传输中的数据称为流数据
- Computations done on Streaming Data are called Stream Processing
  对流数据进行的计算称为流处理
- In ML Batch Processing is used to compute Static Features
  在 ML 中，批处理用于计算静态特征
  - E. g. Drivers ratings
    例如，司机评分
- Stream Processing is used to compute Dynamic Features
  流处理用于计算动态特征
  - E. g. How many drivers are available currently
    例如，当前有多少司机可用

---

## 第 26 页

Batch Processing vs Stream Processing
批处理与流处理

- In ML Batch Processing is used to compute Static Features
  在 ML 中，批处理用于计算静态特征
  - E. g. Drivers ratings
    例如，司机评分
- Stream Processing is used to compute Dynamic Features
  流处理用于计算动态特征
  - E. g. How many drivers are available currently
    例如，当前有多少司机可用

---

## 第 27 页

Example – Machine Learning with Kafka
示例 – 使用 Kafka 的机器学习
Robust machine learning on streaming data using Kafka and Tensorflow-IO
使用 Kafka 和 Tensorflow-IO 对流数据进行鲁棒机器学习
[https://www.tensorflow.org/io/tutorials/kafka](https://www.tensorflow.org/io/tutorials/kafka)
Google Colab Notebook
Google Colab 笔记本

---
