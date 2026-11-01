import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authClient } from '@/lib/auth-client';
import { useSendVerificationEmail } from '../profile-queries';

export function VerifyEmailForm() {
    const { data: session } = authClient.useSession();

    const {
        mutate: sendVerificationEmail,
        isPending,
        isSuccess,
    } = useSendVerificationEmail();

    const email = session?.user.email ?? '';

    const handleSend = () =>
        sendVerificationEmail(email, {
            onError: (err) =>
                toast.error(err.message || 'Failed to send verification email'),
        });

    if (isSuccess) {
        return (
            <Alert>
                <AlertDescription>
                    <p>
                        A verification link has been sent to{' '}
                        <strong className="break-all">{email}</strong>.
                    </p>
                    <p>Click the link in that email to verify your address.</p>
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
                <span className="font-medium break-all text-foreground">
                    {email}
                </span>{' '}
                hasn&apos;t been verified yet.
            </p>
            <Button
                onClick={handleSend}
                disabled={isPending}
                className="w-full sm:w-auto"
            >
                {isPending ? 'Sending...' : 'Send Verification Email'}
            </Button>
        </div>
    );
}
