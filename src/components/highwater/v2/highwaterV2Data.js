// ─── Highwater Counselling Company (Draft 2) Data ─────────────────────────────
// Authenticated practice information for Derek Patten, MPCC(P).

export const PRACTICE_META = {
  name: "Highwater Counselling Company",
  tagline: "When Life's Waters Rise, A Solid Place to Stand.",
  scripture: {
    verse: "When my heart is overwhelmed: lead me to the rock that is higher than I.",
    citation: "Psalm 61:2"
  },
  founders: {
    counsellor: {
      name: "Derek Patten",
      role: "Founder & Clinical Counsellor",
      credentials: "MPCC(P), Registered with CPCA",
      credentialsFull: "Master Practitioner in Clinical Counselling (Provisional) — Canadian Professional Counsellors Association",
      focus: "Practical Tools, Men's Mental Health, Couples & Family Resilience, Postmodern & Values-Based Care",
      image: "/images/derek-patten.jpg",
      quote: "A space to open up without pressure to perform or pretend. Seeking support is a sign of being human, not a sign of weakness."
    }
  },
  location: {
    town: "Wembley, Alberta",
    region: "Grande Prairie County & Peace Region",
    format: "In-Person (Wembley Office) & Alberta-Wide Secure Telehealth"
  },
  contact: {
    email: "highwatercounselingcompany@gmail.com",
    bookingPortalPlaceholder: "#hw-booking-portal",
    janeAppUrl: "https://highwatercounselling.janeapp.com"
  },
  crisis: {
    albertaMentalHealthLine: "1-877-303-2642",
    nationalCrisisLine: "988"
  }
}

// ─── 3-Step "What to Expect" Journey (Removing First-Session Anxiety) ──────────
export const JOURNEY_STEPS = [
  {
    step: "01",
    title: "Low-Pressure First Step",
    subtitle: "Simple Digital Intake",
    description: "Whether you book an appointment online or reach out with questions, your intake is smooth, private, and unhurried.",
    highlight: "No doctor's referral needed",
    commitment: "100% confidential & self-directed — on your terms",
    iconKey: "shield"
  },
  {
    step: "02",
    title: "The First 50 Minutes",
    subtitle: "Collaborative & Grounded",
    description: "Meeting Derek in Wembley or via secure video. A straightforward, non-judgmental space where you don't have to perform or pretend. We move at the speed of safety.",
    highlight: "Safe, unhurried breathing room",
    commitment: "Move at the speed of safety — no pressure to perform",
    iconKey: "heart"
  },
  {
    step: "03",
    title: "Reclaiming Solid Ground",
    subtitle: "Practical Tools & Direction",
    description: "More than just a sympathetic ear, we equip you with tangible, practical tools you can implement immediately at work, in relationships, and at home.",
    highlight: "Real tools for solid ground",
    commitment: "Actionable strategies you take home immediately",
    iconKey: "compass"
  }
]

// ─── Interactive "Where Shall We Begin?" Selector Filters ─────────────────────
export const SELECTOR_OPTIONS = [
  {
    id: "burnout",
    label: "Feeling Overwhelmed, Burned Out, or Running on Empty",
    category: "Individual Care",
    quote: "When life’s demands flood your capacity, you don’t need more pressure—you need a solid anchor and practical tools.",
    approach: "Derek uses postmodern narrative practices combined with actionable tools to untangle chronic stress from your identity, creating structured breathing room and restoring personal agency.",
    recommendedService: "Postmodern & Narrative Therapy",
    sessionFormat: "50-minute individual session (in-person or video)"
  },
  {
    id: "mens-health",
    label: "Men’s Mental Health, Direction & Pressure",
    category: "Men's Focus",
    quote: "A space where you don't have to perform or pretend. Seeking support is a sign of being human, not a sign of weakness.",
    approach: "Derek understands the heavy, often unspoken pressures carried by men—high-responsibility roles, stress, emotional isolation, and the weight of providing. A direct, practical environment with zero posturing.",
    recommendedService: "Men's Mental Health & Direction",
    sessionFormat: "50-minute individual session (in-person or video)"
  },
  {
    id: "couples",
    label: "Our Relationship Keeps Hitting the Same Wall",
    category: "Couples Counselling",
    quote: "Conflict isn't the end of connection—it’s often an unguided signal that both partners want to be heard.",
    approach: "We step outside the cycle of blame to examine the patterns pulling you apart, building safety, honest communication, and renewed partnership.",
    recommendedService: "Couples & Relationship Counselling",
    sessionFormat: "60–75 minute joint session (in-person preferred)"
  },
  {
    id: "family-addiction",
    label: "Supporting a Teen or Loved One Facing Addiction",
    category: "Youth & Family Support",
    quote: "Addiction impacts the entire family system. You don’t have to carry the fear and exhaustion alone.",
    approach: "Compassionate, non-shaming family and youth support. We foster boundary clarity, mutual safety, and collaborative recovery pathways.",
    recommendedService: "Family & Youth Addiction Support",
    sessionFormat: "Individual or family consultation"
  },
  {
    id: "faith-values",
    label: "I Want My Faith & Worldview Integrated",
    category: "Faith & Values",
    quote: "Your spiritual convictions are not an afterthought; they are an enduring source of strength and renewal.",
    approach: "Derek provides grounded biblical and values-aligned therapy that respects your faith journey, without pretense or judgment.",
    recommendedService: "Faith & Values-Based Counselling",
    sessionFormat: "Individual or couples session"
  }
]

// ─── Core Services (6 Offerings) ──────────────────────────────────────────────
export const SERVICES_LIST = [
  {
    id: "mens-health",
    subtitle: "Grounded Support for Men",
    title: "Men’s Mental Health & Direction",
    description: "A candid, practical space to confront burnout, occupational stress, anxiety, fatherhood, and relationship strain without the pressure to perform or pretend.",
    target: "Men in demanding careers, leadership, and family life seeking practical tools",
    tags: ["No Posturing", "Stress & Burnout", "Actionable Tools", "Fatherhood"]
  },
  {
    id: "faith-values",
    subtitle: "Spiritual Integration",
    title: "Faith & Values-Based Counselling",
    description: "Anchoring clinical practice in personal worldview. We honor spiritual convictions as vital foundations for healing, meaning, and emotional renewal.",
    target: "Individuals, couples, and leaders desiring values-aligned guidance",
    tags: ["Biblical Grounding", "Worldview Alignment", "Spiritual Resilience"]
  },
  {
    id: "postmodern-narrative",
    subtitle: "Constructive Framework",
    title: "Postmodern & Narrative Therapy",
    description: "Separating the person from the problem. Providing practical tools and collaborative reframing rather than passive nodding, helping you reclaim direction and agency.",
    target: "Those feeling defined or trapped by past failures or clinical labels",
    tags: ["Practical Solutions", "Strengths-Focused", "Collaborative Agency"]
  },
  {
    id: "couples-relationship",
    subtitle: "Relational Restoration",
    title: "Couples & Relationship Counselling",
    description: "Rebuilding communication, restoring trust, and navigating seasonal gridlocks through structured, emotionally secure dialogue and actionable relationship habits.",
    target: "Couples experiencing disconnection, conflict, or preparing for life shifts",
    tags: ["Active Listening", "Conflict Resolution", "Reconnection"]
  },
  {
    id: "family-addiction",
    subtitle: "Systemic Care",
    title: "Family & Youth Addiction Support",
    description: "Guidance for families coping with adolescent substance misuse and behavioral challenges, focusing on healthy boundaries, stabilization, and family recovery.",
    target: "Parents, adolescents, and families walking through addiction recovery",
    tags: ["Family Systems", "Boundaries & Trust", "Youth Mentorship"]
  },
  {
    id: "onsite-support",
    subtitle: "Community Outreach",
    title: "On-Site Mental Health Support",
    description: "Direct on-site support for local community organizations, professional teams, and workplaces throughout Wembley and the Grande Prairie region.",
    target: "Workplaces, non-profits, faith organizations, and community groups",
    tags: ["Peace Region", "Workplace Wellness", "Crisis De-escalation"]
  }
]

// ─── Extended Benefits & Canadian Insurance FAQ ───────────────────────────────
export const INSURANCE_PROVIDERS = [
  "Alberta Blue Cross",
  "Sun Life Financial",
  "Manulife",
  "Canada Life",
  "Desjardins",
  "Green Shield Canada"
]

export const FAQS_LIST = [
  {
    q: "What are Derek Patten's professional credentials and registration?",
    a: "Derek Patten is a Master Practitioner in Clinical Counselling (Provisional) — MPCC(P) — registered in good standing with the Canadian Professional Counsellors Association (CPCA). He provides collaborative, evidence-informed clinical counselling adhered to strict Canadian ethical and privacy standards."
  },
  {
    q: "Do I need a doctor's referral to book with Derek?",
    a: "No referral is required. Highwater Counselling operates as an independent private practice; you, your partner, or your family can self-refer and schedule directly online at your convenience."
  },
  {
    q: "Are counselling services covered under Alberta Health Services (AHS) or private insurance?",
    a: "Private counselling is not funded under provincial AHS medicare. However, most Canadian extended health benefit plans and private insurance policies reimburse clinical counselling provided by CPCA-registered practitioners (MPCC/RPC). Detailed official receipts containing Derek's professional registration numbers are issued immediately following every session for seamless submission to your provider."
  },
  {
    q: "What is Derek's approach, and what can I expect in the first session?",
    a: "Derek's style is straightforward, judgment-free, and client-centred. Rather than simply offering a passive sympathetic ear, he focuses on equipping you with practical tools and real-world strategies. For men especially, it is a room where there is no pressure to perform or pretend."
  },
  {
    q: "What is the appointment cancellation policy?",
    a: "If you need to reschedule or cancel an appointment, please provide advance notice through your secure client portal or by contacting the practice so that the reserved time may be offered to someone else in need. Practice cancellation notice guidelines are provided in your client intake agreement."
  },
  {
    q: "Can I choose between in-person appointments in Wembley and virtual video sessions?",
    a: "Yes. Derek offers in-person sessions at our quiet, dedicated Wembley office, as well as secure, encrypted telehealth video sessions for clients across Alberta."
  },
  {
    q: "Is everything we discuss kept strictly confidential?",
    a: "Yes. All sessions, notes, and client communications are protected under Canadian ethical and legal privacy guidelines (PIPEDA). Confidentiality is absolute, subject only to the standard legal safety exceptions (such as imminent risk of harm to yourself or others)."
  }
]
