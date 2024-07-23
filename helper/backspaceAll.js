// the backspace function allows puppeteer to delete text from an element
// page (method) the page of the browser that puppeteer is on
// selector (string) the class of the element that you want to backspace
async function backspaceAll(page, selector) {
  // Async functions inherently return Promises (you don't need to return anything in this file)
  const element = await page.$(selector);
  element.click({ clickCount: 3 });

  await page.keyboard.press("Backspace");
}

module.exports = backspaceAll;
