const requestPromise = require('request-promise');
const xpath = require("xpath-html");


const generatePreview = async (url) => {
  requestPromise(url)
    .then(function (html) {
      let response = {};
      response = getHTMLTags(html);
      response.og = getOGTags(html);
      response.twitter = getTwitterTags(html);
      console.log(response);
      return response;
    })
    .catch(function (err) {

    });
}


const getHTMLTags = (html) => {
  let response = {
    title: "",
    name: "",
    description: ""
  };

  let title = xpath
    .fromPageSource(html)
    .findElements("//title");

  response.title = title[0] ? title[0].getText() : "";

  let name = xpath
    .fromPageSource(html)
    .findElements("//meta[@name='name']");

  response.name = getContentAttribute(name);

  let description = xpath
    .fromPageSource(html)
    .findElements("//meta[@name='description']");

  response.description = getContentAttribute(description);

  return response;
}

const getOGTags = (html) => {
  let og = {
    title: "",
    image: "",
    description: "",
    url: "",
    site_name: ""
  };

  let title = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='og:title']");

  og.title = getContentAttribute(title);


  let image = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='og:image']");

  og.image = getContentAttribute(image);

  let description = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='og:description']");

  og.description = getContentAttribute(description);

  let url = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='og:url']");

  og.url = getContentAttribute(url);

  let site_name = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='og:site_name']");

  og.site_name = getContentAttribute(site_name);

  return og;
}

const getTwitterTags = (html) => {
  let twitter = {
    title: "",
    image: "",
    description: "",
    url: ""
  };

  let title = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='twitter:title']");

  twitter.title = getContentAttribute(title);


  let image = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='twitter:image']");

  twitter.image = getContentAttribute(image);

  let description = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='twitter:description']");

  twitter.description = getContentAttribute(description);

  let url = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='twitter:url']");

  twitter.url = getContentAttribute(url);

  return twitter;
}

const getContentAttribute = (element) => {
  let content = "";
  if (element[0] && element[0].attributes) {
    for (var key in element[0].attributes) {
      if (element[0].attributes[key].name == 'content')
        content = element[0].attributes[key].value;
    }
  }
  return content;
}

module.exports = { generatePreview };