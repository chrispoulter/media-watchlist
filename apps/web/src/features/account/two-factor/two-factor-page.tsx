import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { Metadata } from '@/components/metadata';
import { useVerifyRecoveryCode, useVerifyTotpLogin } from '../account-queries';
import { AccountLayout } from '../account-layout';
import { TwoFactorForm, type TwoFactorFormValues } from './two-factor-form';
import {
    RecoveryCodeForm,
    type RecoveryCodeFormValues,
} from './recovery-code-form';

type TwoFactorMode = 'totp' | 'recovery';

export function TwoFactorPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mode, setMode] = useState<TwoFactorMode>('totp');

    const { mutate: verifyTotp, isPending: isVerifyingTotp } =
        useVerifyTotpLogin();
    const { mutate: verifyRecoveryCode, isPending: isVerifyingRecoveryCode } =
        useVerifyRecoveryCode();

    const from = location.state?.from ?? '/';

    const onSuccess = () => navigate(from, { replace: true });
    const onError = (err: Error) => toast.error(err.message || 'Invalid code');

    const onSubmitTotp = (values: TwoFactorFormValues) =>
        verifyTotp(values.code, { onSuccess, onError });

    const onSubmitRecoveryCode = (values: RecoveryCodeFormValues) =>
        verifyRecoveryCode(values.code, { onSuccess, onError });

    return (
        <AccountLayout
            title="Two-factor authentication"
            description={
                mode === 'totp'
                    ? 'Enter the 6-digit code from your authenticator app'
                    : 'Enter one of your recovery codes'
            }
            footer={
                <Link
                    className="underline underline-offset-4 hover:text-foreground"
                    to="/login"
                >
                    Back to sign in
                </Link>
            }
        >
            <Metadata title="Two-Factor Authentication" />

            {mode === 'totp' && (
                <TwoFactorForm
                    loading={isVerifyingTotp}
                    onSubmit={onSubmitTotp}
                    onUseRecoveryCode={() => setMode('recovery')}
                />
            )}
            {mode === 'recovery' && (
                <RecoveryCodeForm
                    loading={isVerifyingRecoveryCode}
                    onSubmit={onSubmitRecoveryCode}
                    onUseAuthenticator={() => setMode('totp')}
                />
            )}
        </AccountLayout>
    );
}
