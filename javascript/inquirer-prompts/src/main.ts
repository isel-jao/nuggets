import {
  input,
  number,
  password,
  confirm,
  editor,
  select,
  rawlist,
  expand,
  checkbox,
  search,
  Separator,
} from "@inquirer/prompts";

async function main() {
  // quick input with timeout, returns default value if timeout is reached
  const quickInput = await input(
    { message: "Quick! (5s)" },
    { signal: AbortSignal.timeout(5000), clearPromptOnDone: true },
  ).catch((e) => {
    if (e.name === "AbortPromptError") return "default";
    throw e;
  });

  // free text
  const name = await input({
    message: "Name",
    default: "forge-app",
    required: true,
    validate: (v) => /^[a-z-]+$/.test(v) || "lowercase + dashes only", // string = error msg
    transformer: (v, { isFinal }) => (isFinal ? v.toUpperCase() : v), // display only
  });

  // numeric (returns number | undefined)
  const port = await number({
    message: "Port",
    default: 3000,
    min: 1,
    max: 65535,
  });

  // hidden input
  const token = await password({ message: "API token", mask: "*" }); // mask: true | string

  // y/n
  const ok = await confirm({ message: "Continue?", default: true });

  // opens $EDITOR
  const notes = await editor({ message: "Release notes", postfix: ".md" });

  // single choice, arrow keys. Return type is inferred from `value`
  const db = await select({
    message: "Database",
    choices: [
      { name: "Postgres", value: "pg", description: "Recommended" },
      { name: "SQLite", value: "sqlite" },
      new Separator(),
      { name: "MySQL", value: "mysql", disabled: "(coming soon)" },
    ],
    default: "pg",
    pageSize: 7,
    loop: false,
  }); // db: 'pg' | 'sqlite' | 'mysql'

  // numbered list (type 1, 2, 3…)
  const env = await rawlist({
    message: "Env",
    choices: ["dev", "staging", "prod"],
  });

  // single-key shortcuts, collapsed by default
  const action = await expand({
    message: "Conflict",
    default: "o",
    choices: [
      { key: "o", name: "Overwrite", value: "overwrite" },
      { key: "s", name: "Skip", value: "skip" },
    ],
  });

  // multi-select → array
  const features = await checkbox({
    message: "Features",
    choices: [
      { name: "Auth", value: "auth", checked: true },
      { name: "i18n", value: "i18n" },
    ],
    required: true,
    validate: (picked) => picked.length <= 3 || "Max 3",
  });

  // async autocomplete
  const pkg = await search({
    message: "npm package",
    source: async (term, { signal }) => {
      if (!term) return [];
      const res = await fetch(
        `https://registry.npmjs.org/-/v1/search?text=${term}`,
        { signal },
      );
      const { objects } = await res.json();
      return objects.map((o: any) => ({
        name: o.package.name,
        value: o.package.name,
      }));
    },
  });

  console.log({
    quickInput,
    name,
    port,
    token,
    ok,
    notes,
    db,
    env,
    action,
    features,
    pkg,
  });
}

main().catch((e) => {
  if (e instanceof Error && e.name === "ExitPromptError") {
    console.log("👋 cancelled");
    process.exit(130);
  }
  throw e;
});
