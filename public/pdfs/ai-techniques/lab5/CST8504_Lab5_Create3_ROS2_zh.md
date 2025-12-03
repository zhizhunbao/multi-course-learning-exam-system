# CST8504 Lab5 Create3 ROS2

---

CST8504 Lab5 Create3 and ROS2

## 概述

开始学习 Create3 和 ROS2 的基础知识。完成本实验练习后，您将了解如何：

- 在 Chrome 中使用 Python Playground 运行、修改和保存程序
- 配置您的借出笔记本电脑连接到 WIFI 网络
- 使用 Windows 上的 Putty 或命令行 SSH 登录到您的借出笔记本电脑
- 配置您的借出笔记本电脑在有线端口上具有静态 IP 地址
- 将您的借出笔记本电脑连接到 Create3，并开始使用命令行界面通过 ros2 控制 Create3

## Python Playground

Python Playground 需要 Chrome 网页浏览器，它可以与您的 Create3 建立蓝牙连接。在使用 Python Playground 时，请确保 Create3 的 USB/蓝牙开关处于蓝牙位置。这是默认位置，但如果您更改了开关位置，则需要将开关切换回蓝牙位置。

在 Chrome 中浏览 python.irobot.com。

您会在页面顶部附近看到一个连接按钮，用于将 Chrome 浏览器连接到附近已开启的 Create3 设备（开关处于蓝牙位置）。选择 Create3 和配对按钮。在 T125 AI 实验室中执行此操作时，如果找到多个设备，您需要注意正在连接哪个 Create3。

在 Chrome 窗口右上角的 Examples->utils 下，选择 blank.py 并阅读源代码。运行并停止程序。注意 Chrome 窗口底部的输出。

### 提交 1.1：关于这行代码的注释说明了什么

```
robot = Create3(Bluetooth())?
```

**答案：**

现在选择右侧下一个文件 create3_all_options.py。

### 提交 1.2：按下右保险杠时，灯光设置为什么颜色？（阅读代码找出答案——如果遇到困难可以尝试运行）

**答案：**

### 提交 1.3：运行 create3_all_options.py 文件时，以 http 开头的 Create3 信息会打印什么（http、名称、电池、序列号等）？

**答案：**

## 借出笔记本电脑网络配置

本文档将指导您配置借出笔记本电脑的网络。请注意，您的网络接口名称可能与下面显示的不同，但无线接口将以 "w" 开头，有线接口将以 "e" 开头。您可以通过在借出笔记本电脑上运行命令 `ip addr show` 来查找实际的接口名称。

例如，给定命令 `ip addr show`（简称 ip a）的以下输出：

- 第一个箭头指向此计算机的以太网接口，名为 enp0s31f16，目前没有 IP 地址。您的计算机以太网接口名称可能不同，但应以 'e' 开头。我们将使用笔记本电脑和 Create3 之间的有线连接。我们将配置笔记本电脑的静态 IP 地址为 192.168.186.3，而 Create3 已经具有静态 IP 地址 192.168.186.2。

- 第二个箭头指向无线接口 wlp1s0，可用于连接到您家中的 WIFI（DHCP）

- 第三个箭头指向笔记本电脑 wlp1s0 接口的 IP 地址。此 IP 地址 192.168.1.63 将由家庭路由器分配给笔记本电脑，可用于从您的主笔记本电脑使用 Putty 或命令行 SSH 登录到笔记本电脑。

注意：如果您尝试使用在 VM 中运行的不同 ubuntu-server 22.04 安装，或者尝试使用 WSL 或 Docker 容器而不是借出笔记本电脑，可能不值得花时间让它工作。对于本课程的活动，您需要能够从 ubuntu-server 22.04 访问摄像头、麦克风和扬声器。

首先，我们将把您的借出笔记本电脑连接到您家中的 WIFI，以便您可以从 Windows 笔记本电脑登录并控制它，并复制粘贴命令。为此，我们使用 nano 文本编辑器编辑配置文件。直接登录到您的借出笔记本电脑（用户名：aisd 密码：aisd）。在 $ 提示符下输入以下命令，并在提示时输入您的密码（aisd），以启动 nano 文本编辑器并编辑 WIFI 配置文件。如果您愿意，也可以使用 vim 文本编辑器。目录名和文件的 Tab 补全应该可以工作。

```bash
sudo nano /etc/netplan/00-installer-config-wifi.yaml
```

使用您刚刚启动的 nano 文本编辑器，仔细将以下内容输入到文件中（此时您还没有复制粘贴功能），并注意 yaml 中的缩进很重要。还要注意，黄色高亮的部分取决于您的情况。使用上述技术查找您的借出笔记本电脑的实际无线接口名称。

```yaml
#begin the content

network:
  version: 2

  wifis:
    wlp3s0:
      access-points:
        your-wifi-ssid:
          password: "your-wifi-password"

        "ACSecure":
          auth:
            key-management: eap

            method: peap

            identity: "before@"

            password: "passwd"

      dhcp4: true
#end the content
```

在上述内容中，缩进很重要。将 your-wifi-ssid 更改为您家中的 wifi ssid，将 your-wifi-password 更改为您家中的 WIFI 密码。对于连接到校园的 ACSecure，蓝色高亮的文本适用，为了保护您的 Algonquin 凭据，您应该更改借出笔记本电脑上 aisd 用户的密码。您将使用自己的 Algonquin 用户 ID（@algonquinlive.com 之前的部分）作为身份，并将您的 Algonquin 密码作为 wifis 下 ACSecure 部分的密码。如果您正在配置到 ACSecure 的连接，请确保您有正确的用户名和密码——不要为您的用户名留下错误的密码，因为多次错误的密码尝试将锁定您的账户！如果您不会连接到 ACSecure，使用 # 字符注释掉 "ACSecure" 部分是个好主意。

完成后，输入 ^O（ctrl-O）保存内容，接受文件名，然后输入 ^X（ctrl-X）退出 nano 编辑器。

现在输入以下命令以从您的家庭路由器获取无线 IP 地址：

```bash
sudo netplan apply
```

从无线路由器获取 IP 地址可能需要一段时间。如果以下命令在一段时间后没有在接口 wlp3s0（或您的笔记本电脑具有的任何接口名称）上显示 IP 地址，请通过输入命令 reboot 来重启。要检查 IP 地址，请使用以下命令并观察其输出：

```bash
ip addr show
```

此命令应显示您的借出笔记本电脑在无线接口上的 IP 地址。如果没有，请尝试仔细检查上述文件的内容（缩进很重要——上面缩进了两个空格，但如果您保持一致，可以缩进更多空格）。

我们将在本文档后面的"借出笔记本电脑有线 IP 地址"部分配置以太网端口。

## 登录到借出笔记本电脑

现在您的借出笔记本电脑有了 IP 地址，您可以从自己的笔记本电脑登录到它，然后您将能够在借出笔记本电脑窗口中复制和粘贴。如果您使用 MacOS 或 Windows 命令行，可以在终端窗口中使用 ssh 登录到您的借出笔记本电脑。

如果您使用 Putty，您将看到如下所示的窗口。您需要输入 IP 地址并在"已保存的会话"下输入会话名称（创建一个名称，可能是 "LoanerLaptop"）（然后单击保存按钮）。这样做后，您下次就可以简单地加载相同的会话，而无需再次输入 IP 地址。根据您的本地无线网络设置，您的借出笔记本电脑 IP 地址可能以以下之一开头（这些都是内部私有网络）

- 192.168.??.??
- 172.16.??.??
- 10.??.??.??

单击打开按钮以在您指定的 IP 地址登录到您的借出笔记本电脑。您应该会收到用户名/密码提示（aisd/aisd 或您更改的 aisd 密码）。

您可以打开任意多个会话窗口。要将 Windows 剪贴板粘贴到 Putty 窗口中，请将光标定位在 Putty 窗口中，然后使用右键（或者如果您有中键，也可以使用中键）粘贴 Windows 剪贴板中的任何内容。

## 在借出笔记本电脑上安装 ROS2

要在运行 Ubuntu-server 22.04 的 WIFI 连接的借出笔记本电脑上安装 ROS2 Humble，请按照此处的说明（与 VM 开发设置的实验文档中的说明相同）：https://iroboteducation.github.io/create3_docs/setup/ubuntu2204/

您可以复制并粘贴每个代码框以在借出笔记本电脑上运行命令。如果您使用 Putty 从 Windows 登录到借出笔记本电脑，您应该能够使用右键或中键复制和粘贴。将命令粘贴到 Putty 窗口中以在借出笔记本电脑上运行命令。

在第 6 步，您将选择两个选项中的第二个（`sudo apt install -y ros-humble-ros-base`）。

在第 10 步，您将在借出笔记本电脑上设置环境变量以指示应使用哪个 ROS2 中间件（RMW）。我们现在将选择第二个选项 rmw_fastrtps_cpp，因为它是 Create3 Humble 版本的默认值。如果需要，我们稍后可以更改它。

在第 12 步，您只需要运行 ros2 topic list 命令，该命令应打印出大约 20 行输出，但前提是您已连接 Create3。如果只有 2 或 3 行输出，在此阶段是预期的，可能意味着您的借出笔记本电脑尚未在 Create3 的私有网络上。在以下部分中，我们将配置借出笔记本电脑以连接到 Create3 网络。

## 借出笔记本电脑有线 IP 地址

除了 iRobot Create 3，每个学生还需要一个 USB-C 转以太网适配器，以在借出笔记本电脑和 Create 3 USB-C 端口之间形成有线网络。一些学生可能已经有此适配器，T125 实验室中有几个适配器可以借用（询问您的实验讲师）。

要将借出笔记本电脑配置为连接到 Create3 私有网络，我们将在其以太网端口（接口 ens5 或您在上面确定的任何名称）上为笔记本电脑分配静态 IP 地址。此过程类似于上面配置 WIFI 网络；但是，这次我们将不同的内容放入不同的文件。

直接登录到您的借出笔记本电脑（用户名：aisd 密码：aisd 或您已更改的任何内容），或使用 Putty 从 Windows 登录。在 $ 提示符下输入或复制/粘贴以下命令，并在提示时输入您的密码，以在配置文件上启动 nano 文本编辑器。如果您愿意，也可以使用 vim 文本编辑器。目录名和文件的 Tab 补全应该可以工作。

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

使用您刚刚启动的 nano 文本编辑器，仔细输入或复制/粘贴以下内容到文件中，并注意 yaml 中的缩进很重要。在黄色高亮区域使用您的实际以太网接口名称。

```yaml
#begin the content

network:
  version: 2

  ethernets:
    ens5:
      addresses:
        - 192.168.186.3/24
#end the content
```

完成后，输入 ^O（ctrl-O）保存内容，接受文件名，然后输入 ^X（ctrl-X）退出 nano 编辑器。

现在输入以下命令以配置静态 IP 地址：

```bash
sudo netplan apply
```

## 将借出笔记本电脑连接到 Create3

现在您的笔记本电脑已准备好通过有线方式连接到 Create3。将 Create3 开关从蓝牙位置切换到 USB 位置。开关位于顶板下方，可以通过按照此页面上的说明（向下滚动）移除顶板：https://iroboteducation.github.io/create3_docs/hw/mechanical/

将 USB-C 转以太网适配器连接到 Create3 USB-C 端口。USB-C 端口可在货舱内访问。然后将短以太网电缆连接在适配器和您的借出笔记本电脑之间。关闭货舱门/抽屉，并将借出笔记本电脑放在 Create3 上，如课堂上所示。

确保 Create3 已通电（对接会使其通电），并在通电或将 USB/蓝牙开关切换到 USB 后等待其发出提示音。

通过在借出笔记本电脑上运行以下 ping 命令来测试网络连接。请注意，192.168.186.2 是 Create3 的 IP 地址，通过 ping 该地址，我们可以检查网络是否正常工作。按 Ctrl-C 停止 ping。

```bash
ping -c 3 192.168.186.2
```

您应该看到类似以下的输出：

```bash
$ ping -c 3 192.168.186.2

PING 192.168.186.2 (192.168.186.2): 56 data bytes

64 bytes from 192.168.186.2: icmp_seq=0 ttl=64 time=0.095 ms

64 bytes from 192.168.186.2: icmp_seq=1 ttl=64 time=0.125 ms

64 bytes from 192.168.186.2: icmp_seq=2 ttl=64 time=0.126 ms
```

如果您看到类似这样的内容

```
Request timeout for icmp_seq 0,
```

这意味着您的借出笔记本电脑无法与 Create3 通信。您可以尝试以下操作：

- 关闭 Create3（按住中间按钮直到发出提示音）
- 打开 Create3（对接它）
- 重启您的借出笔记本电脑
- 再次尝试 ping 命令

如果这不能解决问题，请检查您的工作并在必要时咨询您的教授。

一旦 ping 命令显示借出笔记本电脑和 Create3 之间的连接，您可以通过在借出笔记本电脑上运行以下命令来尝试下一个测试：

```bash
$ ros2 topic list
```

该命令的输出应该是大约 20 行 Create3 主题。如果您只看到 2 或 3 个主题，则此测试失败，您需要检查您的工作并在必要时咨询您的教授。

## 命令行界面控制

如果上一节的测试似乎通过了，那么恭喜您，您已准备好尝试此页面上的一些命令（在借出笔记本电脑上运行命令）：https://iroboteducation.github.io/create3_docs/examples/actuators-cli/

特别是，找到并运行命令以使 Create3 脱离对接和重新对接。祝您玩得开心！

## 演示

提交您对上面 Python Playground 部分中问题的答案。这些问题标记为提交 1.1、提交 1.2 和提交 1.3。

演示在 T125 中使用您的借出笔记本电脑和部门 Create3 设备之一完成。您可以实时向实验讲师展示演示，或通过录制视频（或几个视频）来展示，其中包含以下项目。

- 显示登录到您的借出笔记本电脑
- 显示运行 ping 命令，显示其输出
- 显示运行 ros2 topic list 命令，显示其输出
- 显示 Create3 脱离对接
- 显示 Create3 重新对接
