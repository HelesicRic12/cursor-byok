import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontendRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(frontendRoot, relativePath), "utf8"));

const catalog = readJson("src/i18n/generated/catalog.json").entries;
const sourceMessages = readJson("src/i18n/locales/zh-CN.json");
const englishMessages = readJson("src/i18n/locales/en-US.json");
const appShell = fs.readFileSync(path.join(frontendRoot, "index.html"), "utf8");
const placeholderPattern = /\{\d+\}/g;
const hanPattern = /[\p{Script=Han}]/u;

const sorted = (values) => [...values].sort();
const placeholders = (value) => sorted(String(value).match(placeholderPattern) || []);
const sameArray = (left, right) =>
  left.length === right.length && left.every((value, index) => value === right[index]);

const catalogKeys = new Set(Object.keys(catalog));
const englishKeys = new Set(Object.keys(englishMessages));
const errors = [];

const title = appShell.match(/<title>(.*?)<\/title>/s)?.[1]?.trim() || "";
if (!title) {
  errors.push("index.html: document title is missing");
} else if (hanPattern.test(title)) {
  errors.push(`index.html: document title contains Han characters (${JSON.stringify(title)})`);
}

for (const id of sorted(catalogKeys)) {
  const source = sourceMessages[id];
  const english = englishMessages[id];

  if (!(id in englishMessages)) {
    errors.push(`${id}: missing English entry (${JSON.stringify(source)})`);
    continue;
  }
  if (!String(english).trim()) {
    errors.push(`${id}: empty English entry (${JSON.stringify(source)})`);
  }
  if (hanPattern.test(String(english))) {
    errors.push(`${id}: English entry contains Han characters (${JSON.stringify(english)})`);
  }
  if (!sameArray(placeholders(source), placeholders(english))) {
    errors.push(
      `${id}: placeholders differ; source=${JSON.stringify(placeholders(source))}, English=${JSON.stringify(placeholders(english))}`,
    );
  }
}

for (const id of sorted(englishKeys)) {
  if (!catalogKeys.has(id)) {
    errors.push(`${id}: English entry is not present in the generated catalog`);
  }
}

if (errors.length) {
  console.error(`English localization check failed with ${errors.length} issue(s):`);
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`English localization check passed (${catalogKeys.size} messages).`);
