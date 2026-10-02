import { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { TwoFactorEnabled } from './two-factor-enabled';
import { TwoFactorRecoveryCodes } from './two-factor-recovery-codes';
import { TwoFactorDisabled } from './two-factor-disabled';
import { TwoFactorConfirmDisable } from './two-factor-confirm-disable';
import { TwoFactorConfirmEnable } from './two-factor-confirm-enable';
import { TwoFactorConfirmRecoveryCodes } from './two-factor-confirm-recovery-codes';
import { TwoFactorVerify } from './two-factor-verify';
import { TwoFactorQrCode } from './two-factor-qr-code';

type TwoFactorStep =
    | 'idle'
    | 'confirm-enable'
    | 'qr'
    | 'verify'
    | 'confirm-disable'
    | 'recovery-codes'
    | 'confirm-recovery-codes';

export function TwoFactorSettings() {
    const [step, setStep] = useState<TwoFactorStep>('idle');
    const [totpUri, setTotpUri] = useState<string>('');
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
    const { data: session } = authClient.useSession();

    const twoFactorEnabled = session?.user.twoFactorEnabled;

    if (twoFactorEnabled) {
        return (
            <div className="space-y-4">
                {step === 'idle' && (
                    <TwoFactorEnabled
                        onDisable={() => setStep('confirm-disable')}
                        onGenerateRecoveryCodes={() =>
                            setStep('confirm-recovery-codes')
                        }
                    />
                )}

                {step === 'confirm-recovery-codes' && (
                    <TwoFactorConfirmRecoveryCodes
                        onRegenerated={(newCodes) => {
                            setRecoveryCodes(newCodes);
                            setStep('recovery-codes');
                        }}
                        onCancel={() => setStep('idle')}
                    />
                )}

                {step === 'recovery-codes' && (
                    <TwoFactorRecoveryCodes
                        recoveryCodes={recoveryCodes}
                        onDone={() => setStep('idle')}
                    />
                )}

                {step === 'confirm-disable' && (
                    <TwoFactorConfirmDisable
                        onDisabled={() => setStep('idle')}
                        onCancel={() => setStep('idle')}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {step === 'idle' && (
                <TwoFactorDisabled onEnable={() => setStep('confirm-enable')} />
            )}

            {step === 'confirm-enable' && (
                <TwoFactorConfirmEnable
                    onTotpSetup={(uri, codes) => {
                        setTotpUri(uri);
                        setRecoveryCodes(codes);
                        setStep('qr');
                    }}
                    onCancel={() => setStep('idle')}
                />
            )}

            {step === 'qr' && (
                <TwoFactorQrCode
                    totpUri={totpUri}
                    onDone={() => setStep('verify')}
                />
            )}

            {step === 'verify' && (
                <TwoFactorVerify
                    onSuccess={() => {
                        setStep('recovery-codes');
                    }}
                    onCancel={() => setStep('qr')}
                />
            )}

            {step === 'recovery-codes' && (
                <TwoFactorRecoveryCodes
                    recoveryCodes={recoveryCodes}
                    onDone={() => setStep('idle')}
                />
            )}
        </div>
    );
}
