import type { NextPage } from "next";

import WalletBar from "../src/components/WalletBar";
import ClickerInteraction from "../src/components/ClickerInteraction/ClickerInteraction";
import useSolana from "../src/providers/SolanaProvider/useSolana";

const Home: NextPage = () => {
  const { address } = useSolana();

  return (
    <div>
      <WalletBar />
      {address && <ClickerInteraction />}
    </div>
  );
};

export default Home;
