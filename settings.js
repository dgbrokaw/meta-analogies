var boardHeight = 500
   ,boardWidth = 1000
   ,boardColor = 'white'

   ,buttonZoneHeight = boardHeight/10
   ,buttonZoneWidth = boardWidth*6/10
   ,buttonZoneX = boardWidth*3/40
   ,buttonZoneY = 25

   ,buttonHeight = buttonZoneHeight*3/4
   ,buttonWidth = buttonZoneWidth*1/4

   ,buttonColor = 'rgb(150,150,150)'
   ,buttonPushedColor = 'rgb(100,100,100)'

   ,colorButtonX = buttonZoneWidth*1/16
   ,colorButtonY = (buttonZoneHeight-buttonHeight)/2

   ,shapeButtonX = colorButtonX + buttonWidth + buttonZoneWidth*1/16
   ,shapeButtonY = colorButtonY

   ,positionButtonX = shapeButtonX + buttonWidth + buttonZoneWidth*1/16
   ,positionButtonY = colorButtonY

   ,currentControlMode = 'color'

   ,refreshButtonX = boardWidth*1/3
   ,refreshButtonY = boardHeight-buttonHeight

   ,nextButtonX = boardWidth*1/2
   ,nextButtonY = boardHeight-buttonHeight

   ,rockZoneColor = 'linen'

   ,rockZoneHeight = 350
   ,rockZoneWidth = rockZoneHeight

   ,controlRockZoneX = 25
   ,controlRockZoneY = buttonZoneY + buttonZoneHeight + 25

   ,userRockZoneX = controlRockZoneX + rockZoneWidth + controlRockZoneX
   ,userRockZoneY = controlRockZoneY

	,correctColor = 'rgb(0,255,0)'
   ,incorrectColor = 'rgb(255,0,0)'

   ,rockColors = ['rgb(125,100,100)'
                 ,'rgb(175,150,150)'
                 ,'rgb(225,200,210)']

   ,rockHeight = 50

   ,smallRockHeight = rockHeight
   ,smallRockWidth = smallRockHeight

   ,mediumRockHeight = rockHeight
   ,mediumRockWidth = 75

   ,largeRockHeight = rockHeight
   ,largeRockWidth = 125

   ,resizeCircleRadius = 10

   ,rockDrag
   ,resizeToolDrag