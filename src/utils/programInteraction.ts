import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { getProgramPubKey } from "./programUtils";
import { Buffer } from "buffer";

export const initUser = async ({
  userPubkey,
  userStateAccount,
  connection,
}) => {
  const ix = new TransactionInstruction({
    keys: [
      { pubkey: userPubkey, isSigner: true, isWritable: true },
      { pubkey: userStateAccount, isSigner: false, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    programId: getProgramPubKey(),
    data: Buffer.from([0]),
  });
  const tx = new Transaction();
  tx.add(ix);
  tx.feePayer = userPubkey;
  tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

  const signed = await window.solana.signTransaction(tx);

  const signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature);
};

export const clickToProgram = async ({ userPubkey, connection }) => {
  const userStateAccount = await getUserStateAccount(userPubkey);

  const ix = new TransactionInstruction({
    keys: [
      { pubkey: userPubkey, isSigner: true, isWritable: true },
      { pubkey: userStateAccount, isSigner: false, isWritable: true },
    ],
    programId: getProgramPubKey(),
    data: Buffer.from([1]),
  });
  const tx = new Transaction();
  tx.add(ix);
  tx.feePayer = userPubkey;
  tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

  const signed = await window.solana.signTransaction(tx);

  const signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature, "singleGossip");
};

export const upgradeValuePerClick = async (
  { userPubkey, connection },
  variation
) => {
  const userStateAccount = await getUserStateAccount(userPubkey);

  const ix = new TransactionInstruction({
    keys: [
      { pubkey: userPubkey, isSigner: true, isWritable: true },
      { pubkey: userStateAccount, isSigner: false, isWritable: true },
    ],
    programId: getProgramPubKey(),
    data: Buffer.from([2, variation]),
  });
  const tx = new Transaction();
  tx.add(ix);
  tx.feePayer = userPubkey;
  tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

  const signed = await window.solana.signTransaction(tx);

  const signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature, "singleGossip");
};

export const transferClicksTo = async (
  { userPubkey, userToTransferAddress, connection },
  howMuchTransfer
) => {
  const userToTransferPubkey = new PublicKey(userToTransferAddress);
  const userStateAccount = await getUserStateAccount(userPubkey);
  const userToTransferAccount = await getUserStateAccount(userToTransferPubkey);

  const ix = new TransactionInstruction({
    keys: [
      { pubkey: userPubkey, isSigner: true, isWritable: true },
      { pubkey: userStateAccount, isSigner: false, isWritable: true },
      { pubkey: userToTransferPubkey, isSigner: false, isWritable: true },
      { pubkey: userToTransferAccount, isSigner: false, isWritable: true },
    ],
    programId: getProgramPubKey(),
    data: Buffer.from([3, howMuchTransfer, 0, 0, 0, 0, 0, 0, 0]),
  });
  console.log("===== ", Buffer.from([3, howMuchTransfer]));
  const tx = new Transaction();
  tx.add(ix);
  tx.feePayer = userPubkey;
  tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

  const signed = await window.solana.signTransaction(tx);

  const signature = await connection.sendRawTransaction(signed.serialize());
  await connection.confirmTransaction(signature, "singleGossip");
};

export const getClickerData = async ({ userStateAccount, connection }) =>
  (await connection.getAccountInfo(userStateAccount, "confirmed"))?.data;

export const getUserStateAccount = async (userPubkey) =>
  (
    await PublicKey.findProgramAddress(
      [userPubkey.toBuffer(), Buffer.from("user_state", "utf-8")],
      getProgramPubKey()
    )
  )[0];
