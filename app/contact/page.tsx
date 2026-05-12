import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import ContactForm from "./ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Kiswa Silk trade desk. Mill at Aroop Morr, Sialkot Road, Gujranwala, Pakistan. Email, phone, WhatsApp.",
};

export default function ContactPage() {
  const phoneClean = SITE.phone.replace(/\s/g, "");

  return (
    <>
      <PageHead
        eyebrow="Speak With the Mill"
        title={
          <>
            Reach our <em className="italic-accent text-gold-soft font-light">trade desk.</em>
          </>
        }
        lede="We reply within one working day. For urgent quotation work, WhatsApp is the fastest channel — our team is on the floor and answers there throughout the working week."
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="section-y">
        <div className="container-x grid grid-cols-1 items-start gap-12 lg:grid-cols-[5fr_7fr]">
          <Reveal>
            <p className="eyebrow mb-5">Direct Channels</p>
            <h3 className="mb-2">Pick the one that suits.</h3>

            <ContactCard title="WhatsApp · Trade Desk" link={`https://wa.me/${SITE.phoneIntl}`} linkLabel={SITE.phone}>
              Mon–Sat, 9am – 7pm Pakistan Standard Time. Fastest channel for
              active RFQ work.
            </ContactCard>
            <ContactCard title="Email" link={`mailto:${SITE.email}`} linkLabel={SITE.email}>
              For full RFQs, audit packs and formal correspondence.
            </ContactCard>
            <ContactCard title="Phone (Office)" link={`tel:${phoneClean}`} linkLabel={SITE.phone}>
              Mon–Sat, 10am – 6pm PKT. Receptionist will route to the relevant
              desk.
            </ContactCard>
            <ContactCard title="Mill Address">
              <span className="text-charcoal block">
                Kiswa Silk Textile Mills
                <br />
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </span>
              Visits by appointment for verified buyers.
            </ContactCard>
            <ContactCard title="Trade Desk Hours">
              Mon–Fri: 9am – 7pm PKT
              <br />
              Sat: 10am – 4pm PKT
              <br />
              Sun: closed
            </ContactCard>
          </Reveal>

          <ContactForm />
        </div>
      </section>

      {/* Map */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-5">Find Us</p>
            <h2 className="mb-6">
              The mill, on the <span className="italic-accent">old textile road</span>.
            </h2>
            <iframe
              className="bg-cream aspect-[16/9] w-full border-0 grayscale-[0.4] contrast-95"
              src="https://www.google.com/maps?q=Aroop+Morr+Gujranwala+Pakistan&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kiswa Silk Textile Mills location"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  title,
  link,
  linkLabel,
  children,
}: {
  title: string;
  link?: string;
  linkLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line mb-6 border-t pt-6">
      <h4 className="mb-2">{title}</h4>
      {link && linkLabel && (
        <p className="mb-2">
          <a href={link} className="text-gold-deep hover:text-charcoal transition">
            {linkLabel}
          </a>
        </p>
      )}
      <p className="text-muted m-0 text-[0.92rem]">{children}</p>
    </div>
  );
}
