import { chromium } from "playwright";
import fs from "node:fs";

const OUT = "/tmp/shots";
fs.mkdirSync(OUT, { recursive: true });

const run = async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 430, height: 932 },
    deviceScaleFactor: 2,
  });
  const shot = (n) => page.screenshot({ path: `${OUT}/pw-${n}.png` });
  const wait = (ms) => page.waitForTimeout(ms);

  await page.goto("http://localhost:5173");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await wait(600);
  await shot("01-home");

  await page.getByLabel("Start voice conversation").click();
  await wait(400);
  await shot("02-mic-permission");

  await page.getByRole("button", { name: "Allow", exact: true }).click();
  await wait(400);
  await shot("03-meet-new-voice");

  await page.getByRole("button", { name: "Start Voice", exact: true }).click();
  await wait(400);
  await shot("04-meet-voice");

  await page.getByRole("button", { name: "Continue" }).click();
  await wait(400);
  await shot("05-choose-voice-ember");
  await page.getByLabel("Maple").click();
  await wait(300);
  await shot("05b-choose-voice-maple");
  await page.getByRole("button", { name: "Continue" }).click();
  await wait(400);
  await shot("06-wake-wait");

  await page.getByRole("button", { name: "Continue" }).click();
  await wait(400);
  await shot("07-security");
  await page.getByRole("switch").click();
  await wait(200);
  await shot("07b-security-optout");
  await page.getByRole("button", { name: "Start Conversation" }).click();
  await wait(600);
  await shot("08-session-idle");

  await page.getByLabel("Microphone").click();
  await wait(1600);
  await shot("09-live-transcription");
  await wait(6500);
  await shot("09b-after-first-reply");

  await page.getByLabel("Microphone").click();
  await wait(5000);
  await shot("09c-second-exchange");

  await page.getByRole("button", { name: "Talk to ChatGPT" }).click();
  await page.getByPlaceholder("Type a message").fill("wait for my cue");
  await shot("10-typing-mode");
  await page.getByLabel("Send").click();
  await wait(3500);
  await shot("10b-cue-ack");

  await page.getByLabel("End conversation").click();
  await wait(500);
  await shot("11-transcript");

  await page.getByLabel("Positive").click();
  await wait(400);
  await shot("12-feedback-toast");

  await page.getByLabel("Message actions").click();
  await wait(400);
  await shot("13-context-menu");
  await page.getByRole("button", { name: "Edit", exact: true }).click();
  await wait(400);
  await shot("14-edit-message");

  await page
    .locator("textarea")
    .fill("What's a quick way to remember manga five forces before my strategy exam");
  await page.getByLabel("Send edit").click();
  await wait(500);
  await shot("15-transcript-after-edit");

  await page.getByLabel("Menu").first().click();
  await wait(500);
  await shot("16-demo-sheet-metrics");

  const dbJson = await page.evaluate(() =>
    localStorage.getItem("chatgpt-voice/db/v1"),
  );
  fs.writeFileSync(`${OUT}/db.json`, dbJson);

  // wake-word path from the sheet
  await page
    .getByRole("button", { name: "Simulate “Hey ChatGPT” (wake start)" })
    .click();
  await wait(600);
  await shot("17-wake-session");
  await page.getByLabel("End conversation").click();
  await wait(400);
  await page.getByLabel("Menu").first().click();
  await wait(400);
  await shot("18-metrics-after-wake");
  const dbJson2 = await page.evaluate(() =>
    localStorage.getItem("chatgpt-voice/db/v1"),
  );
  fs.writeFileSync(`${OUT}/db2.json`, dbJson2);

  await browser.close();
  console.log("WALKTHROUGH DONE");
};

run().catch((e) => {
  console.error("WALKTHROUGH FAILED:", e.message);
  process.exit(1);
});
