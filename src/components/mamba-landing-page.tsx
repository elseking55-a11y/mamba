import React, { useMemo, useState } from 'react';
import { initiateLogin, initiateSignUp } from '@/external/deriv-core/auth/oauth';
import './mamba-landing-page.scss';

const getClientId = () => process.env.NEXT_PUBLIC_DERIV_CLIENT_ID || '';

const getReferralConfig = () => {
    const referral = process.env.NEXT_PUBLIC_DERIV_REFERRAL_LINK || '';
    try {
        const url = new URL(referral);
        const token = url.searchParams.get('t') || url.searchParams.get('affiliate_token') || '';
        return token ? { affiliateToken: token, affiliateTokenParam: url.searchParams.has('affiliate_token') ? 'affiliate_token' as const : 't' as const } : {};
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
                redirectUri: window.location.origin,
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
            setError('Unable to start Deriv authentication. Check the Client ID and redirect URL.');
        }
    };

    return (
        <main className='mamba-landing'>
            <nav className='mamba-landing-nav'>
                <div className='mamba-brand'>MAMBA</div>
                <span className='mamba-status'>DERIV TRADING WORKSPACE</span>
            </nav>

            <section className='mamba-hero'>
                <div className='mamba-hero-copy'>
                    <span className='mamba-kicker'>WELCOME TO MAMBA</span>
                    <h1>Trade smarter.<br /><strong>Build. Analyze. Automate.</strong></h1>
                    <p>
                        A professional Deriv workspace for bot building, free bots, manual trading,
                        auto trading, bulk trading, charts, copy trading and market analysis.
                    </p>

                    <div className='mamba-auth-actions'>
                        <button className='mamba-primary' onClick={() => auth('login')}>Sign In with Deriv</button>
                        <button className='mamba-secondary' onClick={() => auth('signup')}>Sign Up with Deriv</button>
                    </div>

                    {error && <div className='mamba-auth-error'>{error}</div>}

                    <p className='mamba-security'>
                        Authentication is handled by Deriv OAuth. Mamba does not ask for your Deriv password.
                    </p>
                </div>

                <div className='mamba-hero-card'>
                    <div className='mamba-card-glow' />
                    <span>REAL WORKSPACE</span>
                    <h2>MAMBA</h2>
                    <p>Connect your Deriv account, then access the trading tools.</p>
                    <div className='mamba-mini-grid'>
                        <span>🤖 Bot Builder</span>
                        <span>🆓 Free Bots</span>
                        <span>⚡ Auto Trade</span>
                        <span>📊 Analysis</span>
                    </div>
                </div>
            </section>

            <footer className='mamba-landing-footer'>
                <span>© MAMBA</span>
                <span>Deriv account required for live trading</span>
            </footer>
        </main>
    );
};

export default MambaLandingPage;
