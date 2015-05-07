var benchRockData = [{type: 'small', x: 50, y: 100, color: 2}
                    ,{type: 'medium', x: 125, y: 100, color: 1}
                    ,{type: 'large', x: 50, y: 180, border: true}
                    ,{type: 'medium', x: 50, y: 275}
                    ,{type: 'small', x: 150, y: 255, color: 1}
                    ,{type: 'large', x: 50, y: 370, color: 1}
                    ,{type: 'small', x: 50, y: 475, color: 2}
                    ,{type: 'medium', x: 100, y: 475}]

   ,rockSetupData = [{type: 'small', color: 2, x: 78, y: 188, border: true}
    	              ,{type: 'medium', color: 1, x: 200, y: 227}
    	              ,{type: 'large', color: 0, x: 65, y: 303, border: true}]

   ,stimuli = {category: "support"
              ,data: [[{type: 'small', x: 58, y: 276, border: true}
                      ,{type: 'medium', x: 150, y: 275, border: true}
                      ,{type: 'large', x: 58, y: 225}]
                     ,[{type: 'medium', x: 419-350 , y: 227}
                      ,{type: 'large', x: 358-350, y: 277}
                      ,{type: 'large', x: 429-350, y: 277}]]}

  ,x1 = testRockZoneX
  ,y1 = testRockZoneY
  ,testRockSetupData = [{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 2, border: true, x: 100, y: 100}
                                ,{type: 'medium', color: 2, x: 170, y: 85}
                                ,{type: 'small', color: 2, border: true, x: 250, y: 100}]
                        ,answer: 'yes'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 2, border: true, x: 200, y: 120}
                                ,{type: 'small', color: 2, x: 200, y: 190}
                                ,{type: 'small', color: 2, border: true, x: 200, y: 250}]
                        ,answer: 'yes'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'medium', color: 2, border: true, x: 250, y: 120}
                                ,{type: 'medium', color: 2, x: 250, y: 200}
                                ,{type: 'medium', color: 2, border: true, x: 250, y: 280}]
                        ,answer: 'yes'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'medium', color: 2, border: true, x: 250, y: 120}
                                ,{type: 'medium', color: 0, x: 250, y: 200}
                                ,{type: 'medium', color: 2, border: true, x: 250, y: 280}]
                        ,answer: 'yes'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 2, border: true, x: 180, y: 250}
                                ,{type: 'small', color: 1, x: 220, y: 250}
                                ,{type: 'large', color: 2, x: 260, y: 220}
                                ,{type: 'small', color: 2, border: true, x: 360, y: 250}]
                        ,answer: 'yes'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 2, border: true, x: 240, y: 200}
                                ,{type: 'small', color: 0, x: 240, y: 250}
                                ,{type: 'small', color: 1, x: 240, y: 290}
                                ,{type: 'small', color: 2, border: true, x: 240, y: 340}]
                        ,answer: 'yes'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 2, border: true, x: 300, y: 250}
                                ,{type: 'small', color: 1, x: 300, y: 290}
                                ,{type: 'medium', color: 2, x: 285, y: 325}
                                ,{type: 'small', color: 2, border: true, x: 300, y: 400}]
                        ,answer: 'yes'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'large', color: 2, border: true, x: 200, y: 275}
                                ,{type: 'large', color: 2, x: 300, y: 275}
                                ,{type: 'large', color: 2, border: true, x: 400, y: 275}]
                        ,answer: 'yes'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'large', color: 0, border: true, x: 300, y: 110}
                                ,{type: 'medium', color: 0, x: 315, y: 210}
                                ,{type: 'large', color: 0, border: true, x: 300, y: 290}]
                        ,answer: 'yes'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'large', color: 2, border: true, x: 250, y: 150}
                                ,{type: 'large', color: 0, x: 250, y: 250}
                                ,{type: 'large', color: 2, border: true, x: 250, y: 350}]
                        ,answer: 'yes'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'large', color: 1, border: true, x: 210, y: 180}
                                ,{type: 'medium', color: 2, x: 225, y: 290}
                                ,{type: 'large', color: 1, border: true, x: 210, y: 365}]
                        ,answer: 'no'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'large', color: 1, border: true, x: 250, y: 180}
                                ,{type: 'large', color: 2, x: 345, y: 180}
                                ,{type: 'large', color: 2, border: true, x: 440, y: 180}]
                        ,answer: 'no'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 1, border: true, x: 300, y: 200}
                                ,{type: 'large', color: 1, x: 270, y: 245}
                                ,{type: 'medium', color: 1, border: true, x: 285, y: 340}]
                        ,answer: 'no'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 0, border: true, x: 300, y: 100}
                                ,{type: 'medium', color: 1, x: 285, y: 140}
                                ,{type: 'small', color: 1, x: 300, y: 210}
                                ,{type: 'small', color: 0, border: true, x: 300, y: 250}]
                        ,answer: 'no'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 0, border: true, x: 200, y: 200}
                                ,{type: 'small', color: 2, x: 200, y: 250}
                                ,{type: 'small', color: 2, x: 200, y: 290}
                                ,{type: 'small', color: 1, border: true, x: 200, y: 340}]
                        ,answer: 'no'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 2, border: true, x: 205, y: 180}
                                ,{type: 'medium', color: 2, x: 190, y: 215}
                                ,{type: 'medium', color: 0, x: 190, y: 280}
                                ,{type: 'small', color: 2, border: true, x: 205, y: 345}]
                        ,answer: 'no'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'medium', color: 2, border: true, x: 210, y: 270}
                                ,{type: 'small', color: 2, x: 225, y: 350}
                                ,{type: 'medium', color: 0, border: true, x: 210, y: 400}]
                        ,answer: 'no'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 2, border: true, x: 100, y: 275}
                                ,{type: 'medium', color: 1, x: 155, y: 260}
                                ,{type: 'small', color: 2, border: true, x: 230, y: 275}]
                        ,answer: 'no'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'small', color: 2, border: true, x: 240, y: 200}
                                ,{type: 'medium', color: 2, x: 225, y: 240}
                                ,{type: 'medium', color: 2, border: true, x: 225, y: 310}]
                        ,answer: 'no'}

                       ,{category: 'sandwich'
                        ,rocks: [{type: 'medium', color: 2, x: 250, y: 200}
                                ,{type: 'medium', color: 2, border: true, x: 250, y: 275}
                                ,{type: 'medium', color: 2, x: 250, y: 340}]
                        ,answer: 'no'}];

rockSetupData.forEach(function(d) {d.x += userRockZoneX});
stimuli.data.forEach(function(d) {d.forEach(function(r) {r.x += controlRockZoneX})});
testRockSetupData.forEach(function(d) {d.rocks.forEach(function(r) {r.x += x1; r.y += y1})});