# 25 CST8505 Week 5 Lecture 1

_从 PDF 文档转换生成_

---

## 目录

- ARTIFICIAL INTELLIGENCE
- SOFTWARE DEVELOPMENT
- MLOPS 机器学习运维
- Overview 概述
- ■ Some examples :
- ■ Some examples : 一些示例：

---

## 第 1 页

ARTIFICIAL INTELLIGENCE
SOFTWARE DEVELOPMENT
Week 5 Lecture 1 Dr. Hari M Koduvely
人工智能项目 1 第 5 周 第 1 讲 Hari M Koduvely 博士

---

## 第 2 页

MLOPS
机器学习运维
Image Source [https://blogs.nvidia.com/blog/2020/09/03/what-is-mlops/](https://blogs.nvidia.com/blog/2020/09/03/what-is-mlops/)
图片来源

---

## 第 3 页

References
参考文献

- Designing Machine Learning Systems – Chip Huyen
  设计机器学习系统 - Chip Huyen

---

## 第 4 页

What is MLOps ?
什么是 MLOps？

- MLOps is a set of Tools and Best
  MLOps 是一套工具和最佳

Practices for bringing ML into production
将 ML 投入生产的实践

- Similar to DevOps – Developments
  类似于 DevOps - 开发

and Operations
和运维

- Treats ML System Holistically
  全面处理 ML 系统

---

## 第 5 页

ML System Overview
ML 系统概述

- Real world production ML
  现实世界的生产 ML

Systems are large software ecosystems
系统是大型软件生态系统

- ML Agorithm or Model code
  ML 算法或模型代码

is only < 10% of all the code
仅占所有代码的 < 10%
Image source[https://developers.google.com/machine-learning/crash-course/production-ml-systems](https://developers.google.com/machine-learning/crash-course/production-ml-systems)
图片来源

---

## 第 6 页

ML in Research vs Production
研究与生产中的机器学习
Research Production
研究 生产
Requirements
要求
Best model performance on
在基准数据集上获得最佳模型性能
Depends on the Stake Holder
取决于利益相关者
benchmark datasets Computational Priority
计算优先级
Fast Training, High Throughput
快速训练、高吞吐量
Fast Inference, Low Latency
快速推理、低延迟
Data
数据
Static
静态
Constantly Changing
不断变化
Ethical Aspects
道德方面
Often not a focus
通常不是焦点
Must be considered
必须考虑
Interpretability
可解释性
Often not a focus
通常不是焦点
Must be considered
必须考虑

---

## 第 7 页

ML in Research vs Production
研究与生产中的机器学习

- Requirements
  要求
- Production requirements vary from stakeholder to stakeholder
  生产要求因利益相关者而异
- e.g. Mobile app recommending restaurants to users.
  例如，向用户推荐餐厅的移动应用。

– ML Engineers want a models that provides good quality recommendations
ML 工程师希望模型能提供高质量的推荐
– Sales team wants a model that recommends more expensive restaurants
销售团队希望模型推荐更昂贵的餐厅
– Product team wants a model that returns recommendations in < 100 ms
产品团队希望模型在 < 100 毫秒内返回推荐

- Two different objectives:
  两个不同的目标：

– Recommending restaurants that are most likely to be clicked by users
推荐用户最可能点击的餐厅
– Recommending restaurants that brings more revenue to app
推荐为应用带来更多收入的餐厅

---

## 第 8 页

ML in Research vs Production
研究与生产中的机器学习

- Requirements
  要求
- Understand the strict requirements vs good to have
  了解严格的要求与可有可无的要求

– Latency could be a strict requirement
延迟可能是严格要求
– Quality of recommendations could be a good to have
推荐质量可能是可有可无的

- Understand the impact of performance improvements
  了解性能改进的影响

– 0.1 % increase in CTR for online ads can increase the revenue significantly
在线广告点击率提高 0.1% 可以大幅增加收入
– 0.1 % increase in image classification accuracy is not very significant
图像分类准确率提高 0.1% 并不十分显著

- Understand the impact of model complexity
  了解模型复杂性的影响

– Ensemble models are commonly used to improve model performance
集成模型通常用于提高模型性能
– Ensemble models have higher computational costs and less interpretability
集成模型具有更高的计算成本和较低的可解释性

---

## 第 9 页

ML in Research vs Production
研究与生产中的机器学习

- Computational Priority
  计算优先级
- Latency Vs Throughput
  延迟与吞吐量

– Latency is the time between receiving an inference request to returning the results
延迟是从接收推理请求到返回结果之间的时间
– Throughput is the number of inference requests processed in a specific amount
吞吐量是在特定时间内处理的推理请求数量
of time

- For systems processing one request each time:
  对于每次处理一个请求的系统：

higher latency => lesser throughput
更高的延迟 => 更低的吞吐量

- For systems that process requests in a batch:
  对于批量处理请求的系统：

higher latency => higher throughput
更高的延迟 => 更高的吞吐量

---

## 第 10 页

ML in Research vs Production
研究与生产中的机器学习

- Computational Priority
  计算优先级
- Latency Vs Throughput
  延迟与吞吐量

---

## 第 11 页

ML in Research vs Production – Computational Priority
研究与生产中的机器学习 – 计算优先级

- Latency is very important factor for a good
  延迟是良好

customer experience
客户体验的重要因素
– Increase of 30% in latency can reduce conversion rates by 0.5% (Booking.com 2019)
延迟增加 30% 可以将转化率降低 0.5%（Booking.com 2019）
This Photo by Unknown author is licensed under CC BY-SA.
这张照片由未知作者授权，遵循 CC BY-SA 许可。
– 50% of the mobile users will leave a page if it takes more than 3 secs to load (Google 2016)
如果页面加载时间超过 3 秒，50% 的移动用户会离开（Google 2016）

---

## 第 12 页

ML in Research vs Production
研究与生产中的机器学习

- Data
  数据
- Research datasets are often clean and well formatted
  研究数据集通常干净且格式良好
- Many of them are standard benchmark datasets used by several researchers
  其中许多是多个研究人员使用的标准基准数据集
- Issues about the datasets are known and often fixed
  数据集的问题已知且经常修复
- Scripts to process them are easily available
  处理它们的脚本很容易获得
- Production datasets are:
  生产数据集是：

– Messy, noisy
凌乱、嘈杂
– Not structured
非结构化
– Biased, constantly shifting
有偏见、不断变化
– Issues are not fully known or documented
问题没有完全了解或记录
– Privacy and confidential information exposed
隐私和机密信息暴露
– Partially labeled, imbalanced classes
部分标注、类别不平衡
– Constantly generated by Users, Systems and Logs
由用户、系统和日志不断生成

---

## 第 13 页

ML in Research vs Production
研究与生产中的机器学习

- Data
  数据

---

## 第 14 页

ML in Research vs Production
研究与生产中的机器学习

- Ethical Aspects
  道德方面
- During research phase models are rarely used on people:
  在研究阶段，模型很少用于人身上：

– Ethical aspects are overlooked or
道德方面被忽视或
– Their implementations are postponed to production stage
它们的实施被推迟到生产阶段

- Monitoring for ethical aspects in production alone is not sufficient
  仅在生产中监控道德方面是不够的
- Some examples :
  一些示例：

– Rejection of loan application
拒绝贷款申请
– 1.3 million creditworthy Black and Latino people have been rejected loans between 2008 and 2015 (Berkely study, 2019)
130 万有信誉的黑人和拉丁裔人在 2008 年至 2015 年间被拒绝贷款（伯克利研究，2019）

---

## 第 15 页

ML in Research vs Production
研究与生产中的机器学习

- Ethical Aspects
  道德方面
- During research phase models are rarely used on people:
  在研究阶段，模型很少用于人身上：

– Ethical aspects are overlooked or
道德方面被忽视或
– Their implementations are postponed to production stage
它们的实施被推迟到生产阶段

- Monitoring for ethical aspects in production alone is not sufficient
  仅在生产中监控道德方面是不够的
- Some examples :
  一些示例：

– Rejection of loan application
拒绝贷款申请
– 1.3 million creditworthy Black and Latino people have been rejected loans between 2008 and 2015 (Berkely study, 2019)
130 万有信誉的黑人和拉丁裔人在 2008 年至 2015 年间被拒绝贷款（伯克利研究，2019）
– When racial identifying features were removed from model, their mortgage applications were accepted
当从模型中移除种族识别特征时，他们的抵押贷款申请被接受了

---

## 第 16 页

ML in Research vs Production
研究与生产中的机器学习

- Interpretability
  可解释性
- Question: Who would you choose between?
  问题：您会选择谁？

– A Human surgeon who cures 80% of cancer patients
能够治愈 80% 癌症患者的医生
– A Black Box AI surgeon who cures 90% of cancer patients
能够治愈 90% 癌症患者的黑盒 AI 外科医生

- Interpretability is important to understand why a certain decision was made
  可解释性对于理解为什么做出某个决定很重要
- It will help to build trust among users
  它将有助于在用户之间建立信任
- It can expose potential biases
  它可以暴露潜在的偏见
- Important for developers to debug and improve models
  对于开发人员调试和改进模型很重要
- It can be hard to interpret models such as deep neural networks and ensemble
  深度神经网络和集成等模型可能难以解释

models
模型

---

## 第 17 页

ML Systems Vs Traditional Software
ML 系统与传统软件

- Why not just use the proven best practices from software development to ML
  为什么不直接将软件开发中的成熟最佳实践用于 ML

systems development?
系统开发？

- ML System pipelines are different from software development pipelines
  ML 系统管道不同于软件开发管道

Image Source: DeepLearning.AI
图片来源：DeepLearning.AI

---

## 第 18 页

ML Systems Vs Traditional Software
ML 系统与传统软件

- Why not just use the proven best practices from software development to ML
  为什么不直接将软件开发中的成熟最佳实践用于 ML

systems development?
系统开发？

- Just as ML model development is iterative so is model deployment
  正如 ML 模型开发是迭代的，模型部署也是迭代的

Image Source: DeepLearning.AI
图片来源：DeepLearning.AI

---

## 第 19 页

ML Systems Vs Traditional Software
ML 系统与传统软件

- Why not just use the proven best practices from software development to ML
  为什么不直接将软件开发中的成熟最佳实践用于 ML

systems development?
系统开发？

- Just as ML model development is iterative so is model deployment
  正如 ML 模型开发是迭代的，模型部署也是迭代的

Image Source: DeepLearning.AI
图片来源：DeepLearning.AI

---

## 第 20 页

ML Systems Vs Traditional Software
ML 系统与传统软件

- Why not just use the proven best practices from software development to ML systems
  为什么不直接将软件开发中的成熟最佳实践用于 ML 系统

development?
开发？

- Many challenges are unique to ML Systems and it requires unique tools
  许多挑战对 ML 系统来说是独有的，需要独特工具

– Traditional software development assumes Data and Code are separated
传统软件开发假设数据和代码是分离的
– ML Systems are part code, part data and part generated from both
ML 系统一部分是代码，一部分是数据，一部分由两者生成
– Systems can be improved by improving the data and not code
可以通过改进数据而非代码来改进系统
– Need to be adaptive to changing environments
需要适应不断变化的环境
– Need to do testing and versioning of Data also
还需要对数据进行测试和版本控制
– Not all data samples are equal, some are more valuable than others
并非所有数据样本都相等，有些比其他更有价值
– Model sizes are large to load on to RAMs
模型大小很大，难以加载到 RAM
– Concept Shift and Data Drift
概念漂移和数据漂移

---
