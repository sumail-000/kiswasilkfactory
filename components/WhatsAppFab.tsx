import type { SiteInfo } from "@/lib/content";

export default function WhatsAppFab({ site }: { site: SiteInfo }) {
  const text = encodeURIComponent(
    `Hello ${site.brand}, I would like to inquire about your fabrics.`
  );
  return (
    <a
      href={`https://wa.me/${site.phoneIntl}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition hover:-translate-y-0.5"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
        <path d="M20.5 3.5A11 11 0 003.6 17.3L2 22l4.9-1.5A11 11 0 1020.5 3.5zM12 20a8.7 8.7 0 01-4.5-1.2l-.3-.2-2.9.9.9-2.8-.2-.3A8.7 8.7 0 1112 20zm5-6.4c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.9 1.1-.3.2-.6.1c-1.5-.7-2.5-1.5-3.5-3-.3-.4.3-.4.8-1.3.1-.2 0-.4 0-.5L9.6 8c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.4s-.9.9-.9 2.2.9 2.6 1 2.7c.1.2 1.7 2.6 4.2 3.7 1.6.7 2.2.7 3 .6.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </a>
  );
}
