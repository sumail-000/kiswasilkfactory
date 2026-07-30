import { getFeaturedProducts, getGallery, getSite } from "@/lib/content";
import HomeClient, { type HomeFabric, type HomeGalleryItem } from "./HomeClient";

/**
 * Home page data boundary.
 *
 * The presentation lives in `HomeClient` (unchanged, still a client component
 * for its lightbox state). This wrapper exists purely to load editable content
 * on the server and hand it down.
 */
export default async function HomePage() {
  const [products, gallery, site] = await Promise.all([
    getFeaturedProducts(),
    getGallery(),
    getSite(),
  ]);

  const fabrics: HomeFabric[] = products.map((p) => ({
    img: p.heroImage,
    name: p.name,
    desc: p.cardDesc,
    slug: p.slug,
    width: p.width,
  }));

  const galleryPreview: HomeGalleryItem[] = gallery
    .slice(0, 6)
    .map((g) => ({ img: g.src, label: g.label }));

  return <HomeClient fabrics={fabrics} gallery={galleryPreview} site={site} />;
}
