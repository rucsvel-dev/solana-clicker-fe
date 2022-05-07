import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import ProgramContext from "./ProgramContext";
import useSolana from "../SolanaProvider/useSolana";
import { getClickerData, initUser } from "../../utils/programInteraction";
import { transformUserStateData } from "../../utils/transformData";

const ProgramProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [userStateData, setUserStateData] = useState(undefined);
  const [isUserInited, setIsUserInited] = useState(false);

  const { userStateAi, connection, address } = useSolana();

  const initUserCallback = async () => {
    await initUser({
      connection,
      userStateAccount: userStateAi,
      userPubkey: address,
    });
    setIsUserInited(true);
  };

  useEffect(() => {
    if (userStateAi) {
      getClickerData({ userStateAccount: userStateAi, connection }).then(
        (userStateData) => {
          if (!userStateData) {
            setUserStateData(undefined);
            return;
          }
          setIsUserInited(true);
          setUserStateData(transformUserStateData(userStateData));
        }
      );
    }
  }, [userStateAi, isUserInited]);

  useEffect(() => {
    if (userStateAi && isUserInited) {
      connection.onAccountChange(
        userStateAi,
        (updatedAccountInfo) =>
          setUserStateData(transformUserStateData(updatedAccountInfo.data)),
        "singleGossip"
      );
    }
  }, [userStateAi, isUserInited]);

  const programApi = useMemo(
    () => ({
      userStateData,
      userStateDataLoaded: userStateData,
      isUserInited,
      initUserCallback,
    }),
    [
      JSON.stringify(userStateData),
      isUserInited,
      connection,
      address,
      userStateAi,
    ]
  );

  return (
    <ProgramContext.Provider value={programApi}>
      {children}
    </ProgramContext.Provider>
  );
};

export default ProgramProvider;
