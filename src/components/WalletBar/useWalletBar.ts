import useSolana from "../../providers/SolanaProvider/useSolana";

type TUseWalletBar = {
  onWalletConnect: () => void;
  address: string;
};

const useWalletBar = (): TUseWalletBar => {
  const { onWalletConnect, address } = useSolana();

  return { onWalletConnect, address };
};

export default useWalletBar;
