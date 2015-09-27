var benchRockData = [{type: 'small', x: 55, y: 200, color: 2}
                  ,{type: 'small', x: 95, y: 200, color: 1}
                  ,{type: 'small', x: 135, y: 200}
                  ,{type: 'medium', x: 50, y: 260, color: 1}
                  ,{type: 'medium', x: 125, y: 260, color: 2}
                  ,{type: 'large', x: 25, y: 350}
                  ,{type: 'large', x: 125, y: 350, color: 1}]

   ,rockSetupData = [{type: 'medium', color: 2, x: 150, y: 150, border: true}
    	              ,{type: 'medium', color: 1, x: 150, y: 227}
    	              ,{type: 'medium', color: 2, x: 150, y: 303, border: true}]

   ,trainStimuli = [{phase: 'train'
                    ,stimulusNum: 1
                    ,category: 'sandwich'
                    ,rocks: [{type: 'large', color: 0, border: true, x: 250, y: 150}
                            ,{type: 'small', color: 0, x: 280, y: 260}
                            ,{type: 'large', color: 0, border: true, x: 250, y: 310}
                            ,{type: 'medium', color: 1, x: 20, y: 300}]}

                   ,{phase: 'train'
                    ,stimulusNum: 2
                    ,category: 'sandwich'
                    ,rocks: [{type: 'medium', color: 2, border: true, x: 100, y: 200}
                            ,{type: 'medium', color: 1, x: 190, y: 210}
                            ,{type: 'small', color: 2, x: 280, y: 220}
                            ,{type: 'medium', color: 2, border: true, x: 340, y: 220}
                            ,{type: 'medium', color: 2, x: 410, y: 295}]}

                   ,{phase: 'train'
                    ,stimulusNum: 3
                    ,category: 'sandwich'
                    ,rocks: [{type: 'small', color: 0, border: true, x: 150, y: 50}
                            ,{type: 'small', color: 1, x: 140, y: 200}
                            ,{type: 'large', color: 0, x: 110, y: 244}
                            ,{type: 'small', color: 0, border: true, x: 150, y: 350}
                            ,{type: 'small', color: 1, x: 330, y: 100}]}]

   ,stuff = {
      phase: 'train-interactive'

    , category: 'sandwich'

    , benchRocks: [{type: 'small', x: 55, y: 200, color: 2}
                  ,{type: 'small', x: 95, y: 200, color: 1}
                  ,{type: 'small', x: 135, y: 200}
                  ,{type: 'medium', x: 50, y: 260, color: 1}
                  ,{type: 'medium', x: 125, y: 260, color: 2}
                  ,{type: 'large', x: 25, y: 350}
                  ,{type: 'large', x: 125, y: 350, color: 1}]

    , stimuli: [{phase: 'train'
                ,stimulusNum: 1
                ,category: 'sandwich'
                ,rocks: [{type: 'large', color: 0, border: true, x: 250, y: 150}
                        ,{type: 'small', color: 0, x: 280, y: 260}
                        ,{type: 'large', color: 0, border: true, x: 250, y: 310}
                        ,{type: 'medium', color: 1, x: 20, y: 300}]}

               ,{phase: 'train'
                ,stimulusNum: 2
                ,category: 'sandwich'
                ,rocks: [{type: 'medium', color: 2, border: true, x: 100, y: 200}
                        ,{type: 'medium', color: 1, x: 190, y: 210}
                        ,{type: 'small', color: 2, x: 280, y: 220}
                        ,{type: 'medium', color: 2, border: true, x: 340, y: 220}
                        ,{type: 'medium', color: 2, x: 410, y: 295}]}

               ,{phase: 'train'
                ,stimulusNum: 3
                ,category: 'sandwich'
                ,rocks: [{type: 'small', color: 0, border: true, x: 150, y: 50}
                        ,{type: 'small', color: 1, x: 140, y: 200}
                        ,{type: 'large', color: 0, x: 110, y: 244}
                        ,{type: 'small', color: 0, border: true, x: 150, y: 350}
                        ,{type: 'small', color: 1, x: 330, y: 100}]}]
    }

   // ,stimuli = {category: "sandwich"
   //            ,data: [[{type: 'large', color: 0, border: true, x: 250, y: 150}
   //                    ,{type: 'small', color: 0, x: 280, y: 260}
   //                    ,{type: 'large', color: 0, border: true, x: 250, y: 310}
   //                    ,{type: 'medium', color: 1, x: 20, y: 300}
   //                    ,{type: 'small', color: 0, x: 350, y: 265}
   //                    ,{type: 'large', color: 2, border: true, x: 400, y: 400}]

   //                   ,[{type: 'medium', color: 2, border: true, x: 100, y: 200}
   //                    ,{type: 'medium', color: 1, x: 190, y: 210}
   //                    ,{type: 'small', color: 2, x: 280, y: 220}
   //                    ,{type: 'medium', color: 2, border: true, x: 340, y: 220}
   //                    ,{type: 'medium', color: 2, x: 10, y: 198}
   //                    ,{type: 'medium', color: 2, border: true, x: 410, y: 295}
   //                    ,{type: 'small', color: 1, x: 20, y: 10}]

   //                   ,[{type: 'small', color: 0, border: true, x: 150, y: 50}
   //                    ,{type: 'medium', color: 0, x: 120, y: 120}
   //                    ,{type: 'small', color: 1, x: 140, y: 200}
   //                    ,{type: 'large', color: 0, x: 110, y: 244}
   //                    ,{type: 'small', color: 0, border: true, x: 150, y: 350}
   //                    ,{type: 'small', color: 0, border: true, x: 300, y: 55}
   //                    ,{type: 'medium', color: 1, x: 280, y: 125}
   //                    ,{type: 'small', color: 1, x: 290, y: 210}
   //                    ,{type: 'large', color: 0, x: 270, y: 260}
   //                    ,{type: 'small', color: 0, border: true, x: 300, y: 355}]]}

  // ,x1 = testRockZoneX
  // ,y1 = testRockZoneY
  ,testStimuli = [{phase: 'test'
                  ,stimulusNum: 1
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 2, border: true, x: 100, y: 100}
                          ,{type: 'medium', color: 2, x: 170, y: 85}
                          ,{type: 'small', color: 2, border: true, x: 250, y: 100}]
                  ,answer: 'yes'}

                 ,{phase: 'test'
                  ,stimulusNum: 2
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 2, border: true, x: 200, y: 120}
                          ,{type: 'small', color: 2, x: 200, y: 190}
                          ,{type: 'small', color: 2, border: true, x: 200, y: 250}]
                  ,answer: 'yes'}

                 ,{phase: 'test'
                  ,stimulusNum: 3
                  ,category: 'sandwich'
                  ,rocks: [{type: 'medium', color: 2, border: true, x: 250, y: 120}
                          ,{type: 'medium', color: 2, x: 250, y: 200}
                          ,{type: 'medium', color: 2, border: true, x: 250, y: 280}]
                  ,answer: 'yes'}

                 ,{phase: 'test'
                  ,stimulusNum: 4
                  ,category: 'sandwich'
                  ,rocks: [{type: 'medium', color: 2, border: true, x: 250, y: 120}
                          ,{type: 'medium', color: 0, x: 250, y: 200}
                          ,{type: 'medium', color: 2, border: true, x: 250, y: 280}]
                  ,answer: 'yes'}

                 ,{phase: 'test'
                  ,stimulusNum: 5
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 2, border: true, x: 180, y: 250}
                          ,{type: 'small', color: 1, x: 220, y: 250}
                          ,{type: 'large', color: 2, x: 260, y: 220}
                          ,{type: 'small', color: 2, border: true, x: 360, y: 250}]
                  ,answer: 'yes'}

                 ,{phase: 'test'
                  ,stimulusNum: 6
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 2, border: true, x: 240, y: 200}
                          ,{type: 'small', color: 0, x: 240, y: 250}
                          ,{type: 'small', color: 1, x: 240, y: 290}
                          ,{type: 'small', color: 2, border: true, x: 240, y: 340}]
                  ,answer: 'yes'}

                 ,{phase: 'test'
                  ,stimulusNum: 7
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 2, border: true, x: 300, y: 250}
                          ,{type: 'small', color: 1, x: 300, y: 290}
                          ,{type: 'medium', color: 2, x: 285, y: 325}
                          ,{type: 'small', color: 2, border: true, x: 300, y: 400}]
                  ,answer: 'yes'}

                 ,{phase: 'test'
                  ,stimulusNum: 8
                  ,category: 'sandwich'
                  ,rocks: [{type: 'large', color: 2, border: true, x: 200, y: 275}
                          ,{type: 'large', color: 2, x: 300, y: 275}
                          ,{type: 'large', color: 2, border: true, x: 400, y: 275}]
                  ,answer: 'yes'}

                 ,{phase: 'test'
                  ,stimulusNum: 9
                  ,category: 'sandwich'
                  ,rocks: [{type: 'large', color: 0, border: true, x: 300, y: 110}
                          ,{type: 'medium', color: 0, x: 315, y: 210}
                          ,{type: 'large', color: 0, border: true, x: 300, y: 290}]
                  ,answer: 'yes'}

                 ,{phase: 'test'
                  ,stimulusNum: 10
                  ,category: 'sandwich'
                  ,rocks: [{type: 'large', color: 2, border: true, x: 250, y: 150}
                          ,{type: 'large', color: 0, x: 250, y: 250}
                          ,{type: 'large', color: 2, border: true, x: 250, y: 350}]
                  ,answer: 'yes'}

                 ,{phase: 'test'
                  ,stimulusNum: 11
                  ,category: 'sandwich'
                  ,rocks: [{type: 'large', color: 1, border: true, x: 210, y: 180}
                          ,{type: 'medium', color: 2, x: 225, y: 290}
                          ,{type: 'large', color: 1, border: true, x: 210, y: 365}]
                  ,answer: 'no'}

                 ,{phase: 'test'
                  ,stimulusNum: 12
                  ,category: 'sandwich'
                  ,rocks: [{type: 'large', color: 1, border: true, x: 250, y: 180}
                          ,{type: 'large', color: 2, x: 345, y: 180}
                          ,{type: 'large', color: 2, border: true, x: 440, y: 180}]
                  ,answer: 'no'}

                 ,{phase: 'test'
                  ,stimulusNum: 13
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 1, border: true, x: 300, y: 200}
                          ,{type: 'large', color: 1, x: 270, y: 245}
                          ,{type: 'medium', color: 1, border: true, x: 285, y: 340}]
                  ,answer: 'no'}

                 ,{phase: 'test'
                  ,stimulusNum: 14
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 0, border: true, x: 300, y: 100}
                          ,{type: 'medium', color: 1, x: 285, y: 140}
                          ,{type: 'small', color: 1, x: 300, y: 210}
                          ,{type: 'small', color: 0, border: true, x: 300, y: 250}]
                  ,answer: 'no'}

                 ,{phase: 'test'
                  ,stimulusNum: 15
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 0, border: true, x: 200, y: 200}
                          ,{type: 'small', color: 2, x: 200, y: 250}
                          ,{type: 'small', color: 2, x: 200, y: 290}
                          ,{type: 'small', color: 1, border: true, x: 200, y: 340}]
                  ,answer: 'no'}

                 ,{phase: 'test'
                  ,stimulusNum: 16
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 2, border: true, x: 205, y: 180}
                          ,{type: 'medium', color: 2, x: 190, y: 215}
                          ,{type: 'medium', color: 0, x: 190, y: 280}
                          ,{type: 'small', color: 2, border: true, x: 205, y: 345}]
                  ,answer: 'no'}

                 ,{phase: 'test'
                  ,stimulusNum: 17
                  ,category: 'sandwich'
                  ,rocks: [{type: 'medium', color: 2, border: true, x: 210, y: 270}
                          ,{type: 'small', color: 2, x: 225, y: 350}
                          ,{type: 'medium', color: 0, border: true, x: 210, y: 400}]
                  ,answer: 'no'}

                 ,{phase: 'test'
                  ,stimulusNum: 18
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 2, border: true, x: 100, y: 275}
                          ,{type: 'medium', color: 1, x: 155, y: 260}
                          ,{type: 'small', color: 2, border: true, x: 230, y: 275}]
                  ,answer: 'no'}

                 ,{phase: 'test'
                  ,stimulusNum: 19
                  ,category: 'sandwich'
                  ,rocks: [{type: 'small', color: 2, border: true, x: 240, y: 200}
                          ,{type: 'medium', color: 2, x: 225, y: 240}
                          ,{type: 'medium', color: 2, border: true, x: 225, y: 310}]
                  ,answer: 'no'}

                 ,{phase: 'test'
                  ,stimulusNum: 20
                  ,category: 'sandwich'
                  ,rocks: [{type: 'medium', color: 2, x: 250, y: 200}
                          ,{type: 'medium', color: 2, border: true, x: 250, y: 275}
                          ,{type: 'medium', color: 2, x: 250, y: 340}]
                  ,answer: 'no'}];

// rockSetupData.forEach(function(d) {d.x += userRockZoneX; d.y += userRockZoneY});
// trainStimuli.forEach(function(d) {d.rocks.forEach(function(r) {r.x += controlRockZoneX; r.y += controlRockZoneY})});
// testStimuli.forEach(function(d) {d.rocks.forEach(function(r) {r.x += x1; r.y += y1})});