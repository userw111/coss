import { Badge } from "@coss/ui/components/badge";
import { Button } from "@coss/ui/components/button";
import { Separator } from "@coss/ui/components/separator";
import { cn } from "@coss/ui/lib/utils";
import {
  IconCalendarTime,
  IconChevronRight,
  IconClock,
  IconListDetails,
  IconMessageCircle,
  IconPhone,
  IconSparkles,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import type { CrmLead } from "../data/crm-prototype-data";

type LeadDetailSidePanelProps = {
  closing?: boolean;
  lead: CrmLead | undefined;
  onClose: () => void;
  open: boolean;
};

export function LeadDetailSidePanel({
  closing = false,
  lead,
  onClose,
  open,
}: LeadDetailSidePanelProps) {
  const leadInitial = lead?.contactName.trim().charAt(0).toUpperCase();

  return (
    <aside
      aria-hidden={!open}
      aria-label={lead ? `${lead.contactName} details` : "Lead details"}
      className={cn(
        "twenty-side-panel-wrapper crm-lead-side-panel-wrapper",
        open && "is-open",
        closing && "is-closing",
      )}
    >
      <div className="twenty-side-panel crm-lead-side-panel" data-side-panel="">
        <div className="twenty-side-panel-topbar">
          <div className="twenty-side-panel-topbar-content">
            <button
              aria-label="Close lead details"
              className="twenty-light-icon-button twenty-side-panel-close"
              onClick={onClose}
              type="button"
            >
              <IconX size={16} stroke={1.8} />
            </button>
            {lead ? (
              <Badge
                className="crm-detail-top-score"
                variant={lead.leadScore === "Hot" ? "warning" : "secondary"}
              >
                {lead.leadScore}
              </Badge>
            ) : null}
          </div>
        </div>

        {lead ? (
          <div className="crm-detail-scroll">
            <section className="crm-detail-hero">
              <div className="crm-detail-avatar" aria-hidden="true">
                {leadInitial}
              </div>
              <div className="crm-detail-identity">
                <h2>{lead.contactName}</h2>
                <p>Added {lead.age} ago</p>
                <div className="crm-detail-meta">
                  <IconUser size={15} stroke={1.8} />
                  <strong>Owner: {lead.assignee}</strong>
                </div>
              </div>
            </section>

            <div className="crm-detail-tabs" aria-label="Lead detail views">
              <button aria-current="page" aria-label="Overview" type="button">
                <IconListDetails size={21} stroke={1.8} />
              </button>
              <button aria-label="Messages" type="button">
                <IconMessageCircle size={21} stroke={1.8} />
              </button>
              <button aria-label="Calendar" type="button">
                <IconCalendarTime size={21} stroke={1.8} />
              </button>
              <button aria-label="Activity" type="button">
                <IconClock size={21} stroke={1.8} />
              </button>
            </div>

            <div className="crm-detail-content">
              <p className="crm-detail-summary">{lead.statusNote}</p>

              <div className="crm-detail-actions">
                <Button size="sm">
                  <IconPhone aria-hidden="true" />
                  Call
                </Button>
                <Button size="sm" variant="outline">
                  <IconMessageCircle aria-hidden="true" />
                  Text
                </Button>
                <Button size="sm" variant="ghost">
                  <IconCalendarTime aria-hidden="true" />
                  Follow up
                </Button>
              </div>

              <section className="crm-detail-section">
                <h3>Next action</h3>
                <div className="crm-next-action-card">
                  <IconSparkles size={16} stroke={1.8} />
                  <div>
                    <strong>{lead.nextAction}</strong>
                    <span>{lead.quoteMode}</span>
                  </div>
                  <IconChevronRight size={16} stroke={1.8} />
                </div>
              </section>

              <section className="crm-detail-section">
                <h3>Contact</h3>
                <dl className="crm-detail-list">
                  <div>
                    <dt>Phone</dt>
                    <dd>{lead.phone}</dd>
                  </div>
                  <div>
                    <dt>Email</dt>
                    <dd>{lead.email}</dd>
                  </div>
                  <div>
                    <dt>Address</dt>
                    <dd>{lead.address}</dd>
                  </div>
                </dl>
              </section>

              <Separator />

              <section className="crm-detail-section">
                <h3>Source</h3>
                <dl className="crm-detail-list">
                  <div>
                    <dt>Origin</dt>
                    <dd>{lead.source}</dd>
                  </div>
                  <div>
                    <dt>Campaign</dt>
                    <dd>{lead.campaign}</dd>
                  </div>
                  <div>
                    <dt>Value</dt>
                    <dd>{lead.value}</dd>
                  </div>
                </dl>
              </section>

              <section className="crm-detail-section">
                <h3>Activity</h3>
                <div className="crm-activity-list">
                  {lead.activity.map((activity) => (
                    <article className="crm-activity-item" key={activity.id}>
                      <span className="crm-activity-dot" />
                      <div>
                        <strong>{activity.time}</strong>
                        <p>{activity.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
