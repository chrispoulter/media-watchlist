import { Button } from '@/components/ui/button';

interface TwoFactorEnabledProps {
    onDisable: () => void;
    onGenerateRecoveryCodes: () => void;
}

export function TwoFactorEnabled({
    onDisable,
    onGenerateRecoveryCodes,
}: TwoFactorEnabledProps) {
    return (
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
            <Button variant="destructive" onClick={onDisable}>
                Disable 2FA
            </Button>
            <Button variant="outline" onClick={onGenerateRecoveryCodes}>
                Regenerate Recovery Codes
            </Button>
        </div>
    );
}
