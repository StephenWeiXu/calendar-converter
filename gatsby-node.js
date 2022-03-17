
const path = require('path')

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const CALENDAR_NAME_WITH_WIKI_TERM = {
  "Gregorian Calendar": "Gregorian_calendar",
  "Lunar Calendar": "Lunar_calendar",
  "Hebrew Calendar": "Hebrew_calendar",
  "Islamic Calendar": "Islamic_calendar",
  "Julian Calendar": "Julian_calendar",
  "Persian Calendar": "Persian_calendar",
  "Indian National Calendar": "Indian_national_calendar",
};

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const template = path.resolve(`src/templates/CalendarDetail.js`);

  Object.entries(CALENDAR_NAME_WITH_WIKI_TERM).forEach(([calendarName, calendarValue]) => {
    createPage({
      path: `/${slugify(calendarName)}`,
      component: template,
      context: {
        calendarName: calendarName,
      },
    })
  })
}
