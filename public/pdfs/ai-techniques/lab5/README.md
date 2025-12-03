# AISD Vision & Motion - ROS 2 Hand Gesture Control System

A ROS 2-based hand gesture recognition and robot motion control system that uses MediaPipe to identify hand poses and converts gestures into robot motion commands.

## Quick Start

### Prerequisites

1. **Install Git** (Ubuntu):

   ```bash
   sudo apt-get update
   sudo apt-get install git
   ```

2. **Configure Git authentication** (if using HTTPS with Personal Access Token):

   ```bash
   git config --global credential.helper store
   echo "https://YOUR_USERNAME:YOUR_PERSONAL_ACCESS_TOKEN@github.com" >> ~/.git-credentials
   chmod 600 ~/.git-credentials
   ```

3. **Clone the repository**:

   ```bash
   mkdir -p ~/ros2_ws/src
   cd ~/ros2_ws/src
   git clone https://github.com/gitalg/aisd-vision-zhizhunbao.git
   cd aisd-vision-zhizhunbao
   ```

4. **Install ROS 2** (Humble or later recommended)

## Installation

```bash
# 1. Source ROS 2
source /opt/ros/humble/setup.bash

# 2. Install system dependencies
sudo apt update
sudo apt install -y python3-pip

# 3. Install ROS dependencies
cd ~/ros2_ws
rosdep update
rosdep install -i --from-path src --rosdistro humble -y

# 4. Install Python packages
pip3 install numpy==1.25.2
pip3 install "empy<4.0"
pip3 install catkin_pkg
pip3 install lark
pip3 install mediapipe
pip3 install "opencv-python<4.9.0"

# 5. Build workspace
cd ~/ros2_ws
rm -rf build/ install/ log/
colcon build --symlink-install

# 6. Source the workspace
source ~/ros2_ws/install/setup.bash
```

### Running the System

## 🚀 启动顺序和命令

### 方案 1：使用 Create3 机器人（推荐）

**需要 3 个终端窗口**

在每个终端中，首先执行：

```bash
source ~/ros2_ws/install/setup.bash
```

然后按以下顺序启动：

**终端 1 - Image Publisher（图像发布器）:**

```bash
ros2 run aisd_vision image_publisher
```

**终端 2 - Motion Controller（运动控制器）:**

```bash
ros2 run aisd_motion move
```

**终端 3 - Hand Gesture Detector（手势检测器）:**

```bash
ros2 run aisd_vision hands
```

**启动顺序说明：**

1. 先启动终端 1（Image Publisher）- 发布摄像头图像
2. 再启动终端 2（Motion Controller）- 准备接收控制命令
3. 最后启动终端 3（Hand Gesture Detector）- 开始手势识别和控制

**数据流：** Camera → Image Publisher → Hand Gesture Detector → Motion Controller → Create3 Robot

---

### 方案 2：使用 Turtlesim 模拟器（测试用）

**需要 4 个终端窗口**

在每个终端中，首先执行：

```bash
source ~/ros2_ws/install/setup.bash
```

然后按以下顺序启动：

**终端 1 - Turtlesim 模拟器:**

```bash
ros2 run turtlesim turtlesim_node --ros-args --remap /turtle1/cmd_vel:=cmd_vel
```

**终端 2 - Image Publisher（图像发布器）:**

```bash
ros2 run aisd_vision image_publisher
```

**终端 3 - Motion Controller（运动控制器）:**

```bash
ros2 run aisd_motion move
```

**终端 4 - Hand Gesture Detector（手势检测器）:**

```bash
ros2 run aisd_vision hands
```

**启动顺序说明：**

1. 先启动终端 1（Turtlesim）- 启动模拟器窗口
2. 再启动终端 2（Image Publisher）- 发布摄像头图像
3. 然后启动终端 3（Motion Controller）- 准备接收控制命令
4. 最后启动终端 4（Hand Gesture Detector）- 开始手势识别和控制

![1763584741059](image/README/1763584741059.png)

## 🚀 Quick Development

**Important Note**: After modifying Python code, **no recompilation is needed**! Just restart the node.

```bash
# After modifying code, simply:
# 1. Stop the node (Ctrl+C)
# 2. Restart the node
ros2 run aisd_motion move
```

### Hand Gestures

| Gesture       | Action           | Condition            |
| ------------- | ---------------- | -------------------- |
| 👈 Turn Left  | angular.z = 0.1  | xindex < 0.45        |
| 👉 Turn Right | angular.z = -0.1 | xindex > 0.55        |
| 👆 Straight   | angular.z = 0.0  | 0.45 ≤ xindex ≤ 0.55 |
| ✋ Forward    | linear.x = 0.5   | xindex > xpinky      |
| 🖐️ Stop       | linear.x = 0.0   | xindex ≤ xpinky      |

---

**Author**: Wang Peng ([zhizhunbao](https://github.com/zhizhunbao)) (wang1059@algonquinlive.com) | CST8504 - Algonquin College
