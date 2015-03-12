var collection = new RockCollection();
var game = new Game();

var scale = 1

   ,controlRockZoneHeight = 550
   ,controlRockZoneWidth = 550
   ,userRockZoneHeight = 550
   ,userRockZoneWidth = 550
   ,benchWidth = 300

   ,largestRockZoneHeight = (controlRockZoneHeight > userRockZoneHeight ? controlRockZoneHeight : userRockZoneHeight)

   ,rockZoneMargin = 50

   ,boardHeight = largestRockZoneHeight + rockZoneMargin*4
   ,boardWidth = rockZoneMargin + controlRockZoneWidth + rockZoneMargin + userRockZoneWidth + benchWidth

   // board stats
   // ,boardHeight = 750*scale
   // ,boardWidth = 1500*scale
   ,boardColor = 'white'

   // rock zone stats
   // ,controlRockZoneX = boardHeight/15 // = 50
   ,controlRockZoneX = rockZoneMargin
   ,controlRockZoneY = controlRockZoneX

   // ,rockZoneHeight = boardHeight - controlRockZoneX*4
   // ,rockZoneWidth = rockZoneHeight

   // ,userRockZoneX = controlRockZoneX + rockZoneWidth + controlRockZoneX
   ,userRockZoneX = controlRockZoneX + controlRockZoneWidth + rockZoneMargin
   ,userRockZoneY = controlRockZoneY

   ,rockZoneColor = 'linen'

   ,correctColor = 'rgb(0,255,0)'
   ,incorrectColor = 'rgb(255,0,0)'

   // button stats
   ,buttonHeight = boardHeight/10*3/4//= buttonZoneHeight*3/4
   ,buttonWidth = boardWidth*6/10*1/4//= buttonZoneWidth*1/4

   ,activatedButtonColor = 'rgb(150,150,200)'
   ,buttonColor = 'rgb(150,150,150)'
   ,buttonPushedColor = 'rgb(25,25,50)'

   // ,refreshButtonCX = controlRockZoneX+controlRockZoneWidth/2
   ,refreshButtonCX = boardWidth*1/3
   ,refreshButtonCY = controlRockZoneY+largestRockZoneHeight+(boardHeight-controlRockZoneY-largestRockZoneHeight)/2

   // ,nextButtonCX = userRockZoneX+userRockZoneWidth/2//boardWidth*1/2
   ,nextButtonCX = boardWidth*2/3
   ,nextButtonCY = controlRockZoneY+largestRockZoneHeight+(boardHeight-controlRockZoneY-largestRockZoneHeight)/2

   // rock stats
   ,rockColors = ['rgb(25,5,5)'
                 ,'rgb(140,150,140)'
                 ,'rgb(240,240,255)']

   ,smallRockHeight = 30
   ,smallRockWidth = smallRockHeight

   ,mediumRockHeight = smallRockHeight*2
   ,mediumRockWidth = mediumRockHeight

   ,largeRockHeight = smallRockHeight*3
   ,largeRockWidth = largeRockHeight

   ,resizeCircleRadius = 5

   ,rockDrag
   ,resizeToolDrag