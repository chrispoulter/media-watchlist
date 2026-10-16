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
import { personalDataUrl } from '../profile-queries';
import { UpdateProfileForm } from './update-profile-form';
import { UpdateEmailForm } from './update-email-form';

export function ProfileTab() {
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
                        <UpdateProfileForm />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            <h2>Email Address</h2>
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
