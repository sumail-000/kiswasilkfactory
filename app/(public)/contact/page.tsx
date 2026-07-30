import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import ContactForm from "./ContactForm";
import { getSite } from "@/lib/content";
import { MessageCircle, Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Kiswa Silk trade desk. Mill at Aroop Morr, Sialkot Road, Gujranwala, Pakistan. Email, phone, WhatsApp.",
};

export default async function ContactPage() {
  const site = await getSite();
  const phoneClean = site.phone.replace(/\s/g, "");

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
          <Reveal className="space-y-6">
            <div>
              <p className="eyebrow mb-3">Direct Channels</p>
              <h3 className="font-display font-bold text-navy text-[1.8rem] mb-2 leading-tight">Pick the one that suits.</h3>
            </div>

            <div className="space-y-2">
              <ContactCard title="WhatsApp · Trade Desk" link={`https://wa.me/${site.phoneIntl}`} linkLabel={site.phone} icon={MessageCircle}>
                Mon–Sat, 9am – 7pm Pakistan Standard Time. Fastest channel for
                active RFQ work.
              </ContactCard>
              <ContactCard title="Email" link={`mailto:${site.email}`} linkLabel={site.email} icon={Mail}>
                For full RFQs, audit packs and formal correspondence.
              </ContactCard>
              <ContactCard title="Phone (Office)" link={`tel:${phoneClean}`} linkLabel={site.phone} icon={Phone}>
                Mon–Sat, 10am – 6pm PKT. Receptionist will route to the relevant
                desk.
              </ContactCard>
              <ContactCard title="Mill Address" icon={MapPin}>
                <span className="text-navy font-semibold block mb-1">
                  Kiswa Silk Textile Mills
                </span>
                <span className="text-muted block mb-2 leading-snug">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
                Visits by appointment for verified buyers.
              </ContactCard>
              <ContactCard title="Trade Desk Hours" icon={Clock}>
                <span className="text-muted block leading-relaxed">
                  Mon–Fri: 9am – 7pm PKT
                  <br />
                  Sat: 10am – 4pm PKT
                  <br />
                  Sun: closed
                </span>
              </ContactCard>
            </div>
          </Reveal>

          <ContactForm />
        </div>
      </section>

      {/* Map */}
      <section className="pb-24">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-3">Find Us</p>
            <h2 className="font-display font-bold text-navy text-[1.8rem] mb-6">
              The mill, on the <span className="italic-accent text-gold font-light">old textile road</span>.
            </h2>
            <div className="border border-gold/25 rounded-md p-1.5 bg-cream shadow-md overflow-hidden">
              <iframe
                className="bg-cream aspect-[16/9] w-full border-0 grayscale-[0.3] contrast-95 rounded-sm"
                src="https://www.google.com/maps?q=Aroop+Morr+Gujranwala+Pakistan&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kiswa Silk Textile Mills location"
              />
            </div>
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
  icon: Icon,
  children,
}: {
  title: string;
  link?: string;
  linkLabel?: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="border-line border-t pt-6 pb-2 group">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-cream border border-gold/20 flex items-center justify-center text-gold shrink-0 group-hover:bg-gold/10 group-hover:border-gold/30 transition-colors duration-300">
          <Icon className="w-4.5 h-4.5" strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <h4 className="font-display font-semibold text-navy text-[1.1rem] mb-1 leading-snug">{title}</h4>
          {link && linkLabel && (
            <p className="mb-2">
              <a href={link} className="text-gold-deep hover:text-navy transition-colors font-medium text-[0.88rem] inline-flex items-center gap-1">
                {linkLabel}
              </a>
            </p>
          )}
          <div className="text-muted m-0 text-[0.85rem] leading-relaxed font-sans">{children}</div>
        </div>
      </div>
    </div>
  );
}
