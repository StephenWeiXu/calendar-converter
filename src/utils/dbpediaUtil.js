export function getWikiFullSummaryHtmlWithOldApi(wikiData) {
  try {
    let pages = wikiData.query.pages;
    let firstPageId = Object.keys(pages)[0];
    return pages[firstPageId].extract;
  } catch(error) {
    return "";
  }
}


export function getWikiAbstractHtml(wikiData) {
  try {
    return wikiData.extract_html;
  } catch(error) {
    return "";
  }
}

export function getWikiContentUrl(wikiData) {
  try {
    return wikiData.content_urls.desktop.page;
  } catch(error) {
    return "";
  }
}

export function getWikiThumbnail(wikiData) {
  try {
    return wikiData.thumbnail.source;
  } catch(error) {
    return "";
  }
}