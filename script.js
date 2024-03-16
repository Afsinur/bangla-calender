let countAgain = 0;
let totalDatesAdded = 0;
let totalTilesAdded = 0;
let dayIndex = 0;
const engMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const months = [
  { title: "বৈশাখ", totalDays: 31, altEng: "April", altEngTotalDays: 30 },
  { title: "জ্যৈষ্ঠ", totalDays: 31, altEng: "May", altEngTotalDays: 31 },
  { title: "আষাঢ়", totalDays: 31, altEng: "June", altEngTotalDays: 30 },
  { title: "শ্রাবণ", totalDays: 31, altEng: "July", altEngTotalDays: 31 },
  {
    title: "ভাদ্র",
    totalDays: 31,
    altEng: "August",
    altEngTotalDays: 31,
  },
  {
    title: "আশ্বিন",
    totalDays: 31,
    altEng: "September",
    altEngTotalDays: 30,
  },
  {
    title: "কার্তিক",
    totalDays: 30,
    altEng: "October",
    altEngTotalDays: 31,
  },
  {
    title: "অগ্রহায়ণ",
    totalDays: 30,
    altEng: "November",
    altEngTotalDays: 30,
  },
  {
    title: "পৌষ",
    totalDays: 30,
    altEng: "December",
    altEngTotalDays: 31,
  },
  { title: "মাঘ", totalDays: 30, altEng: "January", altEngTotalDays: 31 },
  {
    title: "ফাল্গুন",
    totalDays: isLeapYear(new Date().getFullYear()) ? 30 : 29,
    altEng: "February",
    altEngTotalDays: isLeapYear(new Date().getFullYear()) ? 29 : 28,
  },
  { title: "চৈত্র", totalDays: 30, altEng: "March", altEngTotalDays: 31 },
];
console.log(
  months
    .filter((month) => {
      if (
        month.altEng == "January" ||
        month.altEng == "February" ||
        month.altEng == "March" ||
        month.altEng == "April"
      ) {
        return month;
      }
    })
    .reduce((acc, obj) => {
      acc += obj.altEngTotalDays;
      return acc;
    }, 0)
);
const weekDays = [
  { title: "রবি" },
  { title: "সোম" },
  { title: "মঙ্গল" },
  { title: "বুধ" },
  { title: "বৃহঃ" },
  { title: "শুক্র" },
  { title: "শনি" },
];
const select = {
  one(sl) {
    return document.querySelector(sl);
  },
};
const database = [];
const components = {
  title(month, i) {
    let orMonth = months[months.length == i + 1 ? 0 : i + 1];

    return `
          <div class="p-2 text-center text-xl font-semibold text-gray-600">
              <p>${month.title}-${new Date().getFullYear() - 594} - ${
      month.altEng
    }/${orMonth.altEng} ${
      month.altEng == "December" ||
      month.altEng == "January" ||
      month.altEng == "February" ||
      month.altEng == "March"
        ? `- ${new Date().getFullYear()}-${new Date().getFullYear() + 1}`
        : ``
    }</p>
          </div>
          `;
  },
  weeks(days) {
    let htmls = ``;

    for (let i = 0; i < days.length; i++) {
      const day = days[i];
      htmls += `
          <div class="p-2 border">
              <p class="text-center font-semibold text-gray-400">${day.title}</p>
          </div>
          `;
    }

    return htmls;
  },
  dates(month, _i) {
    let orMonth = months[months.length == _i + 1 ? 0 : _i + 1];
    let htmls = ``;
    const dateBoxes = [];

    function reCount() {
      countAgain++;
      return countAgain;
    }

    if (_i > 0) {
      totalDatesAdded = 0;

      for (let i = 0; i < dayIndex; i++) {
        totalDatesAdded++;
        totalTilesAdded++;

        let insideHtmls = ``;
        insideHtmls += ``;

        htmls += `
          <div class="border flex flex-col p-2 invisible">
              <p class="text-xl font-semibold text-gray-600"></p>

              <p class="self-end text-sm font-semibold text-gray-400 flex items-center justify-between w-full">${insideHtmls}</p>
          </div>
          `;
      }
    }

    for (let i = 0; i < month.totalDays; i++) {
      totalDatesAdded++;
      totalTilesAdded++;

      dayIndex = totalDatesAdded % 7;

      let forEnDate =
        i + 14 > month.altEngTotalDays
          ? reCount()
          : _i > 0
          ? reCount()
          : i + 14;

      let forEnMonth = i + 14 > forEnDate ? orMonth.altEng : month.altEng;

      let insideHtmls = ``;
      insideHtmls += `
                <span class="">${forEnMonth.slice(0, 3)}</span>
                <span>${forEnDate}</span>
              `;

      htmls += `
          <div class="border flex flex-col p-2">
              <p class="text-xl font-semibold text-gray-600 text-center">${
                i + 1
              }</p>

              <p class="self-end text-sm font-semibold text-gray-400 flex items-center justify-between w-full">${insideHtmls}</p>
          </div>
          `;

      dateBoxes.push({
        bnDate: i + 1,
        engMonth: forEnMonth,
        engMonthSliced: forEnMonth.slice(0, 3),
        engDate: forEnDate,
      });

      if (countAgain + 1 > month.altEngTotalDays) {
        countAgain = 0;
      }
    }

    return { htmls, dateBoxes };
  },
};
const currentMonth = months.filter(
  (month) => month.altEng == engMonths[new Date().getMonth()]
)[0];
function isLeapYear(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
}
function calenderTemp(month, i) {
  const dates = components.dates(month, i);
  return {
    html: `
  <div class="border px-4 py-2">
      <div>
          ${components.title(month, i)}
      </div>

      <div class="grid gap-2 border grid-cols-7 p-2">
          ${components.weeks(weekDays)}
      </div>

      <div class="grid gap-2 border grid-cols-7 p-2">
          ${dates.htmls}
      </div>
  </div>
`,
    dateBox: dates.dateBoxes,
  };
}
function showToday() {
  let today = database
    .filter((obj) => obj.altEng == currentMonth.altEng)[0]
    .dateBox.filter((box) => box.engDate == new Date().getDate())[0];

  currentBnDateElement.innerHTML = `
      <div class="border flex flex-col p-2 w-fit">
          <p class="text-xl font-semibold text-gray-600 text-center">${today.bnDate}</p>

          <p class="self-end text-sm font-semibold text-gray-400 flex gap-8 items-center justify-between w-full">
              <span class="">${today.engMonthSliced}</span>
              <span>${today.engDate}</span>
          </p>
      </div>
    `;
}
months.forEach((month, i) => {
  const card = calenderTemp(month, i);
  const showMonthsElement = select.one("[data-show-months]");
  showMonthsElement && (showMonthsElement.innerHTML += card.html);
  database.push({
    altEng: month.altEng,
    calenderTemp: card.html,
    dateBox: card.dateBox,
  });
});
const currentMonthElement = select.one("[data-current-ban-month]");
currentMonthElement &&
  (currentMonthElement.innerHTML = database.filter(
    (itm) => itm.altEng == currentMonth.altEng
  )[0].calenderTemp);
const currentBnDateElement = select.one("[data-current-ban-date]");
currentBnDateElement && showToday();
