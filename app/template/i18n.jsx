// === i18n dictionary + helpers ===
window.LANGS = [
  { code: "en", label: "EN", name: "English" },
  { code: "uz", label: "UZ", name: "O‘zbek" },
  { code: "ru", label: "RU", name: "Русский" },
  { code: "de", label: "DE", name: "Deutsch" },
];

window.I18N = {
  // === NAV & GLOBAL ===
  "nav.home":     { en: "Home",       uz: "Bosh sahifa", ru: "Главная",    de: "Start" },
  "nav.projects": { en: "Projects",   uz: "Loyihalar",   ru: "Проекты",    de: "Projekte" },
  "nav.services": { en: "Services",   uz: "Xizmatlar",   ru: "Услуги",     de: "Services" },
  "nav.blog":     { en: "Blog",       uz: "Blog",        ru: "Блог",       de: "Blog" },
  "nav.contact":  { en: "Contact",    uz: "Aloqa",       ru: "Контакты",   de: "Kontakt" },

  "cta.lets_build":  { en: "Let’s build", uz: "Boshlaymiz", ru: "Давайте построим", de: "Lass uns bauen" },
  "cta.view_work":   { en: "View Work",   uz: "Ishlarimni ko‘rish", ru: "Смотреть работы", de: "Arbeiten ansehen" },
  "cta.get_in_touch":{ en: "Get in Touch",uz: "Bog‘lanish", ru: "Связаться", de: "Kontakt aufnehmen" },
  "cta.start_project":{en: "Start a project", uz: "Loyihani boshlash", ru: "Начать проект", de: "Projekt starten" },
  "cta.all_projects":{ en: "All projects", uz: "Barcha loyihalar", ru: "Все проекты", de: "Alle Projekte" },
  "cta.read":        { en: "Read article", uz: "Maqolani o‘qish", ru: "Читать статью", de: "Artikel lesen" },
  "cta.older_posts": { en: "Older posts",  uz: "Eski postlar",  ru: "Старые посты",  de: "Ältere Beiträge" },
  "cta.subscribe":   { en: "Subscribe",    uz: "Obuna bo‘lish", ru: "Подписаться",   de: "Abonnieren" },
  "cta.load_more":   { en: "Load more",    uz: "Ko‘proq yuklash", ru: "Загрузить ещё", de: "Mehr laden" },
  "cta.send":        { en: "Send message", uz: "Xabar yuborish", ru: "Отправить",    de: "Nachricht senden" },
  "cta.learn_more":  { en: "learn more",   uz: "batafsil",      ru: "подробнее",    de: "mehr erfahren" },
  "cta.get_started": { en: "Get started",  uz: "Boshlash",      ru: "Начать",       de: "Loslegen" },
  "cta.contact_me":  { en: "Contact me",   uz: "Men bilan bog‘laning", ru: "Напишите мне", de: "Schreib mir" },

  // === HERO ===
  "hero.available":  { en: "available · may 2026", uz: "bandlik · may 2026", ru: "свободен · май 2026", de: "verfügbar · mai 2026" },
  "hero.h1.l1":      { en: "Design",        uz: "Dizayn",       ru: "Дизайн",         de: "Design" },
  "hero.h1.l2":      { en: "engineer",      uz: "muhandisi",    ru: "инженер",        de: "Ingenieur" },
  "hero.h1.l3":      { en: "building the",  uz: "interfeys",    ru: "создаёт",         de: "der die" },
  "hero.h1.l4":      { en: "interface layer", uz: "qatlamini quradi", ru: "интерфейсный слой", de: "Interface-Schicht baut" },
  "hero.sub":        {
    en: "I build fast, accessible web products for startups and tech teams. Nuxt-leaning, type-safe, and shipped on a deadline.",
    uz: "Men startaplar va tech jamoalar uchun tez, qulay veb-mahsulotlar quraman. Nuxt asosida, tipdan xavfsiz va o‘z vaqtida yetkaziladi.",
    ru: "Создаю быстрые, доступные веб-продукты для стартапов и команд. Стек Nuxt, типобезопасно, в срок.",
    de: "Ich baue schnelle, zugängliche Web-Produkte für Startups und Tech-Teams. Nuxt-orientiert, typsicher, fristgerecht ausgeliefert."
  },
  "hero.scroll":     { en: "scroll", uz: "pastga", ru: "скролл", de: "scroll" },
  "hero.down":       { en: "down",   uz: "aylantiring", ru: "вниз", de: "runter" },

  // === ABOUT ===
  "about.label":     { en: "About",       uz: "Men haqimda", ru: "Обо мне",  de: "Über mich" },
  "about.title":     { en: "Six years of shipping.", uz: "Olti yillik tajriba.", ru: "Шесть лет в продакшне.", de: "Sechs Jahre im Versand." },
  "about.lead":      {
    en: "Design engineer working at the intersection of craft and code.",
    uz: "Hunar va kodning kesishmasida ishlovchi dizayn-muhandis.",
    ru: "Design-инженер на стыке ремесла и кода.",
    de: "Design-Engineer an der Schnittstelle von Handwerk und Code."
  },
  "about.body":      {
    en: "I help founders and product teams turn ambiguous specs into shipped, polished interfaces. I obsess over typography, animation, and the small interactions that separate decent from delightful.",
    uz: "Asoschilar va mahsulot jamoalariga noaniq talablarni yetkazib berilgan, sayqallangan interfeyslarga aylantirishda yordam beraman. Tipografiya, animatsiya va kichik interaksiyalarga vasvasaman.",
    ru: "Помогаю фаундерам и продуктовым командам превращать размытые ТЗ в готовые, отполированные интерфейсы. Одержим типографикой, анимацией и мелкими взаимодействиями.",
    de: "Ich helfe Gründer:innen und Produktteams, vage Specs in fertige, polierte Interfaces zu verwandeln. Besessen von Typo, Animation und kleinen Interaktionen."
  },
  "about.h.1":  { en: "6+ years shipping production web apps", uz: "6+ yil veb-ilovalarni ishlab chiqarishga chiqarish", ru: "6+ лет вывода веб-приложений в прод", de: "6+ Jahre produktive Web-Apps versandt" },
  "about.h.2":  { en: "Vue / Nuxt / TypeScript specialist", uz: "Vue / Nuxt / TypeScript bo‘yicha mutaxassis", ru: "Специалист Vue / Nuxt / TypeScript", de: "Vue / Nuxt / TypeScript Spezialist" },
  "about.h.3":  { en: "Open-source contributor — 2.4k stars", uz: "Ochiq kod hissadori — 2.4k yulduz", ru: "Open-source — 2.4k звёзд", de: "Open-Source-Beitragender — 2.4k Sterne" },
  "about.h.4":  { en: "Talks, writing & design-engineering coaching", uz: "Ma‘ruzalar, yozuv va dizayn-injiniring darslari", ru: "Доклады, статьи и менторство", de: "Vorträge, Texte & Coaching" },
  "about.m.1":  { en: "since 2020", uz: "2020-dan", ru: "с 2020", de: "seit 2020" },
  "about.m.2":  { en: "core focus", uz: "asosiy yo‘nalish", ru: "ключевая зона", de: "Kernfokus" },
  "about.m.3":  { en: "12 repos",   uz: "12 ta repo",  ru: "12 репозиториев", de: "12 Repos" },
  "about.m.4":  { en: "on request", uz: "so‘rov bo‘yicha", ru: "по запросу", de: "auf Anfrage" },
  "about.imgalt":{ en: "[ portrait — 4:5 ]", uz: "[ portret — 4:5 ]", ru: "[ портрет — 4:5 ]", de: "[ Porträt — 4:5 ]" },

  // === STACK ===
  "stack.label": { en: "Tech",         uz: "Texnologiya", ru: "Стек",        de: "Tech" },
  "stack.title": { en: "Stack & tools.", uz: "Stek va asboblar.", ru: "Стек и инструменты.", de: "Stack & Werkzeuge." },
  "stack.count": { en: "{n} technologies", uz: "{n} ta texnologiya", ru: "{n} технологий", de: "{n} Technologien" },
  "stack.frontend":{ en: "Frontend", uz: "Frontend", ru: "Фронтенд", de: "Frontend" },
  "stack.backend": { en: "Backend",  uz: "Backend",  ru: "Бэкенд",  de: "Backend" },
  "stack.tools":   { en: "Tools",    uz: "Asboblar", ru: "Тулинг",  de: "Tools" },

  // === FEATURED ===
  "feat.label":  { en: "Selected work",   uz: "Tanlangan ishlar", ru: "Избранные работы", de: "Ausgewählte Arbeiten" },
  "feat.title":  { en: "Things I’ve built lately.", uz: "Yaqinda qurganim narsalar.", ru: "Что я построил недавно.", de: "Was ich kürzlich gebaut habe." },

  // === CTA STRIP ===
  "cta.strip.title": {
    en: "Got a project in mind? Let’s figure out the shape of it together.",
    uz: "Loyihangiz bormi? Birga uning shaklini topamiz.",
    ru: "Есть проект на уме? Найдём его форму вместе.",
    de: "Ein Projekt im Kopf? Lass uns gemeinsam die Form finden."
  },

  // === FOOTER ===
  "footer.meta": { en: "© 2026 — V3.0 · BUILT WITH NUXT", uz: "© 2026 — V3.0 · NUXT BILAN QURILGAN", ru: "© 2026 — V3.0 · СДЕЛАНО НА NUXT", de: "© 2026 — V3.0 · GEBAUT MIT NUXT" },
  "footer.old":  { en: "View v2.0 · old.sulton.dev", uz: "v2.0 versiyasi · old.sulton.dev", ru: "Старая версия v2.0 · old.sulton.dev", de: "v2.0 ansehen · old.sulton.dev" },

  // === PROJECTS PAGE ===
  "proj.h1":     { en: "Projects.", uz: "Loyihalar.", ru: "Проекты.", de: "Projekte." },
  "proj.lead":   {
    en: "A selection of recent work — case studies, side projects, and open source. Each card opens a write-up with process, decisions, and what shipped.",
    uz: "So‘nggi ishlardan tanlov — keys-tadqiqotlar, yondosh loyihalar va ochiq kod. Har bir karta jarayon, qarorlar va natijalar bilan ochiladi.",
    ru: "Подборка последних работ — кейсы, пет-проекты и open source. Каждая карточка ведёт к разбору: процесс, решения, результат.",
    de: "Eine Auswahl neuerer Arbeiten — Case Studies, Side-Projekte und Open Source. Jede Karte öffnet einen Bericht mit Prozess, Entscheidungen und Ergebnis."
  },
  "proj.f.all":         { en: "All",         uz: "Barchasi",      ru: "Все",          de: "Alle" },
  "proj.f.web":         { en: "Web",         uz: "Veb",           ru: "Веб",          de: "Web" },
  "proj.f.tooling":     { en: "Tooling",     uz: "Asboblar",      ru: "Инструменты",  de: "Tooling" },
  "proj.f.oss":         { en: "OSS",         uz: "OSS",           ru: "OSS",          de: "OSS" },
  "proj.f.experiments": { en: "Experiments", uz: "Eksperimentlar",ru: "Эксперименты", de: "Experimente" },
  "proj.results":       { en: "{n} results", uz: "{n} ta natija", ru: "{n} результатов", de: "{n} Ergebnisse" },
  "proj.end":           { en: "You’ve reached the end", uz: "Oxiriga yetdingiz", ru: "Это конец списка", de: "Das war alles" },
  "proj.sort.label":    { en: "Sort:",         uz: "Saralash:",            ru: "Сорт.:",            de: "Sort.:" },
  "proj.sort.newest":   { en: "Newest",        uz: "Yangilar",             ru: "Новые",            de: "Neueste" },
  "proj.sort.featured": { en: "Featured",      uz: "Tanlangan",            ru: "Избранное",        de: "Empfohlen" },
  "proj.sort.az":       { en: "A–Z",           uz: "A–Z",                  ru: "А–Я",              de: "A–Z" },

  // === SERVICES PAGE ===
  "svc.h1":   { en: "Services.", uz: "Xizmatlar.", ru: "Услуги.", de: "Services." },
  "svc.lead": {
    en: "What I help teams build — from one-off prototypes to embedded engineering. Transparent scopes, fixed quotes, no surprise invoices.",
    uz: "Jamoalarga qurilishida yordam beradigan narsalarim — bir martalik prototiplardan tortib, jamoaga qo‘shilib ishlashgacha. Shaffof scope, qat‘iy narx, syurprizsiz hisoblar.",
    ru: "Чем помогаю командам — от прототипов до внедрённой инженерии. Прозрачные скоупы, фикс-цены, без сюрпризов в счетах.",
    de: "Womit ich Teams helfe — von Einzel-Prototypen bis zu eingebetteter Engineering-Arbeit. Klare Scopes, feste Preise, keine Überraschungs-Rechnungen."
  },
  "svc.1.t":  { en: "Web Apps", uz: "Veb-ilovalar", ru: "Веб-приложения", de: "Web-Apps" },
  "svc.1.d":  {
    en: "Production-grade web applications, Nuxt or Next, type-safe end-to-end. From zero to deployed.",
    uz: "Prodaksn darajadagi veb-ilovalar, Nuxt yoki Next, to‘liq tipdan xavfsiz. Noldan deploygacha.",
    ru: "Прод-уровень: Nuxt или Next, типобезопасно от и до. От нуля до деплоя.",
    de: "Produktive Web-Apps, Nuxt oder Next, end-to-end typsicher. Von null bis deployt."
  },
  "svc.2.t":  { en: "Design Systems", uz: "Dizayn tizimlari", ru: "Дизайн-системы", de: "Design-Systeme" },
  "svc.2.d":  {
    en: "Component libraries with the docs developers actually read. Design tokens, primitives, the whole stack.",
    uz: "Dasturchilar haqiqatan o‘qiydigan hujjatlari bilan komponent kutubxonalari. Tokenlar, primitivlar — to‘liq stek.",
    ru: "Библиотеки компонентов с доками, которые реально читают. Токены, примитивы — целиком.",
    de: "Komponenten-Bibliotheken mit Doku, die Entwickler:innen wirklich lesen. Tokens, Primitives, der ganze Stack."
  },
  "svc.3.t":  { en: "Prototypes & MVPs", uz: "Prototiplar va MVP", ru: "Прототипы и MVP", de: "Prototypen & MVPs" },
  "svc.3.d":  {
    en: "Get to demoable in weeks. Real interactions, real data, real interfaces — not Figma frames.",
    uz: "Bir necha haftada demo darajasiga olib chiqamiz. Haqiqiy interaksiyalar, ma‘lumot va interfeyslar — Figma freym emas.",
    ru: "Демоверсия за недели. Реальные взаимодействия, данные и интерфейсы — не фигма-фреймы.",
    de: "In Wochen zur Demo. Echte Interaktionen, echte Daten, echte Interfaces — keine Figma-Frames."
  },
  "svc.4.t":  { en: "Performance Audits", uz: "Tezlik auditlari", ru: "Аудит производительности", de: "Performance-Audits" },
  "svc.4.d":  {
    en: "Lighthouse, Core Web Vitals, bundle analysis. Concrete fixes with measured impact.",
    uz: "Lighthouse, Core Web Vitals, bundle tahlili. O‘lchangan ta‘sirli aniq tuzatishlar.",
    ru: "Lighthouse, Core Web Vitals, анализ бандла. Конкретные правки с измеряемым эффектом.",
    de: "Lighthouse, Core Web Vitals, Bundle-Analyse. Konkrete Fixes mit messbarem Impact."
  },

  "pricing.label": { en: "Pricing",          uz: "Narx",         ru: "Цены",         de: "Preise" },
  "pricing.title": { en: "Transparent tiers.", uz: "Shaffof darajalar.", ru: "Прозрачные тарифы.", de: "Transparente Stufen." },
  "pricing.tag":   { en: "USD · ex-tax",     uz: "USD · soliqsiz", ru: "USD · без налогов", de: "USD · netto" },

  "tier.starter":  { en: "Starter", uz: "Boshlovchi", ru: "Стартовый", de: "Starter" },
  "tier.pro":      { en: "Pro",     uz: "Pro",        ru: "Про",       de: "Pro" },
  "tier.custom":   { en: "Custom",  uz: "Maxsus",     ru: "Индивид.",  de: "Custom" },
  "tier.popular":  { en: "Most popular", uz: "Eng mashhur", ru: "Самый популярный", de: "Am beliebtesten" },
  "tier.s.desc":   { en: "Single-scope sprints — a feature, a marketing site, a redesigned flow.", uz: "Bir-scope sprintlar — funksiya, marketing sayt, qayta dizaynlangan flow.", ru: "Одно-скоуповые спринты — фича, лендинг, редизайн флоу.", de: "Einzel-Scope-Sprints — Feature, Marketing-Site, neu designter Flow." },
  "tier.p.desc":   { en: "Full product builds — auth, data, design system, deployment, the works.", uz: "To‘liq mahsulot — auth, ma‘lumot, dizayn-tizim, deploy, hammasi.", ru: "Полная сборка продукта — auth, данные, дизайн-система, деплой.", de: "Komplette Produkt-Builds — Auth, Daten, Design-System, Deploy." },
  "tier.c.desc":   { en: "Embedded engineering, dedicated time, ongoing partnership.", uz: "Jamoaga qo‘shilib ishlash, ajratilgan vaqt, uzoq muddatli hamkorlik.", ru: "Встроенная инженерия, выделенное время, долгое партнёрство.", de: "Eingebettete Engineering-Arbeit, dedizierte Zeit, langfristige Partnerschaft." },
  "tier.per":      { en: "/ project", uz: "/ loyiha", ru: "/ проект", de: "/ Projekt" },
  "tier.lets_talk":{ en: "Let’s talk", uz: "Gaplashaylik", ru: "Обсудим", de: "Lass uns reden" },
  "tier.bespoke":  { en: "Bespoke",   uz: "Maxsus",       ru: "Бэспоук",  de: "Maßgeschneidert" },

  // FAQ
  "faq.label": { en: "FAQ",           uz: "FAQ",          ru: "Вопросы",    de: "FAQ" },
  "faq.title": { en: "Things people ask.", uz: "Odamlar so‘raydigan savollar.", ru: "Что обычно спрашивают.", de: "Was Leute fragen." },
  "faq.q.1":   { en: "How do projects start?", uz: "Loyihalar qanday boshlanadi?", ru: "Как стартуют проекты?", de: "Wie starten Projekte?" },
  "faq.a.1":   {
    en: "It always begins with a 30-minute intro call — free, no slides. We talk through the problem, the rough timeline, and whether I'm the right fit. Within 48 hours you'll get a one-page brief, a fixed quote, and a Linear board. Once you wire the 50% deposit, we kick off the next Monday.",
    uz: "Hammasi 30 daqiqalik tanishuv qo‘ng‘irog‘i bilan boshlanadi — bepul, slaydsiz. Muammo, taxminiy muddat va men mosligimni muhokama qilamiz. 48 soat ichida bir betlik brif, qat‘iy narx va Linear board olasiz. 50% to‘lov tushgach, keyingi dushanba ish boshlanadi.",
    ru: "Всё начинается с 30-минутного звонка-знакомства — бесплатно, без слайдов. Обсуждаем задачу, сроки и подхожу ли я. В течение 48 часов приходит одностраничный бриф, фикс-цена и Linear-борд. После 50% предоплаты стартуем в ближайший понедельник.",
    de: "Alles beginnt mit einem 30-minütigen Intro-Call — kostenlos, ohne Folien. Wir besprechen Problem, groben Zeitplan und ob ich der Richtige bin. Innerhalb 48 Stunden bekommst du ein einseitiges Briefing, einen Festpreis und ein Linear-Board. Nach 50% Anzahlung starten wir am nächsten Montag."
  },
  "faq.q.2":   { en: "What's your typical timeline?", uz: "Odatdagi muddat qancha?", ru: "Какие обычно сроки?", de: "Wie lange dauert es?" },
  "faq.a.2":   {
    en: "Starter projects ship in two weeks. Pro builds run 6–10 weeks depending on auth, integrations, and design system scope. Custom retainers are open-ended. I deliberately keep one main client at a time so timelines don't slip and you don't get ghosted for someone else's emergency.",
    uz: "Boshlovchi loyihalar 2 hafta. Pro — auth, integratsiyalar va dizayn-tizim hajmiga qarab 6–10 hafta. Maxsus retainerlar muddatsiz. Bir vaqtda bitta asosiy mijoz bilan ishlayman — shu sababli muddatlar siljimaydi va sizni boshqa birovning favqulodda vaziyati uchun tashlab qo‘ymayman.",
    ru: "Стартер-проекты выходят за 2 недели. Pro — 6–10 недель в зависимости от auth, интеграций и сложности дизайн-системы. Custom — непрерывно. Беру одного основного клиента за раз — сроки не плывут, вас не «бросят» ради чужого пожара.",
    de: "Starter-Projekte gehen in 2 Wochen live. Pro-Builds laufen 6–10 Wochen, je nach Auth, Integrationen und Umfang des Design-Systems. Custom-Retainer sind offen. Ich nehme immer nur einen Hauptkunden gleichzeitig — deshalb verschiebt sich nichts und niemand wird für den Notfall eines anderen aufgegeben."
  },
  "faq.q.3":   { en: "Do you take equity / part-time?", uz: "Equity / yarim stavka olasizmi?", ru: "Берёте equity / part-time?", de: "Equity / Teilzeit?" },
  "faq.a.3":   {
    en: "Yes — for product-stage startups with a real shot at growth. Up to two days a week, embedded with your team in Linear and Slack. Equity supplements cash; it never replaces it. I won't take equity from a pre-PMF company without revenue, and I always cap the engagement at six months before we re-evaluate.",
    uz: "Ha — mahsulot bosqichidagi va o‘sish imkoniyati real bo‘lgan startaplar uchun. Haftasiga ikki kungacha, jamoangizga Linear va Slack’da qo‘shilaman. Equity — naqd to‘ldiruvchisi, almashtiruvchisi emas. PMF’gacha bo‘lgan, daromadsiz kompaniyadan equity olmayman; har olti oyda qayta ko‘rib chiqamiz.",
    ru: "Да — для стартапов на стадии продукта с реальными шансами. До двух дней в неделю, встроенно в команду в Linear и Slack. Equity дополняет кэш, но не заменяет его. Из до-PMF без дохода equity не беру; каждые 6 месяцев пересматриваем.",
    de: "Ja — für Product-Stage-Startups mit echter Wachstumschance. Bis zwei Tage pro Woche, eingebettet in dein Team in Linear und Slack. Equity ergänzt Cash, ersetzt es nie. Aus Pre-PMF-Unternehmen ohne Umsatz nehme ich keine Anteile; alle sechs Monate evaluieren wir neu."
  },
  "faq.q.4":   { en: "Do you work with agencies?", uz: "Agentliklar bilan ishlaysizmi?", ru: "Работаете ли с агентствами?", de: "Arbeitest du mit Agenturen?" },
  "faq.a.4":   {
    en: "Yes — typically as a senior engineer on a flagship build, or as the design-engineering specialist when an agency lands a project they can't staff cleanly. White-label is the default. NDAs are signed without drama. Reach out with the brief and timeline; I'll tell you within a day whether it's a fit.",
    uz: "Ha — odatda flagman loyihada katta muhandis sifatida yoki agentlik o‘zi to‘liq qoplay olmaydigan ish kelganda dizayn-injiniring mutaxassisi sifatida. White-label — standart. NDA muammosiz imzolanadi. Brif va muddatni yuboring, bir kun ichida moslikni aytaman.",
    ru: "Да — обычно как сеньор-инженер на флагманской сборке или как design-специалист, когда агентство не может закрыть проект своими силами. White-label — по умолчанию. NDA подписывается без вопросов. Присылайте бриф и сроки — отвечу за день.",
    de: "Ja — meist als Senior Engineer auf einem Flagship-Build oder als Design-Engineering-Spezialist, wenn eine Agentur ein Projekt nicht sauber besetzen kann. White-Label ist Standard. NDAs werden ohne Drama unterschrieben. Schick Brief und Zeitplan — ich melde mich innerhalb eines Tages mit Ja oder Nein."
  },
  "faq.q.5":   { en: "What tech stack do you use?", uz: "Qaysi tech-stekda ishlaysiz?", ru: "Какой тех-стек вы используете?", de: "Welchen Tech-Stack benutzt du?" },
  "faq.a.5":   {
    en: "Default is Nuxt 3 + TypeScript + Tailwind + Postgres on Supabase, deployed to Vercel or Cloudflare. I'm equally at home in React/Next when a team is already there. For mobile-ish builds I reach for Capacitor or Expo. I'll happily plug into your existing stack if it's sensible — no religious wars.",
    uz: "Standart — Nuxt 3 + TypeScript + Tailwind + Supabase’dagi Postgres, Vercel yoki Cloudflare’ga deploy. Jamoa allaqachon React/Next’da bo‘lsa, men ham bemalol. Mobil-ish loyihalar uchun Capacitor yoki Expo. Mavjud stekingizga ulanaman — ekstremist emasman.",
    ru: "По умолчанию — Nuxt 3 + TypeScript + Tailwind + Postgres на Supabase, деплой на Vercel или Cloudflare. Равно комфортно в React/Next, если команда уже там. Для мобильных билдов — Capacitor или Expo. Спокойно подключусь к вашему стеку.",
    de: "Standard ist Nuxt 3 + TypeScript + Tailwind + Postgres auf Supabase, deployt auf Vercel oder Cloudflare. Mit React/Next bin ich genauso zuhause, wenn das Team dort ist. Für Mobile-Builds Capacitor oder Expo. Ich docke gerne an euren bestehenden Stack an — keine Religionskriege."
  },
  "faq.q.6":   { en: "What happens after launch?", uz: "Ishga tushgandan keyin nima bo‘ladi?", ru: "Что после запуска?", de: "Was passiert nach dem Launch?" },
  "faq.a.6":   {
    en: "Every project ships with a 30 or 60-day support window included — bug fixes, perf tuning, deploy issues, and onboarding for your team are all free in that window. After that, retainer hours start at $4k/month for ongoing partnership, or you can come back anytime for a new scoped project. All source code, designs, and infra credentials are yours from day one.",
    uz: "Har bir loyiha 30 yoki 60 kunlik qo‘llab-quvvatlash bilan keladi — baglar, tezlik tuzatishlari, deploy muammolari va jamoaga onboarding shu ichida bepul. Keyin retainer soatlari oyiga $4k’dan boshlanadi yoki yangi scope bilan qaytib kelishingiz mumkin. Source, dizaynlar va infra hisoblari birinchi kundanoq sizniki.",
    ru: "В каждый проект включены 30 или 60 дней поддержки — баги, перф, деплой, онбординг команды. Дальше — ретейнер от $4k/мес или новый проект в любой момент. Код, дизайны и доступы к инфре ваши с первого дня.",
    de: "Jedes Projekt enthält 30 oder 60 Tage Support — Bugfixes, Performance, Deploy-Themen und Team-Onboarding sind in dem Fenster kostenlos. Danach starten Retainer bei $4k/Monat oder du kommst für ein neues Projekt zurück. Quellcode, Designs und Infra-Zugänge gehören dir ab Tag eins."
  },

  // === BLOG PAGE ===
  "blog.label": { en: "/ writing", uz: "/ yozish", ru: "/ блог", de: "/ texte" },
  "blog.h1":    { en: "Writing.", uz: "Yozuvlar.", ru: "Заметки.", de: "Texte." },
  "blog.lead":  {
    en: "Notes on shipping, design engineering, and the dev tooling I love. Roughly twice a month.",
    uz: "Loyihalarni chiqarish, dizayn-injiniring va sevgan asboblarim haqida yozuvlar. Oyiga ikki marta.",
    ru: "Заметки про релизы, design-инжиниринг и любимые инструменты. Примерно дважды в месяц.",
    de: "Notizen zu Releases, Design-Engineering und meinen Lieblings-Tools. Etwa zweimal im Monat."
  },
  "blog.search":{ en: "search posts…", uz: "postlarni izlash…", ru: "поиск постов…", de: "Beiträge suchen…" },
  "blog.tag.all":   { en: "All",     uz: "Barchasi", ru: "Все",   de: "Alle" },
  "blog.empty":     { en: "No posts in this tag yet.", uz: "Bu tegda hali postlar yo‘q.", ru: "Пока нет постов по этому тегу.", de: "Noch keine Beiträge in dieser Kategorie." },
  "blog.featured":  { en: "★ Featured", uz: "★ Tanlangan", ru: "★ Избранное", de: "★ Empfohlen" },
  "blog.read_min":  { en: "{n} min read", uz: "{n} daqiqa", ru: "{n} мин", de: "{n} Min" },
  "blog.news.title":{ en: "Get new posts in your inbox.", uz: "Yangi postlar inboxingizga.", ru: "Новые посты на почту.", de: "Neue Beiträge per E-Mail." },
  "blog.news.body": { en: "Two emails a month. No tracking, easy unsubscribe.", uz: "Oyiga ikkita xat. Tracking yo‘q, oson bekor qilinadi.", ru: "Два письма в месяц. Без трекинга, легко отписаться.", de: "Zwei Mails pro Monat. Kein Tracking, leicht abbestellbar." },
  "blog.back":    { en: "Back to blog", uz: "Blogga qaytish", ru: "К блогу", de: "Zurück zum Blog" },
  "blog.share":   { en: "Share",        uz: "Ulashish",      ru: "Поделиться", de: "Teilen" },
  "blog.related": { en: "Related posts",uz: "Aloqador yozuvlar", ru: "Похожие посты", de: "Verwandte Beiträge" },

  // === CONTACT ===
  "contact.label": { en: "/ contact", uz: "/ aloqa", ru: "/ контакт", de: "/ kontakt" },
  "contact.h1.l1": { en: "Let’s build", uz: "Birga", ru: "Давайте создадим", de: "Lass uns" },
  "contact.h1.l2": { en: "something.", uz: "quraylik.", ru: "что-то вместе.", de: "etwas bauen." },
  "contact.lead":  {
    en: "Tell me about your project. I reply within 1–2 business days, every time. Or just email me direct — see right.",
    uz: "Loyihangiz haqida ayting. 1–2 ish kuni ichida har doim javob beraman. Yoki to‘g‘ridan-to‘g‘ri email yozing — o‘ngga qarang.",
    ru: "Расскажите о проекте. Отвечаю в течение 1–2 рабочих дней, всегда. Или сразу email — справа.",
    de: "Erzähl mir vom Projekt. Antwort in 1–2 Werktagen, immer. Oder direkt per E-Mail — siehe rechts."
  },
  "form.name":     { en: "Name",        uz: "Ism",         ru: "Имя",          de: "Name" },
  "form.email":    { en: "Email",       uz: "Email",       ru: "Email",        de: "E-Mail" },
  "form.type":     { en: "Project type",uz: "Loyiha turi", ru: "Тип проекта",  de: "Projekttyp" },
  "form.message":  { en: "Message",     uz: "Xabar",       ru: "Сообщение",    de: "Nachricht" },
  "form.subscribe":{ en: "Subscribe me to the newsletter — two posts a month, easy unsubscribe.", uz: "Newsletter’ga obuna qiling — oyiga 2 ta post, oson bekor.", ru: "Подпишите меня на рассылку — 2 поста в месяц, легко отписаться.", de: "Newsletter abonnieren — 2 Beiträge/Monat, leicht abbestellbar." },
  "form.hint":     { en: "or email", uz: "yoki email", ru: "или email", de: "oder E-Mail" },
  "form.direct":   { en: "direct.", uz: "to‘g‘ridan-to‘g‘ri.", ru: "напрямую.", de: "direkt." },
  "form.placeholder.name":    { en: "Jane Doe",        uz: "Aliyev Ali",      ru: "Иван Иванов",    de: "Jane Doe" },
  "form.placeholder.email":   { en: "jane@startup.dev", uz: "ali@startup.uz", ru: "ivan@startup.dev", de: "jane@startup.de" },
  "form.placeholder.message": {
    en: "What are you building? What's the timeline? Anything I should know.",
    uz: "Nima qurmoqdasiz? Muddat qachon? Bilishim kerak bo‘lgan narsa bormi?",
    ru: "Что вы строите? Какие сроки? Что важно знать?",
    de: "Was baust du? Welcher Zeitrahmen? Was sollte ich wissen?"
  },
  "form.opt.web":   { en: "Web App",          uz: "Veb-ilova",       ru: "Веб-приложение",   de: "Web-App" },
  "form.opt.ds":    { en: "Design System",    uz: "Dizayn tizimi",   ru: "Дизайн-система",   de: "Design-System" },
  "form.opt.mvp":   { en: "Prototype / MVP",  uz: "Prototip / MVP",  ru: "Прототип / MVP",   de: "Prototyp / MVP" },
  "form.opt.audit": { en: "Performance Audit",uz: "Tezlik auditi",   ru: "Аудит производительности", de: "Performance-Audit" },
  "form.opt.other": { en: "Other",            uz: "Boshqa",          ru: "Другое",            de: "Anderes" },

  "aside.other":   { en: "Other ways", uz: "Boshqa yo‘llar", ru: "Другие способы", de: "Andere Wege" },
  "aside.find":    { en: "Find me",    uz: "Meni toping",    ru: "Найдите меня",   de: "Finde mich" },
  "aside.status":  { en: "Status",     uz: "Holat",          ru: "Статус",         de: "Status" },
  "aside.book":    { en: "Book a 20-min intro call", uz: "20-daqiqalik tanishuv qo‘ng‘irog‘i", ru: "Записаться на 20-мин звонок", de: "20-Min-Intro-Call buchen" },
  "aside.cv":      { en: "Download CV (PDF · 240kb)", uz: "CV yuklab olish (PDF · 240kb)", ru: "Скачать CV (PDF · 240kb)", de: "Lebenslauf (PDF · 240kb)" },
  "status.avail":  { en: "Available",  uz: "Bandlik bor", ru: "Свободен",  de: "Verfügbar" },
  "status.booked": { en: "Booked",     uz: "Band",        ru: "Занят",     de: "Belegt" },
  "status.tent":   { en: "Tentative",  uz: "Taxminiy",    ru: "Предварительно", de: "Vorläufig" },
  "status.may":    { en: "May 2026",   uz: "May 2026",    ru: "Май 2026",  de: "Mai 2026" },
  "status.jun":    { en: "Jun 2026",   uz: "Iyun 2026",   ru: "Июнь 2026", de: "Juni 2026" },
  "status.julaug": { en: "Jul–Aug 2026", uz: "Iyul–Avg 2026", ru: "Июль–Авг 2026", de: "Jul–Aug 2026" },
  "status.based":  { en: "BASED IN BERLIN · WORKING UTC+1 · LATAM/EU FRIENDLY", uz: "BERLINDA · UTC+1 · LATAM/EU GA QULAY", ru: "БАЗИРУЮСЬ В БЕРЛИНЕ · UTC+1 · УДОБНО ДЛЯ LATAM/EU", de: "BERLIN · UTC+1 · LATAM/EU FREUNDLICH" },

  // === BLOG POSTS 7–16 (titles + excerpts) ===
  "post.7.t":  { en: "CSS cascade layers, one year in",         uz: "CSS cascade layers — bir yildan keyin",        ru: "CSS cascade layers — спустя год",                de: "CSS Cascade Layers, ein Jahr später" },
  "post.7.x":  { en: "How `@layer` quietly fixed every specificity war I used to lose.", uz: "`@layer` qanday qilib har bir spesifiklik urushini jimgina hal qildi.", ru: "Как `@layer` тихо решил все войны специфичности.", de: "Wie `@layer` jeden Spezifitäts-Krieg leise gelöst hat." },
  "post.8.t":  { en: "TypeScript strict mode, every time",       uz: "TypeScript strict mode — har doim",            ru: "TypeScript strict mode — всегда",                  de: "TypeScript Strict Mode, immer" },
  "post.8.x":  { en: "Yes it’s painful at first. Yes it pays back tenfold.", uz: "Boshda og‘riydi. Lekin o‘n barobar qaytaradi.", ru: "Начало больно. Но окупается вдесятеро.", de: "Anfangs schmerzhaft. Zahlt sich zehnfach aus." },
  "post.9.t":  { en: "Shipping fast without burning out",         uz: "Burnout’siz tez yetkazib berish",                ru: "Быстрый релиз без выгорания",                  de: "Schnell liefern, ohne auszubrennen" },
  "post.9.x":  { en: "The rituals I keep that keep me shipping for the long haul.", uz: "Uzoq muddatda chiqarishda davom etishimga yordam beradigan ritualar.", ru: "Ритуалы, которые держат меня в форме вдолгую.", de: "Die Rituale, die mich langfristig liefern lassen." },
  "post.10.t": { en: "Design tokens in 2026",                     uz: "2026-yilda dizayn tokenlar",                    ru: "Design tokens в 2026",                          de: "Design-Tokens in 2026" },
  "post.10.x": { en: "The format wars are over. Here’s what to standardize on.", uz: "Format urushlari tugadi. Hozir nimaga standartlash kerak.", ru: "Войны форматов закончились. Что стандартизировать сейчас.", de: "Die Format-Kriege sind vorbei. Worauf jetzt standardisieren." },
  "post.11.t": { en: "The island pattern, beyond React",         uz: "Island pattern — React’dan tashqari",            ru: "Island-паттерн — за пределами React",         de: "Das Island-Pattern, jenseits von React" },
  "post.11.x": { en: "Why every framework is converging on the same shape, even if they won’t admit it.", uz: "Nega har bir framework bir xil shaklga yaqinlashmoqda, hatto tan olmasalar ham.", ru: "Почему все фреймворки идут к одному и тому же, даже если не признают.", de: "Warum alle Frameworks zur gleichen Form konvergieren — auch wenn sie es leugnen." },
  "post.12.t": { en: "Writing RFCs your team actually reads",     uz: "Jamoa haqiqatan o‘qiydigan RFC yozish",         ru: "Как писать RFC, которые читают",            de: "RFCs schreiben, die dein Team wirklich liest" },
  "post.12.x": { en: "Short, opinionated, falsifiable. A template + checklist.", uz: "Qisqa, fikrli, isbotlanadigan. Shablon + checklist.", ru: "Коротко, со взглядом, проверяемо. Шаблон и чеклист.", de: "Kurz, meinungsstark, widerlegbar. Vorlage + Checkliste." },
  "post.13.t": { en: "On build tools (and not using them)",       uz: "Build asboblari haqida (va ularni ishlatmaslik)", ru: "О Build-тулах (и их отсутствии)",            de: "Über Build-Tools (und sie nicht zu benutzen)" },
  "post.13.x": { en: "When `tsc + esbuild` beats every bundler you tried.", uz: "`tsc + esbuild` har qanday bundler’dan ustun bo‘ladigan paytlar.", ru: "Когда `tsc + esbuild` бьёт любой бандлер.", de: "Wann `tsc + esbuild` jeden Bundler schlägt." },
  "post.14.t": { en: "My editor setup, fully annotated",         uz: "Mening editor sozlamam — to‘liq izohlangan",     ru: "Моя настройка редактора с комментариями",  de: "Mein Editor-Setup, voll dokumentiert" },
  "post.14.x": { en: "Helix, tmux, fzf, lazygit. The ten plugins worth installing.", uz: "Helix, tmux, fzf, lazygit. O‘rnatishga arziydigan o‘nta plagin.", ru: "Helix, tmux, fzf, lazygit. Десяток плагинов, ради которых стоит.", de: "Helix, tmux, fzf, lazygit. Die zehn Plugins, die sich lohnen." },
  "post.15.t": { en: "Interviewing engineers without theater",    uz: "Teatrsiz muhandis intervyusi",                  ru: "Интервью инженеров без театра",          de: "Engineering-Interviews ohne Theater" },
  "post.15.x": { en: "What to test, what to ignore, and how to stop wasting people’s time.", uz: "Nimani tekshirish, nimani e’tiborsiz qoldirish va odamlarning vaqtini behuda sarflashni qanday to‘xtatish.", ru: "Что проверять, что игнорировать и как перестать тратить время людей.", de: "Was testen, was ignorieren — und wie man niemandes Zeit verschwendet." },
  "post.16.t": { en: "Why I still use Tailwind in 2026",         uz: "Nega men 2026’da hali ham Tailwind ishlataman", ru: "Почему я всё ещё использую Tailwind в 2026", de: "Warum ich 2026 noch Tailwind benutze" },
  "post.16.x": { en: "It’s not about the framework. It’s about the constraints.", uz: "Gap framework haqida emas. Gap cheklovlar haqida.", ru: "Дело не во фреймворке. Дело в ограничениях.", de: "Es geht nicht ums Framework. Es geht um die Constraints." },

  // Pagination
  "pg.prev":      { en: "Prev",     uz: "Oldingi",   ru: "Назад",   de: "Zurück" },
  "pg.next":      { en: "Next",     uz: "Keyingi",   ru: "Дальше", de: "Weiter" },
  "blog.no_body": { en: "Full article coming soon. The summary above gives the gist.", uz: "To‘liq maqola tez orada. Yuqoridagi xulosa asosiy fikrni beradi.", ru: "Полная версия скоро. Краткое выше даёт суть.", de: "Vollständiger Artikel folgt. Die Zusammenfassung oben gibt das Wesentliche." },

  // shared
  "common.results": { en: "results", uz: "natija", ru: "рез.", de: "Ergebnisse" },
  "common.featured":{ en: "featured", uz: "tanlangan", ru: "избранное", de: "empfohlen" },

  // === BLOG BODY PARAGRAPHS ===
  "post.1.b1": {
    en: "Most of the web we ship looks fine — until the stylesheet doesn’t load. A flaky CDN, an aggressive corporate proxy, a feature-policy header that strips your fonts. Suddenly your beautiful site is a wall of unstyled HTML, and the question becomes: is it still usable?",
    uz: "Biz yetkazib berayotgan vebning ko‘pchiligi yaxshi ko‘rinadi — toki stylesheet yuklanmaguncha. Beqaror CDN, agressiv korporativ proxy, fontlarni olib tashlovchi feature-policy header. To‘satdan chiroyli saytingiz stilsiz HTML devori bo‘ladi. Savol: u hali ham ishlatib bo‘ladimi?",
    ru: "Большинство сайтов выглядит нормально — пока не пропадёт стиль. Нестабильный CDN, агрессивный корпоративный прокси, feature-policy без фонтов. Сайт становится стеной нестилизованного HTML. Вопрос: им всё ещё можно пользоваться?",
    de: "Die meisten Websites sehen okay aus — bis das Stylesheet ausfällt. Wackeliges CDN, aggressiver Proxy, eine Feature-Policy, die deine Fonts blockiert. Plötzlich ist deine schöne Seite eine Wand aus unstilisierter HTML. Frage: ist sie noch benutzbar?"
  },
  "post.1.b2": {
    en: "The technique I keep coming back to is what I call ‘semantic-first, decorative-last’: write the HTML so it reads top to bottom like a well-structured document, and treat CSS as polish. Headings are heading levels, lists are <ul>s, buttons are <button>s. The default user-agent stylesheet handles 70% of the work for free.",
    uz: "Men qaytib keladigan texnika — “semantik birinchi, dekorativ oxirgi”: HTML’ni shunday yozingki, u yaxshi tuzilgan hujjat kabi yuqoridan pastga o‘qilsin, CSS esa sayqal sifatida qaralsin. Sarlavhalar — heading darajalari, ro‘yxatlar — <ul>, tugmalar — <button>. User-agent stylesheet 70% ishni bepul qiladi.",
    ru: "Подход, к которому я возвращаюсь — «семантика вперёд, декор потом»: пишите HTML так, чтобы он читался сверху вниз как структурированный документ, а CSS — это лоск. Заголовки — уровни, списки — <ul>, кнопки — <button>. User-agent stylesheet делает 70% бесплатно.",
    de: "Mein Lieblingsansatz: „semantisch zuerst, Dekoration zuletzt“. Schreib HTML so, dass es von oben nach unten wie ein strukturiertes Dokument liest — CSS ist nur Politur. Überschriften sind Heading-Level, Listen <ul>, Buttons <button>. Das User-Agent-Stylesheet erledigt 70% kostenlos."
  },
  "post.1.b3": {
    en: "Once you do this, the unstyled fallback isn’t embarrassing — it’s usable. Forms still submit. Navigation still works. Screen readers still narrate the page in the right order. And the moment your CSS lands, the whole thing snaps into place with no jarring layout shift, because the structure was already right.",
    uz: "Buni qilganingizdan keyin, stilsiz fallback uyat emas — u ishlaydigan. Formalar yuboriladi. Navigatsiya ishlaydi. Screen reader’lar to‘g‘ri tartibda o‘qiydi. CSS yuklanganda hammasi joyiga tushadi, qoplama almashishi yo‘q.",
    ru: "Когда сделаете это — fallback без стиля не позорен, а рабочий. Формы субмитятся. Навигация работает. Скринридеры читают правильный порядок. И когда CSS приходит — всё становится на места без layout shift.",
    de: "Dann ist der Fallback nicht peinlich, sondern brauchbar. Formulare absenden, Navigation funktioniert, Screen-Reader lesen die richtige Reihenfolge. Wenn das CSS kommt, rastet alles ein — ohne Layout-Shift, weil die Struktur schon stand."
  },

  "post.2.b1": {
    en: "Server Components in Nuxt 3 are the most quietly transformative thing the framework has shipped in years. After two months of using them in production, I have a strong opinion about what works — and what to avoid.",
    uz: "Nuxt 3’dagi Server Komponentlar — framework yillar ichida chiqargan eng jim, lekin transformativ narsa. Ikki oy prodakshnda ishlatgandan keyin nima ishlashi va nimadan qochish kerakligi haqida kuchli fikrim bor.",
    ru: "Server Components в Nuxt 3 — самое тихое но преобразующее обновление фреймворка за годы. После двух месяцев в проде у меня сильное мнение о том, что работает — и чего избегать.",
    de: "Server Components in Nuxt 3 sind das stillste, aber transformativste Update der letzten Jahre. Nach zwei Monaten Produktivbetrieb habe ich eine klare Meinung dazu, was funktioniert — und was nicht."
  },
  "post.2.b2": {
    en: "The win is bundle size. Pages that used to ship 80kb of hydration JS now ship under 12kb. The catch is mental model: you have to be ruthless about which components are interactive and which are pure render, because hydration boundaries are now visible in your code.",
    uz: "Yutuq — bundle hajmi. Avval 80kb hydration JS yuborgan sahifalar endi 12kb’dan kam yuboradi. Tuzoq — fikrlash modeli: qaysi komponentlar interaktiv, qaysilari toza render ekanligini aniq bilishingiz kerak, chunki hydration chegaralari endi kodda ko‘rinadi.",
    ru: "Выигрыш — размер бандла. Страницы, которые раньше отдавали 80kb hydration JS, теперь отдают <12kb. Подвох — ментальная модель: нужно чётко разделять интерактивные и чистые рендер компоненты.",
    de: "Der Gewinn: Bundle-Größe. Seiten, die früher 80kb Hydration-JS lieferten, schaffen es jetzt unter 12kb. Der Haken: mentales Modell. Du musst klar trennen, welche Komponenten interaktiv sind — die Hydration-Grenzen sind jetzt im Code sichtbar."
  },
  "post.2.b3": {
    en: "My rule of thumb: default everything to server, opt into client only at the leaf. When in doubt, measure the bundle delta of moving one component to <ClientOnly>. The number is always bigger than you expect.",
    uz: "Mening qoidam: hammasini default server qiling, faqat barg darajasida client’ga o‘ting. Shubha bo‘lsa — komponentni <ClientOnly>’ga ko‘chirib bundle farqini o‘lchang. Raqam har doim kutilganidan kattaroq.",
    ru: "Моё правило: всё по умолчанию на сервере, клиент — только на листе. Сомневаетесь — измерьте разницу в бандле при перемещении одного компонента в <ClientOnly>. Число всегда больше, чем кажется.",
    de: "Meine Faustregel: alles per Default Server, Client nur auf Blattebene. Im Zweifel die Bundle-Differenz messen, wenn du eine Komponente nach <ClientOnly> verschiebst. Die Zahl ist immer größer als erwartet."
  },

  "post.3.b1": {
    en: "Barrel files — those innocent-looking `index.ts` files that re-export everything from a folder — are slowly killing your build. They look ergonomic but they’re a tree-shaking nightmare, an IDE performance bomb, and a circular-import minefield.",
    uz: "Barrel fayllar — papkadan hamma narsani re-export qiluvchi shu beg‘ubor ko‘rinishli `index.ts` fayllar — build’ingizni asta-sekin o‘ldirmoqda. Ular ergonomik ko‘rinadi, lekin tree-shaking uchun dahshat, IDE uchun bomba, circular-import uchun min maydoni.",
    ru: "Barrel-файлы — безобидные на вид `index.ts`, реэкспортирующие всё из папки — медленно убивают ваш build. Выглядят эргономично, но это кошмар для tree-shaking, бомба для IDE и минное поле циклических импортов.",
    de: "Barrel-Dateien — diese harmlos wirkenden `index.ts`, die alles aus einem Ordner re-exportieren — töten deinen Build langsam. Sie wirken ergonomisch, sind aber ein Tree-Shaking-Albtraum, ein IDE-Performance-Bomber und ein Minenfeld für zirkuläre Importe."
  },
  "post.3.b2": {
    en: "Modern bundlers technically handle re-exports, but ‘technically’ hides a lot. A barrel-imported icon can drag in 40 other icons even when only one is used. Multiply that across a 200-component library and you’re shipping megabytes of dead code.",
    uz: "Zamonaviy bundlerlar texnik jihatdan re-export’larni qo‘llab-quvvatlaydi, lekin ‘texnik jihatdan’ ko‘p narsani yashiradi. Barrel orqali import qilingan bitta ikonka 40 boshqa ikonkani sudrab kelishi mumkin. 200 komponentli kutubxonada bu megabaytlab o‘lik kod yuboradi.",
    ru: "Современные бандлеры «технически» поддерживают re-export, но в этом слове много лыжни. Одна иконка через barrel может потянуть за собой 40 других. На библиотеке из 200 компонентов — это мегабайты мёртвого кода.",
    de: "Moderne Bundler unterstützen Re-Exports „technisch“ — in dem Wort steckt viel. Ein Barrel-importiertes Icon kann 40 weitere mitziehen. Bei 200 Komponenten sind das Megabytes Dead-Code."
  },
  "post.3.b3": {
    en: "My rule now: import from the file, not the folder. `import { Button } from ‘./button’`, never `from ‘./components’`. Yes, the import paths get longer. Yes, the build is faster, your IDE stops choking, and dependency cycles become impossible to write.",
    uz: "Hozirgi qoidam: fayldan import qiling, papkadan emas. `import { Button } from ‘./button’`, hech qachon `from ‘./components’` emas. Ha, import yo‘llari uzayadi. Ha, build tezroq, IDE bo‘g‘ilmaydi va dependency cycle yozib bo‘lmaydi.",
    ru: "Моё правило: импорт из файла, не из папки. `import { Button } from ‘./button’`, никогда не из `./components`. Да, пути длиннее. Да, build быстрее, IDE не лагает, циклы зависимостей невозможны.",
    de: "Meine Regel: aus der Datei importieren, nicht aus dem Ordner. `import { Button } from ‘./button’`, nie aus `./components`. Ja, längere Pfade. Dafür schnellerer Build, ruhige IDE, und Abhängigkeits-Zyklen werden unmöglich."
  },

  "post.4.b1": {
    en: "Most monorepo articles try to sell you a framework: Nx, Turborepo, Rush, Bazel. Each promises to solve your tooling problems and ships its own set of new ones. After two years of swapping between them, I went the other direction — pnpm workspaces, a 40-line shell script, and nothing else.",
    uz: "Aksariyat monorepo maqolalar sizga framework sotmoqchi: Nx, Turborepo, Rush, Bazel. Har biri tooling muammolaringizni hal qilishni va‘da qiladi va o‘zining yangilarini olib keladi. Ikki yil ular orasida almashinib bo‘lganimdan keyin teskari yo‘l tutdim — pnpm workspaces, 40 qatorli shell skript va boshqa hech narsa.",
    ru: "Большинство статей про монорепо продают фреймворк: Nx, Turborepo, Rush, Bazel. Каждый обещает решить проблемы tooling’а и приносит новые. После двух лет перебора я пошёл в обратную сторону: pnpm workspaces, 40-строчный shell-скрипт и всё.",
    de: "Die meisten Monorepo-Artikel verkaufen dir ein Framework: Nx, Turborepo, Rush, Bazel. Jedes verspricht Problemlösung und bringt neue mit. Nach zwei Jahren Hin und Her bin ich anders abgebogen — pnpm-Workspaces, ein 40-Zeilen-Shell-Skript, sonst nichts."
  },
  "post.4.b2": {
    en: "The setup costs you a single Sunday. pnpm handles linking, parallel install, and the dependency graph. Turbo isn’t needed if your builds are already incremental. A tiny script runs `pnpm -r build` topologically. That’s it.",
    uz: "Sozlash — bir yakshanba. pnpm linking, parallel install va dependency graph’ni boshqaradi. Build’laringiz allaqachon incremental bo‘lsa, Turbo kerak emas. Kichik skript topologik tartibda `pnpm -r build` ishga tushiradi. Tamom.",
    ru: "Настройка — одно воскресенье. pnpm берёт линки, параллельный install и граф зависимостей. Turbo не нужен, если ваши билды уже инкрементны. Маленький скрипт запускает `pnpm -r build` топологически. Всё.",
    de: "Das Setup kostet einen Sonntag. pnpm übernimmt Linking, parallele Installation und den Dependency-Graph. Turbo brauchst du nicht, wenn deine Builds inkrementell sind. Ein winziges Skript ruft `pnpm -r build` topologisch auf. Fertig."
  },
  "post.4.b3": {
    en: "After two years on this setup, we ship faster than any of the frameworks I traded away. The lesson isn’t ‘avoid tools’ — it’s ‘buy tools when they solve a problem you actually have, not problems blog posts say you might have’.",
    uz: "Bu sozlamada ikki yildan keyin, alishtirgan frameworklarimdan tezroq deploy qilamiz. Saboq — ‘asboblardan qoching’ emas, balki ‘asboblarni faqat haqiqiy muammolaringizni hal qilish uchun oling, blog postlar aytadigan ehtimoliy muammolarga emas’.",
    ru: "Два года на этой сборке — мы выпускаем быстрее, чем на любом из фреймворков. Урок не «избегай тулов», а «бери их под реальные проблемы, а не под выдуманные блогами».",
    de: "Nach zwei Jahren mit diesem Setup liefern wir schneller als mit jedem der Frameworks, die ich getauscht habe. Die Lektion ist nicht „Meide Tools“, sondern: kauf Tools für echte Probleme, nicht für Probleme, die ein Blog dir einredet."
  },

  "post.5.b1": {
    en: "The View Transitions API is the most underrated browser feature of the decade. Two CSS rules and a single line of JavaScript get you smooth, native, fully-customizable transitions between page navigations — no framework, no library, no dance.",
    uz: "View Transitions API — o‘n yillikning eng kam baholangan brauzer xususiyati. Ikki CSS qoidasi va bir qator JavaScript sizga sahifa navigatsiyalari orasida silliq, ona-tilda, to‘liq sozlanadigan transition beradi — frameworksiz, kutubxonasiz, raqssiz.",
    ru: "View Transitions API — самая недооценённая фича браузеров десятилетия. Две CSS-правила и одна строчка JS дают плавные, нативные, настраиваемые переходы между навигациями — без фреймворка, библиотеки и танцев.",
    de: "Die View Transitions API ist das unterschätzteste Browser-Feature des Jahrzehnts. Zwei CSS-Regeln und eine JS-Zeile reichen für flüssige, native, voll anpassbare Übergänge zwischen Navigationen — ohne Framework, ohne Lib, ohne Drama."
  },
  "post.5.b2": {
    en: "The trick is `view-transition-name`. Tag the elements you want to morph — a hero image, a navigation pill, a card title — with the same name on both pages. The browser does the rest: it captures, freezes, cross-fades, and reveals.",
    uz: "Sir — `view-transition-name`. Bir xil nom bilan ikki sahifada morph qilmoqchi bo‘lgan elementlaringizni belgilang — hero rasm, navigation pill, karta sarlavhasi. Brauzer qolganini qiladi: tutadi, muzlatadi, cross-fade qiladi va ko‘rsatadi.",
    ru: "Секрет — `view-transition-name`. Пометьте элементы, которые хотите «перелепить» — hero-картинка, nav-pill, заголовок карты — одним и тем же именем на обеих страницах. Остальное браузер сделает сам.",
    de: "Der Trick: `view-transition-name`. Markiere die Elemente, die du morphen willst — Hero-Bild, Nav-Pill, Kartentitel — mit demselben Namen auf beiden Seiten. Den Rest macht der Browser."
  },
  "post.5.b3": {
    en: "What I love about this API is that it degrades gracefully. Browsers that don’t support it just navigate normally. There’s no performance cost, no JS bundle, no flicker. It’s the kind of progressive enhancement we used to brag about — quietly rebuilt for the modern web.",
    uz: "Bu API’da yaxshi narsa — u toza degrade bo‘ladi. Qo‘llab-quvvatlamaydigan brauzerlar oddiy navigatsiya qiladi. Performance xarajati yo‘q, JS bundle yo‘q, miltirash yo‘q. Bu — progressive enhancement, qadimda biz maqtanardik, hozir zamonaviy uchun jimgina qayta qurilgan.",
    ru: "Что я люблю в этом API — он изящно деградирует. Браузеры без поддержки просто обычно навигируют. Никакой цены за производительность, никакого JS-бандла, никакого flicker. Старый добрый progressive enhancement, тихо пересобранный под современный веб.",
    de: "Was ich an dieser API liebe: sie degradiert sauber. Browser ohne Support navigieren ganz normal. Keine Performance-Kosten, kein JS-Bundle, kein Flackern. Klassisches Progressive Enhancement — leise neu gebaut fürs moderne Web."
  },

  "post.6.b1": {
    en: "The most reliable way to get better at our trade isn’t tutorials. It isn’t a course. It isn’t even side projects. It’s reading the source code of the libraries you use every day — carefully, slowly, with the docs closed.",
    uz: "Kasbimizda yaxshilanishning eng ishonchli usuli — darsliklar emas, kurs emas, hatto pet-loyihalar ham emas. Bu — har kuni ishlatadigan kutubxonalaringizning manba kodini ehtiyotkorlik bilan, sekin, hujjatlar yopiq holda o‘qish.",
    ru: "Самый надёжный способ расти в профессии — не туториалы, не курсы и даже не пет-проекты. Это чтение исходников библиотек, которыми пользуетесь ежедневно — внимательно, медленно, с закрытыми доками.",
    de: "Der zuverlässigste Weg, in unserem Beruf besser zu werden, sind nicht Tutorials. Auch keine Kurse. Nicht mal Side-Projekte. Es ist: den Source-Code der Libraries lesen, die du täglich benutzt — langsam, sorgfältig, ohne Doku."
  },
  "post.6.b2": {
    en: "Start small. Pick a function you use weekly — `useState`, `Array.prototype.flat`, Tailwind’s `merge` — and read the implementation. Don’t skim. Trace the types. Click through the call graph. Ask why every line exists.",
    uz: "Kichikdan boshlang. Haftalik foydalanadigan funksiyani tanlang — `useState`, `Array.prototype.flat`, Tailwind’ning `merge` — va implementatsiyani o‘qing. Yuzaki o‘qimang. Tiplarni kuzatib boring. Call graph’ni bosing. Har bir qator nima uchun borligini so‘rang.",
    ru: "Начните с малого. Выберите функцию, которой пользуетесь каждую неделю — `useState`, `Array.prototype.flat`, Tailwind’овский `merge` — и прочитайте реализацию. Не пробегайте. Следите за типами. Кликайте по call graph’у. Спрашивайте, зачем каждая строка.",
    de: "Fang klein an. Wähl eine Funktion, die du wöchentlich nutzt — `useState`, `Array.prototype.flat`, Tailwinds `merge` — und lies die Implementierung. Nicht überfliegen. Typen verfolgen. Call-Graph durchklicken. Frag, warum jede Zeile da ist."
  },
  "post.6.b3": {
    en: "After a few months of this, two things change. First, your bug-fixing speed doubles, because you stop guessing at black-box behavior. Second, the boundary between ‘library’ and ‘my code’ dissolves. Everything is just code, and you can change any of it.",
    uz: "Bir necha oydan keyin ikki narsa o‘zgaradi. Birinchi — bag tuzatish tezligingiz ikki barobar oshadi, chunki black-box xatti-harakatini taxmin qilishni to‘xtatasiz. Ikkinchi — ‘kutubxona’ va ‘mening kodim’ chegarasi erib ketadi. Hammasi — oddiy kod va siz har birini o‘zgartirishingiz mumkin.",
    ru: "Через пару месяцев меняются две вещи. Первое — скорость фикса багов удваивается, потому что вы перестаёте угадывать поведение black-box’а. Второе — граница «библиотека vs мой код» растворяется. Всё — просто код, и всё можно менять.",
    de: "Nach ein paar Monaten ändern sich zwei Dinge. Erstens: dein Bugfix-Tempo verdoppelt sich, weil du nicht mehr ratest. Zweitens: die Grenze zwischen „Bibliothek“ und „mein Code“ verschwindet. Alles ist nur Code, und alles kannst du ändern."
  },

  // === BLOG POSTS ===
  "post.1.t": { en: "Designing for the unstyled web", uz: "Stilsiz vebni dizayn qilish", ru: "Дизайн для «бесстильного» веба", de: "Design für das unstilisierte Web" },
  "post.1.x": { en: "How to ship interfaces that survive a missing stylesheet — and why you should.", uz: "Stylesheet yo‘qolganda omon qoladigan interfeyslarni qanday yetkazib berish kerak.", ru: "Как выпускать интерфейсы, переживающие отсутствие CSS — и зачем.", de: "Wie man Interfaces baut, die ein fehlendes Stylesheet überleben." },

  "post.2.t": { en: "Nuxt server components, two months in", uz: "Nuxt server komponentlari — ikki oydan keyin", ru: "Nuxt server components: два месяца спустя", de: "Nuxt Server-Komponenten, zwei Monate später" },
  "post.2.x": { en: "Performance, gotchas, and patterns I keep coming back to.", uz: "Tezlik, tuzoqlar va men qaytib keladigan patternlar.", ru: "Производительность, подводные камни и паттерны, к которым я возвращаюсь.", de: "Performance, Fallstricke und Muster, zu denen ich zurückkehre." },

  "post.3.t": { en: "Why I stopped writing barrel files", uz: "Nega men barrel fayllarni yozishni to‘xtatdim", ru: "Почему я перестал писать barrel-файлы", de: "Warum ich aufgehört habe, Barrel-Dateien zu schreiben" },
  "post.3.x": { en: "Tree-shaking, IDE perf, and the hidden cost of `import * from`.", uz: "Tree-shaking, IDE tezligi va `import * from` ning yashirin narxi.", ru: "Tree-shaking, производительность IDE и скрытая цена `import * from`.", de: "Tree-Shaking, IDE-Performance und die versteckten Kosten von `import * from`." },

  "post.4.t": { en: "A monorepo without the tooling tax", uz: "Asbob solig‘isiz monorepo", ru: "Монорепо без налога на тулинг", de: "Ein Monorepo ohne Tooling-Steuer" },
  "post.4.x": { en: "pnpm + turbo + a tiny script. Skip the heavy frameworks.", uz: "pnpm + turbo + kichik skript. Og‘ir frameworklarni o‘tkazib yuboring.", ru: "pnpm + turbo + маленький скрипт. Без тяжёлых фреймворков.", de: "pnpm + turbo + ein winziges Skript. Ohne schwere Frameworks." },

  "post.5.t": { en: "Animating with the View Transitions API", uz: "View Transitions API bilan animatsiya", ru: "Анимации с View Transitions API", de: "Animationen mit der View Transitions API" },
  "post.5.x": { en: "Subtle motion that survives navigation — no library required.", uz: "Navigatsiyani omon qoladigan nozik animatsiya — kutubxonasiz.", ru: "Тонкие анимации, переживающие навигацию — без библиотек.", de: "Subtile Bewegungen, die Navigation überstehen — ohne Bibliothek." },

  "post.6.t": { en: "On reading the source code", uz: "Manba kodini o‘qish haqida", ru: "О чтении исходных кодов", de: "Über das Lesen von Source-Code" },
  "post.6.x": { en: "The most underrated skill in our trade. A field guide.", uz: "Bizning kasbimizdagi eng kam baholangan ko‘nikma. Yo‘l-yo‘riq.", ru: "Самый недооценённый навык в нашей профессии. Краткий путеводитель.", de: "Die unterschätzteste Fähigkeit in unserem Beruf. Ein Leitfaden." },

  "feat.post.t": {
    en: "Designing for the unstyled web — and why your CSS shouldn’t be load-bearing.",
    uz: "Stilsiz vebni dizayn qilish — va nega CSS’ingiz tayanch bo‘lmasligi kerak.",
    ru: "Дизайн для «бесстильного» веба — и почему ваш CSS не должен быть несущей конструкцией.",
    de: "Design für das unstilisierte Web — und warum dein CSS nicht tragend sein sollte."
  },
  "feat.post.x": {
    en: "The browsers we’re shipping to are weirder than ever. Here’s how to build interfaces that survive a missing stylesheet, a hostile network, and the full breadth of user agents.",
    uz: "Biz yetkazib berayotgan brauzerlar har qachongidan ham g‘alati. Stylesheet yo‘q bo‘lganda, tarmoq dushman bo‘lganda va har xil user-agentlarda omon qoladigan interfeyslarni qanday qurish.",
    ru: "Браузеры, под которые мы выпускаем, стали страннее, чем когда-либо. Разбираем, как собирать интерфейсы, которые переживут отсутствие стилей, враждебную сеть и весь спектр user-agent’ов.",
    de: "Die Browser, für die wir bauen, sind seltsamer denn je. So baust du Interfaces, die ein fehlendes Stylesheet, ein feindliches Netzwerk und die volle Breite aller User-Agents überleben."
  },
};

// === Context + hook ===
window.LangContext = React.createContext({ lang: "en", setLang: () => {} });

window.useT = function() {
  const { lang } = React.useContext(window.LangContext);
  return function t(key, vars) {
    const entry = window.I18N[key];
    if (!entry) return key;
    let v = entry[lang] || entry.en || key;
    if (vars) for (const [k, val] of Object.entries(vars)) v = v.replace("{" + k + "}", val);
    return v;
  };
};

window.LangProvider = function LangProvider({ children }) {
  const [lang, setLang] = React.useState(() => {
    const saved = localStorage.getItem("nuxen.lang");
    if (saved && ["en","uz","ru","de"].includes(saved)) return saved;
    const nav = (navigator.language || "en").slice(0,2);
    return ["en","uz","ru","de"].includes(nav) ? nav : "en";
  });
  React.useEffect(() => {
    localStorage.setItem("nuxen.lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return React.createElement(window.LangContext.Provider, { value: { lang, setLang } }, children);
};

window.LangSwitcher = function LangSwitcher() {
  const { lang, setLang } = React.useContext(window.LangContext);
  return (
    React.createElement("div", { className: "lang-switcher", role: "group", "aria-label": "Language" },
      window.LANGS.map(L =>
        React.createElement("button", {
          key: L.code,
          className: "lang-btn" + (lang === L.code ? " active" : ""),
          onClick: () => setLang(L.code),
          title: L.name,
          "aria-pressed": lang === L.code
        }, L.label)
      )
    )
  );
};
