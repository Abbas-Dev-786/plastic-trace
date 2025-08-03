// thirdwebClient.ts
import { CHAIN_ID } from "@/constants";
import { createThirdwebClient, defineChain, getContract } from "thirdweb";

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID, // Get from your thirdweb
});

export const etherlinkTestnetChain = defineChain({ id: CHAIN_ID });

export const roleMangerContract = getContract({
  client,
  address: "0x8a6bb0d0527b39947c6aa89c6911f307919bbcb9",
  chain: etherlinkTestnetChain,
});

export const ecoRewardTokenContract = getContract({
  client,
  address: "0x2F117Db06F3eb1d4f3D0d265382e3794Ba8eB039",
  chain: etherlinkTestnetChain,
});
