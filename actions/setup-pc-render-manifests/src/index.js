import { getInput, addPath } from "@actions/core";
import { exec } from "@actions/exec";
import { mkdirP, cp } from "@actions/io";
import { Readable } from "stream";
import { finished } from "stream/promises";
import { createWriteStream } from "fs";
import { homedir } from "os";
import { join } from "path";

async function download(version, token) {
  const assetsResponse = await fetch('https://api.github.com/repos/pass-culture/pc-render-manifests/releases', {
    method: 'GET',
    headers: {
      "Accept": 'application/vnd.github+json',
      "X-GitHub-Api-Version": "2022-11-28",
      "Authorization": `Bearer ${token}`
    },
  });
  if (!assetsResponse.ok) {
    throw new Error(`failed to get release with status code ${assetsResponse.status}: ${await assetsResponse.text()}`);
  }
  const assetsData = await assetsResponse.json();
  const assets = assetsData.find(x => x.name === version)
  const assetId = assets.assets.find(x => x.name === `pc-render-manifests_${version.replace(/^v/, '')}_linux_amd64.tar.gz`).id

  const downloadResponse = await fetch(`https://api.github.com/repos/pass-culture/pc-render-manifests/releases/assets/${assetId}`, {
    method: 'GET',
    headers: {
      "Accept": "application/octet-stream",
      "X-GitHub-Api-Version": "2022-11-28",
      "Authorization": `Bearer ${token}`
    },
  });
  if (!downloadResponse.ok) {
    throw new Error(`failed to get release assets with status code ${downloadResponse.status}: ${await downloadResponse.text()}`);
  }
  const fileStream = createWriteStream("pc-render-manifests.tar.gz", { flags: 'wx' });
  await finished(Readable.fromWeb(downloadResponse.body).pipe(fileStream));
  await exec("tar", ["-xzvf", "pc-render-manifests.tar.gz"]);
  return "pc-render-manifests"
}

async function install(downloadPath) {
  const binPath = `${homedir}/bin`;
  await mkdirP(binPath);
  await cp(downloadPath, join(binPath, "pc-render-manifests"));
  await exec("chmod", ["+x", `${binPath}/pc-render-manifests`]);
  addPath(binPath);
}

async function run() {
  const version = getInput("version")
  const token = getInput("token")
  const path = await download(version, token)
  await install(path)
  await exec("./pc-render-manifests", ["--help"]);
}

run();
