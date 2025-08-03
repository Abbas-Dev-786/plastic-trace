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

export const ecoNftContract = getContract({
  client,
  address: "0x02BAc327F2eA053B8C127ed47ED1d2cf48bEC5E3",
  chain: etherlinkTestnetChain,
});

export const rewardDistributorContract = getContract({
  client,
  address: "0xa0bbeaabcb900473f44d0e623ddf86902e7ca504",
  chain: etherlinkTestnetChain,
});
