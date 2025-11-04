const ISRAELI_CITIES_BY_REGION: Record<string, string[]> = {
  All: [
    'All Cities'
  ],
  // Northern Israel - Galilee Region
  North: [
    'Haifa',
    'Nahariya',
    'Acre (Akko)',
    'Safed (Tzfat)',
    'Tiberias',
    'Carmiel',
    "Ma'alot-Tarshiha",
    'Kiryat Shmona',
    'Migdal HaEmek',
    'Afula',
    "Beit She'an",
    'Yokneam',
    'Nesher',
    'Qiryat Bialik',
    'Kiryat Ata',
    'Kiryat Motzkin',
    'Kiryat Yam',
    'Tirat Carmel',
    'Kiryat Tivon',
    'Or Akiva',
    "Zikhron Ya'akov",
    "Binyamina-Giv'at Ada",
    'Pardes Hanna-Karkur',
    'Caesarea',
    'Rosh Pina',
    'Metula',
    'Katzrin',

    // Golan Heights

    'Merom Golan',
    'Neve Ativ',
    'Nimrod',
    'El Rom',
    'Keshet',
    'Odem',
    'Alonei HaBashan',
    'Ramat Trump',
  ],

  // Central Israel - Tel Aviv Metro & Sharon
  Center: [
    'Tel Aviv',
    'Petah Tikva',
    'Rishon LeZion',
    'Netanya',
    'Holon',
    'Ramat Gan',
    'Bnei Brak',
    'Bat Yam',
    'Kfar Saba',
    'Herzliya',
    'Hadera',
    "Ra'anana",
    'Ramat HaSharon',
    'Givatayim',
    'Rehovot',
    'Ashdod',
    'Rosh HaAyin',
    'Or Yehuda',
    'Yehud-Monosson',
    'Kiryat Ono',
    'Azor',
    'Bet Dagan',
    'Savyon',
    'Even Yehuda',
    'Kadima-Zoran',
    'Mishmar HaSharon',
    'Kfar Yona',
    'Ness Ziona',
    'Gedera',
    'Yavne',
    'Gan Yavne',
    'Kiryat Ekron',
    'Kiryat Malakhi',
    'Lod',
    'Ramla',
    "Modi'in-Maccabim-Re'ut",
    'Shoham',
    'Mazkeret Batya',
  ],

  // Jerusalem District & Surroundings
  Jerusalem_District: [
    'Jerusalem',
    'Beit Shemesh',
    'Mevasseret Zion',
    'Abu Ghosh',
    'Zur Hadassah',
    "Kiryat Ye'arim",
    'Tzur Hadassah',
    'Neve Ilan',
    "Ma'ale HaHamisha",
  ],

  // West Bank - Judea & Samaria
  West_Bank: [
    "Ma'ale Adumim",
    'Ariel',
    'Modiin Illit',
    'Beitar Illit',
    'Efrat',
    'Gush Etzion',
    "Giv'at Ze'ev",
    'Har Adar',
    'Alfei Menashe',
    'Oranit',
    "Sha'arei Tikva",
    'Elkana',
    'Kedumim',
    'Karnei Shomron',
    'Emmanuel',
    'Yakir',
    'Nofim',
    'Revava',
    'Ginot Shomron',
    'Har Bracha',
    'Yitzhar',
    'Elon Moreh',
    'Itamar',
    'Beit El',
    'Ofra',
    'Psagot',
    'Neve Tzuf',
    'Halamish',
    'Nili',
    "Na'ale",
    'Hashmonaim',
    'Kiryat Sefer',
    'Mattityahu',
    'Lapid',
    'Barkan',
    'Kokhav HaShahar',
    'Rimonim',
    'Shilo',
    "Ma'ale Levona",
    'Eli',
    'Shvut Rachel',
    'Dolev',
    'Talmon',
    'Bet Horon',
    'Givon HaHadasha',
  ],

  // Southern Israel - Negev
  South: [
    'Beer Sheva',
    'Eilat',
    'Ashkelon',
    'Sderot',
    'Netivot',
    'Kiryat Gat',
    'Dimona',
    'Arad',
    'Ofakim',
    'Yerucham',
    'Mitzpe Ramon',
    'Metar',
    'Omer',
    'Lehavim',
    'Rahat',
    'Tel Sheva',
    'Hura',
    'Lakiya',
    'Shaqib al-Salam',
    'Kuseife',
  ],
};

// Helper function to get all cities as a flat array
const getAllCities = () => {
  return Object.values(ISRAELI_CITIES_BY_REGION).flat();
};

const CITIES = getAllCities();

// Helper function to get cities by specific region
const getCitiesByRegion = (region: string) => {
  return ISRAELI_CITIES_BY_REGION[region] || [];
};

// Helper function to get all region names
const getRegions = () => {
  return Object.keys(ISRAELI_CITIES_BY_REGION);
};

const REGIONS = getRegions();

export { ISRAELI_CITIES_BY_REGION, getAllCities, CITIES, getCitiesByRegion, getRegions, REGIONS };
