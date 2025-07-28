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
