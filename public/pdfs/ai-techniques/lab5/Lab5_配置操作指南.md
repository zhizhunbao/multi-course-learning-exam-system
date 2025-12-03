# Lab5 Create3 ROS2 配置操作指南

## 配置信息收集

在开始配置前，请准备以下信息：

### 1. 网络接口名称

在借出笔记本电脑上运行：

```bash
ip addr show
```

记录：

- **无线接口名称**：以 `w` 开头的接口（如 `wlp3s0`, `wlp1s0`）
- **有线接口名称**：以 `e` 开头的接口（如 `ens5`, `enp0s31f16`）

### 2. WIFI 配置（如需要）

- **WIFI 名称（SSID）**：您的家庭 WIFI 名称
- **WIFI 密码**：您的家庭 WIFI 密码

### 3. ACSecure 配置（可选）

如果需要连接校园网络 ACSecure，请提供：

- **Algonquin 用户名**：@ 之前的部分（如 `username`）
- **Algonquin 密码**：您的 Algonquin 密码

---

## 步骤 1：查找网络接口名称

```bash
ip addr show
```

记录：

- 无线接口名称（以 `w` 开头，如 `wlp3s0`）
- 有线接口名称（以 `e` 开头，如 `ens5`）

## 步骤 2：配置 WIFI 网络（如需要）

### 2.1 编辑配置文件

```bash
sudo nano /etc/netplan/00-installer-config-wifi.yaml
```

### 2.2 修改配置

使用配置文件模板 `configs/00-installer-config-wifi.yaml`，修改：

- 无线接口名称（替换 `wlp3s0`）
- WIFI 名称（替换 `your-wifi-ssid`）
- WIFI 密码（替换 `your-wifi-password`）
- ACSecure 配置（如不需要，删除整个 ACSecure 部分）

### 2.3 保存并应用

在 nano 中：

- 保存：`Ctrl + O`，按 `Enter`
- 退出：`Ctrl + X`

修复配置文件权限（避免警告）：

```bash
sudo chmod 600 /etc/netplan/00-installer-config-wifi.yaml
```

应用配置：

```bash
sudo netplan apply
```

### 2.4 验证

```bash
ip addr show
```

如未获取 IP，重启：

```bash
sudo reboot
```

## 步骤 3：配置有线网络

### 3.1 编辑配置文件

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

### 3.2 修改配置

使用配置文件模板 `configs/00-installer-config.yaml`，修改：

- 以太网接口名称（替换 `ens5`）
- IP 地址保持 `192.168.186.3/24`

### 3.3 修复权限并应用

修复配置文件权限（避免警告）：

```bash
sudo chmod 600 /etc/netplan/00-installer-config.yaml
```

应用配置：

```bash
sudo netplan apply
```

## 步骤 4：连接测试

### 4.1 物理连接

1. Create3 开关切换到 USB 位置
2. 连接 USB-C 转以太网适配器
3. 连接以太网线
4. 确保 Create3 已通电

### 4.2 网络测试

```bash
ping -c 3 192.168.186.2
```

成功应看到 3 次响应。

### 4.3 ROS2 测试

```bash
ros2 topic list
```

成功应显示约 20 行主题。

### 4.4 故障排除

如 ping 失败：

1. 关闭 Create3（按住中间按钮直到提示音）
2. 打开 Create3（对接）
3. 重启笔记本电脑：`sudo reboot`
4. 再次测试

## 步骤 5：安装 irobot_create_msgs 包（使用 Dock/Undock 前必需）

在使用 dock 和 undock 命令前，需要先安装 `irobot_create_msgs` 包：

### 5.1 安装包

```bash
sudo apt-get update
sudo apt-get install ros-humble-irobot-create-msgs
```

### 5.2 验证安装

```bash
ros2 pkg list | grep irobot_create_msgs
```

应显示 `irobot_create_msgs`。

### 5.3 检查可用动作

```bash
ros2 action list
```

应显示 `/undock` 和 `/dock` 等 Create3 动作。

## 步骤 6：Dock 和 Undock 命令

### 6.1 Undock（脱离对接）

让 Create3 从对接站脱离，以便机器人可以移动：

```bash
ros2 action send_goal /undock irobot_create_msgs/action/Undock "{}"
```

查看反馈信息：

```bash
ros2 action send_goal /undock irobot_create_msgs/action/Undock "{}" --feedback
```

### 6.2 Dock（对接）

让 Create3 返回到对接站进行充电：

```bash
ros2 action send_goal /dock irobot_create_msgs/action/Dock "{}"
```

查看反馈信息：

```bash
ros2 action send_goal /dock irobot_create_msgs/action/Dock "{}" --feedback
```

### 6.3 注意事项

- **Undock 是必需的**：如果想让机器人移动，必须先执行 undock 命令
- **Dock 用于充电**：使用完毕后，执行 dock 命令让机器人返回对接站充电
- **测试连接时不需要 undock**：仅测试网络连接和 ROS2 话题时，不需要 undock
