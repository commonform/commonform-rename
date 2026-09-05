```javascript
import * as rename from 'commonform-rename'
import assert from 'node:assert'

const first = {
  content: [
    {definition: 'Company'}, ' means ', {blank: ''}, ' plus',
    {form: {content: ['shareholders of ', {use: 'Company'}]}},
    {form: {content: ['subsidiaries of ', {use: 'Company'}]}}
  ]
}

rename.term('Company', 'Enterprise', first)

assert.deepEqual(first, {
  content: [
    {definition: 'Enterprise'}, ' means ', {blank: ''}, ' plus',
    {form: {content: ['shareholders of ', {use: 'Enterprise'}]}},
    {form: {content: ['subsidiaries of ', {use: 'Enterprise'}]}}
  ]
})

const second = {
  content: [
    {heading: 'Recitals', form: {content: ['...']}},
    {reference: 'Recitals'}
  ]
}

rename.heading('Recitals', 'Background', second)

assert.deepEqual(second, {
  content: [
    {heading: 'Background', form: {content: ['...']}},
    {reference: 'Background'}
  ]
})
```
