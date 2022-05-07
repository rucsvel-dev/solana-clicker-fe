import { createContext } from "react";

export type TUserState = {
  clickBalance: number;
  valuePerClick: number;
  costToUpgradeV1: number;
  costToUpgradeV2: number;
};

export type TProgramContext = {
  userStateData: TUserState;
  userStateDataLoaded: boolean;
  initUserCallback: () => void;
  isUserInited: boolean;
};

const ProgramContext = createContext<TProgramContext | null>(null);

export default ProgramContext;
