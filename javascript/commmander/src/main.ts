#!/usr/bin/env node
import { Command, Option, Argument } from "@commander-js/extra-typings";
// import { Argument } from "commander";

const program = new Command()
  .name("mycli")
  .description("Does things")
  .version("1.0.0"); // adds -V, --version

program
  .option("-d, --debug", "boolean flag") // true | undefined
  .option("-p, --port <number>", "required value", "3000") // string
  .option("-c, --config [path]", "optional value") // true | string
  .option("--no-color", "negatable") // color: true by default
  .option("-t, --tag <tags...>", "variadic") // string[]
  .option("-n, --count <n>", "parsed", (v) => Number.parseInt(v, 10), 1)
  .option("-v, --verbose", "repeatable", (_, prev: number) => prev + 1, 0)
  .requiredOption("-k, --key <key>", "must be provided");

program
  .addOption(
    new Option("-s, --size <size>")
      .choices(["sm", "md", "lg"] as const)
      .default("md"),
  )
  .addOption(new Option("--token <t>").env("API_TOKEN").makeOptionMandatory())
  .addOption(new Option("--json").conflicts("table"))
  .addOption(new Option("--ci").implies({ color: false }))
  .addOption(new Option("--color-mode [when]").preset("always"))
  .addOption(new Option("--secret").hideHelp());

program
  .argument("<src>", "required")
  .argument("[dest]", "optional", ".")
  .addArgument(
    new Argument("[env]").choices(["dev", "prod"] as const).default("dev"),
  )
  .argument("[files...]", "variadic, last only")
  .action((src, dest, env, files, options) => {
    console.log({ src, dest, env, files, options });
  });

async function main() {
  program.parse(); // reads process.argv
  const size = program.getOptionValueSource("size");
  const token = program.getOptionValueSource("token");
  const key = program.getOptionValueSource("key");
  const args = program.args; // fully typed
  console.log({ size, token, key, args });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
