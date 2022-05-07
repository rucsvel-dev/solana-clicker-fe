import { createContext } from "react";
import { PublicKey } from "@solana/web3.js";

export type TSolanaContext = {
  address: string;
  onWalletConnect: () => void;
  isConnectedToProgram: boolean;
  connection: any;
  userStateAi: PublicKey | null;
};

const SolanaContext = createContext<TSolanaContext | null>(null);

export default SolanaContext;
