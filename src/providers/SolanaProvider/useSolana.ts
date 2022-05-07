import { useContext } from "react";

import SolanaContext, { TSolanaContext } from "./SolanaContext";

const useSolana = (): TSolanaContext => {
    return <TSolanaContext>useContext(SolanaContext);
};

export default useSolana;