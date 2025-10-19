const dummyCards = [
  {
    title: "Cohen's Bakery",
    subtitle: "Fresh Bread Daily",
    description:
      "Traditional family bakery serving the finest breads, pastries, and cakes. Using authentic recipes passed down through generations. Open daily from 6 AM.",
    phone: "050-1234567",
    email: "info@cohensbakery.com",
    web: "https://www.cohensbakery.co.il",
    image: {
      url: "https://plus.unsplash.com/premium_photo-1661772661721-b16346fe5b0f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D",
      alt: "Fresh baked goods display",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Tel-Aviv",
      street: "Dizengoff",
      houseNumber: 125,
      zip: 6546321,
    },
    likes: [],
    user_id: "68b0a60f2e7c039244a8787f",
  },
  {
    title: "Sarah's Art Studio",
    subtitle: "Creative Workshops & Classes",
    description:
      "Join our art classes for all skill levels. We offer painting, drawing, sculpture, and mixed media workshops in a welcoming environment. Materials provided.",
    phone: "050-1234567",
    email: "sarah@sarahartstudio.com",
    web: "https://www.sarahartstudio.com",
    image: {
      url: "https://images.unsplash.com/photo-1556740772-1a741367b93e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D",
      alt: "Art studio with paintings and brushes",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Tel-Aviv",
      street: "Rothschild",
      houseNumber: 85,
      zip: 6578432,
    },
    likes: [],
    user_id: "68b0a60f2e7c039244a8787f",
  },

  {
    title: "Levi Tech Solutions",
    subtitle: "IT Support & Web Development",
    description:
      "Professional IT services including computer repair, network setup, website development, and digital marketing. Serving businesses and individuals with reliable technology solutions.",
    phone: "052-9876543",
    email: "contact@levitechsolutions.com",
    web: "https://www.levitechsolutions.co.il",
    image: {
      url: "https://images.unsplash.com/39/lIZrwvbeRuuzqOoWJUEn_Photoaday_CSD%20%281%20of%201%29-5.jpg?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D",
      alt: "Modern office with computers and technology",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Jerusalem",
      street: "King George",
      houseNumber: 42,
      zip: 9426805,
    },
    likes: [],
    user_id: "68b0a60f2e7c039244a87888",
  },
  {
    title: "Jerusalem Tours with David",
    subtitle: "Historical & Cultural Tours",
    description:
      "Experience Jerusalem's rich history and culture with expert guided tours. Customizable routes covering ancient sites, religious landmarks, and hidden gems. Available in multiple languages.",
    phone: "052-9876543",
    email: "tours@jerusalemwithdavid.com",
    web: "https://www.jerusalemwithdavid.com",
    image: {
      url: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D",
      alt: "Jerusalem Old City walls and architecture",
    },
    address: {
      state: "",
      country: "Israel",
      city: "Jerusalem",
      street: "Jaffa Gate",
      houseNumber: 1,
      zip: 9711502,
    },
    likes: [],
    user_id: "68b0a60f2e7c039244a87888",
  },
  {
  title: "מאפיית רפי ואורנה",
  subtitle: "אופים בקנה מידה עכשיו",
  description:
    "מאפיית משפחתית המתמחה בלחמים, מאפים ועוגות מסורתיות. משתמשים במתכונים ישנים ובמרכיבים הטובים ביותר. פתוחים מ-6 בבוקר.",
  phone: "03-5467823",
  email: "info@rafi-orna-bakery.co.il",
  web: "https://www.rafi-orna-bakery.co.il",
  image: {
    url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=60",
    alt: "תצוגת מאפים טריים",
  },
  address: {
    state: "",
    country: "Israel",
    city: "רמת גן",
    street: "ביאליק",
    houseNumber: 47,
    zip: 5265432,
  },
  likes: [],
  user_id: "68b0a60f2e7c039244a8787f",
},
{
  title: "גלריית אמנות הזוהר",
  subtitle: "אמנות ישראלית עכשווית",
  description:
    "גלריה המציגה יצירות של אמנים ישראליים בולטים. מציעים גם שירותי הדרכה אמנותית וקניית יצירות מקוריות. נפתחים כל יום למעט שבת.",
  phone: "02-6238745",
  email: "contact@zohar-gallery.co.il",
  web: "https://www.zohar-gallery.co.il",
  image: {
    url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&auto=format&fit=crop&q=60",
    alt: "גלריית אמנות עם ציורים",
  },
  address: {
    state: "",
    country: "Israel",
    city: "ירושלים",
    street: "שלומציון המלכה",
    houseNumber: 12,
    zip: 9426312,
  },
  likes: [],
  user_id: "68b0a60f2e7c039244a8787f",
},
];

module.exports = dummyCards;
