export const select = (e) => document.querySelector(e);
export const selectAll = (e) => document.querySelectorAll(e);
export const selectFrom = (e, el) => {
  return el.querySelector(e);
};
export const selectAllFrom = (e, el) => {
  if (Array.isArray(e)) {
    let els = [];
    e.forEach((selector) => {
      els = els.concat(Array.from(selectAllFrom(selector, el)));
    });
    return els;
  } else {
    return el.querySelectorAll(e);
  }
};
export const getPlaceValue = (numberString, place) => {
  const reversedNumber = numberString.split("").reverse().join("");
  const placeValue = reversedNumber[place - 1];
  return parseInt(placeValue, 10);
};
export const resetInlineStyles = (elements) => {
  elements.forEach((selector) => {
    selectAll(selector).forEach((el) => (el.style.transform = ""));
  });
};
export const lerp = (start, stop, amount) => (stop - start) * amount;
export const isEven = (number) => number % 2 === 0;
export const getBounding = (el) => el.getBoundingClientRect();
export const elementHasWidth = (el) => el.clientWidth > 1;
export const recursiveStagger = (items, config) => {
  const lastIndex = items.length - 1;
  let counter = 0;

  function stagger() {
    config.callback(items[counter]);

    if (counter < lastIndex) {
      counter++;
      setTimeout(() => {
        alert("ahh");
      }, 1000);
    }
  }

  stagger();
};
export const getCssVariable = (element, variableName) => {
  const computedStyles = getComputedStyle(element);
  const variableValue = computedStyles
    .getPropertyValue(`--${variableName}`)
    .trim();
  return variableValue;
};
