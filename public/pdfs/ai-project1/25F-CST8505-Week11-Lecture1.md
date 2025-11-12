# 25F CST8505 Week11 Lecture1

_从 PDF 文档转换生成_

---

_注: 共提取了 8 张图片_

## 第 1 页

ARTIFICIAL INTELLIGENCE（人工智能）
SOFTWARE DEVELOPMENT（软件开发）
Week 11 Lecture 1 Dr. Hari M Koduvely（第 11 周讲座 1 Hari M Koduvely 博士）

---

## 第 2 页

Agenda for Today（今日议程）

- Theory（理论）:
  - Generation of Training Data（训练数据的生成）
  - Sampling Techniques（抽样技术）
  - Class Imbalance Problems（类别不平衡问题）
  - Data Augmentation Techniques（数据增强技术）

---

## 第 3 页

Generation of Training Data（训练数据的生成）

- Production data is messy, noisy and could be unbalanced（生产数据杂乱、含噪声且可能不平衡）
- If not handled properly it can ruin the entire ML system（如果处理不当，它会破坏整个机器学习系统）
- Topics covered in this lecture（本次讲座涵盖的主题）:
  - Sampling techniques（抽样技术）
  - Class imbalance problems（类别不平衡问题）
  - Data augmentation techniques（数据增强技术）

---

## 第 4 页

Sampling Techniques（抽样技术）

- Why sampling needed?（为什么需要抽样？）

  - Data used for training is a representative subset of real-world data.（用于训练的数据是现实世界数据的代表性子集）
  - Data volume is too big to process.（数据量过大，难以处理）
  - For quick experimentations.（用于快速实验）
- Two types of samplings:（抽样分为两类）

  - Non-probabilistic Sampling（非概率抽样）
  - Random Sampling（随机抽样）

---

## 第 5 页

Non-Probabilistic Sampling Techniques（非概率抽样技术）

- Convenience sampling.（便利抽样）
- Snowball sampling.（滚雪球抽样）
- Judgmental sampling.（判断抽样）
- Quota sampling.（配额抽样）

---

## 第 6 页

Convenience Sampling（便利抽样）

- A non-probabilistic sampling technique（非概率抽样技术）
- Subjects are selected because of their accessibility and availability to the researcher.（根据受试者的易接近性和可用性进行选择）
- A quick and easy way to gather data（获取数据的快捷方式）
- Often leads to a biased sample that may not be representative of the entire population.（常导致样本存在偏差，可能无法代表总体）

---

## 第 7 页

Convenience Sampling Example:（便利抽样示例）

- A researcher wants to study the opinions of college students about a new campus policy.（一位研究者想了解大学生对新校园政策的看法）
- Instead of randomly selecting students from the entire student body, they survey students in their own class or those they encounter in the campus cafeteria.（研究者没有从全体学生中随机抽取，而是调查自己班级或在食堂遇到的学生）

---

## 第 8 页

Snowball Sampling（滚雪球抽样）

- Research Topic: Experiences of undocumented immigrants in a particular city.（研究主题：某城市无证移民的经验）
- Challenge: This population is difficult to reach through traditional sampling methods due to fear of legal repercussions, lack of formal records, and other barriers.（挑战：由于担心法律后果、缺乏正式记录等障碍，传统抽样方法难以接触到该群体）
- Snowball Sampling Process:（滚雪球抽样流程）
  - Identify a "Seed": The researcher starts by contacting a local organization that provides services to immigrants.（识别“种子”：研究者首先联系当地为移民提供服务的机构）
  - Recruit Initial Participants: Through this organization, the researcher connects with a few undocumented immigrants who are willing to participate in the study.（招募初始参与者：通过该机构，研究者找到愿意参与研究的几位无证移民）
  - Referral Chain: Each of these initial participants is asked to refer the researcher to other undocumented immigrants they know.（推荐链：请初始参与者推荐其他认识的无证移民）
  - Snowball Effect: The new participants, in turn, refer others, and so on.（滚雪球效应：新参与者继续推荐他人，以此类推）

---

## 第 9 页

Snowball Sampling（滚雪球抽样）

- Benefits in this case:（在此情境中的优势）
  - Access to a Hidden Population: Snowball sampling allows researchers to reach individuals who might be difficult or impossible to find through other methods.（触达隐性群体：滚雪球抽样让研究者接触到其他方法难以找到的个体）
  - Efficiency: Participants are likely to know others who share similar experiences, making it easier to recruit a large sample size.（高效：参与者可能认识拥有相似经历的人，更易扩大样本量）
  - Trust and Rapport: Building trust with initial participants can facilitate deeper and more meaningful interactions with subsequent participants.（信任与关系：与初始参与者建立信任有助于与后续参与者更深入互动）
- Limitations:（局限性）
  - Bias: The sample may not be representative of the entire population, as it relies on social networks and referrals.（偏差：依赖社交网络和推荐，样本可能无法代表总体）
  - Generalizability: Findings may not be generalizable to the broader population of undocumented immigrants.（可推广性：研究结果可能无法推广到更广泛的无证移民群体）

---

## 第 10 页

Judgmental Sampling（判断抽样）

- Judgmental sampling is a non-probabilistic sampling technique.（判断抽样是一种非概率抽样技术）
- Researcher selects participants based on their knowledge, expertise, or other relevant characteristics.（研究者根据参与者的知识、专业或其他相关特征进行选择）
- The researcher uses their judgment to choose individuals who they believe will provide the most valuable insights for the study.（研究者凭借自己的判断挑选认为能提供最有价值见解的个体）
- Example:（示例）

  - A researcher wants to study the impact of a new educational policy on high school students.（研究者想研究一项新的教育政策对高中生的影响）
  - Instead of randomly selecting students, the researcher might choose to interview a small group of students who are considered to be high achievers, low achievers, and students with disabilities.（研究者并未随机抽取学生，而是挑选成绩优异、成绩较低和有残障的学生进行访谈）

---

## 第 11 页

Quota Sampling（配额抽样）

- A non-probabilistic sampling technique where researchers divide the population into homogeneous subgroups (strata) and then select participants from each subgroup based on predetermined quotas.（一种非概率抽样技术，研究者将总体划分为同质子群，并按照预设配额从每个子群中选择参与者）
- Example:（示例）
  - A researcher wants to study the voting preferences of a city's population. They divide the population into four subgroups based on age: 18-24 years old, 25-34 years old, 35-44 years old, and 45 years old and above.（研究者想研究一个城市居民的投票偏好，将总体按年龄划分为 18-24 岁、25-34 岁、35-44 岁和 45 岁以上四个子群）
  - The researcher then sets quotas for each subgroup, such as:（随后为每个子群设定配额，例如）
    - 25% of the sample should be from the 18-24 age group（样本的 25% 来自 18-24 岁组）
    - 30% from the 25-34 age group（30% 来自 25-34 岁组）
    - 25% from the 35-44 age group（25% 来自 35-44 岁组）
    - 20% from the 45+ age group（20% 来自 45 岁以上组）

---

## 第 12 页

Non-Probabilistic Sampling Issues（非概率抽样问题）

- Lack of Representativeness:（缺乏代表性）

  - Bias: The selection process is often biased, as the researcher's judgment or convenience plays a major role.（偏差：研究者的判断或便利性在选择过程中占主导，容易导致偏差）
  - Limited Generalizability: The findings from a non-probabilistic sample may not be generalizable to the larger population.（有限的可推广性：非概率样本的结论可能无法推广到更大人群）
- Uncertainty in Sampling Error:（抽样误差的不确定性）

  - No Statistical Inference: It's difficult to calculate the margin of error or confidence intervals.（无法进行统计推断：难以计算误差范围或置信区间）
  - Limited Statistical Analysis: Many statistical techniques rely on random samplings.（统计分析受限：许多统计技术依赖随机抽样）
- Potential for Systematic Bias:（可能存在系统性偏差）

  - Self-Selection Bias: Participants may volunteer due to specific motivations, leading to a biased sample.（自我选择偏差：参与者可能因特定动机自愿加入，导致样本偏差）
  - Researcher Bias: The researcher's subjective choices can influence the selection of participants, potentially skewing the results.（研究者偏差：研究者的主观选择会影响参与者选择，从而扭曲结果）

---

## 第 13 页

Probabilistic Sampling Techniques（概率抽样技术）

- Random Sampling（随机抽样）

  - Simple Random Sampling.（简单随机抽样）
  - All samples in the population have equal probability to be selected.（总体中的每个样本被选中的概率相等）
  - Easy to implement（易于实施）
  - Rare categories many not appear in the training data（罕见类别可能不会出现在训练数据中）
  - Fraud detection (population of good 99% - population of bad 1%)（欺诈检测：正常占 99%，异常占 1%）
  - Creating a sample of 1%, probability of bad sample in the training data is 0.0001（抽取 1% 样本时，训练数据中出现坏样本的概率为 0.0001）

---

## 第 14 页

Sampling Techniques（抽样技术）

- Random Sampling（随机抽样）

  - Simple Random Sampling.（简单随机抽样）
  - All samples in the population have equal probability to be selected.（总体中的每个样本被选中的概率相等）
  - Easy to implement（易于实施）
  - Rare categories many not appear in the training data（罕见类别可能不会出现在训练数据中）
  - Fraud detection (population of good 99% - population of bad 1%)（欺诈检测：正常占 99%，异常占 1%）
- Stratified Random Sampling.（分层随机抽样）

  - Divide the sample into categories of interest (strata) first.（首先将样本按关注的类别分层）
  - Perform random sampling in each of the strata.（在每个层内执行随机抽样）
  - Creating a stratified sample of 1%, probability of finding a bad sample in the training data is 0.01.（抽取 1% 的分层样本时，在训练数据中找到坏样本的概率为 0.01）

---

## 第 15 页

Sampling Techniques（抽样技术）

- Random Sampling（随机抽样）
  - Weighted Sampling.（加权抽样）
    - Each sample is assigned a weight w.（为每个样本分配权重 w）
    - The probability of being selected depends on w.（被选中的概率取决于权重 w）
  - Reservoir Sampling.（蓄水池抽样）
    - Used for sampling from streaming data.（用于流数据抽样）
    - Place first k elements into an array called reservoir.（将前 k 个元素放入称为蓄水池的数组）
    - For each incoming nth element, generate a random number I between 1 and n.（对每个新到的第 n 个元素，生成 1 到 n 之间的随机数 I）
    - If I is between 1 and k, replace the sample in the reservoir with the nth sample, else do nothing.（若 I 落在 1 到 k 之间，则用第 n 个样本替换蓄水池中的一个样本，否则不作处理）
    - It can be proved that each element has probability of k/n being in reservoir.（可证明每个元素留在蓄水池中的概率为 k/n）

---

## 第 16 页

Sampling Techniques（抽样技术）

- Random Sampling（随机抽样）
  - Importance Sampling.（重要性抽样）
    - A method to sample from a complex distribution using a simple distribution as proxy.（利用简单分布作为代理，从复杂分布中采样的方法）
    - Used extensively for Monte Carlo simulations.（广泛用于蒙特卡洛模拟）
    - Let the complex distribution that we want to sample x from be P(x).（设要从中采样的复杂分布为 P(x)）
    - Let Q(x) be a distribution that is easy to sample from.（设 Q(x) 为易于采样的分布）
    - Q(x) is called Proposal Distribution or Importance Distribution.（Q(x) 称为建议分布或重要性分布）
    - Instead of sampling from P(x), sample x from Q(x) and weigh that sample by P(x)/Q(x).（不直接从 P(x) 采样，而是从 Q(x) 采样并按 P(x)/Q(x) 加权）
    - Q(x) can be any distribution satisfying Q(x) > 0 when P(x) != 0.（只要 P(x) ≠ 0 时 Q(x) > 0 即可）![图片](./25F-CST8505-Week11-Lecture1_images/page_016_img_01.png)

---

## 第 17 页

Sampling Techniques（抽样技术）

- Random Sampling（随机抽样）
  - Importance Sampling Demonstration in Google Colab（Google Colab 中的重要性抽样演示）

---

## 第 18 页

Class Imbalance Problem（类别不平衡问题）

- Due to substantial difference in the number of samples in each class in the training data（由于训练数据中各类别样本数量存在巨大差异）
- Example – Detecting Lung Cancer from X-ray Images:（示例——通过 X 光图像检测肺癌）

  - 99.99% X-rays are from normal images.（99.99% 的 X 光图像来自正常样本）
  - 0.01% X-rays are from cancer patients.（0.01% 的 X 光图像来自癌症患者）![图片](./25F-CST8505-Week11-Lecture1_images/page_018_img_01.png)

---

## 第 19 页

Class Imbalance Problem（类别不平衡问题）

- Issues with Class Imbalance:（类别不平衡带来的问题）
  - There is less signal for the model to learn from minority classes.（模型从少数类中学习到的信号更少）
  - The model could get stuck in a non-optimal solution.（模型可能陷入次优解）
  - Cost of error estimation could be asymmetric.（误差估计的成本可能不对称）
- The cost of false prediction on a rare class could be higher（对罕见类别做出错误预测的代价可能更高）

---

## 第 20 页

Class Imbalance Problem（类别不平衡问题）

- Handling Class Imbalance:（应对类别不平衡）
  - Metrics Level – Using the right metrics.（指标层面——使用合适的评估指标）
  - Data Level – Resampling.（数据层面——重新采样）
  - Algorithm Level – Using robust loss functions and algorithms against imbalance.（算法层面——采用对不平衡更鲁棒的损失函数和算法）

---

## 第 21 页

Class Imbalance Problem Metric（类别不平衡问题指标）

- Handling Class Imbalance at Level:（从指标层面处理类别不平衡）
  - Balanced Accuracy:（平衡准确率）
    - Arithmetic Mean of Sensitivity (True Positive Rate) and Specificity (True Negative Rate).（敏感度（真正率）与特异度（真负率）的算术平均）
    - Sensitivity or True Positive Rate = TP/(TP + FN).（敏感度或真正率 = TP/(TP + FN)）
    - Specificity or True Negative Rate = TN/(TN + FP).（特异度或真负率 = TN/(TN + FP)）
  - Reflective questions:（思考题）
    - When is Sensitivity is important ?（何时敏感度更重要？）
    - When is Specificity is important ?（何时特异度更重要？）
    - Why simple accuracy is not a good metric ?（为什么简单准确率不是好指标？）

---

## 第 22 页

Class Imbalance Problem Metric（类别不平衡问题指标）

- Handling Class Imbalance at Level:（从指标层面处理类别不平衡）
  - F1-Score:（F1 分数）
    - Harmonic Mean of Precision and Recall.（精确率与召回率的调和平均）
    - 1/F1 = 1/P + 1/R.（1/F1 = 1/P + 1/R）
    - Precision = TP/(TP + FP).（精确率 = TP/(TP + FP)）
    - Recall = TP/(TP + FN).（召回率 = TP/(TP + FN)）

---

## 第 23 页

Class Imbalance Problem（类别不平衡问题）

- A simple example of imbalanced dataset :（类别不平衡数据集的简单示例）![图片](./25F-CST8505-Week11-Lecture1_images/page_023_img_01.png) ![图片](./25F-CST8505-Week11-Lecture1_images/page_023_img_02.png)

---

## 第 24 页

Class Imbalance Problem（类别不平衡问题）

- Handling Class Imbalance at Data Level:（在数据层面处理类别不平衡）
  - Resampling（重新采样）
  - SMOTE – Synthetically Minority Oversampling Technique（SMOTE——合成少数类过采样技术）
    - Interpolate between existing minority class instances（在现有少数类样本之间插值）![图片](./25F-CST8505-Week11-Lecture1_images/page_024_img_01.png)

---

## 第 25 页

Class Imbalance Problem（类别不平衡问题）

- How SMOTE works :（SMOTE 的工作原理）
  - Identify Minority Class Samples: The algorithm first identifies the minority class samples in the dataset.（识别少数类样本：算法首先找出数据集中属于少数类的样本）
  - Find Nearest Neighbors: For each minority class sample, it finds its k nearest neighbors.（寻找最近邻：为每个少数类样本寻找其 k 个最近邻）
  - Create Synthetic Samples:（创建合成样本）
    - A new synthetic sample is created by taking the difference between the feature vector of the minority class sample and one of its randomly selected nearest neighbors.（将一个随机选取的最近邻的特征向量与该少数类样本的特征向量做差来生成新样本）
    - This difference is multiplied by a random number between 0 and 1 and added to the feature vector of the minority class sample.（将差值乘以 0 到 1 之间的随机数后，加到原少数类样本的特征向量上）
    - This process is repeated for each minority class sample and its k nearest neighbors, generating new synthetic samples.（对每个少数类样本及其 k 个最近邻重复该过程，生成新的合成样本）

---

## 第 26 页

Class Imbalance Problem（类别不平衡问题）

- How SMOTE works :（SMOTE 的工作原理）
- A simple implementation of SMOTE for Binary Classification（二分类的 SMOTE 简单实现）

---

## 第 27 页

Class Imbalance Problem（类别不平衡问题）

- Handling Class Imbalance at Algorithm Level :（在算法层面处理类别不平衡）
  - Cost Sensitive Loss Function（代价敏感损失函数）
    - Misclassification of different classes would have different costs.（不同类别的误分类具有不同代价）
    - Use a Cost Matrix in loss function to capture this.（在损失函数中引入代价矩阵来体现）
  - Class Balanced Loss Function（类别平衡损失函数）
    - Weight of each class is inv proportional to number of samples in that class.（每个类别的权重与该类别样本数量成反比）![图片](./25F-CST8505-Week11-Lecture1_images/page_027_img_01.png) ![图片](./25F-CST8505-Week11-Lecture1_images/page_027_img_02.png)

---

## 第 28 页

Data Augmentation Techniques（数据增强技术）

- Useful to increase the number of minority class samples（有助于增加少数类样本数量）
- To increase robustness of the models（提升模型鲁棒性）
- To prevent adversarial attacks（防止对抗攻击）

---

## 第 29 页

Data Augmentation Techniques（数据增强技术）

- Label Preserving Transformations（保持标签不变的变换）
- For Images:（针对图像）

  - Crop, rotate, flip, invert, erase（裁剪、旋转、翻转、反色、擦除）
- For Text:（针对文本）

  - Replace words with similar words（用相似词替换原词）![图片](./25F-CST8505-Week11-Lecture1_images/page_029_img_01.png)

---

## 第 30 页

Data Augmentation Techniques（数据增强技术）

- Perturbation（扰动）
- Adding noise to images（向图像加入噪声）
- DNNs are sensitive to noise（深度神经网络对噪声敏感）
- Can lead to misclassification（可能导致误分类）

---
