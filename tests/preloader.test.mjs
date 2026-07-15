import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("the replacement loader keeps the established three-second timeline", async () => {
  const source = await readFile(new URL("../src/components/Preloader.tsx", import.meta.url), "utf8");

  assert.match(source, /LOADER_DURATION_MS = 3000/);
  assert.match(source, /src="\/loader2\.mp4"/);
  assert.match(source, /v\.playbackRate = v\.duration \/ \(LOADER_DURATION_MS \/ 1000\)/);
  assert.match(source, /max-w-\[340px\] object-contain/);
  assert.match(source, /justify-start bg-\[#071A3D\] motion-reduce:justify-center lg:justify-center/);
  assert.match(source, /pt-52 text-center motion-reduce:pt-0 lg:hidden/);
});
