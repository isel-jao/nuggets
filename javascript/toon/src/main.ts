import { encode as toonEncode, decode as toonDecode } from "@toon-format/toon";
import { encode as cborEncode, decode as cborDecode } from "cbor-x";
import { gzipSync, brotliCompressSync, constants, InputType } from "node:zlib";
import { performance } from "node:perf_hooks";

const data = {
  users: [
    {
      id: 1,
      name: "Alice",
      age: 30,
      birthday: new Date("1993-01-15"),
      isActive: true,
    },
    {
      id: 2,
      name: "Bob",
      age: 25,
      birthday: new Date("1998-05-22"),
      isActive: false,
    },
    {
      id: 3,
      name: "Charlie",
      age: 35,
      birthday: new Date("1988-09-10"),
      isActive: true,
    },
  ],
  success: true,
};

function encode(
  data: unknown,
  format: "toon" | "cbor" | "json" = "json",
): Buffer<ArrayBufferLike> {
  let buffer: Buffer<ArrayBufferLike>;
  if (format === "toon") {
    buffer = Buffer.from(toonEncode(data));
  } else if (format === "cbor") {
    buffer = cborEncode(data);
  }
  return Buffer.from(JSON.stringify(data));
}

function decode(
  buffer: Buffer<ArrayBufferLike> | Uint8Array<ArrayBufferLike>,
  format: "toon" | "cbor" | "json" = "json",
): unknown {
  if (format === "toon") {
    return toonDecode(buffer.toString());
  }
  if (format === "cbor") {
    return cborDecode(buffer);
  }
  return JSON.parse(buffer.toString());
}

const jsonBuffer = encode(data, "json");
const toonBuffer = encode(data, "toon");
const cborBuffer = encode(data, "cbor");

console.log("JSON Buffer length:", jsonBuffer.length);
console.log("TOON Buffer length:", toonBuffer.length);
console.log("CBOR Buffer length:", cborBuffer.length);

const decodedJson = decode(jsonBuffer, "json");
const decodedToon = decode(toonBuffer, "toon");
const decodedCbor = decode(cborBuffer, "cbor");

console.log("Decoded JSON:", decodedJson);
console.log("Decoded TOON:", decodedToon);
console.log("Decoded CBOR:", decodedCbor);

// // --- realistic query result: what a postgres adapter actually returns ---
// const N = 2000;
// const rows = Array.from({ length: N }, (_, i) => ({
//   id: i + 1,
//   order_ref: `ORD-2026-${String(i).padStart(6, "0")}`,
//   customer_email: `user${i}@example.com`,
//   status: ["pending", "shipped", "delivered", "cancelled"][i % 4],
//   total_cents: 1000 + ((i * 37) % 90000),
//   discount_pct: Number(((i % 30) / 100).toFixed(2)),
//   is_priority: i % 7 === 0,
//   notes: i % 5 === 0 ? null : "Leave at front desk, ring twice",
//   created_at: new Date(Date.UTC(2026, 0, 1 + (i % 180), i % 24, i % 60)),
// }));

// const toColumnar = (objs: any[]) => {
//   if (!objs.length) return { columns: [], rows: [] };
//   const columns = Object.keys(objs[0]);
//   return {
//     columns,
//     rows: objs.map((o: { [x: string]: any }) => columns.map((c) => o[c])),
//   };
// };

// const gz = (b: Buffer<ArrayBufferLike> | InputType) => gzipSync(b).length;
// const br = (b: Buffer<ArrayBufferLike> | InputType) =>
//   brotliCompressSync(b, { params: { [constants.BROTLI_PARAM_QUALITY]: 5 } })
//     .length;

// const time = (
//   fn:
//     | (() => Buffer<ArrayBuffer>)
//     | (() => Buffer<ArrayBuffer>)
//     | (() => Buffer<ArrayBuffer>)
//     | (() => Buffer<ArrayBufferLike>)
//     | (() => Buffer<ArrayBufferLike>),
//   iters = 30,
// ) => {
//   fn(); // warm
//   const t0 = performance.now();
//   for (let i = 0; i < iters; i++) fn();
//   return (performance.now() - t0) / iters;
// };

// const columnar = toColumnar(rows);

// const variants = {
//   "JSON (rows)": {
//     enc: () => Buffer.from(JSON.stringify(rows)),
//     dec: (b: { toString: () => string }) => JSON.parse(b.toString()),
//   },
//   "JSON (columnar)": {
//     enc: () => Buffer.from(JSON.stringify(columnar)),
//     dec: (b: { toString: () => string }) => JSON.parse(b.toString()),
//   },
//   "TOON (rows)": {
//     enc: () => Buffer.from(toonEncode({ rows })),
//     dec: (b: { toString: () => string }) => toonDecode(b.toString()),
//   },
//   "CBOR (rows)": {
//     enc: () => cborEncode(rows),
//     dec: (b: Buffer<ArrayBufferLike> | Uint8Array<ArrayBufferLike>) =>
//       cborDecode(b),
//   },
//   "CBOR (columnar)": {
//     enc: () => cborEncode(columnar),
//     dec: (b: Buffer<ArrayBufferLike> | Uint8Array<ArrayBufferLike>) =>
//       cborDecode(b),
//   },
// };

// const results = [];
// for (const [name, { enc, dec }] of Object.entries(variants)) {
//   const buf = enc();
//   results.push({
//     name,
//     raw: buf.length,
//     gzip: gz(buf),
//     brotli: br(buf),
//     encMs: time(enc),
//     decMs: time(() => dec(buf)),
//   });
// }

// const base = results[0];
// const pad = (s: string, n: number) => String(s).padEnd(n);
// const num = (s: string, n: number) => String(s).padStart(n);

// console.log(`\n${N} rows, 9 columns\n`);
// console.log(
//   pad("format", 18) +
//     num("raw", 9) +
//     num("gzip", 9) +
//     num("brotli", 9) +
//     num("enc ms", 9) +
//     num("dec ms", 9) +
//     num("gz vs JSON", 12),
// );
// console.log("-".repeat(75));
// for (const r of results) {
//   console.log(
//     pad(r.name, 18) +
//       num(r.raw.toLocaleString(), 9) +
//       num(r.gzip.toLocaleString(), 9) +
//       num(r.brotli.toLocaleString(), 9) +
//       num(r.encMs.toFixed(2), 9) +
//       num(r.decMs.toFixed(2), 9) +
//       num(((r.gzip / base.gzip - 1) * 100).toFixed(1) + "%", 12),
//   );
// }

// // // --- type fidelity round-trip ---
// // console.log("\n--- round-trip fidelity ---");
// // const probe = {
// //   rows: [
// //     {
// //       d: new Date("2026-03-01T12:00:00Z"),
// //       n: null,
// //       s: "null",
// //       z: "007",
// //       f: 1.5,
// //       b: false,
// //     },
// //   ],
// // };
// // const viaToon = toonDecode(toonEncode(probe)).rows[0];
// // const viaCbor = cborDecode(cborEncode(probe)).rows[0];

// // const show = (v: any) =>
// //   `${JSON.stringify(v)}${v instanceof Date ? " [Date]" : ""} (${typeof v})`;

// // for (const k of Object.keys(probe.rows[0])) {
// //   console.log(
// //     `${pad(k, 3)} in: ${pad(show(probe.rows[0][k]), 34)} toon: ${pad(show(viaToon[k]), 26)} cbor: ${show(viaCbor[k])}`,
// //   );
// // }
