export function getWikiTermDetails() {
  let term = "Lunar_calendar";
	let url = "https://en.wikipedia.org/api/rest_v1/page/summary/";
  let queryUrl = `${url}${term}`;
  
  fetch(queryUrl)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch((error) => {
      console.log(error);
    })
}