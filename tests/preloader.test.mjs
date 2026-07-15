import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the replacement loader keeps the established three-second timeline", async () => {
  const source = await readFile(new URL("../src/components/Preloader.tsx", import.meta.url), "utf8");

  assert.match(source, /LOADER_DURATION_MS = 3000/);
  assert.match(source, /src="\/loader2\.mp4"/);
  assert.match(source, /v\.addEventListener\('playing', startTimeline\)/);
  assert.match(source, /LOADER_PLAYBACK_RATE = 1\.96/);
  assert.match(source, /v\.playbackRate = LOADER_PLAYBACK_RATE/);
  assert.match(source, /requestAnimationFrame\(updateProgress\)/);
  assert.match(source, /absolute inset-0 overflow-hidden/);
  assert.match(source, /h-full w-full object-cover opacity-45/);
});
