import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { socialProviders } from '@/lib/social-providers';
import { useLinkSocial, useUnlinkAccount } from '../profile-queries';

interface LinkedAccountsProps {
    accounts: { id: string; providerId: string }[];
}

export function LinkedAccounts({ accounts }: LinkedAccountsProps) {
    const {
        mutate: linkSocial,
        isPending: isLinking,
        variables: linkingProvider,
    } = useLinkSocial();

    const {
        mutate: unlinkAccount,
        isPending: isUnlinking,
        variables: unlinkVariables,
    } = useUnlinkAccount();

    const isLinked = (providerId: string) =>
        accounts?.some((a) => a.providerId === providerId);

    const canUnlink = (providerId: string) =>
        accounts?.some((a) => a.providerId !== providerId);

    const handleConnect = (providerId: string) =>
        linkSocial(providerId, {
            onError: (err) =>
                toast.error(err.message || 'Failed to connect account'),
        });

    const handleDisconnect = (
        accountId: string,
        providerId: string,
        label: string
    ) =>
        unlinkAccount(
            { accountId, providerId },
            {
                onSuccess: () => toast.success(`${label} account disconnected`),
                onError: (err) =>
                    toast.error(
                        err.message || `Failed to disconnect ${label} account`
                    ),
            }
        );

    return (
        <div className="space-y-4">
            {socialProviders.map((provider) => {
                const linkedAccount = accounts?.find(
                    (a) => a.providerId === provider.id
                );
                const linked = isLinked(provider.id);
                const unlinkable = canUnlink(provider.id);

                const inFlight =
                    (isLinking && linkingProvider === provider.id) ||
                    (isUnlinking &&
                        unlinkVariables?.providerId === provider.id);

                return (
                    <div
                        key={provider.id}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            {provider.icon}
                            <div>
                                <p className="text-sm font-medium">
                                    {provider.label}
                                </p>
                                {linked ? (
                                    <Badge variant="secondary">Connected</Badge>
                                ) : (
                                    <Badge variant="outline">
                                        Not connected
                                    </Badge>
                                )}
                            </div>
                        </div>

                        {linked ? (
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={
                                    inFlight || !unlinkable || !linkedAccount
                                }
                                onClick={() =>
                                    linkedAccount &&
                                    handleDisconnect(
                                        linkedAccount.id,
                                        provider.id,
                                        provider.label
                                    )
                                }
                            >
                                {inFlight ? 'Disconnecting...' : 'Disconnect'}
                            </Button>
                        ) : (
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={inFlight}
                                onClick={() => handleConnect(provider.id)}
                            >
                                {inFlight ? 'Connecting...' : 'Connect'}
                            </Button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
