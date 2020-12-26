# link-previewer
Generates the preview of the provided url. Returns og and twitter tags alongwith website title,description

## Getting Started

```bash
npm install link-previewer
```

## How to use


```js
const linkPreviewer = require("link-previewer");

const url = "https://one9x.com";
( async () => {
    const result = await linkPreviewer.generatePreview(url);
    console.log(result)
  }
)();
```

```JSON
{
    title: 'Welcome to One9x | One9x',
    name: '',
    description: 'Website of One9x organization',
    og: {
        title: 'Welcome to One9x',
        image: '',
        description: 'Website of One9x organization',
        url: 'http://one9x.com/',
        site_name: 'One9x'
    },
    twitter: {
        title: '',
        image: '',
        description: '',
        url: ''
    }
}
```


