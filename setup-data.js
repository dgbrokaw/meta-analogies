var benchRockData = [{type: 'small', x: 800, y: 100}
                    ,{type: 'medium', x: 880, y: 100}
                    ,{type: 'large', x: 815, y: 180}
                    ,{type: 'medium', x: 800, y: 255}
                    ,{type: 'small', x: 900, y: 255}
                    ,{type: 'large', x: 815, y: 330}
                    ,{type: 'small', x: 800, y: 400}
                    ,{type: 'medium', x: 880, y: 400}]

   ,rockSetupData = [{type: 'small', color: 2, x: 478, y: 188}
    	              ,{type: 'medium', color: 1, x: 600, y: 227}
    	              ,{type: 'large', color: 0, x: 465, y: 303}]

   ,stimuli = {category: "support"
              ,data: [[{type: 'small', x: 158, y: 276}
                      ,{type: 'medium', x: 250, y: 275}
                      ,{type: 'large', x: 158, y: 225}]
                     ,[{type: 'medium', x: 519-350 , y: 227}
                      ,{type: 'large', x: 458-350, y: 277}
                      ,{type: 'large', x: 529-350, y: 277}]]}

  ,x1 = testRockZoneX
  ,y1 = testRockZoneY
  ,testRockSetupData = [{category: "dunno"
                        ,rocks: [{type: 'small', color: 2, x: x1+50, y: y1+100}
                                ,{type: 'medium', color: 1, x: x1+50, y: y1+150}
                                ,{type: 'small', color: 2, x: x1+50, y: y1+220}]
                        ,answer: "no"
                        ,response: null}
                       ,{category: "dunno"
                        ,rocks: [{type: 'small', color: 2, x: x1+50, y: y1+100}
                                ,{type: 'medium', color: 2, x: x1+50, y: y1+150}
                                ,{type: 'small', color: 2, x: x1+50, y: y1+220}]
                        ,answer: "yes"
                        ,response: null}];

var currentExample = 0;
var currentTest = 0;