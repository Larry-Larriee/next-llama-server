// the backspace function allows puppeteer to delete text from an element
// page (method) the page of the browser that puppeteer is on
// element (string) the class of the element that you want to backspace
async function backspaceAll(page, element) {
  // Async functions inherently return Promises (you don't need to return anything in this file)
  await element.click({ clickCount: 3 });

  await page.keyboard.press("Backspace");
}

module.exports = backspaceAll;
