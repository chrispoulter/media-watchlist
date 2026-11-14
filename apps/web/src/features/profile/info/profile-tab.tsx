import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Metadata } from '@/components/metadata';
import { authClient } from '@/lib/auth-client';
import { personalDataUrl } from '../profile-queries';
import { UpdateProfileForm } from './update-profile-form';
import { UpdateEmailForm } from './update-email-form';
import { VerifyEmail } from './verify-email';

export function ProfileTab() {
    const { data: session } = authClient.useSession();

    // RequireAuth only renders this once the session has loaded
    if (!session) {
        return null;
    }

    return (
        <>
            <Metadata title="Profile" />
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2>Personal Information</h2>
                        </CardTitle>
                        <CardDescription>
                            Update your personal details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdateProfileForm name={session.user.name} />
                    </CardContent>
                </Card>

                {!session.user.emailVerified && (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                <h2>Verify Email Address</h2>
                            </CardTitle>
                            <CardDescription>
                                Verify your email address so you can use social
                                sign-in with the same address
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <VerifyEmail email={session.user.email} />
                        </CardContent>
                    </Card>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2>Update Email Address</h2>
                        </CardTitle>
                        <CardDescription>
                            Update your email address — a verification link will
                            be sent to confirm the change
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UpdateEmailForm />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2>Your Data</h2>
                        </CardTitle>
                        <CardDescription>
                            Download a copy of your personal data, including
                            your watchlist
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            asChild
                            variant="outline"
                            className="w-full sm:w-auto"
                        >
                            <a href={personalDataUrl} download>
                                <Download />
                                Download your data
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
