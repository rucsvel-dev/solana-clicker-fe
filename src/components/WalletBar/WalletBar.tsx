import { FC } from "react";

import useWalletBar from "./useWalletBar";
import { Button, Card, Text } from "@nextui-org/react";

import styles from "../../../styles/Home.module.css";

const WalletBar: FC = () => {
  const { address, onWalletConnect } = useWalletBar();

  return (
    <div className={styles["wallet-wrapper"]}>
      {address ? (
        <Card color={"secondary"} css={{ mw: "650px" }}>
          <Text
            css={{ fontWeight: "$bold", color: "$white", textAlign: "center" }}
            transform="capitalize"
          >
            Waller address: {address.toString()}
          </Text>
        </Card>
      ) : (
        <Button color="secondary" auto onClick={onWalletConnect}>
          Connect wallet
        </Button>
      )}
    </div>
  );
};

export default WalletBar;
