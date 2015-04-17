var collection = new RockCollection();
var controlCollection = new RockCollection();
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
   // ,boardWidth = rockZoneMargin + controlRockZoneWidth + rockZoneMargin + userRockZoneWidth + benchWidth
   ,boardWidth = benchWidth + userRockZoneWidth + rockZoneMargin + controlRockZoneWidth + rockZoneMargin

   // board stats
   ,boardColor = 'white'

   // rock zone stats
   ,userRockZoneX = benchWidth
   ,userRockZoneY = rockZoneMargin

   ,controlRockZoneX = benchWidth + userRockZoneWidth + rockZoneMargin
   ,controlRockZoneY = rockZoneMargin

   ,rockZoneColor = 'linen'

   ,correctColor = 'rgb(0,255,0)'
   ,incorrectColor = 'rgb(255,0,0)'

   // button stats
   ,buttonHeight = boardHeight/10*3/4
   ,buttonWidth = boardWidth*6/10*1/4

   ,activatedButtonColor = 'rgb(150,150,200)'
   ,buttonColor = 'rgb(150,150,150)'
   ,buttonPushedColor = 'rgb(25,25,50)'

   ,refreshButtonCX = boardWidth*1/3
   ,refreshButtonCY = controlRockZoneY+largestRockZoneHeight+(boardHeight-controlRockZoneY-largestRockZoneHeight)/2

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