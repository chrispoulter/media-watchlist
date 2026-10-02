import { Link } from 'react-router';
import { useState } from 'react';
import { Metadata } from '@/components/metadata';
import { AccountLayout } from '../account-layout';
import { TwoFactorForm } from './two-factor-form';
import { RecoveryCodeForm } from './recovery-code-form';

type TwoFactorMode = 'totp' | 'recovery';

export function TwoFactorPage() {
    const [mode, setMode] = useState<TwoFactorMode>('totp');

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
                <TwoFactorForm onBack={() => setMode('recovery')} />
            )}
            {mode === 'recovery' && (
                <RecoveryCodeForm onBack={() => setMode('totp')} />
            )}
        </AccountLayout>
    );
}
