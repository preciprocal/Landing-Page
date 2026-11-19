/**
 * lib/h1bSponsors.ts
 *
 * The employers with an /opt/h1b-sponsors/<slug> page. Targets the searches
 * "does <company> sponsor H-1B", "<company> H-1B" and "companies that sponsor
 * H-1B visas".
 *
 * Petitions are filed under legal entity names, which rarely match the brand
 * (Meta files as META PLATFORMS INC; a search for "Meta" finds an unrelated
 * company). So every name below was checked by hand against the USCIS H-1B
 * Employer Data Hub and the E-Verify Employer Search on 2026-11-18, and a page
 * shows figures only for the names listed here (getEmployerProfile in
 * lib/everify.ts does exact lookups, never prefix matches).
 *
 * h1b:     filing names in the H-1B Employer Data Hub, as USCIS lists them.
 *          Several names are summed; each is also shown on its own row.
 * everify: enrolled names in the E-Verify Employer Search. Unrelated employers
 *          often share a name ("PWC" is also Pacific West Space Communications),
 *          so use the full legal name; among accounts under one name the
 *          largest open one is taken.
 *
 * Slugs match /interview-prep/<slug> where that guide exists, so the two link
 * to each other. Left out on purpose: employers whose current filing names
 * could not be confirmed (Kaiser Permanente, Procter & Gamble, Johnson &
 * Johnson, EY). Add one only after checking its names in both datasets.
 */

export interface H1bSponsor {
  slug: string;
  name: string;
  h1b: readonly string[];
  everify: readonly string[];
  /** Shown under the table when the filing names need explaining. */
  note?: string;
}

export const H1B_SPONSORS: readonly H1bSponsor[] = [
  { slug: "google", name: "Google", h1b: ["GOOGLE LLC"], everify: ["Google"] },
  {
    slug: "amazon",
    name: "Amazon",
    h1b: ["AMAZON COM SERVICES LLC", "AMAZON WEB SERVICES INC", "AMAZON DEVELOPMENT CENTER U S INC", "AMAZON DEVELOPMENT CENTER US INC"],
    everify: ["Amazon"],
    note: "Amazon files through several legal entities. USCIS lists Amazon Development Center under two spellings, shown separately.",
  },
  { slug: "meta", name: "Meta", h1b: ["META PLATFORMS INC"], everify: ["Meta Platforms, Inc."] },
  { slug: "microsoft", name: "Microsoft", h1b: ["MICROSOFT CORPORATION"], everify: ["Microsoft"] },
  { slug: "apple", name: "Apple", h1b: ["APPLE INC"], everify: ["Apple Inc."] },
  { slug: "nvidia", name: "NVIDIA", h1b: ["NVIDIA CORPORATION"], everify: ["NVIDIA CORPORATION"] },
  { slug: "tesla", name: "Tesla", h1b: ["TESLA INC"], everify: ["Tesla, Inc."] },
  { slug: "oracle", name: "Oracle", h1b: ["ORACLE AMERICA INC"], everify: ["Oracle Corporation"] },
  { slug: "salesforce", name: "Salesforce", h1b: ["SALESFORCE INC"], everify: ["Salesforce, Inc."] },
  { slug: "adobe", name: "Adobe", h1b: ["ADOBE INC"], everify: ["Adobe Inc."] },
  { slug: "linkedin", name: "LinkedIn", h1b: ["LINKEDIN CORPORATION"], everify: ["LinkedIn Corporation"] },
  { slug: "uber", name: "Uber", h1b: ["UBER TECHNOLOGIES INC"], everify: ["Uber Technologies Inc."] },
  { slug: "netflix", name: "Netflix", h1b: ["NETFLIX INC"], everify: ["Netflix, Inc."] },
  { slug: "stripe", name: "Stripe", h1b: ["STRIPE INC"], everify: ["Stripe, Inc."] },
  { slug: "airbnb", name: "Airbnb", h1b: ["AIRBNB INC"], everify: ["Airbnb, Inc. and its subsidiaries and affiliates"] },
  { slug: "spotify", name: "Spotify", h1b: ["SPOTIFY USA INC"], everify: ["Spotify USA Inc"] },
  { slug: "openai", name: "OpenAI", h1b: ["OPENAI OPCO LLC"], everify: ["OpenAI OpCo, LLC"] },
  { slug: "anthropic", name: "Anthropic", h1b: ["ANTHROPIC PBC"], everify: ["Anthropic"] },
  { slug: "databricks", name: "Databricks", h1b: ["DATABRICKS INC"], everify: ["Databricks, Inc."] },
  { slug: "snowflake", name: "Snowflake", h1b: ["SNOWFLAKE INC"], everify: ["Snowflake Inc."] },
  { slug: "palantir", name: "Palantir", h1b: ["PALANTIR TECHNOLOGIES INC"], everify: ["Palantir Technologies"] },
  { slug: "coinbase", name: "Coinbase", h1b: ["COINBASE INC"], everify: ["Coinbase, Inc."] },
  { slug: "figma", name: "Figma", h1b: ["FIGMA INC"], everify: ["Figma, Inc"] },
  { slug: "datadog", name: "Datadog", h1b: ["DATADOG INC"], everify: ["Datadog, Inc."] },
  { slug: "cloudflare", name: "Cloudflare", h1b: ["CLOUDFLARE INC"], everify: ["Cloudflare, Inc."] },
  { slug: "atlassian", name: "Atlassian", h1b: ["ATLASSIAN US INC"], everify: ["Atlassian, Inc"] },
  { slug: "shopify", name: "Shopify", h1b: ["SHOPIFY USA INC."], everify: ["Shopify USA, Inc."] },
  { slug: "doordash", name: "DoorDash", h1b: ["DOORDASH INC"], everify: ["DoorDash, Inc."] },
  { slug: "robinhood", name: "Robinhood", h1b: ["ROBINHOOD MARKETS INC"], everify: ["Robinhood Markets, Inc."] },
  { slug: "bloomberg", name: "Bloomberg", h1b: ["BLOOMBERG LP"], everify: ["Bloomberg L.P."] },
  {
    slug: "goldman-sachs",
    name: "Goldman Sachs",
    h1b: ["GOLDMAN SACHS AND CO LLC", "GOLDMAN SACHS SERVICES LLC", "GOLDMAN SACHS BANK USA"],
    everify: ["The Goldman Sachs Group, Inc."],
  },
  { slug: "jpmorgan", name: "JPMorgan Chase", h1b: ["JPMORGAN CHASE AND CO"], everify: ["JPMorgan Chase Bank, N.A."] },
  {
    slug: "morgan-stanley",
    name: "Morgan Stanley",
    h1b: ["MORGAN STANLEY SERVICES GROUP INC", "MORGAN STANLEY AND CO LLC", "MORGAN STANLEY SMITH BARNEY LLC"],
    everify: ["Morgan Stanley"],
  },
  {
    slug: "evercore",
    name: "Evercore",
    h1b: ["EVERCORE PARTNERS SERVICES EAST LLC", "EVERCORE PARTNERS SERVICES EAST LL"],
    everify: ["Evercore Partners Services East LLC"],
    note: "USCIS lists the same entity under a full and a shortened name, shown separately.",
  },
  { slug: "blackstone", name: "Blackstone", h1b: ["BLACKSTONE INC"], everify: ["Blackstone"] },
  { slug: "citadel", name: "Citadel", h1b: ["CITADEL AMERICAS SERVICES LLC"], everify: ["Citadel Americas Services LLC"] },
  { slug: "jane-street", name: "Jane Street", h1b: ["JANE STREET GROUP, LLC"], everify: ["Jane Street Group, LLC"] },
  { slug: "two-sigma", name: "Two Sigma", h1b: ["TWO SIGMA INVESTMENTS LP"], everify: ["Two Sigma Investments, LP"] },
  { slug: "capital-one", name: "Capital One", h1b: ["CAPITAL ONE SERVICES LLC"], everify: ["Capital One Financial Corporation"] },
  {
    slug: "american-express",
    name: "American Express",
    h1b: ["AMERICAN EXPRESS TRAVEL RELATED SERVICES COMPANY INC", "AMERICAN EXPRESS COMPANY"],
    everify: ["American Express Travel Related Services Company, Inc.", "American Express"],
  },
  {
    slug: "mckinsey",
    name: "McKinsey & Company",
    h1b: ["MCKINSEY AND COMPANY INC UNITED STATES", "MCKINSEY AND COMPANY INC UNITED ST"],
    everify: ["McKinsey & Company, Inc. and certain affiliates and subsidiaries"],
    note: "USCIS lists the same entity under a full and a shortened name, shown separately.",
  },
  { slug: "bcg", name: "Boston Consulting Group", h1b: ["BOSTON CONSULTING GROUP INC"], everify: ["The Boston Consulting Group, Inc.", "Boston Consulting Group"] },
  { slug: "bain", name: "Bain & Company", h1b: ["BAIN AND COMPANY INC", "BAIN & COMPANY INC"], everify: ["Bain & Company, Inc."] },
  {
    slug: "deloitte",
    name: "Deloitte",
    h1b: ["DELOITTE CONSULTING LLP", "DELOITTE TAX LLP", "DELOITTE TOUCHE TOHMATSU SERVICES LLC", "DELOITTE & TOUCHE LLP"],
    everify: ["Deloitte"],
  },
  {
    slug: "pwc",
    name: "PwC",
    h1b: ["PWC ADVISORY SERVICES LLC", "PWC US TAX LLP", "PWC US CONSULTING LLP", "PWC US BUSINESS ADVISORY LLP", "PWC US GROUP LLP", "PRICEWATERHOUSECOOPERS LLP"],
    everify: ["PwC US Group LLP and all its affiliates and subsidiaries"],
  },
  { slug: "kpmg", name: "KPMG", h1b: ["KPMG LLP"], everify: ["KPMG LLP"] },
  { slug: "accenture", name: "Accenture", h1b: ["ACCENTURE LLP"], everify: ["Accenture LLP"] },
  {
    slug: "unitedhealth",
    name: "UnitedHealth Group",
    h1b: ["OPTUM SERVICES INC"],
    everify: ["UnitedHealth Group"],
    note: "UnitedHealth Group's H-1B petitions in the Data Hub are filed by its Optum business, as Optum Services Inc.",
  },
  {
    slug: "cvs-health",
    name: "CVS Health",
    h1b: ["CVS PHARMACY INC", "CVS SHARED SERVICES RESOURCES LLC", "CVS RX SERVICES INC", "AETNA RESOURCES LLC"],
    everify: ["CVS Pharmacy, Inc.", "CVS Health"],
    note: "Includes Aetna Resources LLC, part of CVS Health.",
  },
  { slug: "mayo-clinic", name: "Mayo Clinic", h1b: ["MAYO CLINIC"], everify: ["Mayo Clinic"] },
  { slug: "walmart", name: "Walmart", h1b: ["WAL-MART ASSOCIATES INC"], everify: ["Walmart Inc."] },
  { slug: "target", name: "Target", h1b: ["TARGET ENTERPRISE INC"], everify: ["Target Corporation"] },
];

export const getH1bSponsor = (slug: string) => H1B_SPONSORS.find((s) => s.slug === slug);
