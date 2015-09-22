'use strict'
const Machine = require ( './lib/Machine' )// ( 'lucy-machine' )
const m = new Machine

m.state
( 'init' )
  .on
  ( 'bang'
  , function ()
    { console.log('bang! in init')
    }
  )

  .on
  ( 'next'
  , function ()
    { // change state
      return m.state('bing')
    }
  )

m.state
( 'bing'
, function ()
  { // run on state enter
    console.log('Entering bing')
  }
)

  .on
  ( 'bang'
  , function ( v )
    { console.log('bang! in bing. Value =', v)
    }
  )

  .on
  ( 'prev'
  , function ()
    { // change state
      return m.state('init')
    }
  )

// In any state (= default mappings)
m.state
( ''
, function ()
  { // run on every state change before specific 'onEnter'
  }
)
  .on
  ( 'I'
  , function ()
    { // Whenever we receive 'I', we move to init state
      return m.state('init')
    }
  )

  .when
  ( 'B' )  // while B event is true
    .on
    ( 'bang'
    , function ()
      { console.log('bang! in bing while B')
      }
    )

m.enter ( 'init' ) // start machine with 'init' state

m.receive ( 'bang', 1.0 )    // --> bang! in init
m.receive ( 'next' )         // --> Entering bing
m.receive ( 'bang', 123.45 ) // --> bang! in bing. Value = 123.45
m.receive ( 'bang' )         // --> bang! in bing. Value = undefined
m.receive ( 'B', 1.0 )       // B is trueish
m.receive ( 'bang', 123.45 ) // --> bang! while in B
m.receive ( 'B', 0.0 )       // B is not true anymore, move back
m.receive ( 'bang', 123.45 ) // --> bang! in bing. Value = 123.45
m.receive ( 'B', 1.0 )       // B is trueish
m.receive ( 'I' )            // Move to init state

