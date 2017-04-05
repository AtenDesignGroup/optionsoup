# optionsoup

```javascript

const optionsoup = require('optionsoup');

const options = {
  settings: {
    url: 'http://my.example.com'
  },
  things: [
    'something',
  ],
};

// will be 'http://my.example.com', but would default to 'http://example.com' if that didn't exist...
const url = optionsoup(options, 'settings.url', 'http://example.com');

// will be "default" because the other two things don't exist...
const allTheOptions = optionsoup(options, 'thing', optionsoup(options, 'anotherthing', 'default'));

const oneOfTheOptions = optionsoup(options, 'things[0]');
```
