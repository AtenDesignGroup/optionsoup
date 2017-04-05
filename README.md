# optionsoup

[![Build Status](https://travis-ci.org/AtenDesignGroup/optionsoup.svg?branch=master)](https://travis-ci.org/AtenDesignGroup/optionsoup)

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
const url = optionsoup.get(options, 'settings.url', 'http://example.com');

// will be "default" because the other two things don't exist...
const allTheOptions = optionsoup.get(options, 'thing', optionsoup.get(options, 'anotherthing', 'default'));

const oneOfTheOptions = optionsoup.get(options, 'things[0]');
```
