# CST8504 Lab 4 ROS2 开发环境 - 步骤架构文档

# CST8504 Lab 4 ROS2 Development Environment - Step Architecture Document

---

## 实验目标 / Lab Objectives

完成本实验后，你将能够：
After completing this lab, you will be able to:

- 在 Windows 上安装并配置 X11 服务器
- Install and configure X11 server on Windows
- 使用 SSH 客户端（Putty 或 Xshell）通过 SSH 连接虚拟机并启用 X11 转发
- Connect to virtual machine using SSH client (Putty or Xshell) with X11 forwarding enabled
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

#### 步骤 2：配置 SSH 客户端 X11 转发

#### Step 2: Configure SSH Client X11 Forwarding

**目标 / Objective:**

- 配置 SSH 客户端（Putty 或 Xshell）以支持从虚拟机到 Windows 的 X11 图形转发
- Configure SSH client (Putty or Xshell) to support X11 graphical forwarding from VM to Windows

**选项 A：使用 Putty / Option A: Using Putty**

**操作 / Actions:**

- 打开 Putty 配置
- Open Putty configuration
- 路径：`Connection -> SSH -> X11 -> Enable X11 forwarding`
- Path: `Connection -> SSH -> X11 -> Enable X11 forwarding`
- 保存配置文件（避免每次重新配置）
- Save the profile (to avoid reconfiguration each time)
- 使用 IP 地址：127.0.0.1（VirtualBox NAT 网络）
- Use IP address: 127.0.0.1 (VirtualBox NAT networking)

**选项 B：使用 Xshell / Option B: Using Xshell**

**操作 / Actions:**

- 打开 Xshell 会话属性（Properties）
- Open Xshell session properties
- 路径：`连接 -> SSH -> 隧道`（或 `Connection -> SSH -> Tunneling`）
- Path: `连接 -> SSH -> 隧道` (or `Connection -> SSH -> Tunneling`)
- 在右侧面板中找到 `X11转移`（X11 Transfer）部分
- In the right panel, find the `X11转移` (X11 Transfer) section
- 勾选 `转发X11连接到(X):`（Forward X11 connection to (X):）复选框
- Check the `转发X11连接到(X):` (Forward X11 connection to (X):) checkbox
- 选择 `X DISPLAY(D):` 选项，并设置为 `localhost:0.0`
- Select the `X DISPLAY(D):` option and set it to `localhost:0.0`
- 或者如果已安装 Xmanager，可以选择 `Xmanager(M)` 选项
- Alternatively, if Xmanager is installed, you can select the `Xmanager(M)` option
- 保存会话配置（避免每次重新配置）![1762374362378](image/CST8504_Lab4_ROS2_dev_env_步骤架构/1762374362378.png)
- Save session configuration (to avoid reconfiguration each time)
- 使用 IP 地址：127.0.0.1（VirtualBox NAT 网络）
- Use IP address: 127.0.0.1 (VirtualBox NAT networking)

**注意 / Notes:**

- 在 `隧道`（Tunneling）设置页面的右侧面板中，可以看到 `X11转移`（X11 Transfer）部分
- In the `隧道` (Tunneling) settings page, you can see the `X11转移` (X11 Transfer) section in the right panel
- 如果使用 VcXsrv，请选择 `X DISPLAY(D):` 选项并设置为 `localhost:0.0`
- If using VcXsrv, select the `X DISPLAY(D):` option and set it to `localhost:0.0`
- 如果已安装 Xmanager，可以选择 `Xmanager(M)` 选项
- If Xmanager is installed, you can select the `Xmanager(M)` option
- Putty 和 Xshell 都可以用于 X11 转发，选择其中一个即可
- Both Putty and Xshell can be used for X11 forwarding, choose one
- 确保在使用之前已安装并启动 VcXsrv（XLaunch）
- Ensure VcXsrv (XLaunch) is installed and running before use
- **如果连接时出现 `/usr/bin/xauth: file /home/用户名/.Xauthority does not exist` 警告**：这是正常现象，首次使用 X11 转发时会自动创建该文件，不影响功能
- **If you see `/usr/bin/xauth: file /home/username/.Xauthority does not exist` warning when connecting**: This is normal, the file will be created automatically on first X11 forwarding use, does not affect functionality

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

**详细步骤 / Detailed Steps:**

**Step 1: 设置语言环境 / Set Locale**

```bash
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
locale
```

**Step 2: 添加 ROS 2 软件源 / Add ROS 2 Repository**

```bash
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

**Step 3: 更新软件包索引 / Update Package Index**

```bash
sudo apt update
```

**Step 4: 安装 ROS 2 / Install ROS 2**

- **关键选择 1 / Key Choice 1:** 选择安装 `ros-humble-ros-base`（不包含 GUI 工具）
- **Key Choice 1:** Choose to install `ros-humble-ros-base` (without GUI tools)

```bash
sudo apt install ros-humble-ros-base
```

**Step 5: 设置环境变量 / Set Environment Variables**

```bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

**Step 6: 安装依赖工具 / Install Dependency Tools**

```bash
sudo apt install python3-colcon-common-extensions python3-rosdep
```

**Step 7: 初始化 rosdep / Initialize rosdep**

```bash
sudo rosdep init
rosdep update
```

**Step 8: 验证安装 / Verify Installation**

```bash
ros2 --help
```

**Step 9: 设置 RMW 实现 / Set RMW Implementation**

- **关键配置 1 / Key Configuration 1:** 设置 RMW 环境变量为 `rmw_fastrtps_cpp`
- **Key Configuration 1:** Set RMW environment variable to `rmw_fastrtps_cpp`

```bash
echo "export RMW_IMPLEMENTATION=rmw_fastrtps_cpp" >> ~/.bashrc
source ~/.bashrc
```

**Step 10: 验证 RMW 配置 / Verify RMW Configuration**

```bash
echo $RMW_IMPLEMENTATION
```

应该显示：`rmw_fastrtps_cpp`
Should display: `rmw_fastrtps_cpp`

**注意 / Notes:**

- 使用 SSH 客户端（Putty 或 Xshell）复制粘贴命令到虚拟机
- Use SSH client (Putty or Xshell) to copy-paste commands to VM
- Putty: 右键或中键粘贴
- Putty: Right-click or middle-click to paste
- Xshell: 右键粘贴或使用 Ctrl+V
- Xshell: Right-click to paste or use Ctrl+V

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

#### 步骤 8：使用 SSH 客户端登录虚拟机（启用 X11）

#### Step 8: Login to VM using SSH Client (with X11 enabled)

**目标 / Objective:**

- 建立支持图形转发的 SSH 连接
- Establish SSH connection with graphical forwarding support

**操作 / Actions:**

- 使用已配置 X11 转发的 SSH 客户端（Putty 或 Xshell）配置文件登录
- Login using SSH client (Putty or Xshell) profile with X11 forwarding configured
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
│  ┌──────────────┐    ┌──────────────────────┐              │
│  │  Xlaunch     │    │  SSH Client          │              │
│  │  (X Server)  │◄───┤  (Putty/Xshell       │              │
│  └──────────────┘    │   + X11 Forwarding)  │              │
│                      └──────┬────────────────┘              │
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
    └─> 步骤 2 (SSH客户端X11配置)
            └─> 步骤 3 (ROS2安装)
                    └─> 步骤 4 (创建工作空间)
                            └─> 步骤 5 (克隆仓库)
                                    └─> 步骤 6 (构建包)
                                            └─> 步骤 7 (启动Xlaunch)
                                                    └─> 步骤 8 (SSH客户端登录)
                                                            └─> 步骤 9 (运行模拟器)
```

---

## 关键检查点 / Key Checkpoints

1. **Windows 端准备完成**

   - VcXsrv 已安装并可以运行 Xlaunch
   - SSH 客户端（Putty 或 Xshell）已配置 X11 转发并保存配置
   - Windows side preparation complete
   - VcXsrv installed and Xlaunch can run
   - SSH client (Putty or Xshell) configured with X11 forwarding and saved

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
   - SSH 客户端（Putty 或 Xshell）连接正常且 X11 转发激活
   - turtlesim 图形界面显示在 Windows 上
   - Execution verification complete
   - Xlaunch running
   - SSH client (Putty or Xshell) connected with X11 forwarding active
   - turtlesim GUI displayed on Windows

---

## 常见问题 / Common Issues

### 问题 1：图形界面无法显示

### Issue 1: Graphical interface not displaying

**可能原因 / Possible Causes:**

- Xlaunch 未启动
- Xlaunch not started
- SSH 客户端（Putty 或 Xshell）X11 转发未启用
- SSH client (Putty or Xshell) X11 forwarding not enabled
- 防火墙阻止连接
- Firewall blocking connection

**`.Xauthority` 文件警告 / `.Xauthority` File Warning:**

- 如果看到 `/usr/bin/xauth: file /home/用户名/.Xauthority does not exist` 消息
- If you see `/usr/bin/xauth: file /home/username/.Xauthority does not exist` message
- **这是正常的**：首次使用 X11 转发时，系统会自动创建该文件
- **This is normal**: The file will be automatically created on first X11 forwarding use
- **解决方法 / Solution**: 运行一个简单的 X11 程序来触发文件创建，例如：`xeyes` 或 `xclock`
- **Solution**: Run a simple X11 program to trigger file creation, e.g.: `xeyes` or `xclock`
- 如果文件仍未创建，可以手动创建：`touch ~/.Xauthority && chmod 600 ~/.Xauthority`
- If file still not created, can manually create: `touch ~/.Xauthority && chmod 600 ~/.Xauthority`

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

**核心架构**：Windows 提供图形显示环境，虚拟机运行 ROS2 和模拟器，通过 SSH 客户端（Putty 或 Xshell）+ X11 转发实现图形界面传输。
**Core Architecture**: Windows provides graphical display environment, VM runs ROS2 and simulator, graphical interface transmission achieved through SSH client (Putty or Xshell) + X11 forwarding.
