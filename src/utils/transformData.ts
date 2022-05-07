import BN from "bn.js";

export const transformUserStateData = (data) => ({
  clickBalance: new BN(data.slice(0, 8), "le").toNumber(),
  valuePerClick: new BN(data.slice(8, 12), "le").toNumber(),
  costToUpgradeV1: new BN(data.slice(12, 16), "le").toNumber(),
  costToUpgradeV2: new BN(data.slice(16, 20), "le").toNumber(),
});
