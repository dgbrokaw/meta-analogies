var benchRockData = [{type: 'small', x: 50, y: 100}
                    ,{type: 'medium', x: 50, y: 100}
                    ,{type: 'large', x: 50, y: 180}
                    ,{type: 'medium', x: 50, y: 255}
                    ,{type: 'small', x: 50, y: 255}
                    ,{type: 'large', x: 50, y: 330}
                    ,{type: 'small', x: 50, y: 400}
                    ,{type: 'medium', x: 50, y: 400}]

   ,rockSetupData = [{type: 'small', color: 2, x: 78, y: 188, border: 'seagreen'}
    	              ,{type: 'medium', color: 1, x: 200, y: 227}
    	              ,{type: 'large', color: 0, x: 65, y: 303, border: 'seagreen'}]

   ,stimuli = {category: "support"
              ,data: [[{type: 'small', x: 58, y: 276, border: 'seagreen'}
                      ,{type: 'medium', x: 150, y: 275, border: 'seagreen'}
                      ,{type: 'large', x: 58, y: 225}]
                     ,[{type: 'medium', x: 419-350 , y: 227}
                      ,{type: 'large', x: 358-350, y: 277}
                      ,{type: 'large', x: 429-350, y: 277}]]}

  ,x1 = testRockZoneX
  ,y1 = testRockZoneY
  ,testRockSetupData = [{category: "sandwich"
                        ,rocks: [{type: 'small', color: 2, x: 50, y: 100, border: 'seagreen'}
                                ,{type: 'medium', color: 1, x: 50, y: 150}
                                ,{type: 'small', color: 2, x: 50, y: 220, border: 'seagreen'}]
                        ,answer: "no"}
                       ,{category: "sandwich"
                        ,rocks: [{type: 'small', color: 2, x: 50, y: 100}
                                ,{type: 'medium', color: 2, x: 50, y: 150}
                                ,{type: 'small', color: 2, x: 50, y: 220}]
                        ,answer: "yes"}];

rockSetupData.forEach(function(d) {d.x += userRockZoneX});
stimuli.data.forEach(function(d) {d.forEach(function(r) {r.x += controlRockZoneX})});
testRockSetupData.forEach(function(d) {d.rocks.forEach(function(r) {r.x += x1; r.y += y1})});