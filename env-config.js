/* ==========================================================================
   UPSOCIAL PRO - ENVIRONMENT CONFIGURATION LOADER (env-config.js)
   ========================================================================== */

window.ENV = {
    WHATSAPP_NUMBER: "5544991690878",
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
})();
