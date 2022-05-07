import { useContext } from "react";

import ProgramContext, { TProgramContext } from "./ProgramContext";

const useProgram = (): TProgramContext => {
  return <TProgramContext>useContext(ProgramContext);
};

export default useProgram;
