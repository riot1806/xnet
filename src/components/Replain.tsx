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
                    __html: `window.replainSettings = { id: '90f5a678-a4ce-4eac-a72a-f647574dc7e4' }`
                }}
            />
        </Head>
    );
};

export default ReplainChat;