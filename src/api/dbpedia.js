export function getWikiAbstract() {
  let term = "Lunar_calendar";
	let url = "https://en.wikipedia.org/api/rest_v1/page/summary/";
  let queryUrl = `${url}${term}`;
  
  fetch(queryUrl)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
}