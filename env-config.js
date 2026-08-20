/* ==========================================================================
   UPSOCIAL PRO - ENVIRONMENT CONFIGURATION LOADER (env-config.js)
   ========================================================================== */

window.ENV = {
    WHATSAPP_NUMBER: "5544991639749",
    SUPPORT_EMAIL: "suporte@upsocialpro.com.br",
    SITE_NAME: "UpSocial Pro",
    SITE_TAGLINE: "Autoridade Máxima nas Redes Sociais",
    GUARANTEE_DAYS: "30",
    DEFAULT_DISCOUNT_PERCENT: "20",
    MIN_ORDER_VALUE: "4.00",
    TOTAL_ORDERS_DELIVERED: "185400",
    ENABLE_SALES_TICKER: true,
    ENABLE_CUSTOM_CALCULATOR: true,
    
    // Analytics & Telemetry Tracking IDs
    MICROSOFT_CLARITY_ID: "xydca8l037", // Active Clarity Project ID
    META_PIXEL_ID: "",        // Fill with Facebook/Instagram Pixel ID (ex: "1234567890")
    GOOGLE_ANALYTICS_ID: "",  // Fill with GA4 Measurement ID (ex: "G-XXXXXXXXXX")
    SENTRY_DSN: ""            // Fill with Sentry DSN URL
};

// Helper function to initialize Microsoft Clarity dynamically
function initMicrosoftClarity(clarityId) {
    if (!clarityId || clarityId.trim() === "") return;
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", clarityId.trim());
    console.log("🎥 [Clarity] Microsoft Clarity gravando sessões ativamente:", clarityId);
}

// Helper function to initialize Meta Pixel dynamically
function initMetaPixel(pixelId) {
    if (!pixelId || pixelId.trim() === "") return;
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', pixelId.trim());
    fbq('track', 'PageView');
    console.log("🎯 [Meta Pixel] Pixel do Facebook/Instagram ativo:", pixelId);
}

// Asynchronously load and parse local .env file if available over HTTP/HTTPS
(async function loadEnvFile() {
    try {
        const response = await fetch('./.env');
        if (response.ok) {
            const text = await response.text();
            const lines = text.split('\n');
            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
                    const parts = trimmed.split('=');
                    const key = parts[0].trim();
                    let val = parts.slice(1).join('=').trim();
                    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                        val = val.slice(1, -1);
                    }
                    if (val === "true") val = true;
                    if (val === "false") val = false;
                    window.ENV[key] = val;
                }
            });
            console.log("⚡ [.env] Configurações carregadas com sucesso:", window.ENV);
        }
    } catch (err) {
        console.warn("⚠️ [.env] Usando valores padrão do ambiente:", err);
    }

    // Auto-start analytics if IDs are configured
    if (window.ENV.MICROSOFT_CLARITY_ID) {
        initMicrosoftClarity(window.ENV.MICROSOFT_CLARITY_ID);
    }
    if (window.ENV.META_PIXEL_ID) {
        initMetaPixel(window.ENV.META_PIXEL_ID);
    }
})();
