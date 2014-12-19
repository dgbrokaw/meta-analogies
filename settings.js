var scale = 1

   // board stats
   ,boardHeight = 750*scale
   ,boardWidth = 1500*scale
   ,boardColor = 'white'

   // rock zone stats
   ,controlRockZoneX = boardHeight/15 // = 50
   ,controlRockZoneY = controlRockZoneX

   ,rockZoneHeight = boardHeight - controlRockZoneX*4
   ,rockZoneWidth = rockZoneHeight

   ,userRockZoneX = controlRockZoneX + rockZoneWidth + controlRockZoneX
   ,userRockZoneY = controlRockZoneY

   ,rockZoneColor = 'linen'

   ,correctColor = 'rgb(0,255,0)'
   ,incorrectColor = 'rgb(255,0,0)'

   // button stats
   ,buttonHeight = boardHeight/10*3/4//= buttonZoneHeight*3/4
   ,buttonWidth = boardWidth*6/10*1/4//= buttonZoneWidth*1/4

   ,buttonColor = 'rgb(150,150,150)'
   ,buttonPushedColor = 'rgb(100,100,100)'

   ,refreshButtonX = boardWidth*1/3
   ,refreshButtonY = boardHeight-buttonHeight

   ,nextButtonX = boardWidth*1/2
   ,nextButtonY = boardHeight-buttonHeight

   // rock stats
   ,rockColors = ['rgb(60,25,25)'
                 ,'rgb(150,155,150)'
                 ,'rgb(225,225,255)']

   ,smallRockHeight = 30
   ,smallRockWidth = smallRockHeight

   ,mediumRockHeight = smallRockHeight*2
   ,mediumRockWidth = mediumRockHeight

   ,largeRockHeight = smallRockHeight*3
   ,largeRockWidth = largeRockHeight

   ,resizeCircleRadius = 5

   ,rockDrag
   ,resizeToolDrag

   // ,buttonZoneHeight = boardHeight/10
   // ,buttonZoneWidth = boardWidth*6/10
   // ,buttonZoneX = boardWidth*3/40
   // ,buttonZoneY = 25

   // ,colorButtonX = buttonZoneWidth*1/16
   // ,colorButtonY = (buttonZoneHeight-buttonHeight)/2

   // ,shapeButtonX = colorButtonX + buttonWidth + buttonZoneWidth*1/16
   // ,shapeButtonY = colorButtonY

   // ,positionButtonX = shapeButtonX + buttonWidth + buttonZoneWidth*1/16
   // ,positionButtonY = colorButtonY

   // ,currentControlMode = 'color'