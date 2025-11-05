# CST8504 Lab 4 ROS2 开发环境 - 步骤架构文档

# CST8504 Lab 4 ROS2 Development Environment - Step Architecture Document

---

## 实验目标 / Lab Objectives

完成本实验后，你将能够：
After completing this lab, you will be able to:

- 在 Windows 上安装并配置 X11 服务器
- Install and configure X11 server on Windows
- 使用 Putty 通过 SSH 连接虚拟机并启用 X11 转发
- Connect to virtual machine using Putty with X11 forwarding enabled
- 在 Ubuntu 虚拟机上安装 ROS2 Humble
- Install ROS2 Humble on Ubuntu virtual machine
- 创建 ROS2 工作空间
- Create a ROS2 workspace
- 克隆、构建和运行 ROS2 教程示例（turtlesim 模拟器）
- Clone, build and run ROS2 tutorial examples (turtlesim simulator)

---

## 实验步骤架构 / Lab Step Architecture

### 阶段一：Windows 端环境准备 / Phase 1: Windows Environment Setup

#### 步骤 1：安装 VcXsrv X Server

#### Step 1: Install VcXsrv X Server

**目标 / Objective:**

- 在 Windows 上安装 X11 服务器，用于显示虚拟机的图形界面
- Install X11 server on Windows to display graphical interface from virtual machine

**操作 / Actions:**

- 下载 VcXsrv：https://sourceforge.net/projects/vcxsrv/
- Download VcXsrv from: https://sourceforge.net/projects/vcxsrv/
- 安装时接受默认设置
- Accept default settings during installation
- 安装完成后会获得 Xlaunch 程序
- After installation, you will have Xlaunch program

---

#### 步骤 2：配置 Putty X11 转发

#### Step 2: Configure Putty X11 Forwarding

**目标 / Objective:**

- 配置 Putty 以支持从虚拟机到 Windows 的 X11 图形转发
- Configure Putty to support X11 graphical forwarding from VM to Windows

**操作 / Actions:**

- 打开 Putty 配置
- Open Putty configuration
- 路径：`Connection -> SSH -> X11 -> Enable X11 forwarding`
- Path: `Connection -> SSH -> X11 -> Enable X11 forwarding`
- 保存配置文件（避免每次重新配置）
- Save the profile (to avoid reconfiguration each time)
- 使用 IP 地址：127.0.0.1（VirtualBox NAT 网络）
- Use IP address: 127.0.0.1 (VirtualBox NAT networking)

---

### 阶段二：虚拟机端 ROS2 安装 / Phase 2: ROS2 Installation on VM

#### 步骤 3：安装 ROS2 Humble

#### Step 3: Install ROS2 Humble

**目标 / Objective:**

- 在 Ubuntu-server 22.04 虚拟机上安装 ROS2 Humble
- Install ROS2 Humble on Ubuntu-server 22.04 virtual machine

**操作 / Actions:**

- 按照官方指南安装：https://iroboteducation.github.io/create3_docs/setup/ubuntu2204/
- Follow official guide: https://iroboteducation.github.io/create3_docs/setup/ubuntu2204/
- **关键选择 1 / Key Choice 1:** Step 6 选择 `ros-humble-ros-base`
- **Key Choice 1:** At Step 6, choose `ros-humble-ros-base`
- **关键配置 1 / Key Configuration 1:** Step 10 设置 RMW 环境变量为 `rmw_fastrtps_cpp`
- **Key Configuration 1:** At Step 10, set RMW environment variable to `rmw_fastrtps_cpp`

**注意 / Notes:**

- 使用 Putty 复制粘贴命令到虚拟机
- Use Putty to copy-paste commands to VM
- 右键或中键粘贴
- Right-click or middle-click to paste

---

### 阶段三：ROS2 工作空间搭建 / Phase 3: ROS2 Workspace Setup

#### 步骤 4：创建 ROS2 工作空间

#### Step 4: Create ROS2 Workspace

**目标 / Objective:**

- 创建用于开发 ROS2 项目的工作空间
- Create workspace for ROS2 project development

**操作 / Actions:**

- 按照 ROS2 官方教程创建：https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html
- Follow ROS2 official tutorial: https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html
- 创建工作空间目录结构
- Create workspace directory structure
- 配置环境变量
- Configure environment variables

---

#### 步骤 5：克隆 ROS2 教程示例仓库

#### Step 5: Clone ROS2 Tutorial Examples Repository

**目标 / Objective:**

- 获取 ROS2 教程示例代码（包含 turtlesim 模拟器）
- Obtain ROS2 tutorial example code (including turtlesim simulator)

**操作 / Actions:**

- 在工作空间中克隆教程示例仓库
- Clone tutorial examples repository in workspace
- 包含 turtlesim 模拟器包
- Includes turtlesim simulator package

---

#### 步骤 6：构建 turtlesim 包

#### Step 6: Build turtlesim Package

**目标 / Objective:**

- 编译 turtlesim 模拟器
- Compile turtlesim simulator

**操作 / Actions:**

- 使用 colcon 构建工具编译
- Use colcon build tool to compile
- 解决依赖问题（如有）
- Resolve dependencies (if any)

---

### 阶段四：运行与验证 / Phase 4: Execution and Verification

#### 步骤 7：启动 Xlaunch（Windows 端）

#### Step 7: Launch Xlaunch (Windows Side)

**目标 / Objective:**

- 启动 X11 服务器以接收图形显示
- Start X11 server to receive graphical display

**操作 / Actions:**

- 在主笔记本电脑上运行 Xlaunch 程序
- Run Xlaunch program on main laptop
- **必须在运行 turtlesim 之前启动**
- **Must be started before running turtlesim**

---

#### 步骤 8：使用 Putty 登录虚拟机（启用 X11）

#### Step 8: Login to VM using Putty (with X11 enabled)

**目标 / Objective:**

- 建立支持图形转发的 SSH 连接
- Establish SSH connection with graphical forwarding support

**操作 / Actions:**

- 使用已配置 X11 转发的 Putty 配置文件登录
- Login using Putty profile with X11 forwarding configured
- 验证 X11 转发是否正常工作
- Verify X11 forwarding is working properly

---

#### 步骤 9：运行 turtlesim 模拟器

#### Step 9: Run turtlesim Simulator

**目标 / Objective:**

- 运行 turtlesim 模拟器并验证图形界面显示
- Run turtlesim simulator and verify graphical interface display

**操作 / Actions:**

- 在虚拟机终端中运行 turtlesim 命令
- Run turtlesim command in VM terminal
- 验证图形界面是否显示在 Windows 上
- Verify graphical interface displays on Windows
- 测试模拟器功能
- Test simulator functionality

---

## 架构关系图 / Architecture Relationship

```
┌─────────────────────────────────────────────────────────────┐
│                    Windows 主机 / Windows Host                │
│                                                               │
│  ┌──────────────┐         ┌──────────────┐                  │
│  │  Xlaunch     │         │    Putty     │                  │
│  │  (X Server)  │◄────────┤ (SSH + X11) │                  │
│  └──────────────┘         └──────┬───────┘                  │
│                                   │                           │
└───────────────────────────────────┼───────────────────────────┘
                                    │
                                    │ VirtualBox NAT
                                    │ (127.0.0.1)
                                    │
┌───────────────────────────────────┼───────────────────────────┐
│                   虚拟机 / Virtual Machine                     │
│                                   │                           │
│                          ┌────────▼────────┐                 │
│                          │  Ubuntu Server   │                 │
│                          │     22.04        │                 │
│                          └────────┬─────────┘                 │
│                                   │                           │
│                          ┌────────▼────────┐                 │
│                          │   ROS2 Humble   │                 │
│                          │  (ros-base)     │                 │
│                          └────────┬─────────┘                 │
│                                   │                           │
│                          ┌────────▼────────┐                 │
│                          │  ROS2 Workspace │                 │
│                          │  + turtlesim    │                 │
│                          └─────────────────┘                 │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 步骤依赖关系 / Step Dependencies

```
步骤 1 (VcXsrv)
    └─> 步骤 2 (Putty配置)
            └─> 步骤 3 (ROS2安装)
                    └─> 步骤 4 (创建工作空间)
                            └─> 步骤 5 (克隆仓库)
                                    └─> 步骤 6 (构建包)
                                            └─> 步骤 7 (启动Xlaunch)
                                                    └─> 步骤 8 (Putty登录)
                                                            └─> 步骤 9 (运行模拟器)
```

---

## 关键检查点 / Key Checkpoints

1. **Windows 端准备完成**

   - VcXsrv 已安装并可以运行 Xlaunch
   - Putty 已配置 X11 转发并保存配置
   - Windows side preparation complete
   - VcXsrv installed and Xlaunch can run
   - Putty configured with X11 forwarding and saved

2. **虚拟机端准备完成**

   - ROS2 Humble 安装成功
   - 环境变量配置正确（RMW = rmw_fastrtps_cpp）
   - VM side preparation complete
   - ROS2 Humble installed successfully
   - Environment variables configured correctly (RMW = rmw_fastrtps_cpp)

3. **工作空间准备完成**

   - ROS2 工作空间已创建
   - 教程示例已克隆
   - turtlesim 包已成功构建
   - Workspace preparation complete
   - ROS2 workspace created
   - Tutorial examples cloned
   - turtlesim package built successfully

4. **运行验证完成**
   - Xlaunch 正在运行
   - Putty 连接正常且 X11 转发激活
   - turtlesim 图形界面显示在 Windows 上
   - Execution verification complete
   - Xlaunch running
   - Putty connected with X11 forwarding active
   - turtlesim GUI displayed on Windows

---

## 常见问题 / Common Issues

### 问题 1：图形界面无法显示

### Issue 1: Graphical interface not displaying

**可能原因 / Possible Causes:**

- Xlaunch 未启动
- Xlaunch not started
- Putty X11 转发未启用
- Putty X11 forwarding not enabled
- 防火墙阻止连接
- Firewall blocking connection

---

### 问题 2：ROS2 命令找不到

### Issue 2: ROS2 commands not found

**可能原因 / Possible Causes:**

- ROS2 环境变量未设置
- ROS2 environment variables not set
- 需要在每个新终端中 source setup.bash
- Need to source setup.bash in each new terminal

---

### 问题 3：构建失败

### Issue 3: Build failures

**可能原因 / Possible Causes:**

- 缺少依赖包
- Missing dependency packages
- 工作空间路径配置错误
- Workspace path misconfigured

---

## 演示要求 / Demonstration Requirements

演示时需要展示：
During demonstration, you should show:

1. ✅ 能够登录虚拟机
   - Able to login to virtual machine
2. ✅ 能够运行 turtlesim 模拟器，并在 Windows 笔记本上显示
   - Able to run turtlesim simulator, displayed on Windows laptop
3. ✅ 能够回答关于 ROS2 工作空间的问题
   - Able to answer questions about ROS2 workspaces

---

## 总结 / Summary

本实验共包含 **9 个主要步骤**，分为 **4 个阶段**：
This lab contains **9 main steps**, divided into **4 phases**:

- **阶段一**：Windows 环境准备（2 步）
  - **Phase 1**: Windows environment setup (2 steps)
- **阶段二**：ROS2 安装（1 步）
  - **Phase 2**: ROS2 installation (1 step)
- **阶段三**：工作空间搭建（3 步）
  - **Phase 3**: Workspace setup (3 steps)
- **阶段四**：运行验证（3 步）
  - **Phase 4**: Execution and verification (3 steps)

**核心架构**：Windows 提供图形显示环境，虚拟机运行 ROS2 和模拟器，通过 Putty SSH + X11 转发实现图形界面传输。
**Core Architecture**: Windows provides graphical display environment, VM runs ROS2 and simulator, graphical interface transmission achieved through Putty SSH + X11 forwarding.
