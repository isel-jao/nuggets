/**
 * NODE:CRYPTO - COMPLETE GUIDE
 * A comprehensive example file covering all crypto module functionality
 */

import crypto from "node:crypto";
import fs from "node:fs";
import { promisify } from "node:util";

// Promisified versions for older Node versions
const randomBytesAsync = promisify(crypto.randomBytes);
const pbkdf2Async = promisify(crypto.pbkdf2);
const scryptAsync = promisify(crypto.scrypt);

// =============================================================================
// 1. HASHING
// =============================================================================

function basicHashing() {
  console.log("\n=== BASIC HASHING ===");

  const hash = crypto.createHash("sha256");
  hash.update("Hello World");
  console.log("SHA-256:", hash.digest("hex"));

  // Different algorithms
  const md5 = crypto.createHash("md5").update("test").digest("hex");
  const sha1 = crypto.createHash("sha1").update("test").digest("hex");
  const sha512 = crypto.createHash("sha512").update("test").digest("hex");

  console.log("MD5:", md5);
  console.log("SHA-1:", sha1);
  console.log("SHA-512:", sha512);
}

function hashFile(filepath) {
  console.log("\n=== HASHING FILES ===");

  const stream = fs.createReadStream(filepath);
  const hash = crypto.createHash("sha256");

  stream.on("data", (chunk) => hash.update(chunk));
  stream.on("end", () => {
    console.log("File hash:", hash.digest("hex"));
  });
  stream.on("error", (err) => {
    console.error("Error reading file:", err.message);
  });
}

// =============================================================================
// 2. HMAC (Hash-based Message Authentication Code)
// =============================================================================

function hmacExample() {
  console.log("\n=== HMAC ===");

  const secret = "my-secret-key";
  const message = "Important message";

  // Create HMAC
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(message);
  const signature = hmac.digest("hex");

  console.log("Signature:", signature);

  // Verify HMAC
  const verifyHmac = crypto.createHmac("sha256", secret);
  verifyHmac.update(message);
  const isValid = signature === verifyHmac.digest("hex");

  console.log("Verification:", isValid);
}

// =============================================================================
// 3. RANDOM DATA GENERATION
// =============================================================================

function randomDataExamples() {
  console.log("\n=== RANDOM DATA ===");

  // Random bytes (synchronous)
  const randomBytesSync = crypto.randomBytes(32);
  console.log("Random bytes (hex):", randomBytesSync.toString("hex"));
  console.log("Random bytes (base64):", randomBytesSync.toString("base64"));

  // Random UUID
  const uuid = crypto.randomUUID();
  console.log("UUID:", uuid);

  // Random integers
  const randomInt = crypto.randomInt(100);
  console.log("Random int (0-99):", randomInt);

  const randomRange = crypto.randomInt(50, 151);
  console.log("Random int (50-150):", randomRange);
}

async function randomDataAsync() {
  console.log("\n=== RANDOM DATA (ASYNC) ===");

  // Promise-based random bytes
  const buf = await randomBytesAsync(32);
  console.log("Async random bytes:", buf.toString("hex"));
}

// =============================================================================
// 4. PASSWORD HASHING WITH PBKDF2
// =============================================================================

async function pbkdf2Example() {
  console.log("\n=== PBKDF2 PASSWORD HASHING ===");

  const password = "mySecurePassword123";

  // Hash password
  const salt = await randomBytesAsync(16);
  const hash = await pbkdf2Async(password, salt, 100000, 64, "sha512");

  const stored = {
    salt: salt.toString("hex"),
    hash: hash.toString("hex"),
  };

  console.log("Password hashed successfully");
  console.log("Salt:", stored.salt);
  console.log("Hash:", stored.hash.substring(0, 50) + "...");

  // Verify password
  const verifyHash = await pbkdf2Async(
    password,
    Buffer.from(stored.salt, "hex"),
    100000,
    64,
    "sha512"
  );

  const isValid = verifyHash.toString("hex") === stored.hash;
  console.log("Password verification:", isValid);
}

// =============================================================================
// 5. SCRYPT (RECOMMENDED FOR PASSWORDS)
// =============================================================================

async function scryptExample() {
  console.log("\n=== SCRYPT PASSWORD HASHING ===");

  const password = "mySecurePassword123";

  // Hash password
  const salt = await randomBytesAsync(16);
  const hash = await scryptAsync(password, salt, 64);

  const stored = {
    salt: salt.toString("hex"),
    hash: hash.toString("hex"),
  };

  console.log("Password hashed with scrypt");
  console.log("Salt:", stored.salt);
  console.log("Hash:", stored.hash.substring(0, 50) + "...");

  // Verify password
  const verifyHash = await scryptAsync(
    password,
    Buffer.from(stored.salt, "hex"),
    64
  );

  const isValid = verifyHash.toString("hex") === stored.hash;
  console.log("Password verification:", isValid);
}

// =============================================================================
// 6. SYMMETRIC ENCRYPTION (AES-256-GCM)
// =============================================================================

function encryptAES(text, password) {
  const algorithm = "aes-256-gcm";
  const key = crypto.scryptSync(password, "salt", 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return {
    encrypted,
    iv: iv.toString("hex"),
    authTag: authTag.toString("hex"),
  };
}

function decryptAES(encrypted, password, iv, authTag) {
  const algorithm = "aes-256-gcm";
  const key = crypto.scryptSync(password, "salt", 32);

  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, "hex")
  );

  decipher.setAuthTag(Buffer.from(authTag, "hex"));

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

function aesExample() {
  console.log("\n=== AES-256-GCM ENCRYPTION ===");

  const plaintext = "This is a secret message!";
  const password = "myStrongPassword";

  // Encrypt
  const { encrypted, iv, authTag } = encryptAES(plaintext, password);
  console.log("Encrypted:", encrypted);
  console.log("IV:", iv);
  console.log("Auth Tag:", authTag);

  // Decrypt
  const decrypted = decryptAES(encrypted, password, iv, authTag);
  console.log("Decrypted:", decrypted);
  console.log("Match:", plaintext === decrypted);
}

// =============================================================================
// 7. ASYMMETRIC ENCRYPTION (RSA)
// =============================================================================

function rsaExample() {
  console.log("\n=== RSA ASYMMETRIC ENCRYPTION ===");

  // Generate key pair
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });

  console.log("Public Key:\n", publicKey.substring(0, 100) + "...");
  console.log("Private Key:\n", privateKey.substring(0, 100) + "...");

  // Encrypt with public key
  const message = "Secret RSA message";
  const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message));

  console.log("Encrypted:", encrypted.toString("base64"));

  // Decrypt with private key
  const decrypted = crypto.privateDecrypt(privateKey, encrypted);

  console.log("Decrypted:", decrypted.toString());
  console.log("Match:", message === decrypted.toString());
}

// =============================================================================
// 8. DIGITAL SIGNATURES
// =============================================================================

function digitalSignatureExample() {
  console.log("\n=== DIGITAL SIGNATURES ===");

  // Generate key pair
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });

  const data = "Important document content";

  // Sign data
  const sign = crypto.createSign("SHA256");
  sign.update(data);
  sign.end();
  const signature = sign.sign(privateKey, "hex");

  console.log("Signature:", signature.substring(0, 50) + "...");

  // Verify signature
  const verify = crypto.createVerify("SHA256");
  verify.update(data);
  verify.end();
  const isValid = verify.verify(publicKey, signature, "hex");

  console.log("Signature valid:", isValid);

  // Try with tampered data
  const verifyTampered = crypto.createVerify("SHA256");
  verifyTampered.update("Tampered document content");
  verifyTampered.end();
  const isTamperedValid = verifyTampered.verify(publicKey, signature, "hex");

  console.log("Tampered signature valid:", isTamperedValid);
}

// =============================================================================
// 9. DIFFIE-HELLMAN KEY EXCHANGE
// =============================================================================

function diffieHellmanExample() {
  console.log("\n=== DIFFIE-HELLMAN KEY EXCHANGE ===");

  // Alice generates her keys
  const alice = crypto.createDiffieHellman(2048);
  const alicePublicKey = alice.generateKeys();

  // Bob generates his keys using Alice's parameters
  const bob = crypto.createDiffieHellman(
    alice.getPrime(),
    alice.getGenerator()
  );
  const bobPublicKey = bob.generateKeys();

  // Both compute the shared secret
  const aliceSharedSecret = alice.computeSecret(bobPublicKey);
  const bobSharedSecret = bob.computeSecret(alicePublicKey);

  console.log(
    "Alice shared secret:",
    aliceSharedSecret.toString("hex").substring(0, 50) + "..."
  );
  console.log(
    "Bob shared secret:",
    bobSharedSecret.toString("hex").substring(0, 50) + "..."
  );
  console.log("Secrets match:", aliceSharedSecret.equals(bobSharedSecret));
}

function ecdhExample() {
  console.log("\n=== ECDH KEY EXCHANGE ===");

  // Alice
  const alice = crypto.createECDH("secp256k1");
  alice.generateKeys();

  // Bob
  const bob = crypto.createECDH("secp256k1");
  bob.generateKeys();

  // Compute shared secrets
  const aliceSecret = alice.computeSecret(bob.getPublicKey());
  const bobSecret = bob.computeSecret(alice.getPublicKey());

  console.log("Alice secret:", aliceSecret.toString("hex"));
  console.log("Bob secret:", bobSecret.toString("hex"));
  console.log("Secrets match:", aliceSecret.equals(bobSecret));
}

// =============================================================================
// 10. TIMING-SAFE COMPARISON
// =============================================================================

function timingSafeExample() {
  console.log("\n=== TIMING-SAFE COMPARISON ===");

  const token1 = "secret-token-12345";
  const token2 = "secret-token-12345";
  const token3 = "secret-token-99999";

  // WRONG - vulnerable to timing attacks
  console.log("Regular comparison (UNSAFE):", token1 === token2);

  // CORRECT - constant-time comparison
  const buf1 = Buffer.from(token1);
  const buf2 = Buffer.from(token2);
  const buf3 = Buffer.from(token3);

  try {
    const isMatch =
      buf1.length === buf2.length && crypto.timingSafeEqual(buf1, buf2);
    console.log("Timing-safe comparison (token1 vs token2):", isMatch);

    const isNotMatch =
      buf1.length === buf3.length && crypto.timingSafeEqual(buf1, buf3);
    console.log("Timing-safe comparison (token1 vs token3):", isNotMatch);
  } catch (err) {
    console.log("Comparison failed - buffers different lengths");
  }
}

// =============================================================================
// 11. WEB CRYPTO API
// =============================================================================

async function webCryptoExample() {
  console.log("\n=== WEB CRYPTO API ===");

  const { webcrypto } = crypto;
  const { subtle } = webcrypto;

  // Generate AES key
  const key = await subtle.generateKey({ name: "AES-GCM", length: 256 }, true, [
    "encrypt",
    "decrypt",
  ]);

  console.log("Generated AES-256-GCM key");

  // Encrypt
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode("Secret message");

  const encrypted = await subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintext
  );

  console.log("Encrypted (base64):", Buffer.from(encrypted).toString("base64"));

  // Decrypt
  const decrypted = await subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );

  const decryptedText = new TextDecoder().decode(decrypted);
  console.log("Decrypted:", decryptedText);
}

// =============================================================================
// 12. UTILITY FUNCTIONS
// =============================================================================

function getCipherInfo() {
  console.log("\n=== AVAILABLE CIPHERS ===");
  const ciphers = crypto.getCiphers();
  console.log("Total ciphers available:", ciphers.length);
  console.log("Sample ciphers:", ciphers.slice(0, 10).join(", "));
}

function getHashInfo() {
  console.log("\n=== AVAILABLE HASHES ===");
  const hashes = crypto.getHashes();
  console.log("Total hashes available:", hashes.length);
  console.log("Sample hashes:", hashes.slice(0, 10).join(", "));
}

function getCurveInfo() {
  console.log("\n=== AVAILABLE CURVES ===");
  const curves = crypto.getCurves();
  console.log("Total curves available:", curves.length);
  console.log("Sample curves:", curves.slice(0, 10).join(", "));
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  console.log("==========================================");
  console.log("NODE:CRYPTO COMPLETE GUIDE");
  console.log("==========================================");

  try {
    // Synchronous examples
    basicHashing();
    hmacExample();
    randomDataExamples();
    aesExample();
    rsaExample();
    digitalSignatureExample();
    diffieHellmanExample();
    ecdhExample();
    timingSafeExample();
    getCipherInfo();
    getHashInfo();
    getCurveInfo();

    // Asynchronous examples
    await randomDataAsync();
    await pbkdf2Example();
    await scryptExample();
    await webCryptoExample();

    // File hashing (uncomment and provide a file path)
    // hashFile('./package.json');

    console.log("\n==========================================");
    console.log("All examples completed successfully!");
    console.log("==========================================\n");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Run all examples
main();

// Export functions for use in other modules
export {
  basicHashing,
  hmacExample,
  encryptAES,
  decryptAES,
  pbkdf2Example,
  scryptExample,
  rsaExample,
  digitalSignatureExample,
  timingSafeExample,
};
