input.onButtonPressed(Button.A, function () {
	
})
function MoveServo (num: number, num2: number, num3: number) {
    ServoBit.moveServo(num, num2, num3)
}
input.onButtonPressed(Button.AB, function () {
    ServoBit.moveServo(0, 90, 60)
    ServoBit.moveServo(1, 90, 60)
    ServoBit.moveServo(2, -90, 60)
    ServoBit.moveServo(3, 90, 60)
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
}
function ServoToZero (num: number) {
    ServoBit.moveServo(0, 0, 80)
    ServoBit.waitServo(0)
}
function read_keyboard (num: number) {
	
}
let servo_current_pos = 0
let speed_1 = 0
let speed_2 = 0
let clawclosed = 0
let armdown = 0
let armin = 0
let arm_out = 0
let clawservonum = 0
let inoutservonum = 0
let updownservonum = 0
updownservonum = 1
inoutservonum = 2
clawservonum = 3
ServoBit.centreServos()
arm_out = 85
armin = -35
armdown = -70
let armup = 70
clawclosed = -80
let clawopen = 80
let speed_3 = 300
speed_2 += 200
speed_1 = 100
// reads keyboard
// 
basic.forever(function () {
    basic.clearScreen()
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P0, 1)
    // P1 row with the 4 on it 
    // P1
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        basic.showNumber(5)
        arminandup()
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        basic.showNumber(2)
        armdownandout()
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        basic.showNumber(8)
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P0, 0)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 1)
    // P1 row with the 4 on it 
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        basic.showNumber(6)
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        basic.showNumber(3)
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        basic.showNumber(9)
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P8, 0)
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P16, 1)
    // P1 row with the 4 on it 
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        basic.showNumber(4)
    } else if (pins.digitalReadPin(DigitalPin.P2) == 1) {
        basic.showNumber(1)
    } else if (pins.digitalReadPin(DigitalPin.P12) == 1) {
        basic.showNumber(7)
    }
    // P0 col with zero at bottom
    pins.digitalWritePin(DigitalPin.P16, 0)
    basic.clearScreen()
    while (input.buttonIsPressed(Button.B)) {
        MoveServo(inoutservonum, ServoBit.getServoActual(inoutservonum) + 5, speed_1)
        basic.pause(50)
    }
    while (input.buttonIsPressed(Button.A)) {
        MoveServo(inoutservonum, ServoBit.getServoActual(inoutservonum) - 5, speed_1)
        basic.pause(50)
    }
})
