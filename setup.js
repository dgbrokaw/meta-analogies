var benchRockData = [{size: 'small', x: 55, y: 200, color: 2}
                  ,{size: 'small', x: 95, y: 200, color: 1}
                  ,{size: 'small', x: 135, y: 200}
                  ,{size: 'medium', x: 50, y: 260, color: 1}
                  ,{size: 'medium', x: 125, y: 260, color: 2}
                  ,{size: 'large', x: 25, y: 350}
                  ,{size: 'large', x: 125, y: 350, color: 1}]

   ,interactiveStimuli = {
      phase: 'train-interactive'

    , category: 'sandwich'

    , benchRocks: [{size: 'small', x: 55, y: 200, color: 2}
                  ,{size: 'small', x: 95, y: 200, color: 1}
                  ,{size: 'small', x: 135, y: 200}
                  ,{size: 'medium', x: 50, y: 260, color: 1}
                  ,{size: 'medium', x: 125, y: 260, color: 2}
                  ,{size: 'large', x: 25, y: 350}
                  ,{size: 'large', x: 125, y: 350, color: 1}]

    , stimuli: [{phase: 'train'
                ,stimulusNum: 1
                ,category: 'sandwich'
                ,rocks: [{size: 'large', color: 0, border: true, x: 250, y: 150}
                        ,{size: 'small', color: 0, x: 280, y: 260}
                        ,{size: 'large', color: 0, border: true, x: 250, y: 310}
                        ,{size: 'medium', color: 1, x: 20, y: 300}]}

               ,{phase: 'train'
                ,stimulusNum: 2
                ,category: 'sandwich'
                ,rocks: [{size: 'medium', color: 2, border: true, x: 100, y: 200}
                        ,{size: 'medium', color: 1, x: 190, y: 210}
                        ,{size: 'small', color: 2, x: 280, y: 220}
                        ,{size: 'medium', color: 2, border: true, x: 340, y: 220}
                        ,{size: 'medium', color: 2, x: 410, y: 295}]}

               ,{phase: 'train'
                ,stimulusNum: 3
                ,category: 'sandwich'
                ,rocks: [{size: 'small', color: 0, border: true, x: 150, y: 50}
                        ,{size: 'small', color: 1, x: 140, y: 200}
                        ,{size: 'large', color: 0, x: 110, y: 244}
                        ,{size: 'small', color: 0, border: true, x: 150, y: 350}
                        ,{size: 'small', color: 1, x: 330, y: 100}]}]
    }

   // ,rockSetupData = [{size: 'medium', color: 2, x: 150, y: 150, border: true}
   //                 ,{size: 'medium', color: 1, x: 150, y: 227}
   //                 ,{size: 'medium', color: 2, x: 150, y: 303, border: true}]

   // ,trainStimuli = [{phase: 'train'
   //                  ,stimulusNum: 1
   //                  ,category: 'sandwich'
   //                  ,rocks: [{size: 'large', color: 0, border: true, x: 250, y: 150}
   //                          ,{size: 'small', color: 0, x: 280, y: 260}
   //                          ,{size: 'large', color: 0, border: true, x: 250, y: 310}
   //                          ,{size: 'medium', color: 1, x: 20, y: 300}]}

   //                 ,{phase: 'train'
   //                  ,stimulusNum: 2
   //                  ,category: 'sandwich'
   //                  ,rocks: [{size: 'medium', color: 2, border: true, x: 100, y: 200}
   //                          ,{size: 'medium', color: 1, x: 190, y: 210}
   //                          ,{size: 'small', color: 2, x: 280, y: 220}
   //                          ,{size: 'medium', color: 2, border: true, x: 340, y: 220}
   //                          ,{size: 'medium', color: 2, x: 410, y: 295}]}

   //                 ,{phase: 'train'
   //                  ,stimulusNum: 3
   //                  ,category: 'sandwich'
   //                  ,rocks: [{size: 'small', color: 0, border: true, x: 150, y: 50}
   //                          ,{size: 'small', color: 1, x: 140, y: 200}
   //                          ,{size: 'large', color: 0, x: 110, y: 244}
   //                          ,{size: 'small', color: 0, border: true, x: 150, y: 350}
   //                          ,{size: 'small', color: 1, x: 330, y: 100}]}]

   // ,stimuli = {category: "sandwich"
   //            ,data: [[{size: 'large', color: 0, border: true, x: 250, y: 150}
   //                    ,{size: 'small', color: 0, x: 280, y: 260}
   //                    ,{size: 'large', color: 0, border: true, x: 250, y: 310}
   //                    ,{size: 'medium', color: 1, x: 20, y: 300}
   //                    ,{size: 'small', color: 0, x: 350, y: 265}
   //                    ,{size: 'large', color: 2, border: true, x: 400, y: 400}]

   //                   ,[{size: 'medium', color: 2, border: true, x: 100, y: 200}
   //                    ,{size: 'medium', color: 1, x: 190, y: 210}
   //                    ,{size: 'small', color: 2, x: 280, y: 220}
   //                    ,{size: 'medium', color: 2, border: true, x: 340, y: 220}
   //                    ,{size: 'medium', color: 2, x: 10, y: 198}
   //                    ,{size: 'medium', color: 2, border: true, x: 410, y: 295}
   //                    ,{size: 'small', color: 1, x: 20, y: 10}]

   //                   ,[{size: 'small', color: 0, border: true, x: 150, y: 50}
   //                    ,{size: 'medium', color: 0, x: 120, y: 120}
   //                    ,{size: 'small', color: 1, x: 140, y: 200}
   //                    ,{size: 'large', color: 0, x: 110, y: 244}
   //                    ,{size: 'small', color: 0, border: true, x: 150, y: 350}
   //                    ,{size: 'small', color: 0, border: true, x: 300, y: 55}
   //                    ,{size: 'medium', color: 1, x: 280, y: 125}
   //                    ,{size: 'small', color: 1, x: 290, y: 210}
   //                    ,{size: 'large', color: 0, x: 270, y: 260}
   //                    ,{size: 'small', color: 0, border: true, x: 300, y: 355}]]}

  // ,x1 = testRockZoneX
  // ,y1 = testRockZoneY
  // ,testStimuli = [{phase: 'test'
  //                 ,stimulusNum: 1
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 2, border: true, x: 100, y: 100}
  //                         ,{size: 'medium', color: 2, x: 170, y: 85}
  //                         ,{size: 'small', color: 2, border: true, x: 250, y: 100}]
  //                 ,answer: 'yes'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 2
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 2, border: true, x: 200, y: 120}
  //                         ,{size: 'small', color: 2, x: 200, y: 190}
  //                         ,{size: 'small', color: 2, border: true, x: 200, y: 250}]
  //                 ,answer: 'yes'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 3
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'medium', color: 2, border: true, x: 250, y: 120}
  //                         ,{size: 'medium', color: 2, x: 250, y: 200}
  //                         ,{size: 'medium', color: 2, border: true, x: 250, y: 280}]
  //                 ,answer: 'yes'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 4
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'medium', color: 2, border: true, x: 250, y: 120}
  //                         ,{size: 'medium', color: 0, x: 250, y: 200}
  //                         ,{size: 'medium', color: 2, border: true, x: 250, y: 280}]
  //                 ,answer: 'yes'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 5
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 2, border: true, x: 180, y: 250}
  //                         ,{size: 'small', color: 1, x: 220, y: 250}
  //                         ,{size: 'large', color: 2, x: 260, y: 220}
  //                         ,{size: 'small', color: 2, border: true, x: 360, y: 250}]
  //                 ,answer: 'yes'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 6
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 2, border: true, x: 240, y: 200}
  //                         ,{size: 'small', color: 0, x: 240, y: 250}
  //                         ,{size: 'small', color: 1, x: 240, y: 290}
  //                         ,{size: 'small', color: 2, border: true, x: 240, y: 340}]
  //                 ,answer: 'yes'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 7
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 2, border: true, x: 300, y: 250}
  //                         ,{size: 'small', color: 1, x: 300, y: 290}
  //                         ,{size: 'medium', color: 2, x: 285, y: 325}
  //                         ,{size: 'small', color: 2, border: true, x: 300, y: 400}]
  //                 ,answer: 'yes'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 8
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'large', color: 2, border: true, x: 200, y: 275}
  //                         ,{size: 'large', color: 2, x: 300, y: 275}
  //                         ,{size: 'large', color: 2, border: true, x: 400, y: 275}]
  //                 ,answer: 'yes'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 9
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'large', color: 0, border: true, x: 300, y: 110}
  //                         ,{size: 'medium', color: 0, x: 315, y: 210}
  //                         ,{size: 'large', color: 0, border: true, x: 300, y: 290}]
  //                 ,answer: 'yes'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 10
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'large', color: 2, border: true, x: 250, y: 150}
  //                         ,{size: 'large', color: 0, x: 250, y: 250}
  //                         ,{size: 'large', color: 2, border: true, x: 250, y: 350}]
  //                 ,answer: 'yes'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 11
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'large', color: 1, border: true, x: 210, y: 180}
  //                         ,{size: 'medium', color: 2, x: 225, y: 290}
  //                         ,{size: 'large', color: 1, border: true, x: 210, y: 365}]
  //                 ,answer: 'no'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 12
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'large', color: 1, border: true, x: 250, y: 180}
  //                         ,{size: 'large', color: 2, x: 345, y: 180}
  //                         ,{size: 'large', color: 2, border: true, x: 440, y: 180}]
  //                 ,answer: 'no'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 13
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 1, border: true, x: 300, y: 200}
  //                         ,{size: 'large', color: 1, x: 270, y: 245}
  //                         ,{size: 'medium', color: 1, border: true, x: 285, y: 340}]
  //                 ,answer: 'no'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 14
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 0, border: true, x: 300, y: 100}
  //                         ,{size: 'medium', color: 1, x: 285, y: 140}
  //                         ,{size: 'small', color: 1, x: 300, y: 210}
  //                         ,{size: 'small', color: 0, border: true, x: 300, y: 250}]
  //                 ,answer: 'no'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 15
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 0, border: true, x: 200, y: 200}
  //                         ,{size: 'small', color: 2, x: 200, y: 250}
  //                         ,{size: 'small', color: 2, x: 200, y: 290}
  //                         ,{size: 'small', color: 1, border: true, x: 200, y: 340}]
  //                 ,answer: 'no'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 16
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 2, border: true, x: 205, y: 180}
  //                         ,{size: 'medium', color: 2, x: 190, y: 215}
  //                         ,{size: 'medium', color: 0, x: 190, y: 280}
  //                         ,{size: 'small', color: 2, border: true, x: 205, y: 345}]
  //                 ,answer: 'no'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 17
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'medium', color: 2, border: true, x: 210, y: 270}
  //                         ,{size: 'small', color: 2, x: 225, y: 350}
  //                         ,{size: 'medium', color: 0, border: true, x: 210, y: 400}]
  //                 ,answer: 'no'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 18
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 2, border: true, x: 100, y: 275}
  //                         ,{size: 'medium', color: 1, x: 155, y: 260}
  //                         ,{size: 'small', color: 2, border: true, x: 230, y: 275}]
  //                 ,answer: 'no'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 19
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'small', color: 2, border: true, x: 240, y: 200}
  //                         ,{size: 'medium', color: 2, x: 225, y: 240}
  //                         ,{size: 'medium', color: 2, border: true, x: 225, y: 310}]
  //                 ,answer: 'no'}

  //                ,{phase: 'test'
  //                 ,stimulusNum: 20
  //                 ,category: 'sandwich'
  //                 ,rocks: [{size: 'medium', color: 2, x: 250, y: 200}
  //                         ,{size: 'medium', color: 2, border: true, x: 250, y: 275}
  //                         ,{size: 'medium', color: 2, x: 250, y: 340}]
  //                 ,answer: 'no'}];

// rockSetupData.forEach(function(d) {d.x += userRockZoneX; d.y += userRockZoneY});
// trainStimuli.forEach(function(d) {d.rocks.forEach(function(r) {r.x += controlRockZoneX; r.y += controlRockZoneY})});
// testStimuli.forEach(function(d) {d.rocks.forEach(function(r) {r.x += x1; r.y += y1})});