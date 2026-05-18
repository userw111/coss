import {
  IconCalendarPlus,
  IconMessageCircle,
  IconPhone,
  IconSearch,
  IconSettings2,
} from "@tabler/icons-react";

type PipelinePageProps = {
  onLeadSelect: (leadId: string) => void;
  selectedLeadId?: string;
};

type OpportunityCard = {
  accent: "blue" | "green" | "orange" | "pink" | "purple";
  age: string;
  id: string;
  leadId: string;
  meta: string;
  name: string;
  owner: string;
  status: string;
  value: string;
};

type OpportunityStage = {
  color: string;
  count: string;
  id: string;
  label: string;
  summary: string;
  cards: OpportunityCard[];
};

const kpis = [
  {
    detail: "↑ 18% vs 7 d",
    detailTone: "positive",
    label: "PIPELINE VALUE",
    value: "$87.4k",
  },
  {
    detail: "12 new today",
    detailTone: "info",
    label: "OPEN OPPORTUNITIES",
    value: "38",
  },
  {
    detail: "↑ 6% vs 7 d",
    detailTone: "positive",
    label: "BOOKED JOBS",
    value: "14",
  },
  {
    detail: "↓ 3m faster",
    detailTone: "positive",
    label: "AVG RESPONSE",
    value: "8m",
  },
];

const stages: OpportunityStage[] = [
  {
    cards: [
      {
        accent: "blue",
        age: "2m",
        id: "joe",
        leadId: "lead-maya",
        meta: "Window cleaning · via Front Door Pitch",
        name: "Joe Hampton",
        owner: "TJ",
        status: "Hot",
        value: "$2.4k",
      },
      {
        accent: "pink",
        age: "24m",
        id: "maria",
        leadId: "lead-evan",
        meta: "Gutter cleaning · via Before & After Reel",
        name: "Maria Reyes",
        owner: "AR",
        status: "Meta Ads",
        value: "$1.8k",
      },
    ],
    color: "#6B7280",
    count: "8",
    id: "new",
    label: "New Lead",
    summary: "8 opportunities · $18.6k",
  },
  {
    cards: [
      {
        accent: "green",
        age: "58m",
        id: "derek",
        leadId: "lead-nora",
        meta: "Pressure washing · callback scheduled",
        name: "Derek Kim",
        owner: "MS",
        status: "Called",
        value: "$3.2k",
      },
      {
        accent: "orange",
        age: "1h",
        id: "alicia",
        leadId: "lead-liam",
        meta: "Exterior windows · left voicemail",
        name: "Alicia Tran",
        owner: "TJ",
        status: "Needs follow-up",
        value: "$950",
      },
    ],
    color: "#2563EB",
    count: "11",
    id: "contacted",
    label: "Contacted",
    summary: "11 opportunities · $29.2k",
  },
  {
    cards: [
      {
        accent: "purple",
        age: "Yesterday",
        id: "brian",
        leadId: "lead-maya",
        meta: "Commercial storefront · estimate sent",
        name: "Brian Soto",
        owner: "AR",
        status: "Estimate",
        value: "$4.6k",
      },
      {
        accent: "blue",
        age: "2d",
        id: "sam",
        leadId: "lead-evan",
        meta: "Roof wash · quote waiting approval",
        name: "Sam Park",
        owner: "MS",
        status: "Reviewing",
        value: "$1.6k",
      },
    ],
    color: "#F59E0B",
    count: "9",
    id: "estimate",
    label: "Estimate Sent",
    summary: "9 opportunities · $21.4k",
  },
  {
    cards: [
      {
        accent: "green",
        age: "3d",
        id: "robin",
        leadId: "lead-sofia",
        meta: "Recurring service · booked Thu 10am",
        name: "Robin Chase",
        owner: "TJ",
        status: "Booked",
        value: "$840",
      },
      {
        accent: "purple",
        age: "4d",
        id: "nadia",
        leadId: "lead-nora",
        meta: "Move-out clean · crew assigned",
        name: "Nadia Khan",
        owner: "AR",
        status: "Crew ready",
        value: "$2.1k",
      },
    ],
    color: "#16A34A",
    count: "6",
    id: "booked",
    label: "Booked",
    summary: "6 opportunities · $12.8k",
  },
  {
    cards: [
      {
        accent: "orange",
        age: "5d",
        id: "peter",
        leadId: "lead-sofia",
        meta: "Gutter plan · paid deposit",
        name: "Peter Tan",
        owner: "MS",
        status: "Won",
        value: "$1.2k",
      },
      {
        accent: "pink",
        age: "1w",
        id: "karen",
        leadId: "lead-liam",
        meta: "HOA bundle · invoice sent",
        name: "Karen Patel",
        owner: "TJ",
        status: "Won",
        value: "$3.9k",
      },
    ],
    color: "#7C3AED",
    count: "4",
    id: "won",
    label: "Won",
    summary: "4 opportunities · $5.4k",
  },
];

export function PipelinePage({
  onLeadSelect,
  selectedLeadId,
}: PipelinePageProps) {
  return (
    <div className="crm-pipeline-copy">
      <section className="crm-pipeline-kpis" aria-label="Pipeline metrics">
        {kpis.map((kpi) => (
          <article className="crm-pipeline-kpi" key={kpi.label}>
            <span>{kpi.label}</span>
            <div>
              <strong>{kpi.value}</strong>
              <small data-tone={kpi.detailTone}>{kpi.detail}</small>
            </div>
          </article>
        ))}
      </section>

      <section
        className="crm-pipeline-copy-toolbar"
        aria-label="Pipeline controls"
      >
        <div className="crm-pipeline-toolbar-top">
          <div className="crm-pipeline-title-group">
            <h2>Opportunities</h2>
            <div className="crm-pipeline-filter-row">
              <button className="is-active" type="button">
                All 38
              </button>
              <button type="button">
                <i className="is-hot" />
                Hot 7
              </button>
            </div>
          </div>

          <div className="crm-pipeline-operator-controls">
            <label className="crm-pipeline-search">
              <IconSearch size={14} stroke={1.8} />
              <span>Search opportunities...</span>
            </label>
            <button type="button">
              <IconSettings2 size={13} stroke={1.8} />
              Manage Fields
            </button>
          </div>
        </div>
      </section>

      <section
        className="crm-opportunity-board"
        aria-label="Sales pipeline board"
      >
        {stages.map((stage) => (
          <OpportunityColumn
            key={stage.id}
            onLeadSelect={onLeadSelect}
            selectedLeadId={selectedLeadId}
            stage={stage}
          />
        ))}
      </section>
    </div>
  );
}

function OpportunityColumn({
  onLeadSelect,
  selectedLeadId,
  stage,
}: {
  onLeadSelect: (leadId: string) => void;
  selectedLeadId?: string;
  stage: OpportunityStage;
}) {
  return (
    <article className="crm-opportunity-column">
      <header>
        <div className="crm-opportunity-stage-title">
          <span style={{ backgroundColor: stage.color }} />
          <strong>{stage.label}</strong>
        </div>
        <b>{stage.count}</b>
        <small>{stage.summary}</small>
      </header>

      <div className="crm-opportunity-cards">
        {stage.cards.map((card) => (
          <OpportunityCard
            card={card}
            key={card.id}
            onLeadSelect={onLeadSelect}
            selected={selectedLeadId === card.leadId}
          />
        ))}
      </div>
    </article>
  );
}

function OpportunityCard({
  card,
  onLeadSelect,
  selected,
}: {
  card: OpportunityCard;
  onLeadSelect: (leadId: string) => void;
  selected: boolean;
}) {
  return (
    <button
      className={
        selected ? "crm-opportunity-card is-selected" : "crm-opportunity-card"
      }
      onClick={() => onLeadSelect(card.leadId)}
      type="button"
    >
      <span className="crm-opportunity-card-top">
        <strong>{card.name}</strong>
        <b>{card.value}</b>
      </span>
      <span className="crm-opportunity-card-meta">{card.meta}</span>
      <span className="crm-opportunity-card-foot">
        <em data-status={card.status.toLowerCase().replaceAll(" ", "-")}>
          {card.status}
        </em>
        <small>{card.age}</small>
      </span>
      <span className="crm-opportunity-card-actions">
        <IconPhone size={14} stroke={1.8} />
        <IconMessageCircle size={14} stroke={1.8} />
        <IconCalendarPlus size={14} stroke={1.8} />
        <i data-accent={card.accent}>{card.owner}</i>
      </span>
    </button>
  );
}
