import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from "@/config/thirdweb.config";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { defineChain } from "thirdweb";

const wallets = [
  inAppWallet({
    auth: {
      options: ["google", "discord", "telegram", "farcaster", "guest"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
];

const etherlinkTestnetChain = defineChain({ id: 128123 });

export function WalletConnectButton() {
  const account = useActiveAccount();
  console.log("connected to", account?.address);

  return (
    <div>
      <ConnectButton
        client={client}
        connectButton={{ label: "Connect Wallet" }}
        connectModal={{ size: "compact", title: "PlasticTrace" }}
        wallets={wallets}
        theme={"light"}
        chain={etherlinkTestnetChain}
        chains={[etherlinkTestnetChain]}
      />
    </div>
  );
}
