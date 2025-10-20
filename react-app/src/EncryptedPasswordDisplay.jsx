import { useState } from 'react';

export default function EncryptedPasswordDisplay({ password }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="encryption-container">
            <div className="encryption-data">{password}</div>
            <button
                className={`copy-button ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                title="Copiar para a área de transferência"
            >
                {copied ? '✓ Copiado!' : '📋 Copiar'}
            </button>
        </div>
    );
}