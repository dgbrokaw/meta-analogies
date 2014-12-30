var collection = new RockCollection();
var game = new Game();

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

   ,activatedButtonColor = 'rgb(150,150,200)'
   ,buttonColor = 'rgb(150,150,150)'
   ,buttonPushedColor = 'rgb(25,25,50)'

   ,refreshButtonCX = controlRockZoneX+rockZoneWidth/2
   ,refreshButtonCY = controlRockZoneY+rockZoneHeight+(boardHeight-controlRockZoneY-rockZoneHeight)/2

   ,nextButtonCX = userRockZoneX+rockZoneWidth/2//boardWidth*1/2
   ,nextButtonCY = controlRockZoneY+rockZoneHeight+(boardHeight-controlRockZoneY-rockZoneHeight)/2

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