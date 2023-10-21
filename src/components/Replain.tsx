import { useEffect } from 'react';
import Head from 'next/head';
import Script from '../../node_modules/next/script';

const ReplainChat = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://widget.replain.cc/dist/client.js';

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <Head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `window.replainSettings = { id: '095c9024-c69f-40e8-8dd7-0b79890cd0b5' }`
                }}
            />
        </Head>
    );
};

export default ReplainChat;