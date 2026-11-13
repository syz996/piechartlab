
export const FAQS = [
  {
    q: 'Is this pie chart maker really free?',
    a: 'This pie chart maker is free to use. Create as many charts as you like, adjust colors and labels, and download the result as PNG or SVG. There is no account to create, no trial period and no limit on how many charts you export. We do not ask for an email address, and the numbers you type stay on your device.'
  },

  {
    q: 'Do I need to sign up or install anything?',
    a: 'No. The tool runs in your browser, so there is nothing to install and no account to create. Open the page, type your labels and values, and the chart appears immediately. It works the same way on a phone as on a laptop: tap a row to edit it and the preview redraws as you type.'
  },

  {
    q: 'Can I download my chart as PNG or SVG?',
    a: 'Yes. PNG is a pixel image that drops straight into Word, Google Docs, PowerPoint or a slide deck. SVG is a vector file that stays sharp at any size, which is what you want for print, posters and high-resolution screens. Both are generated in your browser, so the download starts immediately.'
  },

  {
    q: 'Does my data get uploaded to a server?',
    a: 'No. All of the chart math and drawing happens locally in your browser. The labels and numbers you type stay on your device and are never sent to us, so you can safely use the tool with internal figures, student data or client information. Nothing is stored for you, though: closing the tab clears the data, so download the chart before you leave.'
  },

  {
    q: 'Can I import data from Excel or Google Sheets?',
    a: 'Not yet. Right now you type each label and value, or add a row for each item you need, so a normal five-row budget takes about a minute. Selecting two columns in Excel or Google Sheets and pasting them straight in is the next thing we are adding.'
  },

  {
    q: 'Can I make a donut chart instead of a pie chart?',
    a: 'Yes. Switch the chart type and the middle of the pie opens into a donut, which is often easier to read because the centre can hold a total or a headline number. Everything else stays the same: same data, same colors, same export options. It is only a display setting, so you can flip back and forth before downloading.'
  },

  {
    q: 'How many slices should a pie chart have?',
    a: 'Keep it to roughly five to seven slices. A pie chart is read by comparing angles, and the eye is poor at that once the slices get thin: anything below about 5% is hard to tell apart from its neighbours. If you have ten categories, group the small ones into a single Other slice, or use a bar chart where length is easier to compare than angle.'
  },
];

export const STEPS = [
  {
    name: 'Enter your data',
    text: 'Type your labels and values, or start from the sample data that is already loaded. Each row becomes one slice, and the preview redraws as you type.'
  },
  {
    name: 'Check the percentages',
    text: 'The tool turns your raw numbers into percentages and shows them on the slices and in the legend, so you can confirm the proportions before you present them.'
  },
  {
    name: 'Make it yours',
    text: 'Pick a color theme, switch between pie and donut, move the legend, and choose whether labels show names, values, percentages or both.'
  },
  {
    name: 'Download',
    text: 'Export a PNG for slides, documents and decks, or an SVG for print and anything that has to stay sharp at any size. Both are generated in your browser, so the file is ready as soon as you click.'
  },
];


// live: 页面还没上就写 false —— 不渲染、不进 sitemap、不产生 404
export const TOOLS = [
  { href: '/pie-chart-examples/', label: 'Pie chart examples', live: true },
  { href: '/free-pie-chart-maker/', label: 'Free pie chart maker', live: false },
  { href: '/pie-chart-with-percentages/', label: 'Pie chart with percentages', live: false },
  { href: '/donut-chart-maker/', label: 'Donut chart maker', live: true },
  { href: '/3d-pie-chart-maker/', label: '3D pie chart maker', live: false },
  { href: '/svg-pie-chart/', label: 'SVG pie chart', live: false },
  { href: '/pie-chart-color-palettes/', label: 'Pie chart color palettes', live: false },
  { href: '/how-to/make-a-pie-chart/', label: 'How to make a pie chart', live: true },
];
