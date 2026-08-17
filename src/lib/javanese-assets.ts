/**
 * Manifest of the project's Javanese image asset library (public/assets/javanese).
 * These files are the single source of truth for all decorative artwork.
 */
const base = "/assets/javanese";

export const javaneseAssets = {
  batik: {
    kawung: `${base}/batik/kawung.webp`,
    parang: `${base}/batik/parang.webp`,
    truntum: `${base}/batik/truntum.webp`,
    sidomukti: `${base}/batik/sidomukti.webp`,
  },
  /** Gold-on-transparent cutouts of the same motifs, for dark surfaces. */
  batikGold: {
    kawung: `${base}/batik/kawung-gold.webp`,
    parang: `${base}/batik/parang-gold.webp`,
    truntum: `${base}/batik/truntum-gold.webp`,
    sidomukti: `${base}/batik/sidomukti-gold.webp`,
  },
  hero: {
    gunungan: `${base}/hero/gunungan.webp`,
    joglo: `${base}/hero/joglo.webp`,
    wayangGroom: `${base}/hero/wayang-groom.webp`,
    wayangBride: `${base}/hero/wayang-bride.webp`,
  },
  couple: {
    wayangCouple: `${base}/couple/wayang-couple.webp`,
  },
  gebyok: {
    left: `${base}/gebyok/gebyok-left.webp`,
    right: `${base}/gebyok/gebyok-right.webp`,
  },
  floral: {
    melatiSpray: `${base}/floral/melati.webp`,
    garland: `${base}/floral/jasmine-garland.webp`,
    swag: `${base}/floral/jasmine-swag.webp`,
    strand: `${base}/floral/jasmine-strand.webp`,
    loop: `${base}/floral/jasmine-loop.webp`,
    ring: `${base}/floral/jasmine-ring.webp`,
    cornerTop: `${base}/floral/jasmine-corner.webp`,
    cornerBottom: `${base}/floral/jasmine-corner-2.webp`,
    single: `${base}/floral/melati-single.webp`,
    bud: `${base}/floral/melati-bud.webp`,
    petal: `${base}/floral/melati-petal.webp`,
  },
  effects: {
    goldParticle: `${base}/effects/gold-particle.webp`,
  },
  frames: {
    arch: `${base}/frames/frame-arch.webp`,
    round: `${base}/frames/frame-round.webp`,
    pendopo: `${base}/frames/frame-pendopo.webp`,
    plaque: `${base}/frames/frame-plaque.webp`,
    cartouche: `${base}/frames/frame-cartouche.webp`,
    oval: `${base}/frames/frame-oval.webp`,
  },
  dividers: {
    crestFloral: `${base}/dividers/divider-1.webp`,
    slim: `${base}/dividers/divider-2.webp`,
    scroll: `${base}/dividers/divider-3.webp`,
    beaded: `${base}/dividers/divider-4.webp`,
    melati: `${base}/dividers/divider-5.webp`,
    cornerLeft: `${base}/dividers/corner-left.webp`,
    cornerRight: `${base}/dividers/corner-right.webp`,
  },
  ornaments: {
    crest: `${base}/ornaments/parts/crest.webp`,
    corner: `${base}/ornaments/parts/corner-tl.webp`,
    medallion: `${base}/ornaments/parts/medallion.webp`,
    cloud: `${base}/ornaments/parts/cloud.webp`,
    flourish: `${base}/ornaments/parts/flourish.webp`,
    tassels: `${base}/ornaments/parts/tassels.webp`,
    floralSpray: `${base}/ornaments/parts/floral-spray.webp`,
    star: `${base}/ornaments/parts/star.webp`,
  },
} as const;

/** Interior windows (percent) of the open frame artwork, for photo insets. */
export const frameInsets = {
  arch: { left: 21.5, top: 21.3, right: 21.8, bottom: 3.1 },
  round: { left: 16.4, top: 16.6, right: 19.5, bottom: 22.7 },
  pendopo: { left: 23.8, top: 32, right: 23.8, bottom: 13.7 },
} as const;
