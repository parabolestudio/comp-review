/**
 * Parabole — Compensation review quiz: Google Sheet receiver
 * ----------------------------------------------------------------
 * This is the code that must sit behind the web-app URL used in
 * quiz.html (CONFIG.SHEET_ENDPOINT). Without it, submissions are
 * sent into the void.
 *
 * SETUP (see SETUP-google-sheet.md for screenshots/detail):
 *   1. Open the Google Sheet you want answers saved to.
 *   2. Extensions ▸ Apps Script.
 *   3. Delete any starter code, paste THIS whole file, Save.
 *   4. Deploy ▸ New deployment ▸ type "Web app".
 *        - Execute as:      Me
 *        - Who has access:  Anyone
 *   5. Copy the Web app URL (ends in /exec).
 *   6. Paste it into quiz.html → CONFIG.SHEET_ENDPOINT.
 */

const SHEET_NAME = 'Responses';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    // Write the header row once, only while the sheet is still empty.
    if (sheet.getLastRow() === 0 && data.headers && data.headers.length) {
      sheet.appendRow(data.headers);
    }
    sheet.appendRow(data.row || []);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you confirm the endpoint is live by opening the /exec URL in a browser.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Parabole review endpoint is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}
