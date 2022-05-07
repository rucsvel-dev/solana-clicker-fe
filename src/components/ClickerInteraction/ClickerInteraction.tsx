import { FC, useCallback, useEffect, useState } from "react";
import useSolana from "../../providers/SolanaProvider/useSolana";
import {
  clickToProgram,
  getClickerData,
  initUser,
  transferClicksTo,
  upgradeValuePerClick,
} from "../../utils/programInteraction";
import useProgram from "../../providers/ProgramProvider/useProgram";
import { Button, Card, Text, Input } from "@nextui-org/react";
import styles from "../../../styles/Home.module.css";
import { PublicKey } from "@solana/web3.js";

const ClickerInteraction: FC = () => {
  const [addressToTransfer, setAddressToTransfer] = useState("");
  const [howMuchTransfer, setHowMuchTransfer] = useState(0);
  const { connection, address } = useSolana();
  const {
    userStateData: {
      clickBalance,
      valuePerClick,
      costToUpgradeV1,
      costToUpgradeV2,
    } = {},
    userStateDataLoaded,
    isUserInited,
    initUserCallback,
  } = useProgram();

  const clickToProgramCallback = useCallback(
    () => clickToProgram({ userPubkey: address, connection }),
    [address, connection]
  );

  const upgradeValuePerClickCallback = useCallback(
    (variation) => () =>
      upgradeValuePerClick({ userPubkey: address, connection }, variation),
    [address, connection]
  );

  const transferClicksToCallback = useCallback(
    () =>
      transferClicksTo(
        {
          userPubkey: address,
          userToTransferAddress: addressToTransfer,
          connection,
        },
        howMuchTransfer
      ),
    [address, connection, addressToTransfer, howMuchTransfer]
  );

  if (!connection || !address) {
    return null;
  }

  return userStateDataLoaded && isUserInited ? (
    <>
      <div className={styles["clicker-interaction-wrapper"]}>
        <div className={styles["counts-wrapper"]}>
          <Card
            color={"secondary"}
            css={{ mw: "250px", marginLeft: "10px", marginRight: "10px" }}
          >
            <Text
              css={{
                fontWeight: "$bold",
                color: "$white",
                textAlign: "center",
              }}
              transform="capitalize"
            >
              Balance: {clickBalance}
            </Text>
          </Card>
          <Card
            color={"secondary"}
            css={{ mw: "250px", marginLeft: "10px", marginRight: "10px" }}
          >
            <Text
              css={{
                fontWeight: "$bold",
                color: "$white",
                textAlign: "center",
              }}
              transform="capitalize"
            >
              Value per click: {valuePerClick}
            </Text>
          </Card>
          <Card
            color={"secondary"}
            css={{ mw: "250px", marginLeft: "10px", marginRight: "10px" }}
          >
            <Text
              css={{
                fontWeight: "$bold",
                color: "$white",
                textAlign: "center",
              }}
              transform="capitalize"
            >
              Cost to upgrade on 1: {costToUpgradeV1}
            </Text>
          </Card>
          <Card
            color={"secondary"}
            css={{ mw: "250px", marginLeft: "10px", marginRight: "10px" }}
          >
            <Text
              css={{
                fontWeight: "$bold",
                color: "$white",
                textAlign: "center",
              }}
              transform="capitalize"
            >
              Cost to upgrade on 2: {costToUpgradeV2}
            </Text>
          </Card>
        </div>
      </div>

      <div className={styles["clicker-interaction-wrapper"]}>
        <div className={styles["counts-wrapper"]}>
          <Button
            css={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
            color={"secondary"}
            onClick={clickToProgramCallback}
          >
            Click
          </Button>
          <Button
            css={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
            color={"secondary"}
            onClick={upgradeValuePerClickCallback(0)}
          >
            Upgrade value per click V1
          </Button>
          <Button
            css={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
            color={"secondary"}
            onClick={upgradeValuePerClickCallback(1)}
          >
            Upgrade value per click V2
          </Button>
        </div>
      </div>
      <div className={styles["clicker-interaction-wrapper"]}>
        <div className={styles["counts-wrapper"]}>
          <Input
            css={{ width: "420px" }}
            placeholder="Address"
            value={addressToTransfer}
            onChange={(event) => setAddressToTransfer(event.target.value)}
          />
        </div>
        <div className={styles["counts-wrapper"]}>
          <Input
            css={{ width: "100px", marginLeft: "20px" }}
            placeholder="Address"
            value={howMuchTransfer}
            onChange={(event) => setHowMuchTransfer(Number(event.target.value))}
          />
        </div>
        <Button
          css={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
          color={"secondary"}
          onClick={transferClicksToCallback}
        >
          Transfer
        </Button>
      </div>
    </>
  ) : (
    <>
      <div className={styles["init-wrapper"]}>
        <Card color={"secondary"} css={{ mw: "350px" }}>
          <Text
            css={{ fontWeight: "$bold", color: "$white", textAlign: "center" }}
            transform="capitalize"
          >
            You have to init accaunt
          </Text>
        </Card>
        <Button
          css={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px" }}
          color={"secondary"}
          onClick={initUserCallback}
        >
          Init account
        </Button>
      </div>
    </>
  );
};

export default ClickerInteraction;
