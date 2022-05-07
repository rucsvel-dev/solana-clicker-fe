import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import {
  Connection,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";
// import Wallet from "@project-serum/sol-wallet-adapter";

import SolanaContext from "./SolanaContext";
import { getUserStateAccount } from "../../utils/programInteraction";

const getWalletProvider = () => {
  if (window.solana) {
    return window.solana;
  }
};

const SolanaProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState(undefined);
  const [connection, setConnection] = useState(undefined);
  const [userStateAccount, setUserStateAccount] = useState(undefined);

  const onWalletConnect = async () => {
    const walletProvider: any = getWalletProvider();
    const wallet: any = await walletProvider.connect();

    setWallet(new PublicKey(wallet.publicKey));
  };

  useEffect(() => {
    if (wallet && !userStateAccount) {
      getUserStateAccount(wallet).then((userStatePubkey) =>
        setUserStateAccount(userStatePubkey)
      );
    }
  }, [wallet]);

  useEffect(() => {
    const connection: any = new Connection(clusterApiUrl("devnet"));
    setConnection(connection);
  }, []);

  const solanaApi = useMemo(
    () => ({
      isConnectedToProgram: Boolean(connection),
      connection,
      onWalletConnect,
      userStateAi: userStateAccount,
      address: wallet,
    }),
    [wallet, userStateAccount, connection]
  );

  return (
    <SolanaContext.Provider value={solanaApi}>
      {children}
    </SolanaContext.Provider>
  );
};

export default SolanaProvider;
