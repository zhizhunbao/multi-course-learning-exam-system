# CST8504 Lab5 Create3 ROS2

---

CST8504 Lab5 Create3 and ROS2

## Overview

Begin learning the basics of the Create3 and ROS2. When you have completed this lab exercise, you will know how to

- Run, modify, and save programs in the Python Playground with Chrome
- Configure your loaner laptop to connect to a WIFI network
- Log in to your loaner laptop from Windows using Putty or SSH on command line
- Configure your loaner laptop to have a static IP address on the wired port
- Connect your loaner laptop to the Create3 and begin using the command line interface to control the Create3 with ros2

## Python Playground

The Python Playground requires the Chrome web browser, which can make a Bluetooth connection to your Create3. When using your Create3 with the Python Playground, you make sure the Create3 USB/Bluetooth switch is on Bluetooth. This is the default position, but if you have changed the switch position, then you need to change the switch back to Bluetooth.

Browse to python.irobot.com in Chrome.

You'll see a Connect button near the top of that page to connect the Chrome browser to Create3 units that are nearby and turned on (with the switch on Bluetooth). Select the Create3 and the Pair button. When doing this in the T125 AI Lab, if there is more than one found, you need to pay attention to which Create3 you are connecting.

Under Examples->utils at the right-top area of your Chrome window, select blank.py and read the source code. Run, and Stop the program. Notice the output at the bottom of the Chrome window.

### Submission 1.1: What does the comment say about the line of code

```
robot = Create3(Bluetooth())?
```

**Answer:**

Now select the create3_all_options.py file which is the next file down on the right.

### Submission 1.2: What color are the lights set to when the right bumper is pressed? (read the code to find out – try it if you're stuck)

**Answer:**

### Submission 1.3: When you run the create3_all_options.py file, what information about the Create3 is printed starting with http (http, Name, Battery, Serial #, etc)?

**Answer:**

## Loaner Laptop Networking

This document will guide you through configuring the networking on the loaner laptop. Note that your networking interface names might be different from those shown below, but the wireless interface will begin with "w", and the wired interface will begin with "e". You can find your actual interface names by running the command ip addr show on your loaner laptop, and look for the interface names.

For example, given the following output from the command, `ip addr show` (ip a for short)

- First arrow points to this computer's ethernet interface named enp0s31f16 which does not currently have an ip address. The name of your computer's ethernet interface might be different but it should begin with 'e'. We will use the wired connection between the laptop and the Create3. We will configure the laptop static IP address to be 192.168.186.3, whereas the Create3 already has static IP address 192.168.186.2.

- Second arrow points to the wireless interface wlp1s0 which can be used for a wireless connection to your WIFI at home (DHCP)

- The third arrow points to the IP address of the laptop's wlp1s0 interface. This IP address 192.168.1.63 would have been assigned to the laptop by a home router, and can be used to login to the laptop with Putty or command-line SSH from your main laptop.

Note: if you are trying to use a different installation of ubuntu-server 22.04 running in a VM, or if you're trying to use WSL, or Docker container instead of the loaner laptop, it might not be worth your time to try to get that working. For the activities in this course, you need to be able to access the camera, microphone, and speaker from ubuntu-server 22.04.

First we will connect your loaner laptop to your home WIFI so that you can log into it and control things, and copy-paste commands, from your Windows laptop. To do this, we edit a configuration file using the nano text editor. Log in directly to your loaner laptop (username: aisd password: aisd). Type in the following command at the $ prompt, and type your password (aisd) when prompted, to launch the nano text editor and edit the WIFI configuration file. You could use the vim text editor if you prefer. Tab-completion of directory names and files should work.

```bash
sudo nano /etc/netplan/00-installer-config-wifi.yaml
```

Using the nano text editor you just launched, carefully type the following contents into the file (you won't have copy-and-paste yet) and note that indentation matters with yaml. Note also that the parts highlighted in yellow depend on your situation. Find your actual wireless interface name for your loaner laptop using the technique above.

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

In the above content, indentation matters. Change your-wifi-ssid to your home wifi ssid, and change your-wifi-password to your home WIFI password. For a connection to ACSecure on campus, the blue highlighted text applies, and to protect your Algonquin credentials, you should change your password for the aisd user on the Loaner Laptop. You would use your own Algonquin userid (the part before @algonquinlive.com) as identity, and your Algonquin password as password in the ACSecure section under wifis. If you are configuring your connection to ACSecure, ensure that you have the correct username and password -- don't leave an incorrect password for your username because multiple incorrect password attempts will lock your account! Leaving the "ACSecure" section commented out with #-characters is a good idea if you will not be connecting to ACSecure.

When you are finished, type ^O (ctrl-O) to save the contents, accepting the filename, and then type ^X (ctrl-X) to exit the nano editor.

Now type the following command to get a wireless IP address from your home router:

```bash
sudo netplan apply
```

It may take a while to get an IP address from your wireless router. Reboot by typing the command reboot if the following command doesn't show an IP address on interface wlp3s0 (or whatever interface name your laptop has) after a while. To check the ip address, use the following command and observe its output:

```bash
ip addr show
```

This command should show you the IP address of your loaner laptop on the wireless interface. If not, try double-checking the content of the file above (indentation matters – the above is indented two spaces, but you can indent by more spaces if you're consistent).

We will configure the Ethernet port later in this lab document, in the section called Loaner Laptop Wired IP Address.

## Logging in to Loaner Laptop

Now that your loaner laptop has an IP address, you can log in to it from your own laptop, and you will then have the ability to copy and paste into your loaner laptop window. If you are using MacOS or Windows command line, you can use ssh in a terminal window to log in to your loaner laptop.

If you are using Putty, you will see a window like the screenshot below. You'll want to enter the IP address and enter a session name (make up a name, maybe "LoanerLaptop") under "Saved Sessions" (and click on the Save button). After doing so, you'll be ready to simply load this same session the next time without having to enter the IP address again. Depending on your local wireless network setup, your loaner laptop IP address will probably begin with one of the following (these are all internal private networks)

- 192.168.??.??
- 172.16.??.??
- 10.??.??.??

Click on the Open button to log in to your loaner laptop at the IP address you specified. You should be prompted for the username/password (aisd/aisd or whatever you changed the aisd password to).

You can open as many session windows as you find convenient. To paste the Windows clipboard into the Putty window, position the cursor in the Putty window, then use right-button (or possibly middle button if you have one) to paste whatever is in your Windows clipboard.

## Install ROS2 on Loaner Laptop

To install ROS2 Humble on your WIFI-connected loaner laptop, which is running Ubuntu-server 22.04, follow the instructions here (same as the instructions in the lab document for VM development setup): https://iroboteducation.github.io/create3_docs/setup/ubuntu2204/

You can copy and paste each code box to run the commands on the loaner laptop. If you are logged in to the loaner laptop from Windows using Putty, you should be able to copy and paste with right button, or possibly middle button. Paste the commands into the Putty window to run the commands on the loaner laptop.

At Step 6, you will choose the second of the two options (`sudo apt install -y ros-humble-ros-base`).

At Step 10, you will set up an environment variable on the loaner laptop to indicate which ROS2 MiddleWare (RMW) should be used. We will choose the second option rmw_fastrtps_cpp option for now, because it is the default on the Create3 Humble version. We can change it later if necessary.

At Step 12, you will just need to run the ros2 topic list command which should print out about 20 lines of output, but ONLY if you have connected the Create3. If there are only 2 or 3 lines of output, it is expected at this stage, and probably means your loaner laptop is not yet on the private network of the Create3. In the following section, we configure the loaner laptop to be on the Create3 network.

## Loaner Laptop Wired IP Address

In addition to the iRobot Create 3, each student will need a USB-C to Ethernet adapter to form a wired network between the Loaner Laptop and the Create 3 USB-C port. Some students may already have this adapter, and there are several adapters in the T125 lab that you can borrow (ask your lab instructor).

To configure the loaner laptop to be networked on the Create3 private network, we will give the laptop a static IP address on its Ethernet port, interface ens5 (or whichever name you determined above). This process is similar to configuring the WIFI networking above; however, this time we put different content into a different file.

Log in to your loaner laptop (username: aisd password: aisd or whatever you have changed it to) either directly or using Putty from Windows. Type in or copy/paste the following command at the $ prompt, and type your password when prompted, to launch the nano text editor on the configuration file. You could use the vim text editor if you prefer. Tab-completion of directory names and files should work.

```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

Using the nano text editor you just launched, carefully type or copy/paste the following contents into the file and note that indentation matters with yaml. Use your actual ethernet interface name in the yellow-highlighted area.

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

When you are finished, type ^O (ctrl-O) to save the contents, accepting the filename, and then type ^X (ctrl-X) to exit the nano editor.

Now type the following command to configure the static IP address:

```bash
sudo netplan apply
```

## Connect Loaner Laptop to Create3

Now your laptop is ready to be wired to the Create3. Change the Create3 switch from the Bluetooth position to the USB position. The switch is under the top plate, which can be removed by following the instructions on this page (scroll down): https://iroboteducation.github.io/create3_docs/hw/mechanical/

Connect a USB-C to Ethernet adapter to the Create3 USB-C port. The USB-C port is accessible inside the cargo bay. Then connect the short Ethernet cable between the adapter and your loaner laptop. Close the cargo bay door/drawer, and sit the loaner laptop on the Create3, as has been shown in class.

Ensure the Create3 is powered on (docking it powers it on), and wait for it to chime after powering it on or changing the USB/Bluetooth switch to USB.

Test the network connection by running the following ping command on the loaner laptop. Note that 192.168.186.2 is the IP address of the Create3, and by pinging that address, we can check if the network is functioning correctly. Ctrl-C to stop the pinging.

```bash
ping -c 3 192.168.186.2
```

You should see output similar to this:

```bash
$ ping -c 3 192.168.186.2

PING 192.168.186.2 (192.168.186.2): 56 data bytes

64 bytes from 192.168.186.2: icmp_seq=0 ttl=64 time=0.095 ms

64 bytes from 192.168.186.2: icmp_seq=1 ttl=64 time=0.125 ms

64 bytes from 192.168.186.2: icmp_seq=2 ttl=64 time=0.126 ms
```

If you see something like this

```
Request timeout for icmp_seq 0,
```

it means your loaner laptop is not able to communicate with the Create3. You can try the following:

- power off the Create3 (middle button until chimes)
- power on the Create3 (dock it)
- reboot your loaner laptop
- try the ping command again

If this doesn't resolve the issue, check your work and consult your professor if necessary.

Once the ping command shows connectivity between the loaner laptop and the Create3, you can try the next test by running this command on the loaner laptop:

```bash
$ ros2 topic list
```

The output of that command should be about 20 lines of Create3 topics. If you see only 2 or 3 topics, then this test has failed, and you need to check your work and consult your professor if necessary.

## Command Line Interface Controls

If the tests of the previous section seem to be passing, then congratulations, you are ready to try some of the commands on this page (run the commands on the loaner laptop): https://iroboteducation.github.io/create3_docs/examples/actuators-cli/

In particular, find and run the commands to undock and dock the Create3. Have fun!

## Demonstration

Submit your answers to the questions in the Python Playground section above. Those questions are labeled Submission 1.1, Submission 1.2, and Submission 1.3.

Demonstrations are done in T125 with your loaner laptop and one of the departmental Create3 units. You may show the demo to the Lab Instructor in realtime, or by recording a video (or several videos) which includes the following items.

- Show logging in to your loaner laptop
- Show running the ping command, showing its output
- Show running the ros2 topic list command, showing its output.
- Show the Create3 undocking
- Show the Create3 docking again
