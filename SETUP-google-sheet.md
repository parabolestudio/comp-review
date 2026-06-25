# Connect the quiz to a Google Sheet

The quiz POSTs each submission to a **Google Apps Script web app**, which appends
one row per response to a Google Sheet on your Drive. Follow these steps once.

## 1. Create the destination sheet
1. Go to <https://sheets.google.com> and create a new blank spreadsheet.
2. Name it something like **"Compensation review — responses"**.

## 2. Add the script
1. In that sheet: **Extensions ▸ Apps Script**.
2. Delete whatever starter code is in `Code.gs`.
3. Open [`apps-script/Code.gs`](apps-script/Code.gs) from this repo, copy the **whole** file, paste it in.
4. Click the **Save** icon (💾).

## 3. Deploy as a web app
1. Click **Deploy ▸ New deployment**.
2. Click the gear ⚙ next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** `quiz receiver` (anything)
   - **Execute as:** **Me**
   - **Who has access:** **Anyone**
4. Click **Deploy**.
5. Google will ask you to **authorize** — approve it (it's your own script writing to your own sheet). If you see an "unverified app" warning, click *Advanced ▸ Go to (project)*.
6. Copy the **Web app URL** — it ends in `/exec`.

## 4. Wire it into the quiz
1. Open `quiz.html`.
2. Find `CONFIG.SHEET_ENDPOINT` near the top of the `<script>` block.
3. Replace the URL inside the quotes with the `/exec` URL you copied.
4. Save, commit, and push (`git add . && git commit -m "Connect sheet" && git push`).
   The live page updates within a minute.

## 5. Test it
1. Open the `/exec` URL directly in a browser — you should see
   `{"ok":true,"message":"Parabole review endpoint is live"}`.
2. Fill in the quiz on the live site and submit.
3. A new row should appear in the **Responses** tab of your sheet.

## Notes
- **Re-deploying after code changes:** if you edit `Code.gs` later, use
  **Deploy ▸ Manage deployments ▸ ✏ Edit ▸ Version: New version ▸ Deploy** so the
  URL stays the same. A brand-new deployment gives a *new* URL you'd have to paste again.
- The quiz sends `headers` + a flat `row` per submission, so each question gets its
  own column (answer + an optional note column).
