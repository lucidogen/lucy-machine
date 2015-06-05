# Lucy Machine

## State machine to control applications.

This library offers a simple DSL to handle events depending on context.

Usage example:

```js
  const m = new require('lucy-machine')

  m.state('init')
    .on('bang', function() {
        console.log('bang! in init')
      })

    .on('next', function() {
        // change state
        return state('bing')
      })

  m.state('bing', function() {
      // run on state enter
      console.log('Entering bing')
    })

    .on('bang', function(v) {
        console.log('bang! in bing. Value =', v)
      })

    .on('prev', function() {
        // change state
        return state('init')
      })

  // In any state (= default mappings)
  m.state('', function() {
      // run on every state change before specific 'onEnter'
    })
    .on('I', function() {
        // Whenever we receive 'I', we move to init state
        return state('init')
      })

    .when('B')  // while B event is true
      .on('bang', function() {
          console.log('bang! in bing while B')
        })

  m.enter('init') // start machine with 'init' state

  m.receive('bang', 1.0)    // --> bang! in init
  m.receive('next')         // --> Entering bing
  m.receive('bang', 123.45) // --> bang! in bing. Value = 123.45
  m.receive('bang')         // --> bang! in bing. Value = undefined
  m.receive('B', 1.0)       // B is trueish
  m.receive('bang', 123.45) // --> bang! while in B
  m.receive('B', 0.0)       // B is not true anymore, move back
  m.receive('bang', 123.45) // --> bang! in bing. Value = 123.45
  m.receive('B', 1.0)       // B is trueish
  m.receive('I')            // Move to init state
```

## Installation

```shell
  npm install --save git+ssh://git@bitbucket.org/lucidogen/lucy-machine.git
```

## Tests

```shell
   npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Especialy, do not use semicolons for statements where not to required, use comma
at the beginning of lines for lists and dictionaries.

Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
