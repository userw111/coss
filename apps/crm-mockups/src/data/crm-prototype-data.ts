export type LeadStage =
  | "new"
  | "contacted"
  | "quote-needed"
  | "quote-sent"
  | "follow-up"
  | "won"
  | "lost";

export type CrmLead = {
  activity: Array<{
    body: string;
    id: string;
    time: string;
    type: "lead" | "message" | "call" | "stage" | "task" | "note";
  }>;
  address: string;
  age: string;
  assignee: string;
  campaign: string;
  contactName: string;
  email: string;
  id: string;
  lastActivity: string;
  leadScore: "Hot" | "Warm" | "New";
  nextAction: string;
  phone: string;
  quoteMode: "Remote quote possible" | "Needs visit" | "Manual quote";
  service: string;
  source: string;
  stage: LeadStage;
  statusNote: string;
  value: string;
};

export const pipelineStages: Array<{
  id: LeadStage;
  label: string;
}> = [
  { id: "new", label: "New Lead" },
  { id: "contacted", label: "Contacted" },
  { id: "quote-needed", label: "Quote Needed" },
  { id: "quote-sent", label: "Quote Sent" },
  { id: "follow-up", label: "Follow Up" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
];

export const crmLeads: CrmLead[] = [
  {
    activity: [
      {
        body: "Meta Instant Form submitted from Window Cleaning - Boca Raton.",
        id: "act-1",
        time: "2 min ago",
        type: "lead",
      },
      {
        body: "Automation created urgent call task because SMS compliance is pending.",
        id: "act-2",
        time: "1 min ago",
        type: "task",
      },
    ],
    address: "1420 NE 5th Ave, Boca Raton, FL",
    age: "2m",
    assignee: "Taylor",
    campaign: "Window Cleaning - Boca Raton",
    contactName: "Maya Hernandez",
    email: "maya@example.com",
    id: "lead-maya",
    lastActivity: "New Meta lead, no outreach yet",
    leadScore: "Hot",
    nextAction: "Call now",
    phone: "(561) 555-0148",
    quoteMode: "Remote quote possible",
    service: "Exterior window cleaning",
    source: "Meta Instant Form",
    stage: "new",
    statusNote: "Asked for a recurring monthly clean.",
    value: "$240",
  },
  {
    activity: [
      {
        body: "Intro text sent from Monopaly number.",
        id: "act-3",
        time: "18 min ago",
        type: "message",
      },
      {
        body: "Lead replied: Can you come this Friday morning?",
        id: "act-4",
        time: "6 min ago",
        type: "message",
      },
    ],
    address: "701 SE 2nd St, Delray Beach, FL",
    age: "27m",
    assignee: "Owner",
    campaign: "Residential Window Cleaning",
    contactName: "Evan Park",
    email: "evan@example.com",
    id: "lead-evan",
    lastActivity: "Replied 6 min ago",
    leadScore: "Hot",
    nextAction: "Reply with availability",
    phone: "(561) 555-0181",
    quoteMode: "Needs visit",
    service: "Whole-home window cleaning",
    source: "Meta Instant Form",
    stage: "follow-up",
    statusNote: "Likely wants an in-person estimate before booking.",
    value: "$420",
  },
  {
    activity: [
      {
        body: "Office added manual lead from referral call.",
        id: "act-5",
        time: "1h ago",
        type: "lead",
      },
      {
        body: "Moved to Quote Needed after phone qualification.",
        id: "act-6",
        time: "42 min ago",
        type: "stage",
      },
    ],
    address: "299 E Palmetto Park Rd, Boca Raton, FL",
    age: "1h",
    assignee: "Taylor",
    campaign: "Manual / referral",
    contactName: "Nora Patel",
    email: "nora@example.com",
    id: "lead-nora",
    lastActivity: "Qualified by phone",
    leadScore: "Warm",
    nextAction: "Draft quote",
    phone: "(561) 555-0122",
    quoteMode: "Manual quote",
    service: "Storefront window cleaning",
    source: "Manual lead",
    stage: "quote-needed",
    statusNote: "Needs weekly storefront service pricing.",
    value: "$650/mo",
  },
  {
    activity: [
      {
        body: "Quote sent for exterior windows and screens.",
        id: "act-7",
        time: "Yesterday",
        type: "stage",
      },
    ],
    address: "3110 S Ocean Blvd, Highland Beach, FL",
    age: "1d",
    assignee: "Alex",
    campaign: "Window Cleaning - Boca Raton",
    contactName: "Liam Carter",
    email: "liam@example.com",
    id: "lead-liam",
    lastActivity: "Quote sent yesterday",
    leadScore: "Warm",
    nextAction: "Follow up today",
    phone: "(561) 555-0194",
    quoteMode: "Remote quote possible",
    service: "Exterior windows + screens",
    source: "Meta Instant Form",
    stage: "quote-sent",
    statusNote: "Viewed quote, no response yet.",
    value: "$380",
  },
  {
    activity: [
      {
        body: "Marked won after quote acceptance.",
        id: "act-8",
        time: "2d ago",
        type: "stage",
      },
    ],
    address: "90 NE 20th St, Boca Raton, FL",
    age: "2d",
    assignee: "Owner",
    campaign: "Residential Window Cleaning",
    contactName: "Sofia Reed",
    email: "sofia@example.com",
    id: "lead-sofia",
    lastActivity: "Booked monthly service",
    leadScore: "Warm",
    nextAction: "Send onboarding note",
    phone: "(561) 555-0166",
    quoteMode: "Remote quote possible",
    service: "Monthly window cleaning",
    source: "Meta Instant Form",
    stage: "won",
    statusNote: "Closed from Meta lead within 24 hours.",
    value: "$300/mo",
  },
];

export const crmHomeStats = [
  { label: "New leads", value: "3", detail: "+2 from Meta today" },
  { label: "Replies waiting", value: "1", detail: "Fast response needed" },
  { label: "Follow-ups due", value: "4", detail: "2 due before noon" },
  { label: "Open pipeline", value: "$1.7k", detail: "Estimated monthly value" },
];
