import { Link } from 'react-router';
import { Metadata } from '@/components/metadata';

export function PrivacyPage() {
    return (
        <>
            <Metadata title="Privacy Policy" />
            <article className="mx-auto w-full max-w-3xl space-y-8 text-muted-foreground [&_li]:ml-6 [&_ul]:list-disc [&_ul]:space-y-1">
                <header className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">
                        Privacy Policy
                    </h1>
                    <p className="text-sm">Last updated: 10 October 2026</p>
                </header>

                <p>
                    Media Watchlist is a personal, non-commercial project run by
                    Chris Poulter. This policy explains what information the app
                    collects, why, and what you can do about it. In short: we
                    only keep what is needed to sign you in and save your
                    watchlist. There are no ads, no analytics, and your data is
                    never sold or shared for marketing.
                </p>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        Information we collect
                    </h2>
                    <ul>
                        <li>
                            <strong className="text-foreground">
                                Account details
                            </strong>{' '}
                            — your name and email address, and a password
                            (stored only as a secure hash) if you register with
                            email.
                        </li>
                        <li>
                            <strong className="text-foreground">
                                Google sign-in
                            </strong>{' '}
                            — if you sign in with Google, we receive your name,
                            email address and profile picture from your Google
                            account, along with the tokens Google issues to
                            confirm your identity. We request only the basic{' '}
                            <code>openid</code>, <code>email</code> and{' '}
                            <code>profile</code> scopes and cannot access your
                            Gmail, Drive, contacts or anything else.
                        </li>
                        <li>
                            <strong className="text-foreground">
                                Your watchlist
                            </strong>{' '}
                            — the films and TV shows you add, and the order you
                            put them in.
                        </li>
                        <li>
                            <strong className="text-foreground">
                                Session information
                            </strong>{' '}
                            — when you sign in we record your IP address and
                            browser user agent against your session to help
                            protect your account.
                        </li>
                        <li>
                            <strong className="text-foreground">
                                Two-factor authentication
                            </strong>{' '}
                            — if you enable it, the secret and backup codes
                            needed to verify your codes.
                        </li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        How we use it
                    </h2>
                    <p>Your information is used only to:</p>
                    <ul>
                        <li>create your account and sign you in;</li>
                        <li>store and display your watchlist;</li>
                        <li>
                            send account emails, such as email verification and
                            password resets;
                        </li>
                        <li>keep your account secure.</li>
                    </ul>
                    <p>
                        The legal basis for this processing is that it is
                        necessary to provide the service you have signed up for.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        Google user data
                    </h2>
                    <p>
                        Media Watchlist's use of information received from
                        Google APIs adheres to the{' '}
                        <a
                            href="https://developers.google.com/terms/api-services-user-data-policy"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-foreground underline underline-offset-4"
                        >
                            Google API Services User Data Policy
                        </a>
                        , including the Limited Use requirements. Google data is
                        used solely to sign you in and show your name and
                        picture in the app. It is not transferred to anyone
                        else, used for advertising, or used to train AI models.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        Cookies and local storage
                    </h2>
                    <p>
                        We use a single essential cookie to keep you signed in.
                        Your light/dark theme choice is saved in your browser's
                        local storage. There are no tracking or advertising
                        cookies.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        Third-party services
                    </h2>
                    <p>A small number of services are needed to run the app:</p>
                    <ul>
                        <li>
                            <strong className="text-foreground">Google</strong>{' '}
                            — for optional sign-in.
                        </li>
                        <li>
                            <strong className="text-foreground">
                                The Movie Database (TMDB)
                            </strong>{' '}
                            — provides film and TV information. Searches are
                            sent from our server, and poster images are loaded
                            directly from TMDB's servers, which will see your IP
                            address. No account information is shared with TMDB.
                            This product uses the TMDB API but is not endorsed
                            or certified by TMDB.
                        </li>
                        <li>
                            <strong className="text-foreground">
                                Email and hosting providers
                            </strong>{' '}
                            — used to deliver account emails and to run the app
                            and its database.
                        </li>
                    </ul>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        How long we keep it
                    </h2>
                    <p>
                        Your account and watchlist are kept until you delete
                        your account. Sessions expire automatically, and
                        verification and password reset links expire shortly
                        after they are sent.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        Your rights
                    </h2>
                    <p>
                        You can view and update your details from your{' '}
                        <Link
                            to="/profile"
                            className="font-medium text-foreground underline underline-offset-4"
                        >
                            profile
                        </Link>
                        , and delete your account at any time from the Danger
                        zone tab. Deleting your account permanently removes your
                        profile, linked sign-in methods, sessions and watchlist.
                    </p>
                    <p>
                        Under UK data protection law you also have the right to
                        request a copy of your data, ask for it to be corrected
                        or erased, and object to its processing. To do so, get
                        in touch using the details below. If you are unhappy
                        with how your data has been handled, you can complain to
                        the{' '}
                        <a
                            href="https://ico.org.uk/make-a-complaint/"
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-foreground underline underline-offset-4"
                        >
                            Information Commissioner's Office
                        </a>
                        .
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        Changes to this policy
                    </h2>
                    <p>
                        If this policy changes, the updated version will be
                        posted on this page with a new “last updated” date.
                    </p>
                </section>

                <section className="space-y-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                        Contact
                    </h2>
                    <p>
                        Questions about this policy or your data? Email{' '}
                        <a
                            href="mailto:media-watchlist@chrispoulter.com"
                            className="font-medium text-foreground underline underline-offset-4"
                        >
                            media-watchlist@chrispoulter.com
                        </a>
                        .
                    </p>
                </section>
            </article>
        </>
    );
}
