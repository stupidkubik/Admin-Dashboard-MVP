"use client";

export type ConnectedAccount = {
  id: string;
  name: string;
  connected: boolean;
  connectLabel?: string;
  disconnectLabel?: string;
};

type ConnectedAccountsProps = {
  title?: string;
  accounts: ConnectedAccount[];
};

export default function ConnectedAccounts({
  title = "Connected Accounts",
  accounts,
}: ConnectedAccountsProps) {
  return (
    <section className="section-container">
      <h2 className="heading-3 mb-6">{title}</h2>
      <div className="space-y-4">
        {accounts.map(
          ({
            id,
            name,
            connected,
            connectLabel = "Connect",
            disconnectLabel = "Disconnect",
          }) => (
            <div
              key={id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h4 className="font-medium">{name}</h4>
                <p className="text-sm text-muted-foreground">
                  {connected ? "Connected" : "Not connected"}
                </p>
              </div>
              <button
                type="button"
                className={`btn btn-sm ${connected ? "btn-destructive" : "btn-outline"}`}
              >
                {connected ? disconnectLabel : connectLabel}
              </button>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
