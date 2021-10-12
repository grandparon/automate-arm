/**
 * In-out servo limits are 0 to -35
 */
function MoveServo (num: number, num2: number, num3: number) {
    ServoBit.moveServo(num, num2, num3)
    ServoBit.waitServo(num)
}
function show_servo_number (num: number) {
    basic.showNumber(ServoBit.getServoActual(num))
    basic.pause(200)
}
function servo_test (num: number) {
    if (num == 0) {
        MoveServo(num, 45, speed_1)
        show_servo_number(0)
        MoveServo(num, -45, speed_1)
        show_servo_number(0)
        MoveServo(num, 0, speed_1)
        return 1
    } else if (num == 1) {
        MoveServo(1, 0, speed_1)
        show_servo_number(num)
        MoveServo(1, -35, speed_1)
        show_servo_number(num)
        MoveServo(num, 0, speed_1)
        return 1
    } else if (num == 2) {
        MoveServo(num, 60, speed_1)
        show_servo_number(0)
        MoveServo(num, 30, speed_1)
        show_servo_number(0)
        MoveServo(num, 0, speed_1)
        return 1
    } else if (num == 3) {
        MoveServo(num, 45, speed_1)
        show_servo_number(num)
        MoveServo(num, -45, speed_1)
        show_servo_number(num)
        MoveServo(num, 0, speed_1)
        return 1
    }
    basic.showIcon(IconNames.No)
    return 99
}
function arminandup () {
    let armin = 0
    servo_current_pos = ServoBit.getServoActual(armin)
}
// There are 12 keys on this 12 keys on this keypad.. We need numbers for the '*' key and the '#' key.
// '*'  will be 10
// '#'  will be 12
// The "return" instruction will return the number inside the circle to the instruction that called the function.
// 
function read_keyboard () {
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P0, 1)
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
        // P0 col with zero at bottom
        pins.digitalWritePin(DigitalPin.P13, 1)
        return 0
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P0, 0)
    //  set col 147 (pin 16) to one and read row 123 (pin  2) then row 456 (pin 1) then row 789 (pin 12)  
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
    //  set col 147 (pin 16) to one and read row 123 (pin  2) then row 456 (pin 1) then row 789 (pin 12)  
    pins.digitalWritePin(DigitalPin.P16, 0)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 1)
    // P1 row with the 4 on it 
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        return 3
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        return 6
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        return 9
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        // same as # key
        return 12
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 0)
    return 98
}
let servo_current_pos = 0
let speed_1 = 0
// the numbers on the right side of each of these needs to be the same as the slot or connector number on the micro-bit motor board.
// Example is the servo that rotates the arm has a variable called rotate-servo-num. It has the value 0. So the rotate servo needs to be plugged into the "0" pins on the motor board.
let rotateservonum = 0
let updownservonum = 1
let inoutservonum = 2
let clawservonum = 3
let speed_3 = 300
let speed_2 = 100
speed_1 = 100
ServoBit.centreServos()
let claw_opening = 5
let clawclosing = 2
let rotate_arm_clockwise = 1
let rotate_arm_counterclockwise = 4
// 
// Each time through the forever loop all 12 keys are checked for someone pressing a key.
// When the key is pressed the position of the servo is measured. In other words if the up/down arm key is pressed the position of the arm is measured  then 5 degrees is added to go down or subtracted to go up.
basic.forever(function () {
    while (input.buttonIsPressed(Button.B)) {
        MoveServo(clawservonum, ServoBit.getServoActual(clawservonum) + 5, speed_1)
        basic.pause(50)
    }
    while (input.buttonIsPressed(Button.A)) {
        MoveServo(clawservonum, ServoBit.getServoActual(clawservonum) - 5, speed_1)
    }
    while (read_keyboard() == rotate_arm_clockwise) {
        MoveServo(rotateservonum, ServoBit.getServoActual(rotateservonum) - 5, speed_1)
    }
    while (read_keyboard() == rotate_arm_counterclockwise) {
        MoveServo(rotateservonum, ServoBit.getServoActual(rotateservonum) + 5, speed_1)
    }
    while (read_keyboard() == 1) {
        MoveServo(updownservonum, ServoBit.getServoActual(updownservonum) + 5, speed_1)
    }
    while (read_keyboard() == 4) {
        MoveServo(inoutservonum, ServoBit.getServoActual(updownservonum) + 5, speed_1)
    }
    while (read_keyboard() == 3) {
        MoveServo(inoutservonum, ServoBit.getServoActual(inoutservonum) + 5, speed_1)
    }
    while (read_keyboard() == 6) {
        MoveServo(inoutservonum, ServoBit.getServoActual(inoutservonum) + 5, speed_1)
    }
    while (read_keyboard() == clawclosing) {
        MoveServo(clawservonum, ServoBit.getServoActual(clawservonum) - 5, speed_1)
    }
    while (read_keyboard() == claw_opening) {
        MoveServo(clawservonum, ServoBit.getServoActual(clawservonum) - 5, speed_1)
    }
})
