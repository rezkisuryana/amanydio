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
      name: "Dio Erlangga",
      nickname: "Amany",
      order: "Putra Ketiga dari",
      parents: ["(Alm) Bapak Heri Priyo Triyatno", "Ibu Maisaroh"],
      instagram: "22ERLAN",
      photo: groomAsset.url,
    },
    bride: {
      name: "Amany Fajryani",
      nickname: "Dio",
      order: "Putri Ketiga dari",
      parents: ["Bapak Dadang Suryana", "Ibu Juwarti"],
      instagram: "RIANYY30",
      photo: brideAsset.url,
    },
  },

  weddingDate: "2026-10-04T09:00:00+07:00",
  dateLabel: "04 . 10 . 2026",
  dateLong: "04 OKTOBER 2026",

  photos: {
    hero: heroCouple,
    closing: closingCouple,
  },

  quote: {
    title: "Tenteram",
    text: "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.",
    source: "QS. Ar-Rum : 21",
  },

  events: [
    {
      id: "akad",
      name: "Akad Nikah",
      subtitle: "Ijab Kabul",
      date: "Sabtu, 04 Oktober 2026",
      time: "09.00 WIB",
      place: "Aula Rektorat Universitas Pamulang",
      address: "Jl. Surya Kencana No.1 Kel. Pamulang Barat Kota Tangerang Selatan",
    },
    {
      id: "resepsi",
      name: "Resepsi",
      subtitle: "Tasyakuran & Pahargyan",
      date: "Sabtu, 04 Oktober 2026",
      time: "11.00 – 13.00 WIB",
      place: "Aula Rektorat Universitas Pamulang",
      address: "Jl. Surya Kencana No.1 Kel. Pamulang Barat Kota Tangerang Selatan",
    },
  ],

  venue: {
    name: "Lokasi & Maps",
    address: "Aula Rektorat Universitas Pamulang\n(Jl. Surya Kencana No.1 Kel. Pamulang Barat Kota Tangerang Selatan)",
    googleMapsUrl:
      "https://maps.google.com/?q=Aula+Rektorat+Universitas+Pamulang,+Jl.+Surya+Kencana+No.1,+Pamulang+Barat,+Tangerang+Selatan",
    googleMapsEmbed:
      "https://www.google.com/maps?q=Aula%20Rektorat%20Universitas%20Pamulang%2C%20Jl.%20Surya%20Kencana%20No.1%2C%20Pamulang%20Barat%2C%20Tangerang%20Selatan&output=embed",
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
      text: "Dengan memohon ridho Allah, kami melangkah ke babak baru. Kami mohon doa dan restu dari semua.",
      photo: gallery3,
    },
  ],

  gift: {
    title: "Tanda Kasih",
    note: "Doa restu Anda adalah hadiah terindah bagi kami. Namun apabila memberi adalah tanda kasih, kami menerimanya dengan penuh terima kasih.",
    bankAccounts: [
      { bank: "BCA", number: "6240951370", holder: "DIO ERLANGGA" },
      { bank: "Mandiri", number: "1640006562567", holder: "AMANY FAJRYANI" },
    ],
    giftAddress:
      "Jl. Ketapang 3 No.17 RT04 RW06 Pamulang Barat, Tangerang Selatan, Banten",
  },

  prayer: {
    title: "Doa Untuk Pengantin",
    arabic: "بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    transliteration:
      "Barakallahu laka wabaraka 'alaika wa jama'a bainakumaa fii khoir.",
    meaning:
      "Semoga Allah memberkahimu dan memberkahi atasmu, serta mempersatukan kalian dalam kebaikan.",
  },

  closing: {
    title: "Terima Kasih",
    text: "Terima kasih atas doa dan restu yang diberikan untuk kami.",
    javanese: "Kehadiran Anda melengkapi kebahagiaan kami.",
    indonesian:
      "Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara berkenan hadir.",
  },

  defaultGuest: "Tamu Undangan",
} as const;

export type WeddingConfig = typeof weddingConfig;
