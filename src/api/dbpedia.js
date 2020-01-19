export function getWikiTermDetails(canonicalTerm) {
	let url = "https://en.wikipedia.org/api/rest_v1/page/summary/";
  let queryUrl = `${url}${canonicalTerm}`;
  
  return fetch(queryUrl)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch((error) => {
      console.error("Error retrieving calendar details from Wikipedia");
      return {};
    })
}

export function getWikiTermFullSummary(canonicalTerm) {
  let url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&origin=*&explaintext&redirects=1&titles=";
  let queryUrl = `${url}${canonicalTerm}`;
  
  return fetch(queryUrl, {mode: 'cors'})
    .then((response) => {
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch((error) => {
      console.error("Error retrieving calendar full summary from Wikipedia");
      return {};
    })
}