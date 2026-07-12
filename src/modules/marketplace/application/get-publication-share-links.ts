import type { Publication } from "../domain/listing";

export const publicSiteUrl = "https://feri-app-kappa.vercel.app";

export type PublicationShareLinks = {
  absoluteUrl: string;
  whatsappUrl: string;
  facebookUrl: string;
  xUrl: string;
};

export function getPublicationAbsoluteUrl(publication: Publication): string {
  return new URL(publication.shareUrl, publicSiteUrl).toString();
}

export function getPublicationShareText(publication: Publication): string {
  return `${publication.title} en FeriApp - ${publication.priceLabel}`;
}

export function getPublicationShareLinks(
  publication: Publication,
): PublicationShareLinks {
  const absoluteUrl = getPublicationAbsoluteUrl(publication);
  const text = getPublicationShareText(publication);

  return {
    absoluteUrl,
    whatsappUrl: `https://wa.me/?text=${encodeURIComponent(`${text} ${absoluteUrl}`)}`,
    facebookUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      absoluteUrl,
    )}`,
    xUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(absoluteUrl)}`,
  };
}
