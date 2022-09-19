"use strict";
import { NextApiRequest, NextApiResponse } from "next";
const puppeteer = require("puppeteer-extra");
const util = require("util");
const request = util.promisify(require("request"));
const isBase64 = require("is-base64");
const chromium = require("chrome-aws-lambda");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

// This is for captcha

// const RecaptchaPlugin = require('@extra/recaptcha');
// puppeteer.use(
//     RecaptchaPlugin({
//         provider: {
//             id: '2captcha',
//             token: 'xxx', // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
//         },
//         visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
//     })
// )

//This package doesn't build and cause issues on vercel

// puppeteer.use(pluginStealth());
puppeteer.use(AdblockerPlugin());

const urlImageIsAccessible = async (url) => {
  const correctedUrls = new Set();
  correctedUrls.add(url);
  if (isBase64(url, { allowMime: true })) {
    return true;
  }
  if (correctedUrls.size !== 0) {
    const urlResponse = await request(correctedUrls.values().next().value);
    const contentType = urlResponse.headers["content-type"];
    return new RegExp("image/*").test(contentType);
  }
};

const getImg = async (page, uri) => {
  const img = await page.evaluate(async () => {
    const ogImg = <HTMLMetaElement>document.querySelector('meta[property="og:image"]');
    if (ogImg != null && ogImg.content.length > 0 && (await urlImageIsAccessible(ogImg.content))) {
      return ogImg.content;
    }
    const imgRelLink = <HTMLLinkElement>document.querySelector('link[rel="image_src"]');
    if (imgRelLink != null && imgRelLink.href.length > 0 && (await urlImageIsAccessible(imgRelLink.href))) {
      return imgRelLink.href;
    }
    const twitterImg = <HTMLMetaElement>document.querySelector('meta[name="twitter:image"]');
    if (twitterImg != null && twitterImg.content.length > 0 && (await urlImageIsAccessible(twitterImg.content))) {
      return twitterImg.content;
    }

    let imgs = Array.from(document.getElementsByTagName("img"));
    let src;
    if (imgs.length > 0) {
      imgs = imgs.filter((img) => {
        let addImg = true;
        if (img.naturalWidth > img.naturalHeight) {
          if (img.naturalWidth / img.naturalHeight > 3) {
            addImg = false;
          }
        } else {
          if (img.naturalHeight / img.naturalWidth > 3) {
            addImg = false;
          }
        }
        if (img.naturalHeight <= 50 || img.naturalWidth <= 50) {
          addImg = false;
        }
        return addImg;
      });
      if (imgs.length > 0) {
        imgs.forEach((img) => (img.src.indexOf("//") === -1 ? (img.src = `${new URL(uri).origin}/${src}`) : img.src));
        return imgs[0].src;
      }
    }
    return null;
  });
  return img;
};

const getTitle = async (page) => {
  const title = await page.evaluate(() => {
    const ogTitle = <HTMLMetaElement>document.querySelector('meta[property="og:title"]');
    if (ogTitle != null && ogTitle.content.length > 0) {
      return ogTitle.content;
    }
    const twitterTitle = <HTMLMetaElement>document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle != null && twitterTitle.content.length > 0) {
      return twitterTitle.content;
    }
    const docTitle = document.title;
    if (docTitle != null && docTitle.length > 0) {
      return docTitle;
    }
    const h1El = document.querySelector("h1");
    const h1 = h1El ? h1El.innerHTML : null;
    if (h1 != null && h1.length > 0) {
      return h1;
    }
    const h2El = document.querySelector("h2");
    const h2 = h2El ? h2El.innerHTML : null;
    if (h2 != null && h2.length > 0) {
      return h2;
    }
    return null;
  });
  return title;
};

const getDescription = async (page) => {
  const description = await page.evaluate(() => {
    const ogDescription = <HTMLMetaElement>document.querySelector('meta[property="og:description"]');
    if (ogDescription != null && ogDescription.content.length > 0) {
      return ogDescription.content;
    }
    const twitterDescription = <HTMLMetaElement>document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription != null && twitterDescription.content.length > 0) {
      return twitterDescription.content;
    }
    const metaDescription = <HTMLMetaElement>document.querySelector('meta[name="description"]');
    if (metaDescription != null && metaDescription.content.length > 0) {
      return metaDescription.content;
    }
    let paragraphs = document.querySelectorAll("p");
    let fstVisibleParagraph = null;
    for (let i = 0; i < paragraphs.length; i++) {
      if (
        // if object is visible in dom
        paragraphs[i].offsetParent !== null
      ) {
        fstVisibleParagraph = paragraphs[i].textContent;
        break;
      }
    }
    return fstVisibleParagraph;
  });
  return description;
};

const getDomainName = async (page, uri) => {
  const domainName = await page.evaluate(() => {
    const canonicalLink = <HTMLLinkElement>document.querySelector("link[rel=canonical]");
    if (canonicalLink != null && canonicalLink.href.length > 0) {
      return canonicalLink.href;
    }
    const ogUrlMeta = <HTMLMetaElement>document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta != null && ogUrlMeta.content.length > 0) {
      return ogUrlMeta.content;
    }
    return null;
  });
  return domainName != null ? new URL(domainName).hostname.replace("www.", "") : new URL(uri).hostname.replace("www.", "");
};

const getLinkPreviewAttributes = async (
  url,
  _puppeteerArgs = [],
  puppeteerAgent = "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
) => {
  const browser = await puppeteer.launch({
    args: [
      ...chromium.args,
      "--window-position=0,0",
      "--disable-infobars",
      "--disable-extensions",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--window-size=1920x1080",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process",
      "--deterministic-fetch",
      "--enable-features=NetworkService",
      "--ignore-certificate-errors",
    ],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.setDefaultTimeout(0);
  await page.setViewport({ width: 800, height: 600 });
  await page.setUserAgent(puppeteerAgent);
  await page.exposeFunction("request", request);
  await page.exposeFunction("urlImageIsAccessible", urlImageIsAccessible);
  await page.goto(url);
  const obj = {
    title: "",
    description: "",
    domain: "",
    img: "",
  };
  obj.title = await getTitle(page);
  obj.description = await getDescription(page);
  obj.domain = await getDomainName(page, url);
  obj.img = await getImg(page, url);

  await page.close();
  await browser.close();
  return obj;
};

const handler = async (req: NextApiRequest, res: NextApiResponse, _next) => {
  const { url } = req.body;
  let data;

  if (req.method === "POST") {
    try {
      data = await getLinkPreviewAttributes(url);
      res.status(200).send(data);
      return;
    } catch (error) {
      console.error("ERROR", error);
      res.status(400).send(error);
      return;
    }
  }

  return res.status(404).json({
    error: {
      code: "not_found",
      message: "The requested endpoint was not found or doesn't support this method.",
    },
  });
};

export default handler;
