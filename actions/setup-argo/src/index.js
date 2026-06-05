import { getInput, info, setFailed } from "@actions/core";
import { createHash } from 'crypto';
import { exec } from "@actions/exec";
import { Readable } from "stream";
import { finished } from "stream/promises";
import { createWriteStream, createReadStream } from "fs";

async function download(version) {
  const assetsResponse = await fetch('https://api.github.com/repos/argoproj/argo-workflows/releases', {
    method: 'GET',
    headers: {
      "Accept": 'application/vnd.github+json',
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!assetsResponse.ok) {
    throw new Error(`failed to get release with status code ${assetsResponse.status}: ${await assetsResponse.text()}`);
  }
  const assetsData = await assetsResponse.json();
  const assets = assetsData.find(x => x.name === version)
  const assetId = assets.assets.find(x => x.name === `argo-linux-amd64.gz`).id

  const downloadResponse = await fetch(`https://api.github.com/repos/argoproj/argo/releases/assets/${assetId}`, {
    method: 'GET',
    headers: {
      "Accept": "application/octet-stream",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (!downloadResponse.ok) {
    throw new Error(`failed to get release assets with status code ${downloadResponse.status}: ${await downloadResponse.text()}`);
  }
  const fileStream = createWriteStream("argo-linux-amd64.gz", { flags: 'wx' });
  await finished(Readable.fromWeb(downloadResponse.body).pipe(fileStream));

  const filePath = "argo-linux-amd64.gz"
  const algorithm = 'sha256';
  const actualChecksum = await calculateChecksum(filePath, algorithm);
  const expectedChecksum = getInput('checksum');
  if (actualChecksum.toLowerCase() === expectedChecksum.toLowerCase()) {
    info(`✅ Checksum verified successfully! (${actualChecksum})`);
  } else {
    setFailed(`❌ Checksum mismatch!\nExpected: ${expectedChecksum}\nActual:   ${actualChecksum}`);
  }
  await exec("gunzip", ["argo-linux-amd64.gz"]);
}

async function calculateChecksum(filePath, algorithm) {
  return new Promise((resolve, reject) => {
    const hash = createHash(algorithm);
    const stream = createReadStream(filePath);

    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', (err) => reject(err));
  });
}

async function install() {
  await exec("chmod", ["+x", `argo-linux-amd64`]);
  await exec("sudo", ["install", "-m", "555", "argo-linux-amd64", "/usr/local/bin/argo"])
}

async function run() {
  const version = getInput("version")
  await download(version)
  await install()
  await exec("argo", ["--help"]);
}

run();
