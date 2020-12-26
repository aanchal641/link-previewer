const requestPromise = require('request-promise');
const xpath = require("xpath-html");


const generatePreview = async (url) => {
  return requestPromise(url)
    .then(function (html) {
      let response = {};
      response = getHTMLTags(html);
      response.og = getOGTags(html,url);
      response.twitter = getTwitterTags(html,url);
      return response;
    })
    .catch(function (err) {      
      throw err;
    });
}


const getHTMLTags = (html) => {
  let response = {
    title: "",
    name: "",
    description: ""
  };

  const title = xpath
    .fromPageSource(html)
    .findElements("//title");

  response.title = title[0] ? title[0].getText() : "";

  const name = xpath
    .fromPageSource(html)
    .findElements("//meta[@name='name']");

  response.name = getContentAttribute(name);

  const description = xpath
    .fromPageSource(html)
    .findElements("//meta[@name='description']");

  response.description = getContentAttribute(description);

  return response;
}

const getOGTags = (html) => {
  const og = {
    title: "",
    image: "",
    description: "",
    url: "",
    site_name: ""
  };

  const title = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='og:title']");

  og.title = getContentAttribute(title);


  let image = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='og:image']");

  image = getContentAttribute(image);
  og.image = createAbsolutePathForImage(image);

  const description = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='og:description']");

  og.description = getContentAttribute(description);

  const url = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='og:url']");

  og.url = getContentAttribute(url);

  const site_name = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='og:site_name']");

  og.site_name = getContentAttribute(site_name);

  return og;
}

const getTwitterTags = (html) => {
  const twitter = {
    title: "",
    image: "",
    description: "",
    url: ""
  };

  const title = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='twitter:title']");

  twitter.title = getContentAttribute(title);


  let image = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='twitter:image']");

  image = getContentAttribute(image);
  twitter.image = createAbsolutePathForImage(image);

  const description = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='twitter:description']");

  twitter.description = getContentAttribute(description);

  const url = xpath
    .fromPageSource(html)
    .findElements("//meta[@property='twitter:url']");

  twitter.url = getContentAttribute(url);

  return twitter;
}

const getContentAttribute = (elements) => {
  let content = "";
  const element = elements[0];
  if (element && element.attributes) {
    for (var key in element.attributes) {
      if (element.attributes[key].name == 'content')
        content = element.attributes[key].value;
    }
  }
  return content;
}

const createAbsolutePathForImage = (imagelink,url) => {
  let imageUrl = imagelink;
  if((imagelink.indexOf('https')) != -1 || (imagelink.indexOf('http')) != -1){
    const baseUrl = getBaseUrl(url);
    imageUrl = baseUrl + imagelink;
  }
  return imageUrl;
}

const getBaseUrl = (url) => {  
  let urls = url.split('/');
  urls = urls.slice(0,3);
  const baseUrl = urls.join('/');
  return baseUrl;
}

module.exports = { generatePreview };