import { Badge } from "@coss/ui/components/badge";
import { Button } from "@coss/ui/components/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@coss/ui/components/card";
import { Separator } from "@coss/ui/components/separator";
import {
  IconArrowRight,
  IconBell,
  IconCalendarTime,
  IconMessageCircle,
  IconPhone,
} from "@tabler/icons-react";
import {
  type CrmLead,
  crmHomeStats,
  crmLeads,
} from "../data/crm-prototype-data";

type CrmHomePageProps = {
  onLeadSelect: (leadId: string) => void;
};

export function CrmHomePage({ onLeadSelect }: CrmHomePageProps) {
  const urgentLeads = crmLeads.filter((lead) =>
    ["new", "follow-up", "quote-needed"].includes(lead.stage),
  );
  const recentReplies = crmLeads.filter((lead) =>
    lead.lastActivity.includes("Replied"),
  );

  return (
    <div className="crm-home">
      <section className="crm-home-hero">
        <div>
          <h1>Today’s CRM loop</h1>
          <p>
            New demand is landing from campaigns. Prioritize replies, call fresh
            leads, and keep quotes moving.
          </p>
        </div>
        <Button size="sm" variant="outline">
          View handling plan
          <IconArrowRight aria-hidden="true" />
        </Button>
      </section>

      <section className="crm-stat-grid">
        {crmHomeStats.map((stat) => (
          <Card className="crm-coss-card" key={stat.label}>
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle>{stat.value}</CardTitle>
            </CardHeader>
            <CardPanel>{stat.detail}</CardPanel>
          </Card>
        ))}
      </section>

      <section className="crm-home-grid">
        <Card className="crm-coss-card">
          <CardHeader>
            <CardTitle>Needs action</CardTitle>
            <CardDescription>Leads sorted by response urgency</CardDescription>
          </CardHeader>
          <CardPanel className="crm-list-panel">
            {urgentLeads.map((lead) => (
              <LeadActionRow
                key={lead.id}
                lead={lead}
                onSelect={onLeadSelect}
              />
            ))}
          </CardPanel>
        </Card>

        <Card className="crm-coss-card">
          <CardHeader>
            <CardTitle>Reply queue</CardTitle>
            <CardDescription>
              Inbound responses that need a human touch
            </CardDescription>
          </CardHeader>
          <CardPanel className="crm-list-panel">
            {recentReplies.map((lead) => (
              <button
                className="crm-reply-row"
                key={lead.id}
                onClick={() => onLeadSelect(lead.id)}
                type="button"
              >
                <span className="crm-row-icon">
                  <IconMessageCircle size={16} stroke={1.8} />
                </span>
                <span>
                  <strong>{lead.contactName}</strong>
                  <small>{lead.lastActivity}</small>
                </span>
                <Badge variant="warning">Reply</Badge>
              </button>
            ))}

            <Separator />

            <div className="crm-blocker-card">
              <IconBell size={16} stroke={1.8} />
              <div>
                <strong>SMS compliance pending</strong>
                <span>
                  New leads fall back to call tasks and owner notifications.
                </span>
              </div>
            </div>
          </CardPanel>
        </Card>
      </section>
    </div>
  );
}

function LeadActionRow({
  lead,
  onSelect,
}: {
  lead: CrmLead;
  onSelect: (leadId: string) => void;
}) {
  const Icon = lead.nextAction.toLowerCase().includes("call")
    ? IconPhone
    : IconCalendarTime;

  return (
    <button
      className="crm-lead-action-row"
      onClick={() => onSelect(lead.id)}
      type="button"
    >
      <span className="crm-row-icon">
        <Icon size={16} stroke={1.8} />
      </span>
      <span className="crm-row-main">
        <strong>{lead.contactName}</strong>
        <small>
          {lead.nextAction} · {lead.service}
        </small>
      </span>
      <span className="crm-row-meta">
        <Badge variant={lead.leadScore === "Hot" ? "warning" : "secondary"}>
          {lead.leadScore}
        </Badge>
        <small>{lead.age}</small>
      </span>
    </button>
  );
}
