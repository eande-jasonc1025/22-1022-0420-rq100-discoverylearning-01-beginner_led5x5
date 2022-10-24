/**
 * RQ-BX: Startup & Setup
 */
/**
 * Startup: Main 'On Start' Stack
 */
/**
 * Setup: Network, Bot-&-Controller-Joystick, Bot-Only, Controller-Joystick-Only
 */
/**
 * RQ-BX: Controller-Joystick (Network: Client)
 */
/**
 * Setup: Serial-Monitor
 */
/**
 * RQ-BX: Bot (Network: Server)
 */
/**
 * Network: 'network_GroupChannel_MyBotAndController_Base0_Int'
 */
/**
 * 'deviceType_Bot_Bool' vs. 'deviceType_Controller_Bool'
 */
/**
 * RQ-BX: Common Functions to be Shared with Both 1) Controller-Joystick (Network: Client) and 2) Bot (Network: Server)
 */
/**
 * RQ-BX-G (Global)
 */
/**
 * RQ-BX: Advance Components: Ultrasonic Sensor
 */
/**
 * Notes
 */
/**
 * * Key Notes: Bot (Network: Server)
 * 
 * * DfRobot Driver Expansion Board
 * 
 * ** https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548
 * 
 * ** https://github.com/DFRobot/pxt-motor
 * 
 * * Micro-Servo 9G A0090 (Sparkfun)
 * 
 * ** ~ HiTec HS-55
 * 
 * ** MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
 * 
 * * To prevent flooding this bot-server with messages, have controller-client delay approx. 20ms to still maintain real-time response after each send-tx.
 * 
 * * Also, 1 Char Msg Max, 2 Char or more caused buffer-overrun and serial broke down, froze
 * 
 * * on event AB not work, but A or B does work reliably
 * 
 * * also 'on button A', 'on button B', and 'on button A+B' do work without 'on event' blocks present: event triggers only on ButtonEvtUp reliably
 * 
 * ** Also if held down longer than 2 sec, event will be aborted
 * 
 * * Thus, avoid condition: 'button A/B/A+B is pressed' block since not reliable
 */
/**
 * * General Notes
 * 
 * * 2019-0519-0340
 * 
 * ** DFRobot Driver Expansion Board
 * 
 * * 2019-0525-09-HAA TYJ first complete joystick XY
 * 
 * * Technical Notes
 * 
 * * 2019-1019
 * 
 * ** Create more responsiveness, no DeadZone
 * 
 * * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
 * 
 * ** Delete 'index_y2' (tried to reuse but '844' error)
 * 
 * ** Tried to reuse 'item' but probably is a system var
 * 
 * ** Remove unused 'button_AandB_Countdown_CpuCycles', 'buttonA_Then_B_On'
 * 
 * ** Rename used-only-once-via-set:
 * 
 * *** 'dashboardDisplay_Brightness_HI' to 'servo_Pan_Degrees' :)+
 * 
 * *** 'groupChannel_Digit_MIN' to 'servo_Pan_Degrees'
 * 
 * *** 'groupChannel_Digit_MAX' to 'servo_Tilt_Degrees'
 * 
 * * 2020-0120-02: Arm Servo
 * 
 * ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
 * 
 * ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
 * 
 * *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
 * 
 * *** ServoArmRight: P12 (Write-Only)
 * 
 * *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
 * 
 * * 2020-0224-1215
 * 
 * ** Network Test w/ Gaming Server
 * 
 * *** w/ Sonar: Simulated or Real
 * 
 * *** w/ BotId: Random or Real
 * 
 * * 2020-0305
 * 
 * ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
 * 
 * *** Delete obsolete 'joystick_Value'
 * 
 * * 2020-0328
 * 
 * ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
 * 
 * ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
 * 
 * * 2020-04xx
 * 
 * Micro-Servo 9G A0090 (Sparkfun)
 * 
 * ~ HiTec HS-55
 * 
 * MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
 * 
 * 0 no
 * 
 * 250 0
 * 
 * 500 no
 * 
 * >> 750: 45
 * 
 * 1000 90 - 10 = 80
 * 
 * 1250 90 + 10 = 100
 * 
 * >> 1500 90 + 30
 * 
 * 1750 180 - 30
 * 
 * 2000 170
 * 
 * 2250 190
 * 
 * >> 2500 225 = 180 + 30/45
 * 
 * 2750 no
 * 
 * 3000 no
 * 
 * * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
 */
// * Key Notes: Controller-Joystick (Network-Client)
// 
// * Yahboom Joystick
// 
// ** https://www.yahboom.net/study/SGH
// 
// ** https://github.com/lzty634158/GHBit
// 
// * DfRobot Driver Expansion Board
// 
// ** https://wiki.dfrobot.com/Micro_bit_Driver_Expansion_Board_SKU_DFR0548
// 
// ** https://github.com/DFRobot/pxt-motor
function setup_Network_Fn () {
    if (true) {
        radio.setGroup(network_GroupChannel_MyBotAndController_Base0_Int)
        basic.showString("CH:" + network_GroupChannel_MyBotAndController_Base0_Int)
    }
}
function screen_IconMesssage_Fn (screen_IconMessage_Id_Str_In: string) {
    if (screen_IconMessage_Id_Str_In == "bot") {
        _codeComment_AsText = "'b' = Bot"
        if (true) {
            led.plotBrightness(3, 4, screenBrightness_LO_INT)
            led.plotBrightness(3, 3, screenBrightness_LO_INT)
            led.plotBrightness(3, 2, screenBrightness_LO_INT)
            led.plotBrightness(3, 1, screenBrightness_LO_INT)
        }
        if (true) {
            led.plotBrightness(2, 3, screenBrightness_LO_INT)
            led.plotBrightness(2, 1, screenBrightness_LO_INT)
        }
        if (true) {
            led.plotBrightness(1, 3, screenBrightness_LO_INT)
            led.plotBrightness(1, 2, screenBrightness_LO_INT)
            led.plotBrightness(1, 1, screenBrightness_LO_INT)
        }
    } else if (screen_IconMessage_Id_Str_In == "controller") {
        _codeComment_AsText = "'c' = Controller"
        if (true) {
            led.plotBrightness(1, 1, screenBrightness_LO_INT)
            led.plotBrightness(1, 2, screenBrightness_LO_INT)
            led.plotBrightness(1, 3, screenBrightness_LO_INT)
        }
        if (true) {
            led.plotBrightness(2, 3, screenBrightness_LO_INT)
            led.plotBrightness(3, 3, screenBrightness_LO_INT)
        }
        if (true) {
            led.plotBrightness(2, 1, screenBrightness_LO_INT)
            led.plotBrightness(3, 1, screenBrightness_LO_INT)
        }
    } else if (screen_IconMessage_Id_Str_In == "error") {
        _codeComment_AsText = "All 4 Corners Lit: Simple to Code"
        if (true) {
            led.plotBrightness(0, 0, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(4, 0, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(0, 4, screenBrightness_HI_DEFAULT_INT)
            led.plotBrightness(4, 4, screenBrightness_HI_DEFAULT_INT)
        }
    } else {
        serial.writeLine("*** *** ERROR: Invalid Parameter Value: " + screen_IconMessage_Id_Str_In)
    }
}
// * General Notes
// 
// * 2019-0519-0340
// 
// ** DFRobot Driver Expansion Board
// 
// * 2019-0525-09-HAA TYJ first complete joystick XY
// 
// * Technical Notes
// 
// * 2019-1019
// 
// ** Create more responsiveness, no DeadZone
// 
// * 2020-0120: 844 SW error : GC allocation failed for requested number bytes: GC (garbage collection) error of 57 variables max,
// 
// ** Delete 'index_y2' (tried to reuse but '844' error)
// 
// ** Tried to reuse 'item' but probably is a system var
// 
// ** Remove unused 'button_AandB_Countdown_CpuCycles', 'buttonA_Then_B_On'
// 
// ** Rename used-only-once-via-set:
// 
// *** 'dashboardDisplay_Brightness_HI' to 'servo_Pan_Degrees' :)+
// 
// *** 'groupChannel_Digit_MIN' to 'servo_Pan_Degrees'
// 
// *** 'groupChannel_Digit_MAX' to 'servo_Tilt_Degrees'
// 
// 
// 
// * 2020-0120-02: Arm Servo
// 
// ** S-bus not work (DFRobot driver), so switch to P-bus (MakeCode driver)
// 
// ** DfRobot only has P0, P1, P2 as Read/Write from MakeCode's Menu, so reserve for Read Only.  Rest for Write Only.
// 
// *** Ultrasonic Sensor: P0 (Read, Echo), P8 (Write, Trigger)
// 
// *** ServoArmRight: P12 (Write-Only)
// 
// *** PIxyCam: P13 (Write-Only) Pan Servo, P14 (Write-Only) Tilt Servo, P1 (Read) Dig In from PixyCam-P1, P2 (Read) Ana In from PIxyCam-P8, S8-Pwr, S8-Gnd
// 
// * 2020-0224-1215
// 
// ** Network Test w/ Gaming Server
// 
// *** w/ Sonar: Simulated or Real
// 
// *** w/ BotId: Random or Real
// 
// * 2020-0305
// 
// ** 844 Error 57,49 variable max issue: Consolidate 'index_X' 'index_Y' to 'index'
// 
// *** Delete obsolete 'joystick_Value'
// 
// * 2020-0328
// 
// ** DFRobot S1 not seem to work for Arm-Right, though worked before, go back to micro:bit P16
// 
// ** abandon usage of S1-S6 for now, not reliable, since not work before, yet TYJ P1-P16 does  :)+
// 
// * 2020-04xx
// 
// Micro-Servo 9G A0090 (Sparkfun)
// 
// ~ HiTec HS-55
// 
// MicroBit: 'servo set pulse pin Px (e.g. P8) to (us) ___'  :)+
// 
// 0 no
// 
// 250 0
// 
// 500 no
// 
// >> 750: 45
// 
// 1000 90 - 10 = 80
// 
// 1250 90 + 10 = 100
// 
// >> 1500 90 + 30
// 
// 1750 180 - 30
// 
// 2000 170
// 
// 2250 190
// 
// >> 2500 225 = 180 + 30/45
// 
// 2750 no
// 
// 3000 no
// 
// * Using DFRobot Servo Pins not reliable, possibly since these are 3.3.v servos (not standard 5.0v servos), thus use MicroBit 'servo write pin Pxx' blocks for reliable 0-180 degrees.
function setup_BotAndController_Fn () {
    if (true) {
        _codeComment_AsText = "Default: None, since require manual activation since all-in-one code shared between both devices"
        deviceType_Controller_Bool = false
        deviceType_Bot_Bool = false
    }
    if (true) {
        screenBrightness_HI_DEFAULT_INT = 255
        _codeComment_AsText = "127 not low enough, 15 is better, 1 too low, 7 seems best"
        screenBrightness_LO_INT = 7
    }
    if (true) {
        _debug_Serial_Print_Bool = false
    }
}
function setup_BotOnly_Setup_Fn () {
    if (deviceType_Bot_Bool) {
        motor_Power_ZERO_AS_STOP = 0
    }
}
function setup_ControllerOnly_Fn () {
    if (deviceType_Controller_Bool) {
        _codeComment_AsText = "No Code For Now"
    }
}
input.onButtonPressed(Button.AB, function () {
    deviceType_Bot_Bool = false
    if (!(deviceType_Controller_Bool)) {
        _codeComment_AsText = "Only place that activates Controller"
        deviceType_Controller_Bool = true
    }
    roboQuest.rq_Setup_Fn(false, true)
})
function Screen_Clear_Fn () {
    for (let index_X = 0; index_X <= 4; index_X++) {
        for (let index_Y = 0; index_Y <= 4; index_Y++) {
            led.unplot(index_X, index_Y)
        }
    }
}
// RQ-BX-G (Global)
radio.onReceivedString(function (receivedString) {
    _codeComment_AsText = "For Local-Controller-Remote"
    if (deviceType_Bot_Bool) {
        if (true) {
            if (false) {
                serial.writeLine("RadioNetwork:>" + receivedString + "<")
            }
            Screen_Clear_Fn()
            if (true) {
                if (receivedString == "f") {
                    roboQuest.rq_show_MotionDirection_Fn(rq_Motion_Direction_Enum.Forward)
                    _codeComment_AsText = "Customize Code_Below with Motor_Power Values for an Effective 'Straight Forward' (less drifting Left or Right)"
                    roboQuest.rq_PowerMotorsViaBlueRedBlackPins_Fn(rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight, 0, 0)
                } else if (receivedString == "b") {
                    roboQuest.rq_show_MotionDirection_Fn(rq_Motion_Direction_Enum.Backward)
                    _codeComment_AsText = "Customize Code_Below with Motor_Power Values for an Effective 'Straight Backward' (less drifting Left or Right)"
                    roboQuest.rq_PowerMotorsViaBlueRedBlackPins_Fn(rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight, 0, 0)
                } else if (receivedString == "l") {
                    roboQuest.rq_show_MotionDirection_Fn(rq_Motion_Direction_Enum.Left)
                    _codeComment_AsText = "Customize Code_Below with Motor_Power Values for an Effective 'Turn Left'"
                    roboQuest.rq_PowerMotorsViaBlueRedBlackPins_Fn(rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight, 0, 0)
                } else if (receivedString == "r") {
                    roboQuest.rq_show_MotionDirection_Fn(rq_Motion_Direction_Enum.Right)
                    _codeComment_AsText = "Customize Code_Below with Motor_Power Values for an Effective 'Turn Right'"
                    roboQuest.rq_PowerMotorsViaBlueRedBlackPins_Fn(rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight, 0, 0)
                } else if (receivedString == "s") {
                    roboQuest.rq_show_MotionDirection_Fn(rq_Motion_Direction_Enum.Stop)
                    roboQuest.rq_PowerMotorsViaBlueRedBlackPins_Fn(rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight, motor_Power_ZERO_AS_STOP, motor_Power_ZERO_AS_STOP)
                    _codeComment_AsText = "During idle, show entity-type: B=Bot, C=Controller"
                    screen_IconMesssage_Fn("bot")
                } else {
                    _codeComment_AsText = "Error: Unknown Msg, so just Stop"
                    roboQuest.rq_PowerMotorsViaBlueRedBlackPins_Fn(rq_PortGroup_BlueRedBlack_PortIds_Enum.S1_MotorLeft__S0_MotorRight, motor_Power_ZERO_AS_STOP, motor_Power_ZERO_AS_STOP)
                    if (true) {
                        _codeComment_AsText = "For now, all 4 corners = Error: Unknown Msg"
                        screen_IconMesssage_Fn("error")
                    }
                }
            }
            if (_debug_Serial_Print_Bool) {
                network_Throttle_MilliSec_Per_CpuCycle_End = control.millis()
                network_Throttle_MilliSec_Per_CpuCycle_Duration = network_Throttle_MilliSec_Per_CpuCycle_End - network_Throttle_MilliSec_Per_CpuCycle_Start
                network_Throttle_MilliSec_Per_CpuCycle_Start = network_Throttle_MilliSec_Per_CpuCycle_End
                serial.writeLine("\"*** *** Debug: network_Throttle_MilliSec_Per_CpuCycle_Duration: \"" + network_Throttle_MilliSec_Per_CpuCycle_Duration)
            }
        }
    } else if (!(deviceType_Controller_Bool) && !(deviceType_Bot_Bool)) {
        _codeComment_AsText = "Only place that activates Bot"
        _codeComment_AsText = "Bot can only be activated by wake-up message from Controller-Remote"
        deviceType_Bot_Bool = true
        roboQuest.rq_Setup_Fn(true, false)
        setup_BotOnly_Setup_Fn()
    }
})
let network_Throttle_MilliSec_Per_CpuCycle_Start = 0
let network_Throttle_MilliSec_Per_CpuCycle_Duration = 0
let network_Throttle_MilliSec_Per_CpuCycle_End = 0
let motor_Power_ZERO_AS_STOP = 0
let _debug_Serial_Print_Bool = false
let deviceType_Bot_Bool = false
let deviceType_Controller_Bool = false
let screenBrightness_HI_DEFAULT_INT = 0
let screenBrightness_LO_INT = 0
let network_GroupChannel_MyBotAndController_Base0_Int = 0
let _codeComment_AsText = ""
if (true) {
    _codeComment_AsText = "Set GroupChannel-# for Both Bot & Controller-Remote."
    network_GroupChannel_MyBotAndController_Base0_Int = 1
    setup_Network_Fn()
    setup_BotAndController_Fn()
}
basic.forever(function () {
    _codeComment_AsText = "Fragment the letters to be interruptible between each 'show string' block"
    if (!(deviceType_Bot_Bool) && !(deviceType_Controller_Bool)) {
        basic.showString("P")
    }
    if (!(deviceType_Bot_Bool) && !(deviceType_Controller_Bool)) {
        basic.showString("u")
    }
    if (!(deviceType_Bot_Bool) && !(deviceType_Controller_Bool)) {
        basic.showString("s")
    }
    if (!(deviceType_Bot_Bool) && !(deviceType_Controller_Bool)) {
        basic.showString("h")
    }
    if (!(deviceType_Bot_Bool) && !(deviceType_Controller_Bool)) {
        basic.showString("A+B")
    }
    if (!(deviceType_Bot_Bool) && !(deviceType_Controller_Bool)) {
        basic.showString("But-")
    }
    if (!(deviceType_Bot_Bool) && !(deviceType_Controller_Bool)) {
        basic.showString("tons")
    }
    if (!(deviceType_Bot_Bool) && !(deviceType_Controller_Bool)) {
        basic.showString("")
    }
})
basic.forever(function () {
    if (deviceType_Controller_Bool) {
        Screen_Clear_Fn()
        if (input.isGesture(Gesture.LogoDown)) {
            roboQuest.rq_show_MotionDirection_Fn(rq_Motion_Direction_Enum.Forward)
            radio.sendString("f")
        } else if (input.isGesture(Gesture.LogoUp)) {
            roboQuest.rq_show_MotionDirection_Fn(rq_Motion_Direction_Enum.Backward)
            radio.sendString("b")
        } else if (input.isGesture(Gesture.TiltLeft)) {
            roboQuest.rq_show_MotionDirection_Fn(rq_Motion_Direction_Enum.Left)
            radio.sendString("l")
        } else if (input.isGesture(Gesture.TiltRight)) {
            roboQuest.rq_show_MotionDirection_Fn(rq_Motion_Direction_Enum.Right)
            radio.sendString("r")
        } else {
            roboQuest.rq_show_MotionDirection_Fn(rq_Motion_Direction_Enum.Stop)
            radio.sendString("s")
            _codeComment_AsText = "During idle, show entity-type: B=Bot, C=Controller"
            screen_IconMesssage_Fn("controller")
        }
        if (_debug_Serial_Print_Bool) {
            network_Throttle_MilliSec_Per_CpuCycle_End = control.millis()
            network_Throttle_MilliSec_Per_CpuCycle_Duration = network_Throttle_MilliSec_Per_CpuCycle_End - network_Throttle_MilliSec_Per_CpuCycle_Start
            network_Throttle_MilliSec_Per_CpuCycle_Start = network_Throttle_MilliSec_Per_CpuCycle_End
            serial.writeLine("\"*** *** Debug: network_Throttle_MilliSec_Per_CpuCycle_Duration: \"" + network_Throttle_MilliSec_Per_CpuCycle_Duration)
        }
    }
})
