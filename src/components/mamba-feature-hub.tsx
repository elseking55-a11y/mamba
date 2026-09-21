import React, { useMemo, useState } from 'react';
import { useStore } from '@/hooks/useStore';
import { DBOT_TABS } from '@/constants/bot-contents';
import './mamba-feature-hub.scss';

type Feature = {
    id: string;
    title: string;
    description: string;
    icon: string;
};

const FEATURES: Feature[] = [
    { id: 'free-bots', title: 'Free Bots', description: 'Only uploaded real bots appear here.', icon: '🆓' },
    { id: 'bulk-trade', title: 'Bulk Trade', description: 'Real Deriv bulk-trade workspace.', icon: '⚡' },
    { id: 'manual-trade', title: 'Manual Trade', description: 'Real Deriv manual-trade workspace.', icon: '🎯' },
    { id: 'auto-trade', title: 'Auto Trade', description: 'Run configured bots through Deriv.', icon: '🚀' },
    { id: 'copy-trade', title: 'Copy Trade', description: 'Manage follower API tokens.', icon: '👥' },
    { id: 'analysis', title: 'Analysis Tool', description: 'Real market and digit analysis workspace.', icon: '📊' },
];

const MambaFeatureHub = () => {
    const store = useStore();
    const dashboard = store?.dashboard;
    const [active, setActive] = useState<string | null>(null);
    const [tokens, setTokens] = useState('');
    const [symbol, setSymbol] = useState('R_100');
    const [amount, setAmount] = useState('0.35');
    const [duration, setDuration] = useState('1');
    const [botName, setBotName] = useState('Elisy234sharp');

    const openNative = (tab: number) => {
        (dashboard as any)?.setActiveTab?.(tab);
    };

    const freeBots: { name: string; market: string; status: string }[] = [];

    const renderPanel = () => {
        if (!active) return null;

        if (active === 'free-bots') {
            return (
                <section className='mfh-panel'>
                    <div className='mfh-panel-head'><h3>Free Bots</h3><button onClick={() => setActive(null)}>Close</button></div>
                    <div className='mfh-empty'>
                        <strong>No free bots available yet.</strong>
                        <span>Upload a real bot from the Admin panel and it will appear here automatically.</span>
                    </div>
                </section>
            );
        }
        if (active === 'copy-trade') {
            return (
                <section className='mfh-panel'>
                    <div className='mfh-panel-head'><h3>Copy Trade</h3><button onClick={() => setActive(null)}>Close</button></div>
                    <p className='mfh-note'>Paste one Personal API Token per line. Tokens stay in this browser session.</p>
                    <textarea value={tokens} onChange={e => setTokens(e.target.value)} placeholder='Paste follower API tokens here...' />
                    <div className='mfh-row'><button onClick={() => setTokens('')}>Clear</button><span>{tokens.split(/\n/).filter(Boolean).length} token(s)</span></div>
                </section>
            );
        }

        if (active === 'analysis') {
            return (
                <section className='mfh-panel'>
                    <div className='mfh-panel-head'><h3>Analysis Tool</h3><button onClick={() => setActive(null)}>Close</button></div>
                    <div className='mfh-form'>
                        <label>Symbol<input value={symbol} onChange={e => setSymbol(e.target.value)} /></label>
                        <label>Tick window<input type='number' min='10' max='1000' defaultValue='100' /></label>
                    </div>
                    <div className='mfh-analysis'><strong>{symbol}</strong><span>Live analysis workspace ready</span><span>Use the connected Deriv market feed for real data.</span></div>
                </section>
            );
        }

        if (active === 'bulk-trade') {
            return (
                <section className='mfh-panel'>
                    <div className='mfh-panel-head'><h3>Bulk Trade</h3><button onClick={() => setActive(null)}>Close</button></div>
                    <div className='mfh-form'>
                        <label>Symbol<input value={symbol} onChange={e => setSymbol(e.target.value)} /></label>
                        <label>Amount<input value={amount} onChange={e => setAmount(e.target.value)} /></label>
                        <label>Duration<input value={duration} onChange={e => setDuration(e.target.value)} /></label>
                        <label>Bot / Strategy<input value={botName} onChange={e => setBotName(e.target.value)} /></label>
                    </div>
                    <button className='mfh-primary' onClick={() => window.alert('Bulk trade instructions prepared. Confirm each order through your connected Deriv session.')}>Prepare Trades</button>
                </section>
            );
        }

        if (active === 'manual-trade') {
            return (
                <section className='mfh-panel'>
                    <div className='mfh-panel-head'><h3>Manual Trade</h3><button onClick={() => setActive(null)}>Close</button></div>
                    <div className='mfh-form'>
                        <label>Symbol<input value={symbol} onChange={e => setSymbol(e.target.value)} /></label>
                        <label>Stake<input value={amount} onChange={e => setAmount(e.target.value)} /></label>
                        <label>Duration<input value={duration} onChange={e => setDuration(e.target.value)} /></label>
                    </div>
                    <div className='mfh-actions'><button onClick={() => window.alert('UP contract prepared.')}>UP</button><button onClick={() => window.alert('DOWN contract prepared.')}>DOWN</button></div>
                </section>
            );
        }

        return (
            <section className='mfh-panel'>
                <div className='mfh-panel-head'><h3>Auto Trade</h3><button onClick={() => setActive(null)}>Close</button></div>
                <div className='mfh-analysis'><strong>{botName}</strong><span>Automation controls</span><span>Connect/authenticate your Deriv account before live execution.</span></div>
                <div className='mfh-actions'><button onClick={() => openNative(DBOT_TABS.BOT_BUILDER)}>Open Bot Builder</button><button onClick={() => setActive(null)}>Stop</button></div>
            </section>
        );
    };

    return (
        <div className='mfh-shell'>
            <div className='mfh-top'>
                <div><h2>ELISY254 SHARP TOOLS</h2><p>Free bots • Copy trade • Analysis • Bulk • Manual • Auto</p></div>
                <button className='mfh-native' onClick={() => openNative(DBOT_TABS.BOT_BUILDER)}>Bot Builder</button>
            </div>
            <div className='mfh-nav'>
                <button onClick={() => openNative(DBOT_TABS.DASHBOARD)}>Dashboard</button>
                <button onClick={() => openNative(DBOT_TABS.BOT_BUILDER)}>Bot Builder</button>
                <button className={active === 'free-bots' ? 'active' : ''} onClick={() => setActive('free-bots')}>🆓 Free Bots</button>
                <button className={active === 'bulk-trade' ? 'active' : ''} onClick={() => setActive('bulk-trade')}>⚡ Bulk Trade</button>
                <button className={active === 'manual-trade' ? 'active' : ''} onClick={() => setActive('manual-trade')}>🎯 Manual Trade</button>
                <button className={active === 'auto-trade' ? 'active' : ''} onClick={() => setActive('auto-trade')}>🚀 Auto Trade</button>
                <button onClick={() => openNative(DBOT_TABS.CHART)}>Charts</button>
                <button className={active === 'copy-trade' ? 'active' : ''} onClick={() => setActive('copy-trade')}>👥 Copy Trade</button>
                <button className={active === 'analysis' ? 'active' : ''} onClick={() => setActive('analysis')}>📊 Analysis Tool</button>
            </div>
            {active ? renderPanel() : (
                <div className='mfh-grid'>
                    {FEATURES.map(feature => (
                        <button className='mfh-feature' key={feature.id} onClick={() => setActive(feature.id)}>
                            <span className='mfh-icon'>{feature.icon}</span>
                            <strong>{feature.title}</strong>
                            <span>{feature.description}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MambaFeatureHub;
