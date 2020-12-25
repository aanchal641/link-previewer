# link-previewer
Generates the preview of the provided url. Returns og and twitter tags alongwith website title,description

How to use

npm install link-previewer

const linkPreviewer = require("link-previewer");

const preview = await linkPreviewer.generatePreview({{url}})
