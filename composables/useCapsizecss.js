import { createStyleObject } from "@capsizecss/core";
// import { fromFile } from "@capsizecss/unpack";

// console.log(fromFile);

const Nohemi = createStyleObject({
  capHeight: 64,
  // leading: 64,
  lineGap: 24,
  fontMetrics: {
    familyName: "nohemi",
    category: "sans-serif",
    capHeight: 2860,
    ascent: 2960,
    descent: -758,
    lineGap: 0,
    unitsPerEm: 2048,
    xHeight: 1040,
    xWidthAvg: 842,
  },
});

export default function () {
  return Nohemi;
}
