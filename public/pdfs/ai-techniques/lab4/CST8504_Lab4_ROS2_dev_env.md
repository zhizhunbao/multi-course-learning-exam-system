# CST8504 Lab4 ROS2 dev env

# CST8504 实验 4 ROS2 开发环境

---

**CST8504 Lab4 ROS 2 Development Environment with Simulator**
**CST8504 实验 4 ROS 2 开发环境（含模拟器）**

## Overview

## 概述

Set up a development environment for ROS 2. When you have completed this lab exercise, you will know how to:
设置 ROS 2 的开发环境。完成本实验练习后，你将学会如何：

- Install the VcXsrv X Server for Windows in order to run X11 programs on your virtual machine and have them displayed on your Windows machine
- 安装 VcXsrv X Server for Windows，以便在虚拟机上运行 X11 程序并在你的 Windows 机器上显示它们
- Log in to your virtual machine from Windows using Putty, with X11 forwarding enabled
- 使用 Putty 从 Windows 登录到虚拟机，并启用 X11 转发
- Create a ROS2 workspace
- 创建 ROS2 工作空间
- Clone a git repository of the ROS2 tutorial examples (simulator)
- 克隆 ROS2 教程示例（模拟器）的 git 仓库
- Build and Run the turtlesim simulator from the ROS2 tutorial examples
- 构建并运行 ROS2 教程示例中的 turtlesim 模拟器

This lab continues the work of Lab 1 with your virtual machine.
本实验继续使用实验 1 中的虚拟机。

## Install ROS2 on your virtual machine

## 在虚拟机上安装 ROS2

Once you are logged in to your virtual machine, you can then install ROS2.
登录到虚拟机后，就可以安装 ROS2。

To install ROS2 Humble on your virtual machine, which is running Ubuntu-server 22.04, follow the instructions here: [https://iroboteducation.github.io/create3_docs/setup/ubuntu2204/](https://iroboteducation.github.io/create3_docs/setup/ubuntu2204/)
要在运行 Ubuntu-server 22.04 的虚拟机上安装 ROS2 Humble，请按照此处的说明操作：[https://iroboteducation.github.io/create3_docs/setup/ubuntu2204/](https://iroboteducation.github.io/create3_docs/setup/ubuntu2204/)

You can copy and paste each code box to run the commands on the virtual machine. If you are logged in to the virtual machine from Windows using Putty, you should be able to copy and paste with right button, or possibly middle button. Paste the commands into the Putty window to run the commands on the loaner laptop.
你可以复制并粘贴每个代码框来在虚拟机上运行命令。如果你使用 Putty 从 Windows 登录到虚拟机，应该能够使用右键或中键进行复制和粘贴。将命令粘贴到 Putty 窗口中，在借用的笔记本电脑上运行这些命令。

At Step 6, you will choose the second of the two options (`sudo apt install -y ros-humble-ros-base`).
在第 6 步，你将选择两个选项中的第二个（`sudo apt install -y ros-humble-ros-base`）。

At Step 10, you will set up an environment variable on the loaner laptop to indicate which ROS2 MiddleWare (RMW) should be used. We will choose the second option `rmw_fastrtps_cpp` option for now, because it is the default on the Create3 Humble version. We can change it later if necessary.
在第 10 步，你将在借用的笔记本电脑上设置一个环境变量，以指示应使用哪个 ROS2 中间件（RMW）。我们现在选择第二个选项 `rmw_fastrtps_cpp`，因为它是 Create3 Humble 版本的默认选项。如有必要，我们稍后可以更改它。

## ROS2 Creating a Workspace Tutorial

## ROS2 创建工作空间教程

We will now create a ROS2 workspace, and use it to build the ROS2 turtlesim package, by following one of the ROS2 tutorials. The turtlesim simulator is a graphical X11 program which will run on your Ubuntu-server virtual machine, but that program will display on your Windows laptop.
我们现在将创建一个 ROS2 工作空间，并使用它来构建 ROS2 turtlesim 包，方法是按照 ROS2 教程之一进行操作。turtlesim 模拟器是一个图形 X11 程序，将在你的 Ubuntu-server 虚拟机上运行，但该程序会显示在你的 Windows 笔记本电脑上。

Before going through the tutorial, to prepare to run X11 applications on the virtual machine and have them display on your Windows host machine, download VcXsrv X11 server for Windows from here: [https://sourceforge.net/projects/vcxsrv/](https://sourceforge.net/projects/vcxsrv/), and install it, accepting defaults in the installation wizard. After installing, you will then have a program called Xlaunch which is an X11 server which will need to be running when we log in to the virtual machine with Putty and run the turtlesim simulator. You need to run the Xlaunch program on your main laptop before trying to run the turtlesim simulator on your virtual machine.
在开始教程之前，为了准备在虚拟机上运行 X11 应用程序并在你的 Windows 主机上显示它们，请从此处下载 VcXsrv X11 server for Windows：[https://sourceforge.net/projects/vcxsrv/](https://sourceforge.net/projects/vcxsrv/)，并安装它，接受安装向导中的默认设置。安装后，你将拥有一个名为 Xlaunch 的程序，这是一个 X11 服务器，当我们使用 Putty 登录到虚拟机并运行 turtlesim 模拟器时，它需要运行。在尝试在虚拟机上运行 turtlesim 模拟器之前，你需要在你的主笔记本电脑上运行 Xlaunch 程序。

You will also need to configure Putty to allow the X11 forwarding from the virtual machine back to the Windows X server: you can enable X11 fowarding at `Putty->Connection->SSH->X11->enable X11 forwarding`. It makes sense to load your virtual machine Putty profile, then set X11 forwarding enabled, save the profile with that change, so you won't have to redo that configuration every time you run Putty to connect to your virtual machine. We use the 127.0.0.1 IP address because VirtualBox NAT networking forwards the putty SSH connection to the virtual machine.
你还需配置 Putty 以允许从虚拟机到 Windows X 服务器的 X11 转发：你可以在 `Putty->Connection->SSH->X11->enable X11 forwarding` 处启用 X11 转发。加载你的虚拟机 Putty 配置文件，然后启用 X11 转发，保存包含该更改的配置文件，这样你就不必每次运行 Putty 连接到虚拟机时重新配置。我们使用 127.0.0.1 IP 地址，因为 VirtualBox NAT 网络将 putty SSH 连接转发到虚拟机。

Now you are ready to go through the ROS2 Creating a Workspace tutorial, at the URL below. Assuming you have installed ROS2 on your virtual machine following the instructions above, all of the Prerequisites listed for the tutorial should already be satisfied. Log in to your virtual machine with X11 enabled, go through the tutorial, and run the simulator. [https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html)
现在你可以开始 ROS2 创建工作空间教程，URL 如下。假设你已按照上述说明在虚拟机上安装了 ROS2，教程中列出的所有先决条件应该都已满足。使用启用了 X11 的方式登录到你的虚拟机，完成教程，并运行模拟器。[https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html)

## Demonstration

## 演示

For the demonstration, be prepared to show that you can:
演示时，准备好展示你可以：

- Log in to your virtual machine
- 登录到你的虚拟机
- Run the turtlesim simulator, displayed on your Windows laptop
- 运行 turtlesim 模拟器，显示在你的 Windows 笔记本电脑上
- Answer questions about working with ROS2 workspaces
- 回答有关使用 ROS2 工作空间的问题
