// Weirdest Job Title: Blind Judge Showdown
// Entry for make.fun competition
// u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922
// Repo: yusfiyan/u-rusdyxbt-weirdest-job-title-blind-judge-showdown-552d7922
//
// Writes a single job title of 1-60 characters to
// $MAKEFUN_OUTPUT_DIR/entry.txt and nothing else. The grader runs the
// repo read-only, so the program writes only to the output directory,
// never a relative path. Node 22 stdlib only, deterministic, no
// network, no assets.
//
// The title: a deadpan bureaucratic post ("Chief ... for ...") with one
// gloriously specific twist. An exorcist is already an odd job; haunting
// a vending machine — the most mundane object in the building — is the
// absurd detail, and it lands on the first read: a priest with holy
// water at the snack machine, on the payroll, forever.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TITLE = "Chief Exorcist for Haunted Vending Machines";

// Gate guard: the sealed scorer requires UTF-8 text of 1 to 60
// characters, not only white space. Fail loudly instead of writing
// an entry the house would refuse.
if (TITLE.length < 1 || TITLE.length > 60 || TITLE.trim().length === 0) {
  throw new Error(`entry must be 1-60 characters, got ${TITLE.length}`);
}
if (TITLE.includes("\n") || TITLE.includes("\r")) {
  throw new Error("entry must be exactly one line");
}
if (TITLE !== TITLE.trim() || TITLE.includes("  ")) {
  throw new Error("entry must not have leading/trailing or double spaces");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TITLE, "utf8");

// Read the artifact back: the gate reads the file, not the string, so
// confirm the bytes on disk are exactly the title before reporting
// success. A mismatch here means the run failed, not the entry.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== TITLE) {
  throw new Error("entry.txt on disk does not match the title");
}

console.log(`wrote entry.txt (${TITLE.length} chars) to ${outDir}`);
