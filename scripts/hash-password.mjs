/*
 * © 2020-2026 JustWhatever. All rights reserved.
 *  Property of Gavin Abu-Zahra. Do not reproduce or distribute without explicit permission.
 */

// Prints an ADMIN_PASSWORD_HASH value. The password is read from a hidden
// prompt (or stdin when piped) so it never lands in shell history.
import {randomBytes, scryptSync} from "crypto";
import {createInterface} from "readline";

const N = 32768, r = 8, p = 1, KEY_LENGTH = 64;

async function readPassword() {
  if (!process.stdin.isTTY) {
    let data = "";
    for await (const chunk of process.stdin) data += chunk;
    return data.replace(/\r?\n$/, "");
  }
  const rl = createInterface({input: process.stdin, output: process.stdout, terminal: true});
  process.stdout.write("Admin password: ");
  rl._writeToOutput = () => {}; // hide typed characters
  const password = await new Promise(resolve => rl.question("", resolve));
  rl.close();
  process.stdout.write("\n");
  return password;
}

const password = await readPassword();
if (password.length === 0) {
  console.error("Password is empty");
  process.exit(1);
}
const salt = randomBytes(16);
const hash = scryptSync(password, salt, KEY_LENGTH, {N, r, p, maxmem: 256 * 1024 * 1024});
console.log(`ADMIN_PASSWORD_HASH=scrypt:${N}:${r}:${p}:${salt.toString("hex")}:${hash.toString("hex")}`);
