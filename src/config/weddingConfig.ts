import heroCouple from "@/assets/hero-couple.jpg";
import brideAsset from "@/assets/bride-dio.jpg.asset.json";
import groomAsset from "@/assets/groom-amany.jpg.asset.json";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import closingCouple from "@/assets/closing-couple.jpg";

export const weddingConfig = {
  couple: {
    groom: {
      name: "Aditya Pratama",
      nickname: "Amany",
      order: "Putra dari",
      parents: ["Bapak Budi", "Ibu Ani"],
      instagram: "aditya",
      photo: groomAsset.url,
    },
    bride: {
      name: "Sarah Putri",
      nickname: "Dio",
      order: "Putri dari",
      parents: ["Bapak Ahmad", "Ibu Siti"],
      instagram: "sarah",
      photo: brideAsset.url,
    },
  },

  weddingDate: "2026-12-20T09:00:00+07:00",
  dateLabel: "04 . 10 . 2026",
  dateLong: "20 December 2026",

  photos: {
    hero: heroCouple,
    closing: closingCouple,
  },

  quote: {
    title: "Ayem Tentrem",
    text: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.",
    source: "QS. Ar-Rum : 21",
  },

  events: [
    {
      id: "akad",
      name: "Akad Nikah",
      subtitle: "Ijab Kabul",
      date: "Minggu, 20 Desember 2026",
      time: "09.00 WIB",
      place: "Pendopo Agung, Gedung Example",
      address: "Jl. Melati Raya No. 12, Jakarta Selatan",
    },
    {
      id: "resepsi",
      name: "Resepsi",
      subtitle: "Tasyakuran & Pahargyan",
      date: "Minggu, 20 Desember 2026",
      time: "11.00 – 15.00 WIB",
      place: "Pendopo Agung, Gedung Example",
      address: "Jl. Melati Raya No. 12, Jakarta Selatan",
    },
  ],

  venue: {
    name: "Gedung Example",
    address: "Jl. Melati Raya No. 12, Jakarta Selatan, DKI Jakarta",
    googleMapsUrl: "https://maps.google.com/?q=Jakarta+Selatan",
    googleMapsEmbed:
      "https://www.google.com/maps?q=Jakarta%20Selatan&output=embed",
  },

  gallery: [
    { src: gallery3, alt: "Pengantin berjalan di antara kembang melati", span: "tall" },
    { src: gallery1, alt: "Tangan pengantin dengan bunga melati", span: "wide" },
    { src: gallery2, alt: "Pendopo Joglo saat matahari senja", span: "wide" },
    { src: gallery4, alt: "Kembang setaman di atas daun pisang", span: "tall" },
    { src: gallery5, alt: "Pasangan mengenakan batik di halaman", span: "wide" },
    { src: heroCouple, alt: "Pengantin dalam busana adat Jawa", span: "tall" },
  ] as { src: string; alt: string; span: "tall" | "wide" }[],

  loveStory: [
    {
      year: "2019",
      title: "Pertama Bertemu",
      text: "Sebuah pertemuan sederhana di sebuah pameran batik di Yogyakarta. Tidak ada yang menduga percakapan singkat itu menjadi awal segalanya.",
      photo: gallery5,
    },
    {
      year: "2021",
      title: "Memulai Cerita",
      text: "Kami memutuskan untuk berjalan bersama, saling menguatkan dalam suka maupun duka, dengan restu keluarga di setiap langkah.",
      photo: gallery1,
    },
    {
      year: "2025",
      title: "Lamaran",
      text: "Di hadapan kedua keluarga, niat baik itu diucapkan. Kembang setaman, doa, dan haru menjadi saksi janji kami.",
      photo: gallery4,
    },
    {
      year: "2026",
      title: "Menuju Pernikahan",
      text: "Dengan memohon ridho Allah, kami melangkah ke babak baru. Sugeng rawuh, dan mohon doa restunya.",
      photo: gallery3,
    },
  ],

  gift: {
    title: "Atur Pangestu",
    note: "Doa restu Anda adalah hadiah terindah bagi kami. Namun apabila memberi adalah tanda kasih, kami menerimanya dengan penuh terima kasih.",
    bankAccounts: [
      { bank: "BCA", number: "1234567890", holder: "Aditya Pratama" },
      { bank: "Mandiri", number: "0987654321", holder: "Sarah Putri" },
    ],
    giftAddress:
      "Jl. Kenanga No. 8, Kebayoran, Jakarta Selatan (a/n Aditya Pratama)",
  },

  prayer: {
    title: "Sawarga",
    arabic: "بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    transliteration:
      "Barakallahu laka wabaraka 'alaika wa jama'a bainakumaa fii khoir.",
    meaning:
      "Semoga Allah memberkahimu dan memberkahi atasmu, serta mempersatukan kalian dalam kebaikan.",
  },

  closing: {
    title: "Matur Nuwun",
    text: "Terima kasih atas doa dan restu yang diberikan untuk kami.",
    javanese: "Sampun rawuh ing dinten kabagyanipun kami.",
    indonesian:
      "Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara berkenan hadir.",
  },

  defaultGuest: "Tamu Undangan",
} as const;

export type WeddingConfig = typeof weddingConfig;
