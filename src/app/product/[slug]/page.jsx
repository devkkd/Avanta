// Server Component — handles OG meta tags for WhatsApp/social link previews
import ProductDetailsClient from "./ProductDetailsClient";

// Fetch product via internal API (avoids leaking mongoose into browser bundle)
async function getProduct(slug) {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${siteUrl}/api/products/slug/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

// generateMetadata — runs server-side, WhatsApp/Facebook/Twitter reads these OG tags
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://avantafashion.in";

  if (!product) {
    return {
      title: "Product Not Found | Avanta Fashion",
    };
  }

  const productName = product.name;
  const description =
    product.description ||
    `${productName} — Premium wholesale fashion by Avanta. SKU: ${product.sku || "N/A"}`;
  const imageUrl = product.images?.main || `${siteUrl}/images/Avanta-Logo.svg`;
  const productUrl = `${siteUrl}/product/${slug}`;

  return {
    title: `${productName} | Avanta Fashion`,
    description,
    openGraph: {
      title: productName,
      description,
      url: productUrl,
      siteName: "Avanta Fashion",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1000,
          alt: productName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: productName,
      description,
      images: [imageUrl],
    },
  };
}

// Page renders the client component as usual
export default function ProductPage() {
  return <ProductDetailsClient />;
}
