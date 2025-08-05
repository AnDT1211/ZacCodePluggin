(async () => {
  console.log("== injected script running ==");

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  function formatDate(dateObj) {
    const yyyy = dateObj.getFullYear();
    const mm = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const dd = ('0' + dateObj.getDate()).slice(-2);
    return `${yyyy}/${mm}/${dd}`;
  }

  // TODO test
  const start = new Date("2025-07-01");
  const end = new Date("2025-07-03");

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;

    const currentDate = formatDate(d);
    console.log("Calling SubmitDateNippouChange for", currentDate);

    clickDateLink(currentDate);

    await delay(3000);
  }

  console.log("== injected script done ==");
})();

function clickDateLink(currentDate) {
  const anchors = document.querySelectorAll('a[onclick]');
  for (const a of anchors) {
    const onclickVal = a.getAttribute('onclick');
    if (onclickVal && onclickVal.includes(`SubmitDateNippouChange('${currentDate}')`)) {
      console.log("? Clicking on anchor with onclick:", onclickVal);
      a.click();
      return true;
    }
  }
  console.warn("? Kh?ng t?m th?y th? <a> v?i SubmitDateNippouChange cho ng?y", currentDate);
  return false;
}