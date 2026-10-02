import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useSocialSignIn } from '@/features/account/account-queries';
import { authProviders } from '@/lib/auth-providers';

export function SocialLoginButtons() {
    const { mutate: signIn, isPending, variables } = useSocialSignIn();

    return (
        <>
            {authProviders.map((provider) => {
                const isProviderPending =
                    isPending && variables === provider.id;

                return (
                    <Button
                        key={provider.id}
                        type="button"
                        variant="outline"
                        className="w-full"
                        disabled={isProviderPending}
                        onClick={() =>
                            signIn(provider.id, {
                                onError: (err) =>
                                    toast.error(
                                        err.message || 'Sign in failed'
                                    ),
                            })
                        }
                    >
                        {provider.icon}
                        {isProviderPending
                            ? 'Connecting...'
                            : `Continue with ${provider.label}`}
                    </Button>
                );
            })}
        </>
    );
}
