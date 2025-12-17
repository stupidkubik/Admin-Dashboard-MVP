#!/usr/bin/env node

const { spawn } = require("node:child_process");

const nextBin = require.resolve("next/dist/bin/next");
const args = ["--inspect", nextBin, "dev", ...process.argv.slice(2)];

const child = spawn(process.execPath, args, {
  stdio: "inherit",
  env: { ...process.env },
});

child.on("close", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
