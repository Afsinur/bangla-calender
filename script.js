let currentBnDate;
let currentBnMonth;
let currentBnYear;
(() => {
  let currentMonthInfo = {};
  let bnYearDiff = 593;
  let countAgain = 0;
  let totalDatesAdded = 0;
  let dayIndex = 0;
  let weeksGlobal = [
    "রবি",
    "সোম",
    "মঙ্গল",
    "বুধ",
    "বৃহঃ",
    "শুক্র",
    "শনি",
    "রবি",
    "সোম",
    "মঙ্গল",
    "বুধ",
    "বৃহঃ",
    "শুক্র",
  ];
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
  const select = {
    one(sl) {
      return document.querySelector(sl);
    },
  };
  const database = [];
  const components = {
    title(month, i, thisYearInfo) {
      let orMonth =
        thisYearInfo.months[thisYearInfo.months.length == i + 1 ? 0 : i + 1];

      return `
          <div class="p-2 text-center text-xl font-semibold text-gray-600">
              <p>${month.title}-${thisYearInfo.year - bnYearDiff} - ${
        month.altEng
      }/${orMonth.altEng} ${
        month.altEng == "December"
          ? `- ${thisYearInfo.year}-${thisYearInfo.year + 1}`
          : month.altEng == "January" ||
            month.altEng == "February" ||
            month.altEng == "March"
          ? `- ${thisYearInfo.year + 1}`
          : `- ${thisYearInfo.year}`
      }</p>
          </div>
          `;
    },
    weeks() {
      let days = setWeeks();
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
    dates(month, _i, thisYearInfo) {
      let indexDay = new Date(`${thisYearInfo.year}-04-14`).getDay();

      let orMonth =
        thisYearInfo.months[thisYearInfo.months.length == _i + 1 ? 0 : _i + 1];
      let htmls = ``;
      const dateBoxes = [];

      if (_i > 0) {
        totalDatesAdded = 0;

        for (let i = 0; i < dayIndex; i++) {
          totalDatesAdded++;

          let insideHtmls = ``;
          insideHtmls += ``;

          htmls += `
          <div class="border flex flex-col p-2 invisible">
              <p class="text-xl font-semibold text-gray-600"></p>

              <p class="self-end text-sm font-semibold text-gray-400 flex items-center justify-between w-full">${insideHtmls}</p>
          </div>
          `;
        }
      } else {
        if (indexDay != 0) {
          totalDatesAdded = 0;

          for (let i = 0; i < indexDay; i++) {
            totalDatesAdded++;

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
      }

      for (let i = 0; i < month.totalDays; i++) {
        totalDatesAdded++;

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
  function getMonths(year) {
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
        totalDays: isLeapYear(year + 1) ? 30 : 29,
        altEng: "February",
        altEngTotalDays: isLeapYear(year + 1) ? 29 : 28,
      },
      { title: "চৈত্র", totalDays: 30, altEng: "March", altEngTotalDays: 31 },
    ];
    return { year, months };
  }
  function currentMonthFunctionalities() {
    resetControls();

    const thisYearInfo = getMonths(
      new Date().getMonth() < 3
        ? new Date().getFullYear() - 1
        : new Date().getFullYear()
    ); //new Date().getFullYear()
    thisYearInfo.months.forEach((month, i) => {
      const card = calenderTemp(month, i, thisYearInfo);

      const showMonthsElement = select.one("[data-show-months]");
      showMonthsElement && (showMonthsElement.innerHTML += card.html);

      month.altEng == "December";
      month.altEng == "January" ||
      month.altEng == "February" ||
      month.altEng == "March"
        ? database.push({
            altEng: month.altEng,
            calenderTemp: card.html,
            dateBox: card.dateBox,
            year: thisYearInfo.year + 1,
            title: month.title,
          })
        : database.push({
            altEng: month.altEng,
            calenderTemp: card.html,
            dateBox: card.dateBox,
            year: thisYearInfo.year,
            title: month.title,
          });
    });

    let dbObj = database
      .reduce((arr, itm) => {
        itm.dateBox.forEach((itm2) =>
          arr.push({ ...itm2, year: itm.year, calenderTemp: itm.calenderTemp })
        );
        return arr;
      }, [])
      .filter(
        (itm) =>
          itm.engDate == new Date().getDate() &&
          itm.engMonth == engMonths[new Date().getMonth()]
      )[0];

    currentMonthInfo.bnMonth = dbObj.title;
    currentMonthInfo.bnYear = thisYearInfo.year - bnYearDiff;

    const currentMonthElement = select.one("[data-current-ban-month]");
    currentMonthElement && (currentMonthElement.innerHTML = dbObj.calenderTemp);
  }
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
  function calenderTemp(month, i, thisYearInfo) {
    const dates = components.dates(month, i, thisYearInfo);

    return {
      html: `
  <div class="border px-4 py-2">
      <div>
          ${components.title(month, i, thisYearInfo)}
      </div>

      <div class="grid gap-2 border grid-cols-7 p-2">
          ${components.weeks()}
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
      .reduce((arr, itm) => {
        itm.dateBox.forEach((itm2) =>
          arr.push({
            ...itm2,
            title: itm.title,
            year: itm.year,
            calenderTemp: itm.calenderTemp,
          })
        );
        return arr;
      }, [])
      .filter(
        (itm) =>
          itm.engDate == new Date().getDate() &&
          itm.engMonth == engMonths[new Date().getMonth()]
      )[0];

    currentMonthInfo.bnDate = today.bnDate;
    currentMonthInfo.bnMonth = today.title;

    currentBnDate = currentMonthInfo.bnDate;
    currentBnMonth = currentMonthInfo.bnMonth;
    currentBnYear = currentMonthInfo.bnYear;

    const currentBnDateElement = select.one("[data-current-ban-date]");

    currentBnDateElement &&
      (currentBnDateElement.innerHTML = `
      <div class="border flex flex-col p-2 w-fit">
          <p class="text-xl font-semibold text-gray-600 text-center">${today.bnDate}</p>

          <p class="self-end text-sm font-semibold text-gray-400 flex gap-8 items-center justify-between w-full">
              <span class="">${today.engMonthSliced}</span>
              <span>${today.engDate}</span>
          </p>
      </div>
    `);
  }
  function reCount() {
    countAgain++;
    return countAgain;
  }
  function resetControls() {
    countAgain = 0;
    totalDatesAdded = 0;
    dayIndex = 0;
  }
  function setWeeks() {
    let maxPush = 0;
    let indexDay = 0;

    let weekDays = [];

    for (let i = indexDay; i < weeksGlobal.length; i++) {
      if (maxPush < 7) {
        maxPush++;

        const el = weeksGlobal[i];
        weekDays.push({ title: el });
      } else {
        break;
      }
    }

    return weekDays;
  }
  currentMonthFunctionalities();
  showToday();
})();
