import React, { useMemo, useState } from 'react';
import { initiateLogin, initiateSignUp } from '@/external/deriv-core/auth/oauth';
import './mamba-landing-page.scss';

const getClientId = () => process.env.NEXT_PUBLIC_DERIV_CLIENT_ID || '';

const getRedirectUri = () =>
    process.env.NEXT_PUBLIC_DERIV_OAUTH_REDIRECT_URI || `${window.location.origin}/callback`;

const getReferralConfig = () => {
    const referral = process.env.NEXT_PUBLIC_DERIV_REFERRAL_LINK || '';
    try {
        const url = new URL(referral);
        const token =
            url.searchParams.get('t') ||
            url.searchParams.get('affiliate_token') ||
            url.searchParams.get('sidi') ||
            url.searchParams.get('ca') ||
            '';
        const affiliateTokenParam =
            url.searchParams.has('affiliate_token')
                ? 'affiliate_token'
                : url.searchParams.has('sidi')
                  ? 'sidi'
                  : url.searchParams.has('ca')
                    ? 'ca'
                    : 't';

        return token
            ? {
                  affiliateToken: token,
                  affiliateTokenParam: affiliateTokenParam as 't' | 'affiliate_token' | 'sidi' | 'ca',
              }
            : {};
    } catch {
        return {};
    }
};

const MambaLandingPage = () => {
    const [error, setError] = useState('');
    const clientId = getClientId();
    const referralConfig = useMemo(getReferralConfig, []);

    const auth = async (mode: 'login' | 'signup') => {
        setError('');

        if (!clientId) {
            setError('Deriv Client ID is not configured. Add NEXT_PUBLIC_DERIV_CLIENT_ID to your deployment environment.');
            return;
        }

        try {
            const config = {
                clientId,
                redirectUri: getRedirectUri(),
                scopes: process.env.NEXT_PUBLIC_DERIV_OAUTH_SCOPES || 'trade',
                ...referralConfig,
            };

            if (mode === 'login') {
                await initiateLogin(config);
            } else {
                await initiateSignUp(config);
            }
        } catch (e) {
            console.error('Deriv authentication start failed:', e);
            setError('Unable to start Deriv authentication. Check the Client ID and callback URL.');
        }
    };

    return (
        <main className='mamba-landing'>
            <div className='mamba-grid-bg' aria-hidden='true' />
            <div className='mamba-glow mamba-glow-one' aria-hidden='true' />
            <div className='mamba-glow mamba-glow-two' aria-hidden='true' />

            <header className='mamba-landing-header'>
                <div className='mamba-logo'>
                    <span className='mamba-logo-mark'>🐍</span>
                    <span>MAMBA</span>
                </div>
                <span className='mamba-header-tag'>SMARTER TRADERS&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;BIGGER DREAMS</span>
            </header>

            <section className='mamba-splash' aria-label='Mamba welcome'>
                <div className='mamba-side-label mamba-side-left' aria-hidden='true'>
                    <span>TRADE</span>
                    <span>LEARN</span>
                    <span>GROW</span>
                </div>
                <div className='mamba-side-label mamba-side-right' aria-hidden='true'>
                    <span>YOUR TRADING</span>
                    <span>JOURNEY</span>
                    <span>STARTS HERE</span>
                </div>
                <div className='mamba-hero-art' aria-hidden='true'>
                    <div className='mamba-brain-wrap'>
                        <div className='mamba-brain-ring mamba-brain-ring-one' />
                        <div className='mamba-brain-ring mamba-brain-ring-two' />
                        <div className='mamba-brain'>
                            <span className='mamba-brain-symbol'>🧠</span>
                            <span className='mamba-snake-face'>🐍</span>
                        </div>
                        <span className='mamba-particle particle-one' />
                        <span className='mamba-particle particle-two' />
                        <span className='mamba-particle particle-three' />
                        <span className='mamba-particle particle-four' />
                    </div>
                    <div className='mamba-chart mamba-chart-left'>▂▅▃▇▅▂▆▇</div>
                    <div className='mamba-chart mamba-chart-right'>▃▅▂▆▇▅▇█</div>
                </div>

                <div className='mamba-welcome'>
                    <div className='mamba-welcome-line'>WELCOME TO</div>
                    <h1>MAMBA</h1>
                    <div className='mamba-mentor'>AS YOUR MENTOR</div>
                    <p className='mamba-tagline'>LEARN <span>•</span> TRADE <span>•</span> GROW</p>
                    <p className='mamba-subtagline'>Smarter tools. Better decisions. Greater results.</p>

                    <div className='mamba-auth-actions'>
                        <button className='mamba-auth-button mamba-sign-in' onClick={() => auth('login')}>
                            <span className='mamba-button-icon'>♙</span>
                            <span>SIGN IN</span>
                            <span className='mamba-arrow'>→</span>
                        </button>
                        <button className='mamba-auth-button mamba-sign-up' onClick={() => auth('signup')}>
                            <span className='mamba-button-icon'>♙</span>
                            <span>SIGN UP</span>
                            <span className='mamba-arrow'>→</span>
                        </button>
                    </div>

                    {error && <div className='mamba-auth-error'>{error}</div>}

                    <p className='mamba-security'>
                        Secure authentication through Deriv OAuth. Mamba never asks for your Deriv password.
                    </p>
                </div>
            </section>

            <footer className='mamba-landing-footer'>
                <span className='mamba-scroll-cue'>⌄</span><span>POWERED BY DERIV</span>
            </footer>
        </main>
    );
};

export default MambaLandingPage;
