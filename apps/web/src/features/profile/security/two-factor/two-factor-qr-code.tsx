import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';

interface TwoFactorQrCodeProps {
    totpUri: string;
    onDone: () => void;
}

export function TwoFactorQrCode({ totpUri, onDone }: TwoFactorQrCodeProps) {
    return (
        <div className="space-y-4">
            <p className="text-sm font-medium">
                Scan this QR code with your authenticator app:
            </p>
            <div className="inline-block rounded-lg border bg-white p-4">
                <QRCodeSVG
                    value={totpUri}
                    size={200}
                    role="img"
                    aria-label="QR code for your authenticator app"
                />
            </div>
            <p className="text-xs text-muted-foreground">
                Or enter manually:{' '}
                <code className="font-mono text-xs break-all">{totpUri}</code>
            </p>
            <Button onClick={onDone} className="w-full sm:w-auto">
                I've Scanned the Code
            </Button>
        </div>
    );
}
