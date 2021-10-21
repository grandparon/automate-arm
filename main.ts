function Rotate_Clockwise () {
    MoveServo(rotate_servo_num, rotate_clockwise, speed_1)
}
input.onButtonPressed(Button.A, function () {
    arminandup()
})
function Claw_Closed () {
    ServoBit.moveServo(clawservonum, -80, speed_2)
}
function Arm_Out () {
    MoveServo(inoutservonum, arm_out, speed_1)
    ServoBit.waitServo(inoutservonum)
}
function Rotate_Counterclockwise () {
    MoveServo(rotate_servo_num, rotate_counterclockwise, speed_1)
    ServoBit.waitServo(clawservonum)
}
function Claw_Open () {
    ServoBit.moveServo(clawservonum, 80, speed_2)
    ServoBit.waitServo(clawservonum)
}
function MoveServo (num: number, num2: number, num3: number) {
    ServoBit.moveServo(num, num2, num3)
    ServoBit.waitServo(rotate_servo_num)
}
input.onButtonPressed(Button.AB, function () {
    Rotate_Clockwise()
    basic.pause(10000)
    Rotate_Counterclockwise()
})
input.onButtonPressed(Button.B, function () {
	
})
function armdownandout () {
    MoveServo(inoutservonum, arm_out, speed_1)
    MoveServo(updownservonum, armdown, speed_1)
    MoveServo(clawservonum, clawclosed, speed_1)
}
function arminandup () {
    servo_current_pos = ServoBit.getServoActual(armin)
    MoveServo(inoutservonum, armin, speed_1)
    MoveServo(updownservonum, armup, speed_1)
    MoveServo(clawservonum, clawopen, speed_1)
}
function ServoToZero (num: number) {
    ServoBit.moveServo(rotate_servo_num, 0, speed_1)
    ServoBit.waitServo(rotate_servo_num)
    ServoBit.moveServo(clawservonum, 0, speed_1)
    ServoBit.waitServo(clawservonum)
    ServoBit.moveServo(inoutservonum, 0, speed_1)
    ServoBit.waitServo(inoutservonum)
    ServoBit.moveServo(updownservonum, 0, speed_1)
    ServoBit.waitServo(updownservonum)
}
function Arm_in () {
    MoveServo(inoutservonum, armin, speed_1)
    ServoBit.waitServo(inoutservonum)
}
let servo_current_pos = 0
let speed_1 = 0
let speed_2 = 0
let clawopen = 0
let clawclosed = 0
let armup = 0
let armdown = 0
let armin = 0
let arm_out = 0
let rotate_clockwise = 0
let rotate_counterclockwise = 0
let clawservonum = 0
let inoutservonum = 0
let updownservonum = 0
let rotate_servo_num = 0
rotate_servo_num = 0
updownservonum = 1
inoutservonum = 2
clawservonum = 3
ServoBit.centreServos()
ServoToZero(1)
rotate_counterclockwise = 70
rotate_clockwise = -70
arm_out = 70
armin = -70
armdown = -70
armup = 70
clawclosed = -80
clawopen = 80
let speed_3 = 300
speed_2 += 200
speed_1 = 100
basic.forever(function () {
    basic.clearScreen()
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P0, 1)
    // P1 row with the 4 on it 
    // P1
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        basic.showNumber(5)
        ServoBit.centreServos()
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        basic.showNumber(2)
        armdownandout()
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        basic.showNumber(8)
        MoveServo(updownservonum, armdown, speed_1)
        ServoBit.waitServo(updownservonum)
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        basic.showNumber(0)
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P0, 0)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 1)
    // P1 row with the 4 on it 
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        basic.showNumber(6)
        Rotate_Counterclockwise()
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        basic.showNumber(3)
        Rotate_Clockwise()
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        basic.showNumber(9)
        arminandup()
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        basic.showLeds(`
            . # . # .
            # # # # #
            . # . # .
            # # # # #
            . # . # .
            `)
        Arm_in()
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 0)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P16, 1)
    // P1 row with the 4 on it 
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        basic.showNumber(4)
        Claw_Open()
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        basic.showNumber(1)
        MoveServo(updownservonum, armup, speed_1)
        ServoBit.waitServo(updownservonum)
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        basic.showNumber(7)
        Claw_Closed()
    } else if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # # # #
            . # # # .
            # . # . #
            `)
        Arm_Out()
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P16, 0)
    basic.clearScreen()
})
