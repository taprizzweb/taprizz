# Send every order to a Google Sheet (optional)

The `/start` page and the pricing form save each lead in the database. To also see it in a Google Sheet:

1. Make a Google Sheet. In row 1 write: `time, name, business, phone, location, track, plan, months, tables, counters, items, custom, design_estimate, message`.
2. Extensions, Apps Script. Paste this, then Deploy, New deployment, type Web app, execute as Me, access Anyone:

```js
function doPost(e) {
  var d = JSON.parse(e.postData.contents);
  var cols = ["time","name","business","phone","location","track","plan","months","tables","counters","items","custom","design_estimate","message"];
  SpreadsheetApp.getActiveSheet().appendRow(cols.map(function (c) { return d[c] || ""; }));
  return ContentService.createTextOutput("ok");
}
```
3. Copy the web app URL and set it in Vercel (website project) as `LEADS_SHEET_WEBHOOK`. Redeploy.

If it is not set, nothing changes: leads still save to the database.
