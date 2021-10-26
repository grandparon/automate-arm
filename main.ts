/**
 * Example is the servo that rotates the arm has a variable called rotate-servo-num. It has the value 0. So the rotate servo needs to be plugged into the "0" pins on the motor board.
 */
/**
 * the numbers on the right side of each of these needs to be the same as the slot or connector number on the micro-bit motor board.
 */
// This code deals with the keypad hardware. We can go over it if you want, but for now we can ignore how it works and focus on what it does.
function read_keyboard () {
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P0, 1)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P16, 0)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 0)
    // P1 row with the 4 on it
    // P1
    // P1
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        return 5
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        return 2
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        return 8
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        return 0
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P0, 0)
    // set col 147 (pin 16) to one and read row 123 (pin  2) then row 456 (pin 1) then row 789 (pin 12)
    pins.digitalWritePin(DigitalPin.P16, 1)
    // P1 row with the 4 on it
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        return 4
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        return 1
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        return 7
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        // same as * key
        return 10
    }
    // set col 147 (pin 16) to one and read row 123 (pin  2) then row 456 (pin 1) then row 789 (pin 12)
    pins.digitalWritePin(DigitalPin.P16, 0)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 1)
    // P1 row with the 4 on it
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        return 6
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        return 3
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        return 9
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        // same as # key
        return 11
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 0)
    return 99
}
// Three variables go into this function.
// Witch servo should move, how far it should move, and how fast it should move.
// The servo starts then waits for the arm to get to that spot.
function MoveServo (servo_num: number, how_far: number, how_fast: number) {
    ServoBit.moveServo(servo_num, how_far, how_fast)
    ServoBit.waitServo(servo_num)
}
// This function is not being used.
// It is used only for debug if we have a keypad problem
function Check_Keyboard (num: number) {
    while (num == 1) {
        basic.showNumber(read_keyboard())
        basic.pause(100)
        basic.clearScreen()
    }
}
// This is the first code to run after download. 
// 
// It initializes all the variables we will use on the project
let RotateNum = 0
// The variables that end in "Num" is the servo number. Each servo on the arm is plugged into the connector on the controller board. They are you can change the value of these variables to match your robot arm if they are different than what I have.
let UpDnNum = 1
let InOutNum = 2
let ClawNum = 3
// The speed variables we can use to make the arm move faster or slower
let speed_3 = 300
let speed_2 = 200
let speed_1 = 100
ServoBit.centreServos()
// These variables  are the key board number assigned make the arm do stuff. They can be changed if you want a different key to do different than what I wanted.
// An example:
// I've set the keypad #5 to make the claw open and #2 to make it close.
// You can make it work for the way you want.
// Play with them to see what you like.
let ClawOpen = 5
let ClawClose = 2
let ROTATE_CW = 1
let RotCCW = 4
let armup = 6
let armdown = 3
let armin = 7
let arm_out = 10
// The forever loop checks if you have presses a key on the keypad.
// Each time through the floop all 12 keys are checked for someone pressing a key.
// A function called "call read_keyboard" detects a key press. The function returns the key number.
// The key number is compared to what the arm is supposed to do. IF it's the right key the servo moves.
// 
basic.forever(function () {
    while (read_keyboard() == ROTATE_CW) {
        MoveServo(RotateNum, ServoBit.getServoActual(RotateNum) - 5, speed_1)
    }
    while (read_keyboard() == RotCCW) {
        MoveServo(RotateNum, ServoBit.getServoActual(RotateNum) + 5, speed_1)
    }
    while (read_keyboard() == armdown) {
        MoveServo(UpDnNum, ServoBit.getServoActual(UpDnNum) - 5, speed_1)
    }
    while (read_keyboard() == armup) {
        MoveServo(UpDnNum, ServoBit.getServoActual(UpDnNum) + 5, speed_1)
    }
    while (read_keyboard() == armin) {
        MoveServo(InOutNum, ServoBit.getServoActual(InOutNum) + 5, speed_1)
    }
    while (read_keyboard() == arm_out) {
        MoveServo(InOutNum, ServoBit.getServoActual(InOutNum) - 5, speed_1)
    }
    // claw close
    while (read_keyboard() == ClawClose) {
        MoveServo(ClawNum, ServoBit.getServoActual(ClawNum) - 5, speed_1)
    }
    while (read_keyboard() == ClawOpen) {
        MoveServo(ClawNum, ServoBit.getServoActual(ClawNum) + 5, speed_1)
    }
})
