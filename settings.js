var boardHeight = 500
   ,boardWidth = 1000
   ,boardColor = 'white'

   ,buttonZoneHeight = boardHeight/10
   ,buttonZoneWidth = boardWidth*9/10
   ,buttonZoneX = (boardWidth-buttonZoneWidth)/2
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

   ,smallRockHeight = 25
   ,smallRockWidth = smallRockHeight

   ,mediumRockHeight = 50
   ,mediumRockWidth = 75

   ,largeRockHeight = 100
   ,largeRockWidth = 125

   ,rockSetupData = [{type: 'small', x: 478, y: 188}
    	              ,{type: 'medium', x: 600, y: 227}
    	              ,{type: 'large', x: 465, y: 303}]

   ,exampleRockSetupData = [{type: 'small',x: 508-350,y: 276}
                           ,{type: 'medium',x: 600-350,y: 275}
                           ,{type: 'large',x: 514-350,y: 174}]

   ,rockDrag