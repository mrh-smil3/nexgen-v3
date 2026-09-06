/**
 * Source dictionary. Its shape defines `Dictionary`, so every other locale is
 * checked against it at compile time — a missing key is a build error.
 *
 * Headings that highlight part of the phrase are split into `lead` + `accent`
 * rather than carrying markup, so translators can move the emphasis to
 * wherever it falls naturally in their language.
 */
export const en = {
  meta: {
    title: "Nexgen — Operational Intelligence & Digital Systems",
    description:
      "Nexgen builds operational intelligence, system integrations, monitoring platforms, and custom business applications that turn enterprise data into operational control.",
    ogTitle: "Your Systems Have the Data. Do You Have the Control?",
    ogDescription:
      "We connect existing enterprise systems and transform operational data into visibility, monitoring, and actionable control.",
  },

  nav: {
    ariaPrimary: "Primary",
    ariaHome: "Nexgen — home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Language",
    links: [
      { href: "#approach", label: "Solutions" },
      { href: "#industries", label: "Industries" },
      { href: "#case-study", label: "Case Studies" },
      { href: "#why", label: "About" },
      { href: "#contact", label: "Contact" },
    ],
    cta: "Discuss Your Operation",
  },

  hero: {
    eyebrow: "Operational Intelligence & Control",
    headlineLead: "Your systems have the data.",
    headlineAccent: "Do you have the control?",
    lede: "We build operational intelligence layers that connect your existing systems, consolidate critical data, and turn complex operations into clear, actionable visibility.",
    ctaPrimary: "Explore Our Work",
    ctaSecondary: "Discuss Your Operation",
    meta: [
      { k: "Connects to", v: "IBM Maximo · ERP" },
      { k: "Focus", v: "Monitoring & Control" },
      { k: "Deploy", v: "Cloud · On-prem" },
    ],
    note: "Representative interface. Figures shown are illustrative, not client data.",
  },

  console: {
    title: "Operations Control",
    live: "Live",
    kpis: [
      { label: "Open Items", sub: "of 342 in scope" },
      { label: "Pending", sub: "over 7 days: 6" },
      { label: "Issued", sub: "confirmed: 78" },
    ],
    chartTitle: "Plan vs Realisation",
    chartSub: "Week 01–24 · Reporting Period",
    chartAria:
      "Line chart comparing planned and realised progress across the reporting period",
    legendPlan: "Plan",
    legendActual: "Realisation",
    metricRealisation: "Realisation",
    metricPlan: "Plan",
    metricVariance: "Variance",
    variancePts: "pts",
    states: {
      inProgress: "In Progress",
      approved: "Approved",
      issued: "Issued",
      scheduled: "Scheduled",
      inReview: "In Review",
      completed: "Completed",
    },
    stream: [
      { code: "ITEM-4821", text: "Asset inspection scheduled" },
      { code: "REQ-1174", text: "Parts request — 6 line items" },
      { code: "ORD-0932", text: "Supplier confirmation received" },
      { code: "ITEM-4835", text: "Maintenance task assigned" },
      { code: "REQ-1188", text: "Replacement component kit" },
      { code: "ITEM-4802", text: "Line item closed out" },
    ],
    chipIntegration: { title: "ERP · EAM", sub: "Integration active" },
    chipAlert: { title: "6 items delayed", sub: "Flagged to owner" },
  },

  flowRail: [
    { label: "Enterprise Systems", sub: "ERP · EAM · Procurement" },
    { label: "Integration", sub: "APIs · Sync · Mapping" },
    { label: "Operational Layer", sub: "Nexgen" },
    { label: "Monitoring & Control", sub: "Status · Exceptions" },
    { label: "Management Decision", sub: "Act on what matters" },
  ],

  trust: [
    {
      title: "Enterprise Integration",
      detail:
        "Integration with enterprise EAM and procurement systems, including IBM Maximo",
    },
    {
      title: "API-Based Architecture",
      detail: "REST integration layers with documented data contracts",
    },
    {
      title: "Infrastructure Capability",
      detail: "Linux, Windows Server, on-premise and cloud deployment",
    },
    {
      title: "Controlled Data Access",
      detail: "Read-scoped accounts, least privilege, no system replacement",
    },
  ],

  problem: {
    kicker: "The Problem",
    titleLead: "The problem isn’t always a",
    titleAccent: "lack of systems.",
    lede: "Organizations often already have ERP, EAM, procurement, maintenance and other enterprise systems in place. The challenge is turning information spread across those systems into a clear operational picture.",
    items: [
      {
        title: "Data lives in separate systems",
        body: "ERP, EAM, procurement and maintenance each hold part of the picture. None of them holds all of it.",
      },
      {
        title: "Reporting is rebuilt by hand",
        body: "Teams export, paste and reconcile in spreadsheets every week to answer the same recurring questions.",
      },
      {
        title: "Operational status is hard to track",
        body: "Progress is known inside each function, but there is no shared view of where an activity actually stands.",
      },
      {
        title: "Procurement is detached from operations",
        body: "A delayed purchase requisition becomes visible only when the work it blocks has already slipped.",
      },
      {
        title: "Management sees it late",
        body: "By the time information is consolidated into a report, the window to act on it has usually closed.",
      },
      {
        title: "Critical context stays trapped",
        body: "The detail that explains a delay sits in a system that the people making decisions do not open.",
      },
    ],
  },

  gap: {
    kicker: "The Operational Gap",
    title: "Between your systems and your decisions, there is a gap.",
    lede: "The data has already been captured. What is missing is the layer that consolidates it, keeps it current, and presents it in the shape an operational decision actually needs.",
    callout:
      "Nexgen fills the operational gap — without replacing anything already running underneath it.",
    diagramTitle: "Existing Systems",
    erp: { label: "ERP", sub: "Finance" },
    eam: { label: "EAM", sub: "Assets" },
    procurement: { label: "Procurement", sub: "PR / PO" },
    dataExists: { label: "Data exists", sub: "Complete but fragmented" },
    gapLabel: "Operational Gap",
    gapBody: "Manual consolidation · delayed status · no shared view",
    decision: "Management decision",
  },

  approach: {
    kicker: "Our Approach",
    title: "We build the operational layer.",
    lede: "Nexgen connects to the systems your organization already uses and creates an operational layer for monitoring, analysis, workflow visibility and decision support.",
    stages: [
      {
        title: "Connect",
        body: "Integrate existing enterprise systems and APIs, working with the data contracts your platforms already expose.",
      },
      {
        title: "Consolidate",
        body: "Bring critical operational data into a unified structure so the same figure means the same thing everywhere.",
      },
      {
        title: "Monitor",
        body: "Track processes, progress, exceptions and operational status continuously instead of at reporting time.",
      },
      {
        title: "Control",
        body: "Give management actionable visibility — what is on track, what has slipped, and what needs a decision now.",
      },
    ],
  },

  capabilities: {
    kicker: "What We Build",
    title: "Solution capabilities, not a service list.",
    lede: "Each capability below exists because an operational question was hard to answer. They are usually combined into one platform rather than delivered separately.",
    items: [
      {
        title: "Operational Monitoring",
        body: "Monitor critical operational processes from a single interface, with status that reflects the source system rather than the last export.",
        tags: ["Status", "Exceptions", "Progress"],
      },
      {
        title: "Enterprise System Integration",
        body: "Connect existing enterprise applications through APIs and integration layers, with mapping and synchronisation you can audit.",
        tags: ["REST API", "Sync", "Data mapping"],
      },
      {
        title: "Planning & Control",
        body: "Systems for planning, progress monitoring and realisation tracking, so plan and actual sit side by side at every level.",
        tags: ["Plan vs actual", "Schedule", "Milestones"],
      },
      {
        title: "Procurement Visibility",
        body: "Follow purchase requisitions, purchase orders, vendors and procurement progress against the operations that depend on them.",
        tags: ["PR", "PO", "Vendor"],
      },
      {
        title: "Management Information Systems",
        body: "Turn operational data into management-ready information: consolidated, current, and structured around the decision being made.",
        tags: ["Dashboards", "Reporting", "Drill-down"],
      },
      {
        title: "Business Applications",
        body: "Custom applications built around specific organizational workflows, where a packaged product would force the process to bend.",
        tags: ["Workflow", "Forms", "Approvals"],
      },
    ],
  },

  caseStudy: {
    kicker: "Featured Case Study",
    titleLead: "From enterprise data to",
    titleAccent: "operational control.",
    project: "Powerplant Overhaul Planning & Absorption Monitoring",
    projectSuffix: "— an operational monitoring platform integrated with IBM Maximo.",
    meta: [
      { k: "Sector", v: "Power & Energy" },
      { k: "System of record", v: "IBM Maximo" },
      { k: "Scope", v: "Overhaul operations" },
      { k: "Nexgen role", v: "Operational layer" },
    ],
    problemLabel: "Problem",
    problemBody:
      "Overhaul operations run across work orders, procurement, planning and budget realisation at once. Each of those already produced data inside the enterprise system — but any question that crossed them had to be answered by pulling extracts and reconciling them by hand, so management saw progress and absorption only after the fact.",
    solutionLabel: "Solution",
    solutionBody:
      "Nexgen built an operational monitoring platform that reads from IBM Maximo through an integration layer, structures work order and procurement records into one consistent operational model, and presents planning, procurement and absorption in a single interface. Maximo remains the system of record — nothing was migrated and nothing was replaced.",
    outcomeLabel: "Outcome",
    outcomeBody:
      "Planning, procurement progress and budget absorption are visible in one place, refreshed from the source system rather than rebuilt by hand each reporting cycle.",
    monitoringLabel: "Monitoring Areas",
    monitoringAreas: [
      "Work Order status",
      "Purchase Requisition status",
      "Purchase Order status",
      "Overhaul planning",
      "Procurement progress",
      "Budget absorption",
      "Operational realisation",
    ],
    cta: "Discuss a similar operation",
    architecture: {
      title: "Integration Architecture",
      scope: "Read-scoped",
      source: { label: "IBM Maximo", sub: "System of record" },
      workOrder: { label: "Work Order", sub: "WO" },
      pr: { label: "Purchase Req.", sub: "PR" },
      po: { label: "Purchase Order", sub: "PO" },
      integration: { label: "Integration Layer", sub: "REST · scheduled sync" },
      core: { label: "Operational Monitoring", sub: "Nexgen layer" },
      planning: "Planning",
      procurement: "Procurement",
      absorption: "Absorption",
      output: "Management View",
    },
    caption:
      "Simplified for publication. Integration scope, sync intervals and access model are defined per engagement.",
  },

  how: {
    kicker: "How It Works",
    title: "Five steps from fragmented data to operational control.",
    lede: "The sequence matters. Monitoring built before the operational model is understood produces dashboards nobody trusts.",
    steps: [
      {
        title: "Understand",
        body: "Map the operational workflow, the systems already in place, and the decisions the data has to support.",
      },
      {
        title: "Connect",
        body: "Establish integration with existing systems and data sources under a scoped, agreed access model.",
      },
      {
        title: "Structure",
        body: "Turn fragmented records into a consistent operational model with definitions everyone can rely on.",
      },
      {
        title: "Monitor",
        body: "Build the dashboards, monitoring interfaces, workflows and alerts that surface status and exceptions.",
      },
      {
        title: "Control",
        body: "Enable teams and management to identify issues early and act while there is still room to act.",
      },
    ],
  },

  industries: {
    kicker: "Industries",
    title: "Built for operations with real complexity.",
    lede: "We focus on operational complexity rather than industry labels. If the process spans several systems and several teams, the problem is familiar to us.",
    items: [
      {
        name: "Energy & Power",
        body: "Maintenance, overhaul, asset monitoring, procurement and planning across generation assets.",
        focus: ["Overhaul", "Asset monitoring", "Absorption"],
      },
      {
        name: "Manufacturing",
        body: "Production, inventory, procurement, maintenance and day-to-day operational monitoring.",
        focus: ["Production", "Inventory", "Maintenance"],
      },
      {
        name: "Industrial Operations",
        body: "Asset-intensive workflows where operational control depends on many moving parts staying aligned.",
        focus: ["Workflow", "Control", "Compliance"],
      },
      {
        name: "Logistics",
        body: "Order, procurement, shipment and operational visibility across a distributed footprint.",
        focus: ["Orders", "Shipment", "Visibility"],
      },
      {
        name: "Engineering & Maintenance",
        body: "Work orders, asset management, maintenance planning and execution monitoring.",
        focus: ["Work orders", "Planning", "Execution"],
      },
    ],
    closingBody:
      "Not listed here? The pattern usually repeats. Tell us which process you are trying to see clearly and we will tell you honestly whether we are the right fit.",
    closingLink: "Start that conversation →",
  },

  integration: {
    kicker: "Technology & Integration",
    title: "Built around your existing systems.",
    lede: "Your organization doesn't need another isolated application. Nexgen solutions are designed to work alongside the systems you already run — reading what they hold, respecting where authority sits, and adding the layer above them.",
    principleLabel: "Working principle",
    principleBody:
      "Integration is scoped and read-oriented by default. Where a write-back is genuinely needed, it is agreed explicitly rather than assumed.",
    categories: [
      { name: "ERP", note: "Finance & resource planning" },
      { name: "EAM", note: "Asset & maintenance management" },
      { name: "Procurement", note: "PR, PO and vendor records" },
      { name: "Database", note: "Direct or replicated access" },
      { name: "API", note: "REST and service endpoints" },
      { name: "Legacy Systems", note: "Older internal applications" },
      { name: "Custom Applications", note: "In-house built tools" },
    ],
    scoped: "+ Scoped per engagement",
    stackLabel: "Delivery stack",
    stackNote:
      "Listed as evidence of capability, not as the reason to work with us. The stack follows the operation, not the other way round.",
  },

  why: {
    kicker: "Core Values",
    title: "Why organizations bring us in.",
    lede: "Not because we are cheaper or faster, but because the problem was never really about building software.",
    values: [
      {
        title: "Understand operations first",
        body: "We don't start from technology. We start from the operational problem — what has to be decided, by whom, and on what evidence.",
      },
      {
        title: "Work with existing systems",
        body: "We extend the value of the platforms already in place instead of asking an organization to replace what is working.",
      },
      {
        title: "From data to action",
        body: "A number that nobody acts on is not visibility. We design for the decision at the end of the chain.",
      },
      {
        title: "Custom to the operation",
        body: "Solutions are shaped around actual workflows rather than bending the operation to fit a generic software package.",
      },
      {
        title: "Engineering mindset",
        body: "Software engineering, infrastructure, integration and operational understanding treated as one discipline.",
      },
    ],
  },

  digital: {
    eyebrow: "Also available",
    title: "Need a digital presence instead? We build that too.",
    body: "Not every engagement starts with an enterprise system. We continue to design and build web products for organizations at an earlier stage.",
    link: "Talk about a web project",
    services: [
      "Corporate Website",
      "Landing Page",
      "E-commerce",
      "Web Application",
      "Company Profile",
      "Digital Platform",
    ],
  },

  contact: {
    kicker: "Contact",
    titleLead: "Tell us what you’re trying to",
    titleAccent: "control.",
    lede: "Start with the operational problem rather than the technology. If it turns out you don’t need a new system, we will say so.",
    points: [
      "We review the operational context before proposing anything.",
      "Existing systems stay in place — integration is scoped with you.",
      "No obligation, and no pitch deck of features you didn't ask for.",
    ],
    fields: {
      name: "Name",
      namePlaceholder: "Full name",
      company: "Company",
      companyPlaceholder: "Organization",
      position: "Position",
      positionPlaceholder: "Role",
      email: "Email",
      emailPlaceholder: "name@company.com",
      phone: "Phone / WhatsApp",
      phonePlaceholder: "+62 …",
      industry: "Industry",
      industryPlaceholder: "Select industry",
      systems: "Existing systems",
      systemsPlaceholder: "e.g. IBM Maximo, SAP, in-house procurement app",
      challenge: "What would you like to monitor, integrate, or improve?",
      challengePlaceholder:
        "Describe the operational challenge — what is hard to see today, and what decision it holds up.",
      scope: "Estimated project scope",
      scopePlaceholder: "Select scope",
    },
    industries: [
      "Energy & Power",
      "Manufacturing",
      "Industrial Operations",
      "Logistics",
      "Construction",
      "Engineering & Maintenance",
      "Other",
    ],
    scopes: [
      "Exploring / early stage",
      "Defined requirement",
      "Budgeted project",
      "Ongoing programme",
    ],
    privacy: "We use this only to prepare for the conversation.",
    submit: "Discuss Your Operation",
    sending: "Sending…",
    error:
      "Something went wrong sending your message. Please try again, or email us directly.",
    successTitle: "Message received.",
    successBody:
      "Thank you. We’ll read the operational context you shared and reply from a Nexgen address. If anything is time-sensitive, reply to that email directly.",
  },

  footer: {
    tagline:
      "From enterprise data to operational control. We build the operational layer between the systems you run and the decisions you make.",
    columns: [
      {
        title: "Solutions",
        links: [
          { label: "Operational Monitoring", href: "#capabilities" },
          { label: "System Integration", href: "#integration" },
          { label: "Planning & Control", href: "#capabilities" },
          { label: "Procurement Visibility", href: "#capabilities" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Our Approach", href: "#approach" },
          { label: "Case Studies", href: "#case-study" },
          { label: "Industries", href: "#industries" },
          { label: "Why Nexgen", href: "#why" },
        ],
      },
      {
        title: "Other Services",
        links: [
          { label: "Corporate Website", href: "#digital" },
          { label: "Web Application", href: "#digital" },
          { label: "E-commerce", href: "#digital" },
          { label: "Digital Platform", href: "#digital" },
        ],
      },
    ],
    getInTouch: "Get in touch",
    cta: "Discuss Your Operation",
    rights: "All rights reserved.",
    strapline: "Operational Intelligence & Digital Systems",
  },
};

export type Dictionary = typeof en;
