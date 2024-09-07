import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

function App() {
  const mnemonic = generateMnemonic();
  console.log("Mnemonic:", mnemonic);

  const seed = mnemonicToSeedSync(mnemonic);

  for (let i = 0; i < 4; i++) {
    const path = `m/44'/0'/${i}'/0'/0'`; // Derivation path 
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    // Create the key pair from the derived seed
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed);

    // Get the secret (private) key and the public key
    const secretKey = keyPair.secretKey; // Private key
    const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58(); // Public key

    // Display private and public key
    console.log(`Account ${i}:`);
    console.log("Private Key (secret):", Buffer.from(secretKey).toString("hex"));
    console.log("Public Key:", publicKey);
  }

  return <>{}</>;
}

export default App;
