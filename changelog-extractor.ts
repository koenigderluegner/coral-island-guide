import * as fs from "fs";
import * as path from "path";

const changelog = fs.readFileSync(path.join(__dirname, 'packages/guide/src/CHANGELOG.md'), {encoding: "utf8"});

const firstLog = changelog.split('\n### ')[1];

const meta = firstLog.substring(0, firstLog.indexOf("\n")).trim()


const body = firstLog.substring(firstLog.indexOf("\n") + 1);

const metaParts = meta.split(' ').map(s => s.trim())
let version = '';
let date: string | undefined = undefined;
if (metaParts.length >= 2) {
    version = metaParts[0].trim();
    date = metaParts.slice(1).join(' ').trim();
} else {
    version = metaParts[0]
}

const latestChangelog = {
    version, date, body
}

fs.writeFileSync(path.join(__dirname, 'packages/guide/src/assets/latest-changelog.md'), JSON.stringify(latestChangelog), {flag: 'w'})






