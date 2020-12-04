# quicklysign-react

> Unofficial QuicklySign widget for react

[![NPM](https://img.shields.io/npm/v/quicklysign-react.svg)](https://www.npmjs.com/package/quicklysign-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save quicklysign-react
```

## Usage

```tsx
import React, { FC } from 'react'

import QuicklySign from 'quicklysign-react'

export const Example: FC = () => {
  return (
    <QuicklySign
      client_id='Your client id'
      url='url'
      post_sign_url='url to redirect to after signing'
    />
  )
}
```

## License

MIT © [@thesilentdev](https://github.com/@thesilentdev)
