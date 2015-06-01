/* The first scene starts with blah blah.
 
   Initial ideas on how to integrate lucy-machine with lucy-app

 */
const m = new require('lucy-machine')

// Singleton
const app = require('lucy-app'))


/* First scene blah blah.
 *
 */
m.state('vagina'
  , function() {
    // this is called on entering this new state
    
    // Load scene s1
    app.run(scene('vagina'))
  })

  .on('B', function() {
    // Move to scene 'space' with transition 'fade' in 3.0 seconds
    app.run(
      transition('fade', {duration:3.0}
        , app.current
        , scene('space')
      )
    )

    // Or with some syntactic sugar if the app is aware of defaults
    app.transition('fade', {duration:3.0}, 'space', function() {
      m.enter('space')
    })

    // Even more sugar with default scene state naming
    app.transition('fade', {duration:3.0}, 'space')
  })

  .on('C', function(v) {
    app.param('destroy', v)
    // ==> write current scene uniforms, params
    // ==> saves this value (all values are set on scene change setup) to
    //     avoid hardware controls from not being in sync ?
    //     Or simply get control values back on scene load ?
  })

m.state('space'
  , function() {
    // This ends the transition
    app.scene('space')
  }, function() {
    // this could be used on state exit
  })

  .on('B', function() {
    // Move to next scene
  })

/* In any state...
 */
m.state('', function() {
    // This is called before any state change
  }, function() {
    // This is called on any state exit
  })
  .when('X')  // while C is true or 1.0
    .on('V', function(v) {
      // do something with value
    })
  .when('X', 'Y')
    .on('V', function(v) {
      // this is when X first and then Y and then v
    })
  .when('Y')
    .on('V', function(v) {
      // do something else
    })

// controllers
m.control('osc', function(message, value) {
  // input filter
  let param = message.match(/\/foo\/bar\/([^\/]+)$/)
  if (param) {
    this.receive(param, value)
  }
}, function(param, value) {
  // notification filter (not triggered when 'osc' value is
  // received
  osc.send('/foo/bar/'+param, value)
})

// Use state machine
osc.on('message', function(message, value) {
  m.receive('osc', message, value)
})

// etc


