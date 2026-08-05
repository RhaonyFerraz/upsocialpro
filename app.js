/* ==========================================================================
   UPSOCIAL PRO - APPLICATION LOGIC & DYNAMIC PRODUCT ENGINE
   ========================================================================== */

// Environment settings helper
function getEnv(key, fallback) {
    return (window.ENV && window.ENV[key] !== undefined) ? window.ENV[key] : fallback;
}

// Global Config populated from .env
const CONFIG = {
    whatsappNumber: getEnv("WHATSAPP_NUMBER", "5544991690878"),
    supportEmail: getEnv("SUPPORT_EMAIL", "suporte@upsocialpro.com.br"),
    siteName: getEnv("SITE_NAME", "UpSocial Pro"),
    guaranteeDays: getEnv("GUARANTEE_DAYS", "30"),
    defaultDiscount: parseFloat(getEnv("DEFAULT_DISCOUNT_PERCENT", "20")),
    minOrderVal: parseFloat(getEnv("MIN_ORDER_VALUE", "4.00")),
    totalOrders: getEnv("TOTAL_ORDERS_DELIVERED", "185400"),
    enableSalesTicker: getEnv("ENABLE_SALES_TICKER", true),
    enableCustomCalculator: getEnv("ENABLE_CUSTOM_CALCULATOR", true)
};

// Current Gender Filter state for targeted followers
let currentGender = "todos"; // "todos", "feminino", "masculino"

// --- ENHANCED PRODUCT CATALOG DATABASE (MAISGRAM & TURBINE INSPIRED) ---
const CATALOG_DATA = {
    insta: {
        categories: [
            { id: "seguidores", label: "Seguidores", icon: "fa-users", hasGenderFilter: true },
            { id: "curtidas", label: "Curtidas BR", icon: "fa-heart", hasGenderFilter: false },
            { id: "views", label: "Visualizações", icon: "fa-eye", hasGenderFilter: false },
            { id: "mensal", label: "Planos Mensais IA 🤖", icon: "fa-robot", hasGenderFilter: false },
            { id: "comentarios", label: "Comentários", icon: "fa-comments", hasGenderFilter: false },
            { id: "stories", label: "Stories & Live", icon: "fa-tower-broadcast", hasGenderFilter: false },
            { id: "compartilha", label: "Compartilhamentos", icon: "fa-share-nodes", hasGenderFilter: false }
        ],
        products: {
            seguidores: {
                todos: [
                    {
                        tier: "INICIANTE",
                        title: "100 Seg. Brasileiros",
                        price: 5.00,
                        oldPrice: 8.00,
                        badge: "",
                        speed: "⚡ Início em 5 a 15min",
                        geo: "🇧🇷 Perfis BR Reais",
                        features: ["Perfis Reais & Ativos", "Entrega Rápida", "Sem Necessidade de Senha", "Suporte Padrão"]
                    },
                    {
                        tier: "POPULAR",
                        title: "250 Seg. Brasileiros",
                        price: 13.00,
                        oldPrice: 19.90,
                        badge: "POPULAR",
                        speed: "⚡ Início Imediato",
                        geo: "🇧🇷 Principais Capitais BR",
                        features: ["Alta Qualidade", "Sem Risco para a Conta", `Garantia de ${CONFIG.guaranteeDays} Dias`, "Sem Quedas Bruscas"]
                    },
                    {
                        tier: "RECOMENDADO",
                        title: "500 Seg. Brasileiros",
                        price: 25.00,
                        oldPrice: 38.00,
                        badge: "RECOMENDADO",
                        speed: "⚡ Início em até 10min",
                        geo: "🇧🇷 Público BR Geográfico",
                        features: ["Pessoas Reais do Brasil", "Impulso de Autoridade", `Garantia de Reposição ${CONFIG.guaranteeDays}d`, "Suporte VIP no WhatsApp"]
                    },
                    {
                        tier: "MELHOR PREÇO",
                        title: "1.000 Seg. Brasileiros",
                        price: 50.00,
                        oldPrice: 79.90,
                        badge: "MAIS VENDIDO",
                        speed: "⚡ Início Imediato",
                        geo: "🇧🇷 Perfis Verificados BR",
                        features: ["Perfis Premium", `Garantia Total de ${CONFIG.guaranteeDays} Dias`, "Processamento Automático", "Atendimento Prioritário"]
                    },
                    {
                        tier: "ACELERADO",
                        title: "2.500 Seg. Brasileiros",
                        price: 115.00,
                        oldPrice: 169.00,
                        badge: "PROMO",
                        speed: "⚡ Envio Gradual Seguro",
                        geo: "🇧🇷 Brasil Inteiro",
                        features: ["Público Brasileiro Ativo", "Reposição Automática", "Sem Risco de Banimento", "Suporte VIP Dedicado"]
                    },
                    {
                        tier: "AUTORIDADE VIP",
                        title: "5.000 Seg. Brasileiros",
                        price: 220.00,
                        oldPrice: 320.00,
                        badge: "VIP",
                        speed: "⚡ Envio Programado",
                        geo: "🇧🇷 Perfis Selecionados BR",
                        features: ["Máximo Nível de Autoridade", "Entrega Gradual e Segura", "Garantia Estendida", "Suporte 24h Personalizado"]
                    }
                ],
                feminino: [
                    {
                        tier: "SEGMENTADO ♀",
                        title: "500 Seg. Femininas BR",
                        price: 49.00,
                        oldPrice: 68.00,
                        badge: "EXCLUSIVO ♀",
                        speed: "⚡ Início em até 2h",
                        geo: "🇧🇷 Perfis Femininos Reais BR",
                        features: ["Público 100% Feminino", "Ideal para Moda & Beleza", `Garantia de ${CONFIG.guaranteeDays} Dias`, "Atendimento VIP"]
                    },
                    {
                        tier: "SEGMENTADO ♀",
                        title: "1.000 Seg. Femininas BR",
                        price: 89.00,
                        oldPrice: 129.00,
                        badge: "MAIS VENDIDO ♀",
                        speed: "⚡ Envio Gradual 100% Seguro",
                        geo: "🇧🇷 Mulheres de Todo o Brasil",
                        features: ["Perfis Femininos Ativos", "Engajamento Altíssimo", `Reposição ${CONFIG.guaranteeDays} Dias`, "Suporte Prioritário"]
                    },
                    {
                        tier: "SEGMENTADO ♀",
                        title: "2.500 Seg. Femininas BR",
                        price: 199.00,
                        oldPrice: 280.00,
                        badge: "VIP ♀",
                        speed: "⚡ Processamento Prioritário",
                        geo: "🇧🇷 Mulheres das Capitais BR",
                        features: ["Público Alvo Feminino Real", "Sem Senha Necessária", "Reposição Automática", "Consultoria de Suporte"]
                    }
                ],
                masculino: [
                    {
                        tier: "SEGMENTADO ♂",
                        title: "500 Seg. Masculinos BR",
                        price: 49.00,
                        oldPrice: 68.00,
                        badge: "EXCLUSIVO ♂",
                        speed: "⚡ Início em até 2h",
                        geo: "🇧🇷 Perfis Masculinos Reais BR",
                        features: ["Público 100% Masculino", "Ideal para Fitness & Negócios", `Garantia de ${CONFIG.guaranteeDays} Dias`, "Atendimento VIP"]
                    },
                    {
                        tier: "SEGMENTADO ♂",
                        title: "1.000 Seg. Masculinos BR",
                        price: 89.00,
                        oldPrice: 129.00,
                        badge: "MAIS VENDIDO ♂",
                        speed: "⚡ Envio Gradual 100% Seguro",
                        geo: "🇧🇷 Homens de Todo o Brasil",
                        features: ["Perfis Masculinos Ativos", "Engajamento Elevado", `Reposição ${CONFIG.guaranteeDays} Dias`, "Suporte Prioritário"]
                    },
                    {
                        tier: "SEGMENTADO ♂",
                        title: "2.500 Seg. Masculinos BR",
                        price: 199.00,
                        oldPrice: 280.00,
                        badge: "VIP ♂",
                        speed: "⚡ Processamento Prioritário",
                        geo: "🇧🇷 Homens das Capitais BR",
                        features: ["Público Alvo Masculino Real", "Sem Senha Necessária", "Reposição Automática", "Consultoria de Suporte"]
                    }
                ]
            },
            curtidas: [
                {
                    tier: "TESTE",
                    title: "125 Curtidas BR",
                    price: 4.00,
                    oldPrice: 6.90,
                    badge: "",
                    speed: "⚡ Início Imediato",
                    geo: "🇧🇷 Perfis BR",
                    features: ["Fotos ou Reels", "Início Imediato", "Contas Reais BR", "Sem Senha"]
                },
                {
                    tier: "POPULAR",
                    title: "250 Curtidas BR",
                    price: 8.00,
                    oldPrice: 12.00,
                    badge: "POPULAR",
                    speed: "⚡ Entrega Express",
                    geo: "🇧🇷 Brasil",
                    features: ["Alta Qualidade", "Entrega Express", "Impulso no Feed", "Garantia de Entrega"]
                },
                {
                    tier: "PROMO",
                    title: "500 Curtidas BR",
                    price: 15.00,
                    oldPrice: 22.00,
                    badge: "PROMO",
                    speed: "⚡ Início em 5min",
                    geo: "🇧🇷 Brasil",
                    features: ["Pessoas Reais", "Sem Quedas", "Aumenta o Engajamento", "Atendimento via WhatsApp"]
                },
                {
                    tier: "MAIS VENDIDO",
                    title: "1.000 Curtidas BR",
                    price: 30.00,
                    oldPrice: 45.00,
                    badge: "MAIS VENDIDO",
                    speed: "⚡ Processamento Rápido",
                    geo: "🇧🇷 Brasil",
                    features: ["Qualidade Premium", `Garantia de ${CONFIG.guaranteeDays} Dias`, "Pode Dividir em até 2 Posts", "Suporte Prioritário"]
                }
            ],
            views: [
                {
                    tier: "ECONÔMICO",
                    title: "10k Visualizações",
                    price: 5.00,
                    oldPrice: 9.90,
                    badge: "",
                    speed: "⚡ Início Automático",
                    geo: "🌐 Alta Retenção",
                    features: ["Início Imediato", "Alta Retenção de Vídeo", "Para Reels ou IGTV", "Sem Senha"]
                },
                {
                    tier: "HOT",
                    title: "50k Visualizações",
                    price: 25.00,
                    oldPrice: 39.90,
                    badge: "HOT",
                    speed: "⚡ Entrega Ultra Rápida",
                    geo: "🌐 Algoritmo Explore",
                    features: ["Aumenta Autoridade", "Qualidade HQ", "Retenção Elevada", "Suporte no WhatsApp"]
                },
                {
                    tier: "POPULAR",
                    title: "100k Visualizações",
                    price: 35.00,
                    oldPrice: 55.00,
                    badge: "POPULAR",
                    speed: "⚡ Impulso Viral",
                    geo: "🌐 Alcance Exponencial",
                    features: ["Efeito Viral", "Máximo Alcance Orgânico", "Validação no Algoritmo", "Entrega Segura"]
                },
                {
                    tier: "PREMIUM",
                    title: "1 Milhão de Views",
                    price: 90.00,
                    oldPrice: 140.00,
                    badge: "PREMIUM",
                    speed: "⚡ Envio Gradual",
                    geo: "🌐 Cobertura Global",
                    features: ["Nível Celebridade", "Entrega Segura e Gradual", "Garantia Vitalícia", "Suporte Dedicado"]
                }
            ],
            mensal: [
                {
                    tier: "PLANO MENSAL IA 🤖",
                    title: "Assinatura Starter VIP",
                    price: 59.90,
                    oldPrice: 89.90,
                    badge: "AUTOMAÇÃO IA 🤖",
                    speed: "⚡ Todos os posts novos durante 30 dias",
                    geo: "🇧🇷 Engajamento Automático BR",
                    features: [
                        "🤖 IA detecta novos posts automaticamente",
                        "❤️ 150 a 300 Curtidas em CADA novo post",
                        "👁️ 2.500 Visualizações em CADA novo Reels",
                        "⚡ Sem precisar pedir a cada postagem",
                        "🔒 100% Seguro & Sem Senha"
                    ]
                },
                {
                    tier: "PLANO MENSAL IA 🤖",
                    title: "Assinatura Pro Influencer",
                    price: 119.90,
                    oldPrice: 179.90,
                    badge: "MAIS VENDIDO 🤖",
                    speed: "⚡ Detecção em até 3 minutos por post",
                    geo: "🇧🇷 Perfis Ativos BR",
                    features: [
                        "🤖 IA monitora seu perfil 24 horas por dia",
                        "❤️ 500 a 800 Curtidas em CADA novo post",
                        "👁️ 5.000 Visualizações em CADA novo Reels",
                        "💬 10 Comentários positivos automáticos",
                        "🚀 Alcance orgânico multiplicado por 9x"
                    ]
                },
                {
                    tier: "PLANO MENSAL IA 🤖",
                    title: "Assinatura Master Business",
                    price: 249.90,
                    oldPrice: 380.00,
                    badge: "VIP SUPREMO 🤖",
                    speed: "⚡ Entrega Fracionada Inteligente",
                    geo: "🇧🇷 Capitais do Brasil",
                    features: [
                        "🤖 Cobertura completa para até 30 posts no mês",
                        "❤️ 1.500 Curtidas Reais em CADA novo post",
                        "👁️ 15.000 Visualizações em CADA novo Reels",
                        "💬 25 Comentários personalizados por post",
                        "👑 Atendimento Prioritário VIP 24/7 no WhatsApp"
                    ]
                }
            ],
            comentarios: [
                {
                    tier: "PERSONALIZADO",
                    title: "10 Comentários Personalizados",
                    price: 15.00,
                    oldPrice: 22.00,
                    badge: "HOT 🔥",
                    speed: "⚡ Você escreve o que desejar!",
                    geo: "🇧🇷 Perfis BR Reais",
                    features: ["Comentários à sua escolha", "Perfis com Foto e Bio", "Engajamento 100% Real", "Sem Senha"]
                },
                {
                    tier: "POPULAR",
                    title: "25 Comentários Positivos",
                    price: 29.00,
                    oldPrice: 42.00,
                    badge: "POPULAR",
                    speed: "⚡ Emoticons + Elogios Reais",
                    geo: "🇧🇷 Perfis Brasileiros",
                    features: ["Elogios contextualizados", "Aumenta a Prova Social", "Post/Reels em Destaque", "Garantia de Envio"]
                },
                {
                    tier: "TURBO",
                    title: "50 Comentários Personalizados",
                    price: 49.00,
                    oldPrice: 75.00,
                    badge: "MAIS VENDIDO",
                    speed: "⚡ Envio Automático em Lotes",
                    geo: "🇧🇷 Capitais BR",
                    features: ["Totalmente customizáveis", "Impulsiona Vendas de Produtos", "Suporte VIP via WhatsApp", "Sem Risco à Conta"]
                }
            ],
            stories: [
                {
                    tier: "STORIES",
                    title: "2.500 Views nos Stories",
                    price: 12.00,
                    oldPrice: 19.90,
                    badge: "HOT",
                    speed: "⚡ Válido para todos os Stories ativos",
                    geo: "🇧🇷 Visualizações Reais",
                    features: ["Entrega em até 1 hora", "Distribuição uniforme", "Aumenta taxa de conversão", "Sem Senha"]
                },
                {
                    tier: "STORIES PRO",
                    title: "10.000 Views nos Stories",
                    price: 35.00,
                    oldPrice: 59.00,
                    badge: "POPULAR",
                    speed: "⚡ Início Automático",
                    geo: "🇧🇷 Públicos Brasileiros",
                    features: ["Para contas pessoais ou business", "Efeito Engajamento Total", "Suporte Imediato", "Garantia"]
                },
                {
                    tier: "LIVE EM TEMPO REAL",
                    title: "100 Espectadores na Live (60 min)",
                    price: 39.00,
                    oldPrice: 59.00,
                    badge: "LIVE 🔴",
                    speed: "⚡ Permanência durante a Live",
                    geo: "🇧🇷 Pessoas assistindo",
                    features: ["Manutenção da audiência ao vivo", "Rankeia a Live no topo", "Sem Risco de Queda", "Atendimento VIP no momento da Live"]
                }
            ],
            compartilha: [
                {
                    tier: "COMPARTILHAMENTOS",
                    title: "500 Compartilhamentos",
                    price: 15.00,
                    oldPrice: 25.00,
                    badge: "VIRAL 🚀",
                    speed: "⚡ Início em até 15min",
                    geo: "🇧🇷 Envio no Direct/Externo",
                    features: ["Aumenta o sinal de recomendação no Algoritmo", "Ideal para Reels e Posts de vendas", "Perfis Brasileiros", "Sem necessidade de senha"]
                },
                {
                    tier: "REPOSTS & SALVAMENTOS",
                    title: "1.000 Salvamentos + Shares",
                    price: 29.00,
                    oldPrice: 45.00,
                    badge: "MAIS VENDIDO 🚀",
                    speed: "⚡ Envio Fracionado Seguro",
                    geo: "🇧🇷 Algoritmo IG",
                    features: ["Aumenta a pontuação do Reels no Explore", "Impulsiona engajamento orgânico", "Garantia de 30 dias", "Atendimento Prioritário"]
                }
            ]
        }
    },
    tiktok: {
        categories: [
            { id: "views", label: "Visualizações", icon: "fa-eye", hasGenderFilter: false },
            { id: "seguidores", label: "Seguidores", icon: "fa-users", hasGenderFilter: true },
            { id: "curtidas", label: "Curtidas", icon: "fa-heart", hasGenderFilter: false },
            { id: "mensal", label: "Mensal TikTok IA 🤖", icon: "fa-robot", hasGenderFilter: false },
            { id: "compartilha", label: "Compartilhamentos", icon: "fa-share-nodes", hasGenderFilter: false }
        ],
        products: {
            views: [
                {
                    tier: "INICIANTE",
                    title: "1.000 Visualizações",
                    price: 5.00,
                    oldPrice: 8.00,
                    badge: "",
                    speed: "⚡ Início Imediato",
                    geo: "🌐 Retenção HQ",
                    features: ["Alta Retenção", "Início Imediato", "Entrega Segura", "Sem Senha"]
                },
                {
                    tier: "HOT",
                    title: "15k Visualizações",
                    price: 30.00,
                    oldPrice: 45.00,
                    badge: "HOT",
                    speed: "⚡ For You Impulso",
                    geo: "🌐 Viral Feed",
                    features: ["Crescimento Rápido", "Segurança Garantida", "Impulsiona Vídeo", "Suporte no WhatsApp"]
                },
                {
                    tier: "POPULAR",
                    title: "30k Visualizações",
                    price: 40.00,
                    oldPrice: 60.00,
                    badge: "POPULAR",
                    speed: "⚡ Envio Express",
                    geo: "🌐 Algoritmo TikTok",
                    features: ["Efeito Viral", "Alta Performance", "Recomendação no Algoritmo", "Entrega Garantida"]
                },
                {
                    tier: "ULTRA",
                    title: "1 Milhão de Views",
                    price: 250.00,
                    oldPrice: 390.00,
                    badge: "ULTRA",
                    speed: "⚡ Suporte Master",
                    geo: "🌐 Alcance Global",
                    features: ["Poder Absoluto", "Tratamento Master", "Garantia Vitalícia", "Entrega Prioritária"]
                }
            ],
            seguidores: {
                todos: [
                    {
                        tier: "TESTE",
                        title: "50 Seguidores",
                        price: 3.00,
                        oldPrice: 5.00,
                        badge: "",
                        speed: "⚡ Início Imediato",
                        geo: "🇧🇷 Perfis TikTok",
                        features: ["Entrega Rápida", "Sem Necessidade de Senha", "Perfis de Teste", "Suporte WhatsApp"]
                    },
                    {
                        tier: "POPULAR",
                        title: "500 Seguidores",
                        price: 20.00,
                        oldPrice: 32.00,
                        badge: "POPULAR",
                        speed: "⚡ Crescimento Seguro",
                        geo: "🇧🇷 Pessoas Reais",
                        features: ["Pessoas Reais", `Garantia de ${CONFIG.guaranteeDays} Dias`, "Crescimento Natural", "Atendimento VIP"]
                    },
                    {
                        tier: "RECOMENDADO",
                        title: "1.000 Seguidores",
                        price: 40.00,
                        oldPrice: 65.00,
                        badge: "MAIS VENDIDO",
                        speed: "⚡ Libera LIVE no TikTok",
                        geo: "🇧🇷 Contas Ativas BR",
                        features: ["Qualidade HQ", "Libera Live no TikTok", "Suporte VIP Prioritário", "Garantia de Reposição"]
                    }
                ],
                feminino: [
                    {
                        tier: "SEGMENTADO ♀",
                        title: "500 Seg. Femininas TikTok",
                        price: 35.00,
                        oldPrice: 50.00,
                        badge: "EXCLUSIVO ♀",
                        speed: "⚡ Início em até 2h",
                        geo: "🇧🇷 Mulheres do TikTok BR",
                        features: ["Contas 100% Femininas", "Engajamento em Vídeos", `Garantia de ${CONFIG.guaranteeDays} Dias`, "Suporte no WhatsApp"]
                    },
                    {
                        tier: "SEGMENTADO ♀",
                        title: "1.000 Seg. Femininas TikTok",
                        price: 65.00,
                        oldPrice: 95.00,
                        badge: "MAIS VENDIDO ♀",
                        speed: "⚡ Processamento Seguro",
                        geo: "🇧🇷 Perfis Femininos Reais",
                        features: ["Perfis Femininos Ativos", "Aumenta Visibilidade no For You", "Garantia de Reposição", "Atendimento VIP"]
                    }
                ],
                masculino: [
                    {
                        tier: "SEGMENTADO ♂",
                        title: "500 Seg. Masculinos TikTok",
                        price: 35.00,
                        oldPrice: 50.00,
                        badge: "EXCLUSIVO ♂",
                        speed: "⚡ Início em até 2h",
                        geo: "🇧🇷 Homens do TikTok BR",
                        features: ["Contas 100% Masculinas", "Engajamento em Vídeos", `Garantia de ${CONFIG.guaranteeDays} Dias`, "Suporte no WhatsApp"]
                    },
                    {
                        tier: "SEGMENTADO ♂",
                        title: "1.000 Seg. Masculinos TikTok",
                        price: 65.00,
                        oldPrice: 95.00,
                        badge: "MAIS VENDIDO ♂",
                        speed: "⚡ Processamento Seguro",
                        geo: "🇧🇷 Perfis Masculinos Reais",
                        features: ["Perfis Masculinos Ativos", "Aumenta Visibilidade no For You", "Garantia de Reposição", "Atendimento VIP"]
                    }
                ]
            },
            curtidas: [
                {
                    tier: "INICIANTE",
                    title: "250 Curtidas",
                    price: 5.00,
                    oldPrice: 8.00,
                    badge: "",
                    speed: "⚡ Envio Rápido",
                    geo: "🇧🇷 TikTok BR",
                    features: ["Aumenta o Alcance", "Sem Quedas Bruscas", "Para Qualquer Vídeo", "Sem Senha"]
                },
                {
                    tier: "MAIS VENDIDO",
                    title: "1.000 Curtidas",
                    price: 20.00,
                    oldPrice: 32.00,
                    badge: "MAIS VENDIDO",
                    speed: "⚡ Impulso For You",
                    geo: "🇧🇷 Perfis Reais",
                    features: ["Qualidade Premium", "Sem Senha", "Engajamento Real", "Suporte WhatsApp VIP"]
                }
            ],
            mensal: [
                {
                    tier: "MENSAL TIKTOK IA 🤖",
                    title: "Plano Viral TikTok 30 Dias",
                    price: 49.90,
                    oldPrice: 79.90,
                    badge: "AUTOMAÇÃO IA 🤖",
                    speed: "⚡ Detecta vídeos novos em 5min",
                    geo: "🌐 Feed For You TikTok",
                    features: [
                        "🤖 IA envia engajamento a cada novo vídeo publicado",
                        "👁️ 5.000 Visualizações automáticas por vídeo",
                        "❤️ 250 Curtidas automáticas por vídeo",
                        "⚡ Sem precisar contratar a cada postagem",
                        "🔒 100% Seguro & Sem Senha"
                    ]
                }
            ],
            compartilha: [
                {
                    tier: "VIRAL TIKTOK",
                    title: "1.000 Compartilhamentos TikTok",
                    price: 18.00,
                    oldPrice: 28.00,
                    badge: "VIRAL 🚀",
                    speed: "⚡ Início em até 10min",
                    geo: "🌐 Algoritmo For You",
                    features: ["Faz o vídeo rodar no For You de milhares de pessoas", "Sinaliza relevância máxima ao algoritmo", "Sem necessidade de senha"]
                }
            ]
        }
    },
    kwai: {
        categories: [
            { id: "seguidores", label: "Seguidores", icon: "fa-users", hasGenderFilter: false },
            { id: "curtidas", label: "Curtidas", icon: "fa-heart", hasGenderFilter: false },
            { id: "views", label: "Visualizações", icon: "fa-eye", hasGenderFilter: false }
        ],
        products: {
            seguidores: [
                {
                    tier: "INICIANTE",
                    title: "250 Seg. Kwai",
                    price: 10.00,
                    oldPrice: 16.00,
                    badge: "",
                    speed: "⚡ Início Imediato",
                    geo: "🇧🇷 Kwai Brasil",
                    features: ["Perfis Ativos", "Início Imediato", `Garantia ${CONFIG.guaranteeDays} Dias`, "Sem Senha"]
                },
                {
                    tier: "RECOMENDADO",
                    title: "1.000 Seg. Kwai",
                    price: 32.00,
                    oldPrice: 48.00,
                    badge: "RECOMENDADO",
                    speed: "⚡ Entrega Segura",
                    geo: "🇧🇷 Perfis BR",
                    features: ["Pessoas Reais", "Garantia de Reposição", "Impulso na Conta", "Atendimento Prioritário"]
                }
            ],
            curtidas: [
                {
                    tier: "MAIS VENDIDO",
                    title: "1.000 Curtidas Kwai",
                    price: 20.00,
                    oldPrice: 30.00,
                    badge: "MAIS VENDIDO",
                    speed: "⚡ Processo Automático",
                    geo: "🇧🇷 Brasil",
                    features: ["Qualidade HQ", "Entrega Imediata", "Sem Quedas", "Atendimento Prioritário"]
                }
            ],
            views: [
                {
                    tier: "POPULAR",
                    title: "20.000 Views Kwai",
                    price: 25.00,
                    oldPrice: 38.00,
                    badge: "POPULAR",
                    speed: "⚡ Impulso de Recomendados",
                    geo: "🌐 Alta Retenção",
                    features: ["Efeito Recomendados", "Alta Retenção", "Garantia Total", "Suporte WhatsApp"]
                }
            ]
        }
    },
    youtube: {
        categories: [
            { id: "inscritos", label: "Inscritos", icon: "fa-users", hasGenderFilter: false },
            { id: "views", label: "Visualizações", icon: "fa-eye", hasGenderFilter: false },
            { id: "curtidas", label: "Curtidas", icon: "fa-thumbs-up", hasGenderFilter: false }
        ],
        products: {
            inscritos: [
                {
                    tier: "MONETIZAÇÃO",
                    title: "1.000 Inscritos YT",
                    price: 180.00,
                    oldPrice: 260.00,
                    badge: "MAIS VENDIDO",
                    speed: "⚡ Requisito de Monetização",
                    geo: "🇧🇷 Canais Reais",
                    features: ["Atinge Requisito do YT", "Canais Ativos", "Garantia Total", "Suporte Dedicado 24h"]
                }
            ],
            views: [
                {
                    tier: "POPULAR",
                    title: "5.000 Views YT",
                    price: 75.00,
                    oldPrice: 110.00,
                    badge: "POPULAR",
                    speed: "⚡ Retenção de Vídeo",
                    geo: "🌐 Busca & Sugeridos YT",
                    features: ["Vídeos Longos ou Shorts", "Impulso na Busca YT", `Garantia de ${CONFIG.guaranteeDays} Dias`, "Suporte VIP"]
                }
            ],
            curtidas: [
                {
                    tier: "RECOMENDADO",
                    title: "1.000 Likes YT",
                    price: 40.00,
                    oldPrice: 60.00,
                    badge: "MAIS VENDIDO",
                    speed: "⚡ Em Vídeos & Shorts",
                    geo: "🇧🇷 Pessoas Reais",
                    features: ["Impulso de Algoritmo", "Pessoas Reais", `Garantia de ${CONFIG.guaranteeDays} Dias`, "Suporte VIP"]
                }
            ]
        }
    },
    telegram: {
        categories: [
            { id: "membros", label: "Membros de Canal", icon: "fa-users", hasGenderFilter: false }
        ],
        products: {
            membros: [
                {
                    tier: "MAIS VENDIDO",
                    title: "2.500 Membros Telegram",
                    price: 80.00,
                    oldPrice: 120.00,
                    badge: "MAIS VENDIDO",
                    speed: "⚡ Início em até 30min",
                    geo: "🌐 Membros Ativos",
                    features: ["Crescimento Acelerado", "Sem Quedas Bruscas", "Suporte VIP 24h", "Atendimento Prioritário"]
                }
            ]
        }
    },
    twitter: {
        categories: [
            { id: "seguidores", label: "Seguidores X", icon: "fa-users", hasGenderFilter: false }
        ],
        products: {
            seguidores: [
                {
                    tier: "MAIS VENDIDO",
                    title: "1.000 Seguidores X",
                    price: 50.00,
                    oldPrice: 75.00,
                    badge: "MAIS VENDIDO",
                    speed: "⚡ Entrega Segura",
                    geo: "🇧🇷 Perfis Ativos X",
                    features: ["Autoridade no Twitter/X", "Garantia Total", "Suporte VIP", "Processamento Imediato"]
                }
            ]
        }
    }
};

// --- SIMULATED LIVE SALES DATA ---
const RECENT_SALES = [
    { name: "Lucas M. (SP)", action: "adquiriu 1.000 Seguidores Instagram", time: "há 2 min" },
    { name: "Mariana R. (RJ)", action: "adquiriu 500 Curtidas BR Instagram", time: "há 5 min" },
    { name: "Felipe S. (MG)", action: "assinou o Plano Mensal Instagram IA 🤖", time: "há 1 min" },
    { name: "Camila B. (PR)", action: "adquiriu 1.000 Seg. Femininas IG", time: "há 8 min" },
    { name: "Rodrigo A. (SC)", action: "adquiriu 1.000 Inscritos YouTube", time: "há 4 min" },
    { name: "Vanessa K. (RS)", action: "adquiriu 10 Comentários Personalizados", time: "há 3 min" },
    { name: "Guilherme P. (DF)", action: "adquiriu 1.000 Compartilhamentos Reels", time: "há 6 min" }
];

// --- APP STATE ---
let currentPlatform = "insta";
let currentCategory = "seguidores";
let selectedProductForModal = null;

// --- DOM INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    applyEnvSettings();
    setupEventListeners();
    setupMobileDrawer();
    setupScheduleWidget();
    renderPlatformCategories();
    renderProducts();
    setupCalculator();
    if (CONFIG.enableSalesTicker) setupSalesTicker();
    setupCounters();
});

// Update dynamic environment bindings
function applyEnvSettings() {
    // WhatsApp Links
    document.querySelectorAll(".env-wa-link").forEach(link => {
        link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20UpSocial%20Pro%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida.`;
    });

    // Guarantee days text
    document.querySelectorAll(".env-guarantee").forEach(el => {
        el.textContent = CONFIG.guaranteeDays;
    });

    // Phone display formatting
    const phoneDisplay = document.getElementById("env-phone-display");
    if (phoneDisplay && CONFIG.whatsappNumber.length >= 11) {
        const ddd = CONFIG.whatsappNumber.slice(2, 4);
        const part1 = CONFIG.whatsappNumber.slice(4, 9);
        const part2 = CONFIG.whatsappNumber.slice(9);
        phoneDisplay.textContent = `(${ddd}) ${part1}-${part2}`;
    }
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
    // Platform Tabs
    const platBtns = document.querySelectorAll("#platform-tabs .plat-btn");
    platBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const platform = btn.getAttribute("data-platform");
            if (platform && CATALOG_DATA[platform]) {
                platBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentPlatform = platform;
                
                // Reset category to first available
                const categories = CATALOG_DATA[platform].categories;
                currentCategory = categories[0].id;
                currentGender = "todos"; // reset gender filter

                renderPlatformCategories();
                renderProducts();

                // Update calculator platform dropdown
                const calcPlatSelect = document.getElementById("calc-platform-select");
                if (calcPlatSelect) {
                    calcPlatSelect.value = platform;
                    updateCalculatorServices();
                }
            }
        });
    });

    // Footer platform links
    document.querySelectorAll(".plat-footer-link").forEach(link => {
        link.addEventListener("click", () => {
            const plat = link.getAttribute("data-platform");
            if (plat) {
                const targetBtn = document.querySelector(`#platform-tabs .plat-btn[data-platform="${plat}"]`);
                if (targetBtn) targetBtn.click();
            }
        });
    });

    // Modal Close
    const btnCloseModal = document.getElementById("btn-close-modal");
    const modalOverlay = document.getElementById("checkout-modal");
    if (btnCloseModal && modalOverlay) {
        btnCloseModal.addEventListener("click", closeModal);
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Confirm WhatsApp Button in Modal
    const btnConfirmWa = document.getElementById("btn-confirm-whatsapp");
    if (btnConfirmWa) {
        btnConfirmWa.addEventListener("click", processModalWhatsAppOrder);
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(btn => {
        btn.addEventListener("click", () => {
            const parent = btn.parentElement;
            const isActive = parent.classList.contains("active");

            // Close all
            document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));

            // Toggle clicked
            if (!isActive) {
                parent.classList.add("active");
            }
        });
    });

    // Sales Ticker Close
    const btnCloseTicker = document.getElementById("btn-close-ticker");
    const salesTicker = document.getElementById("sales-ticker");
    if (btnCloseTicker && salesTicker) {
        btnCloseTicker.addEventListener("click", () => {
            salesTicker.classList.add("hidden");
        });
    }
}

// --- INTERACTIVE SUPPORT SCHEDULE WIDGET (MAISGRAM INSPIRED) ---
function setupScheduleWidget() {
    const btnOpenWidget = document.getElementById("btn-open-schedule");
    const widgetModal = document.getElementById("schedule-widget");
    const btnCloseWidget = document.getElementById("btn-close-schedule");

    if (!btnOpenWidget || !widgetModal) return;

    btnOpenWidget.addEventListener("click", (e) => {
        e.preventDefault();
        widgetModal.classList.toggle("active");
    });

    if (btnCloseWidget) {
        btnCloseWidget.addEventListener("click", () => {
            widgetModal.classList.remove("active");
        });
    }
}

// --- MOBILE DRAWER ---
function setupMobileDrawer() {
    const toggleBtn = document.getElementById("mobile-toggle");
    const closeBtn = document.getElementById("drawer-close");
    const drawer = document.getElementById("mobile-drawer");
    const overlay = document.getElementById("drawer-overlay");

    if (!toggleBtn || !drawer || !overlay) return;

    function openDrawer() {
        drawer.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        drawer.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    toggleBtn.addEventListener("click", openDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    overlay.addEventListener("click", closeDrawer);

    document.querySelectorAll(".drawer-link").forEach(link => {
        link.addEventListener("click", closeDrawer);
    });
}

// --- RENDER FUNCTIONS ---
function renderPlatformCategories() {
    const filtersContainer = document.getElementById("category-filters");
    if (!filtersContainer) return;

    filtersContainer.innerHTML = "";
    const categories = CATALOG_DATA[currentPlatform].categories;

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.className = `filter-btn ${cat.id === currentCategory ? 'active' : ''}`;
        btn.innerHTML = `<i class="fa-solid ${cat.icon}"></i> ${cat.label}`;
        btn.addEventListener("click", () => {
            document.querySelectorAll("#category-filters .filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentCategory = cat.id;
            currentGender = "todos"; // reset gender filter on category change
            renderProducts();
        });
        filtersContainer.appendChild(btn);
    });

    renderGenderFilterBar();
}

function renderGenderFilterBar() {
    const genderContainer = document.getElementById("gender-filter-bar");
    if (!genderContainer) return;

    const currentCatObj = CATALOG_DATA[currentPlatform].categories.find(c => c.id === currentCategory);

    if (currentCatObj && currentCatObj.hasGenderFilter) {
        genderContainer.style.display = "flex";
        genderContainer.innerHTML = `
            <span class="gender-title"><i class="fa-solid fa-venus-mars"></i> Segmentação por Gênero:</span>
            <button class="gender-btn ${currentGender === 'todos' ? 'active' : ''}" onclick="setGenderFilter('todos')">
                <i class="fa-solid fa-users"></i> Todos os Perfis
            </button>
            <button class="gender-btn ${currentGender === 'feminino' ? 'active' : ''}" onclick="setGenderFilter('feminino')">
                <i class="fa-solid fa-venus"></i> Feminino ♀
            </button>
            <button class="gender-btn ${currentGender === 'masculino' ? 'active' : ''}" onclick="setGenderFilter('masculino')">
                <i class="fa-solid fa-mars"></i> Masculino ♂
            </button>
        `;
    } else {
        genderContainer.style.display = "none";
    }
}

function setGenderFilter(gender) {
    currentGender = gender;
    renderGenderFilterBar();
    renderProducts();
}

function renderProducts() {
    const cardsContainer = document.getElementById("services-cards-container");
    if (!cardsContainer) return;

    cardsContainer.innerHTML = "";
    
    let productsList = CATALOG_DATA[currentPlatform].products[currentCategory];

    // If product category has gender sub-arrays (e.g. seguidores)
    if (productsList && typeof productsList === "object" && !Array.isArray(productsList)) {
        productsList = productsList[currentGender] || productsList["todos"] || [];
    }

    if (!productsList || productsList.length === 0) {
        cardsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fa-solid fa-clock-rotate-left" style="font-size: 32px; margin-bottom: 15px; color: var(--primary-light);"></i>
                <p style="font-size: 16px; font-weight: 700;">Novos pacotes para esta categoria estarão disponíveis em breve!</p>
            </div>
        `;
        return;
    }

    productsList.forEach((prod, index) => {
        const card = document.createElement("div");
        card.className = "s-card";
        
        let ribbonHtml = "";
        if (prod.badge) {
            let ribbonClass = "s-card-ribbon";
            if (prod.badge.includes("POPULAR")) ribbonClass += " popular";
            if (prod.badge.includes("RECOMENDADO")) ribbonClass += " recomendado";
            if (prod.badge.includes("VENDIDO") || prod.badge.includes("MELHOR") || prod.badge.includes("AUTOMAÇÃO")) ribbonClass += " best-price";
            ribbonHtml = `<div class="${ribbonClass}">${prod.badge}</div>`;
        }

        const featuresHtml = prod.features.map(f => `<li><i class="fa-solid fa-check-circle"></i> ${f}</li>`).join("");

        // Original price strikethrough logic
        const oldPriceHtml = prod.oldPrice ? `<span class="price-strikethrough">De R$ ${prod.oldPrice.toFixed(2).replace('.', ',')} por</span>` : `<span class="price-currency">Valor Promoção</span>`;

        // Technical specs pills
        const techSpecsHtml = `
            <div class="card-tech-specs">
                <span class="spec-pill"><i class="fa-solid fa-bolt"></i> ${prod.speed || 'Início Imediato'}</span>
                <span class="spec-pill"><i class="fa-solid fa-location-dot"></i> ${prod.geo || 'Brasil'}</span>
            </div>
        `;

        card.innerHTML = `
            ${ribbonHtml}
            <div>
                <div class="card-header-info">
                    <div class="card-tier-name">${prod.tier}</div>
                    <h3 class="card-title">${prod.title}</h3>
                </div>
                ${techSpecsHtml}
                <ul class="card-features">
                    ${featuresHtml}
                </ul>
            </div>
            <div class="price-box">
                <div class="price-amount">
                    ${oldPriceHtml}
                    <span class="price-val">R$ ${prod.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <button class="buy-btn" onclick="openCheckoutModal('${currentPlatform}', '${currentCategory}', '${currentGender}', ${index})">
                    Contratar <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        `;

        cardsContainer.appendChild(card);
    });
}

// --- CHECKOUT MODAL LOGIC ---
function openCheckoutModal(platform, category, genderKey, productIndex) {
    let productObj = CATALOG_DATA[platform].products[category];
    if (productObj && typeof productObj === "object" && !Array.isArray(productObj)) {
        productObj = productObj[genderKey] || productObj["todos"];
    }

    const product = productObj[productIndex];
    if (!product) return;

    selectedProductForModal = {
        platformName: getPlatformDisplayName(platform),
        title: product.title,
        price: product.price,
        speed: product.speed,
        features: product.features
    };

    const modalPlanTitle = document.getElementById("modal-plan-title");
    const modalPlanPrice = document.getElementById("modal-plan-price");
    const modalFeaturesList = document.getElementById("modal-features-list");
    const modalUserInput = document.getElementById("modal-user-input");

    if (modalPlanTitle) modalPlanTitle.textContent = `${selectedProductForModal.platformName} - ${selectedProductForModal.title}`;
    if (modalPlanPrice) modalPlanPrice.textContent = `R$ ${selectedProductForModal.price.toFixed(2).replace('.', ',')}`;

    if (modalFeaturesList) {
        modalFeaturesList.innerHTML = selectedProductForModal.features
            .map(f => `<p><i class="fa-solid fa-circle-check"></i> ${f}</p>`)
            .join("");
    }

    if (modalUserInput) modalUserInput.value = "";

    const modalOverlay = document.getElementById("checkout-modal");
    if (modalOverlay) modalOverlay.classList.add("active");
}

function closeModal() {
    const modalOverlay = document.getElementById("checkout-modal");
    if (modalOverlay) modalOverlay.classList.remove("active");
    selectedProductForModal = null;
}

function processModalWhatsAppOrder() {
    if (!selectedProductForModal) return;

    const userInput = document.getElementById("modal-user-input").value.trim();
    const userRef = userInput !== "" ? userInput : "[Não informado]";

    const messageText = `Olá! Quero contratar ${selectedProductForModal.platformName} ${selectedProductForModal.title} por R$ ${selectedProductForModal.price.toFixed(2).replace('.', ',')}.\n\n📌 Perfil/Link: ${userRef}`;

    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, "_blank");
    closeModal();
}

function getPlatformDisplayName(platformKey) {
    const map = {
        insta: "Instagram",
        tiktok: "TikTok",
        kwai: "Kwai",
        youtube: "YouTube",
        telegram: "Telegram",
        twitter: "Twitter/X"
    };
    return map[platformKey] || platformKey.toUpperCase();
}

// --- CALCULATOR LOGIC ---
function setupCalculator() {
    const calcPlatSelect = document.getElementById("calc-platform-select");
    const calcServiceSelect = document.getElementById("calc-service-select");
    const calcRange = document.getElementById("calc-range");
    const btnOrderCustom = document.getElementById("btn-order-custom");

    if (!calcPlatSelect || !calcRange) return;

    calcPlatSelect.addEventListener("change", () => {
        updateCalculatorServices();
        calculateCustomPrice();
    });

    if (calcServiceSelect) {
        calcServiceSelect.addEventListener("change", calculateCustomPrice);
    }

    calcRange.addEventListener("input", calculateCustomPrice);

    if (btnOrderCustom) {
        btnOrderCustom.addEventListener("click", processCustomCalculatorOrder);
    }

    updateCalculatorServices();
    calculateCustomPrice();
}

function updateCalculatorServices() {
    const platSelect = document.getElementById("calc-platform-select");
    const serviceSelect = document.getElementById("calc-service-select");
    if (!platSelect || !serviceSelect) return;

    const plat = platSelect.value;
    const categories = CATALOG_DATA[plat] ? CATALOG_DATA[plat].categories : [];

    serviceSelect.innerHTML = "";
    categories.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.label;
        serviceSelect.appendChild(opt);
    });
}

function calculateCustomPrice() {
    const range = document.getElementById("calc-range");
    const qtyVal = document.getElementById("calc-quantity-val");
    const totalPriceEl = document.getElementById("calc-total-price");
    const discountTag = document.getElementById("calc-discount-tag");
    const serviceSelect = document.getElementById("calc-service-select");

    if (!range || !qtyVal || !totalPriceEl) return;

    const qty = parseInt(range.value, 10);
    qtyVal.textContent = qty.toLocaleString('pt-BR');

    const serviceType = serviceSelect ? serviceSelect.value : "seguidores";

    // Rate calculation base per 1000 units
    let ratePerThousand = 50.0;
    if (serviceType === "curtidas") ratePerThousand = 30.0;
    if (serviceType === "views") ratePerThousand = 2.5;
    if (serviceType === "comentarios") ratePerThousand = 300.0;
    if (serviceType === "stories") ratePerThousand = 5.0;
    if (serviceType === "mensal") ratePerThousand = 120.0;
    if (serviceType === "compartilha") ratePerThousand = 25.0;
    if (serviceType === "inscritos" || serviceType === "membros") ratePerThousand = 150.0;

    let rawPrice = (qty / 1000) * ratePerThousand;
    if (rawPrice < CONFIG.minOrderVal) rawPrice = CONFIG.minOrderVal;

    // Progressive discount based on quantity
    let discountPercent = 0;
    if (qty >= 1000 && qty < 5000) discountPercent = 10;
    else if (qty >= 5000 && qty < 20000) discountPercent = 20;
    else if (qty >= 20000) discountPercent = 35;

    const finalPrice = rawPrice * (1 - discountPercent / 100);

    totalPriceEl.textContent = `R$ ${finalPrice.toFixed(2).replace('.', ',')}`;

    if (discountTag) {
        if (discountPercent > 0) {
            discountTag.style.display = "inline-block";
            discountTag.textContent = `🔥 ${discountPercent}% de Desconto Ativado`;
        } else {
            discountTag.style.display = "none";
        }
    }
}

function processCustomCalculatorOrder() {
    const platSelect = document.getElementById("calc-platform-select");
    const serviceSelect = document.getElementById("calc-service-select");
    const range = document.getElementById("calc-range");
    const userInput = document.getElementById("calc-username-input");
    const totalPriceEl = document.getElementById("calc-total-price");

    const platformName = getPlatformDisplayName(platSelect.value);
    const serviceLabel = serviceSelect.options[serviceSelect.selectedIndex].text;
    const qty = parseInt(range.value, 10).toLocaleString('pt-BR');
    const priceText = totalPriceEl.textContent;
    const userRef = userInput && userInput.value.trim() !== "" ? userInput.value.trim() : "[Não informado]";

    const messageText = `Olá! Quero contratar Pacote Personalizado:\n\n🌐 Plataforma: ${platformName}\n⚡ Serviço: ${serviceLabel}\n📊 Quantidade: ${qty}\n💰 Valor Total: ${priceText}\n📌 Perfil/Link: ${userRef}`;

    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, "_blank");
}

// --- SALES TICKER TOAST ---
function setupSalesTicker() {
    const salesTicker = document.getElementById("sales-ticker");
    const tickerText = document.getElementById("ticker-text");
    const tickerTime = document.getElementById("ticker-time");

    if (!salesTicker || !tickerText) return;

    let index = 0;

    function showNextSale() {
        const sale = RECENT_SALES[index];
        tickerText.innerHTML = `<strong>${sale.name}</strong> ${sale.action}`;
        if (tickerTime) tickerTime.textContent = `${sale.time} • Verificado`;

        salesTicker.classList.remove("hidden");

        setTimeout(() => {
            salesTicker.classList.add("hidden");
        }, 5000);

        index = (index + 1) % RECENT_SALES.length;
    }

    setTimeout(showNextSale, 4000);
    setInterval(showNextSale, 14000);
}

// --- STATS COUNTER ANIMATION ---
function setupCounters() {
    const counterEl = document.getElementById("counter-orders");
    if (!counterEl) return;

    let targetVal = parseInt(CONFIG.totalOrders, 10) || 185400;
    let start = targetVal - 400;

    const interval = setInterval(() => {
        start += 5;
        if (start >= targetVal) {
            counterEl.textContent = `${targetVal.toLocaleString('pt-BR')}+`;
            clearInterval(interval);
        } else {
            counterEl.textContent = `${start.toLocaleString('pt-BR')}+`;
        }
    }, 80);
}
