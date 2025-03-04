# events-module

simple event dispatcher

## Installation

```sh
npm install github:opentreadmill/events
```

## Usage

```js
import Events from "events-module";

const events = new Events({
    eventType1: [],
    eventType2: []
});

events.on('eventType1', () => {console.log('eventType1')})
    .on('eventType2', () => {console.log('eventType2')});

events.dispatch(new CustomEvent('eventType1', {detail: {/* any data here */}}))

```
## Testing

```sh
npm test
```
