# CST8504 Lab5 Create3 ROS2 - Submission Answers

## Python Playground Submission

### Submission 1.1: What does the comment say about the line of code

```
robot = Create3(Bluetooth())?
```

**Answer:**

The comment says: **"Will connect to the first robot found."**

(Found in create3_all_options.py line 10: `robot = Create3(Bluetooth())  # Will connect to the first robot found.`)

---

### Submission 1.2: What color are the lights set to when the right bumper is pressed? (read the code to find out – try it if you're stuck)

**Answer:**

The lights are set to **green** when the right bumper is pressed.

RGB values: `(0, 255, 0)` - green

(Found in create3_all_options.py lines 31-34:

```python
@event(robot.when_bumped, [False, True])
async def bumped(robot):
    print('Right bumper pressed')
    await robot.set_lights_on_rgb(0, 255, 0)  # green.
```

)

---

### Submission 1.3: When you run the create3_all_options.py file, what information about the Create3 is printed starting with http (http, Name, Battery, Serial #, etc)?

**Answer:**

When you run create3_all_options.py, it prints the following information about the Create3:

1. **http://[IP address]** - The **robot's** IPv4 address (e.g., `http://192.168.186.2`).
2. **Name:** - The robot's name
3. **Version:** - The robot's version string
4. **Battery:** - Battery level in mV and percentage (e.g., `Battery: 15000 mV; 100 %`)
5. **Serial #:** - The robot's serial number
6. **SKU:** - The robot's SKU (Stock Keeping Unit)

(Found in create3_all_options.py lines 90-101:

```python
address = await robot.get_ipv4_address()  # Gets the robot's IP address
ip = address.wlan0
print('http://' + str(ip[0]) + '.' + str(ip[1]) + '.' + str(ip[2]) + '.' + str(ip[3]))
battery = await robot.get_battery_level()
print('Name:', await robot.get_name())
print('Version:', await robot.get_version_string())
print('Battery:', battery[0], 'mV; ', battery[1], '%')
print('Serial #:', await robot.get_serial_number())
print('SKU:', await robot.get_sku())
```

)
