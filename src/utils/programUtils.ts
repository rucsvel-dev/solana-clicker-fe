import { PublicKey } from "@solana/web3.js";

import { clickerProgramAddress } from "../../config";

export const getProgramPubKey = () => new PublicKey(clickerProgramAddress);
