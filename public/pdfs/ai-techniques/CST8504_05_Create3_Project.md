# CST8504 05 Create3 Project

_从 PDF 文档转换生成_

---

## 目录 / Table of Contents

- 1. Introduction to the CST8504 Create 3 Robot Project / CST8504 Create 3 机器人项目介绍
- 2. ROS2
- Examples of Robots / 机器人示例
- Robot Project Goals / 机器人项目目标
- Choosing Hardware: Why the iRobot Create 3? / 选择硬件：为什么选择 iRobot Create 3？
- Choosing Software: Why ROS2 / 选择软件：为什么选择 ROS2
- Options for controlling Create 3 / 控制 Create 3 的选项
- Our Create 3 Setup (Summary) / 我们的 Create 3 设置（总结）
- ROS2: Object Oriented Python / ROS2：面向对象 Python

---

## 第 1 页 / Page 1

Create3 Robot Project / Create3 机器人项目

---

## 第 2 页 / Page 2

Outcomes / 学习成果

**1. Introduction to the CST8504 Create 3 Robot Project / CST8504 Create 3 机器人项目介绍**

- Goals of the CST8504 Robot project / CST8504 机器人项目的目标
- Choosing Hardware / 选择硬件
- Choosing Software / 选择软件
- Create 3 Getting Started / Create 3 入门

**2. ROS2**

- Object Oriented Python / 面向对象 Python
- ROS2 Introduction / ROS2 介绍

---

## 第 3 页 / Page 3

**Create 3 Robot Project - Why a Robotics project? / Create 3 机器人项目 - 为什么是机器人项目？**

The over-riding goal is to learn how to apply the techniques of AI to solve real-world problems in a software development context. / 首要目标是学习如何应用 AI 技术在软件开发环境中解决现实世界的问题。

Robotics in general provides a wide spectrum of real-world AI problems. / 机器人技术总体上提供了广泛的现实世界 AI 问题。

Solving some of these problems for actual physical robot behaviors is: / 为解决实际物理机器人行为而解决这些问题：

- Educational / 具有教育意义
- A source of real world experience (for job interview!) / 真实世界经验的来源（用于求职面试！）
- Fun and motivating / 有趣且激励人心

---

## 第 4 页 / Page 4

Examples of Robots / 机器人示例

- **Amazon Astro**

  - [Video / 视频](https://www.youtube.com/watch?v=Te263tgJG2Y)

- **Boston Dynamics**

  - [Spot Robot / Spot 机器人](https://www.bostondynamics.com/products/spot)

- **Tesla Humanoid / 特斯拉人形机器人**
  - [IEEE Article / IEEE 文章](https://spectrum.ieee.org/tesla-optimus-robot)
  - [Video 2022 / 视频 2022](https://www.youtube.com/watch?v=UXHoWNfjJYM)
  - [Video 2025 / 视频 2025](https://www.youtube.com/watch?v=gyURDZB7imo)

---

## 第 5 页 / Page 5

Robot Project Goals / 机器人项目目标

- **Autonomous behavior/movement / 自主行为/运动**
- **Respond to visual stimulus / 响应视觉刺激**
  - Hand commands / 手势命令
  - Follow you? (train it to identify your shoes) / 跟随你？（训练它识别你的鞋子）
  - Object recognition (trash collector robot?) / 物体识别（垃圾收集机器人？）
- **Respond to audio stimulus / 响应音频刺激**
  - Verbal commands (speech to text) / 语音命令（语音转文字）
  - Sound recognition (door-bell, dog bark, fire engine siren, etc) / 声音识别（门铃、狗叫、消防车警笛等）
- **Behaviors / 行为**
  - Movement (wheels) / 运动（轮子）
  - Visual outputs (lights) / 视觉输出（灯光）
  - Audio outputs (text to speech) / 音频输出（文字转语音）

---

## 第 6 页 / Page 6

Robot Project Hardware - What's available? / 机器人项目硬件 - 有什么可用的？

- google "robot hardware kit" / 搜索"机器人硬件套件"
- What do we need for our goals? / 我们需要什么来实现我们的目标？
  - Wheels / 轮子
  - Compute device / 计算设备
  - Camera / 摄像头
  - Microphone / 麦克风
  - Speaker / 扬声器
  - Lights / 灯光

---

## 第 7 页 / Page 7

No Gripper? / 没有夹爪？

- A gripper arm would add another class of problems we could solve / 夹爪臂会增加另一类我们可以解决的问题
- A good gripper would at least double the cost / 一个好的夹爪至少会使成本翻倍
- We will have enough problems to solve, even without a gripper / 即使没有夹爪，我们也有足够的问题要解决
- Amazon Astro is becoming our benchmark comparison / Amazon Astro 正在成为我们的基准比较对象

No gripper on the Amazon Astro robot / Amazon Astro 机器人也没有夹爪

---

## 第 8 页 / Page 8

Choosing Hardware: Why the iRobot Create 3? / 选择硬件：为什么选择 iRobot Create 3？

There are various reasons the Create 3 is appropriate for our needs: / Create 3 适合我们需求的原因有多种：

- Minimal mechanical design/assembly / 最少的机械设计/组装
- Reputable company capable of reliable supply in volume / 信誉良好的公司，能够可靠地批量供应
- Can support more advanced projects: grippers, lidar, etc / 可以支持更高级的项目：夹爪、激光雷达等
- Basic platform for movement/lights / 运动和灯光的基础平台
- Safety features, cliff detection, bumpers, more / 安全功能、悬崖检测、碰撞传感器等
- Low cost of overall parts: / 整体部件成本低：
  - Create 3: CDN$500 / Create 3：500 加元
  - Adapters: $20-40 / 适配器：20-40 美元
  - Borrow Laptop (or use your own): $0 / 借用笔记本电脑（或使用自己的）：0 美元

---

## 第 9 页 / Page 9

Choosing Software: Why ROS2 / 选择软件：为什么选择 ROS2

- Why develop our product on ROS2? / 为什么在 ROS2 上开发我们的产品？
- Create3 is powered by ROS2 / Create3 由 ROS2 驱动
- [Why ROS? / 为什么选择 ROS？](https://www.ros.org/blog/why-ros/)
- ROS2 is well documented: [ROS2 Humble Documentation / ROS2 Humble 文档](https://docs.ros.org/en/humble/index.html)
- ROS2 on Windows or Linux? / ROS2 在 Windows 还是 Linux 上？
  - Ubuntu-server 22.04 for ROS2 Humble support / Ubuntu-server 22.04 支持 ROS2 Humble
  - Does ROS2 support Windows? Yes, Windows 10 only, but... / ROS2 支持 Windows 吗？是的，仅支持 Windows 10，但是... [Windows Tips and Tricks / Windows 技巧和窍门](https://docs.ros.org/en/foxy/The-ROS2-Project/Contributing/Windows-Tips-and-Tricks.html)

---

## 第 10 页 / Page 10

**Time to check your learning! / 检查学习成果的时间到了！**

Let's see how many key concepts you recall by answering the following questions! / 让我们通过回答以下问题来看看你记住了多少关键概念！

- Why are we doing a Robotics project? / 我们为什么要做机器人项目？
- What are some of the goals of our project? / 我们项目的一些目标是什么？
- Why are we using the iRobot Create 3? / 我们为什么使用 iRobot Create 3？
- What software is the iRobot Create 3 based on? / iRobot Create 3 基于什么软件？
- Can we use Windows to do this development? / 我们可以使用 Windows 进行这个开发吗？

**iRobot Create 3 docs: / iRobot Create 3 文档：** [https://iroboteducation.github.io/create3_docs/](https://iroboteducation.github.io/create3_docs/)

---

## 第 11 页 / Page 11

**Coming Later: Options for controlling Create 3 / 即将推出：控制 Create 3 的选项**

**1. Python Playground for Windows / Windows 的 Python Playground**

- Works by connecting (pairing) Chrome web browser to your Create 3 over Bluetooth / 通过蓝牙将 Chrome 浏览器连接（配对）到 Create 3
- Needs Bluetooth/USB switch to be in Bluetooth position (default) / 需要蓝牙/USB 开关处于蓝牙位置（默认）
- Program or run Python examples: set up asynchronous events, then invoke "robot.play()" method / 编程或运行 Python 示例：设置异步事件，然后调用 "robot.play()" 方法
- URL for the Python Playground: [python.irobot.com](https://python.irobot.com) / Python Playground 的 URL：

---

## 第 12 页 / Page 12

**Controlling Create 3 (cont'd) / 控制 Create 3（续）**

**2. ROS2 Humble over Wifi (We will NOT use this option) / ROS2 Humble 通过 Wifi（我们不会使用此选项）**

- Connect Create 3 to your WIFI network / 将 Create 3 连接到你的 WIFI 网络
- Hotspot mode, connect to hotspot / 热点模式，连接到热点
- Create 3 now has IP addr on your LAN / Create 3 现在在你的 LAN 上有 IP 地址
- Run ROS2 programs and/or commands on another ROS2-enabled device on your LAN / 在你的 LAN 上的另一个支持 ROS2 的设备上运行 ROS2 程序和/或命令
- Protocol (RMW_IMPLEMENTATION) of your ROS2 environment must match setting on Create 3 – see next slide / 你的 ROS2 环境的协议（RMW_IMPLEMENTATION）必须与 Create 3 上的设置匹配 – 见下一张幻灯片

---

## 第 13 页 / Page 13

**Controlling Create 3 (cont'd) / 控制 Create 3（续）**

_(This page contains protocol configuration details that are better visualized in the original PDF) / （此页面包含协议配置详细信息，在原始 PDF 中可以更好地可视化）_

---

## 第 14 页 / Page 14

**Controlling Create 3 (cont'd) / 控制 Create 3（续）**

**3. ROS2 over dedicated Wired Network (YES: our ultimate setup) / ROS2 通过专用有线网络（是的：我们的最终设置）**

- Best to disable WIFI on Create 3 (factory settings) / 最好在 Create 3 上禁用 WIFI（出厂设置）
- Bluetooth/USB switch must be on USB / 蓝牙/USB 开关必须处于 USB 位置
- Static IP address of Create 3: `192.168.186.2` / Create 3 的静态 IP 地址：`192.168.186.2`
- Static IP address of Wired port on Laptop: `192.168.186.3` / 笔记本电脑有线端口的静态 IP 地址：`192.168.186.3`
- Laptop runs ROS2 on Ubuntu 22.04 / 笔记本电脑在 Ubuntu 22.04 上运行 ROS2
- Run ROS2 python programs and commands on Laptop -> Create 3 responds / 在笔记本电脑上运行 ROS2 Python 程序和命令 -> Create 3 响应

---

## 第 15 页 / Page 15

**Our Create 3 Setup (Summary) / 我们的 Create 3 设置（总结）**

```
Your Laptop / 你的笔记本电脑
    WIFI: from your router / 来自你的路由器
        ↓
Loaner Laptop / 借用的笔记本电脑
    Camera/Speaker/Microphone / 摄像头/扬声器/麦克风
    Ubuntu 20.04/ROS2 Humble
    Wired: 192.168.186.3 / 有线：192.168.186.3
    WIFI: from your router / 来自你的路由器
        → (Wired Connection / 有线连接) →
Create 3
    192.168.186.2
```

**Network Configuration: / 网络配置：**

- **Your Laptop / 你的笔记本电脑:** WIFI connection to router / WiFi 连接到路由器
- **Loaner Laptop / 借用的笔记本电脑:**
  - Wired: 192.168.186.3 → Create 3 (192.168.186.2) / 有线：192.168.186.3 → Create 3 (192.168.186.2)
  - WIFI: from your router / 来自你的路由器

---

## 第 16 页 / Page 16

**Anticipated Questions / 预期问题**

- **Can I run ROS2 on my Windows Laptop natively? / 我可以在我的 Windows 笔记本电脑上原生运行 ROS2 吗？**

  - Maybe, but there might be issues: it might not be worth your time to try / 也许可以，但可能会有问题：可能不值得你花时间去尝试

- **Can I use my own laptop instead of a loaner laptop? / 我可以使用自己的笔记本电脑而不是借用的笔记本电脑吗？**
  - Maybe, but you'll need ROS2 Humble on Ubuntu 22.04 to be able to keep up with everyone else. / 也许可以，但你需要 Ubuntu 22.04 上的 ROS2 Humble 才能跟上其他人。

---

## 第 17 页 / Page 17

**ROS2: Object Oriented Python / ROS2：面向对象 Python**

When we look at the ROS2 source code templates, or some of the iRobot Python Playground example programs, we'll see new things: / 当我们查看 ROS2 源代码模板或一些 iRobot Python Playground 示例程序时，我们会看到新内容：

- **Decorators: / 装饰器：** [Python Decorators Primer / Python 装饰器入门](https://realpython.com/primer-on-python-decorators/)
- **Classes: / 类：** Deitel 10.2
- **Constructors: / 构造函数：** Deitel 10.2
- **Properties (getters/setters): / 属性（getter/setter）：** Deitel 10.3—10.5
- **Inheritance: / 继承：** Deitel 10.7—10.8
- **Asynchronous methods: / 异步方法：** [Python asyncio Documentation / Python asyncio 文档](https://docs.python.org/3/library/asyncio-task.html)

---

## 第 18 页 / Page 18

**Python Playground Code / Python Playground 代码**

In Chrome, we visit [python.irobot.com](https://python.irobot.com) / 在 Chrome 中，我们访问 python.irobot.com

Notice it doesn't take long to find decorators, and async/await keywords. / 注意到找到装饰器以及 async/await 关键字并不需要很长时间。

---
