import { LanguageProfile, PlaceItem, CultureItem, FestivalItem } from '@/types/feed';

export const LANGUAGE_DATA: Record<string, LanguageProfile[]> = {
  mumbai: [{
    id: 'mum-l1', citySlug: 'mumbai', name: 'Marathi', nativeName: 'मराठी',
    script: 'Devanagari', isoCode: 'mr', family: 'Indo-Aryan', role: 'official',
    nativeSpeakers: '8.3 Crore', origin: 'Evolved from Sanskrit via Maharashtri Prakrit and Apabhramsha around the 12th century CE.',
    aiSummary: 'Marathi is one of India\'s oldest and richest literary languages — its tradition of Varkari devotional poetry (the Abhangas of Sant Dnyaneshwar and Tukaram) predates much of European vernacular literature. The language is known for its melodic quality and its rich tradition of tamasha folk theater, lavani songs, and the powerful tradition of the Shahir poets.',
    uniqueFeatures: ['One of India\'s 22 scheduled languages', 'Rich tradition of Bhakti poetry', 'Lavani lyric tradition unique to Maharashtra', '3 genders: masculine, feminine, neuter'],
    commonPhrases: [
      { english: 'Hello', local: 'नमस्कार', transliteration: 'Namaskar', pronunciation: 'na-mas-kaar' },
      { english: 'Thank you', local: 'धन्यवाद', transliteration: 'Dhanyavad', pronunciation: 'dhan-ya-vaad' },
      { english: 'How are you?', local: 'कसे आहात?', transliteration: 'Kase aahat?', pronunciation: 'ka-se aa-hat' },
      { english: 'What is your name?', local: 'तुमचे नाव काय आहे?', transliteration: 'Tumche naav kaay aahe?', pronunciation: 'tum-che naav kaay aa-he' },
      { english: 'Delicious!', local: 'अप्रतिम!', transliteration: 'Apratim!', pronunciation: 'ap-ra-tim' },
      { english: 'Where is the market?', local: 'बाजार कुठे आहे?', transliteration: 'Baajaar kuthe aahe?', pronunciation: 'baa-jaar ku-the aa-he' },
    ],
    dialects: ['Varhadi', 'Konkani Marathi', 'Nagpuri', 'Ahirani', 'Malavani'],
    relatedLanguages: ['Hindi', 'Gujarati', 'Konkani'],
    isClassicalLanguage: false, literaryHistory: 'Marathi literature begins with the Dnyaneshwari (1290 CE) by Sant Dnyaneshwar — a commentary on the Bhagavad Gita in Marathi verse that is considered the cornerstone of Marathi literary tradition.', emoji: '📜',
  }],
  delhi: [{
    id: 'del-l1', citySlug: 'delhi', name: 'Hindi', nativeName: 'हिन्दी',
    script: 'Devanagari', isoCode: 'hi', family: 'Indo-Aryan', role: 'official',
    nativeSpeakers: '60 Crore+', origin: 'Evolved from Sanskrit through Prakrit and Apabhramsha languages over several centuries.',
    aiSummary: 'Hindi is the official language of India and the first language of nearly 600 million people, yet Delhi speaks a particularly vibrant form — Khari Boli, the dialect that forms the basis of standard Hindi and Urdu. Delhi\'s linguistic landscape is a palimpsest of Persian court language, Punjabi migration, and contemporary youth slang, producing a uniquely expressive urban tongue.',
    uniqueFeatures: ['Official language of India', 'Written in Devanagari script', 'Shares vocabulary with Urdu (Hindustani base)', 'Rich tradition of Urdu poetry (shayari)'],
    commonPhrases: [
      { english: 'Hello', local: 'नमस्ते', transliteration: 'Namaste', pronunciation: 'na-mas-te' },
      { english: 'Thank you', local: 'धन्यवाद', transliteration: 'Dhanyavaad', pronunciation: 'dhan-ya-vaad' },
      { english: 'How are you?', local: 'आप कैसे हैं?', transliteration: 'Aap kaise hain?', pronunciation: 'aap kai-se hain' },
      { english: 'Delicious!', local: 'बहुत स्वादिष्ट!', transliteration: 'Bahut swaadiSHT!', pronunciation: 'ba-hut swaa-disht' },
      { english: 'Where is the metro?', local: 'मेट्रो कहाँ है?', transliteration: 'Metro kahaan hai?', pronunciation: 'me-tro ka-haan hai' },
      { english: 'How much does it cost?', local: 'कितने का है?', transliteration: 'Kitne ka hai?', pronunciation: 'kit-ne ka hai' },
    ],
    dialects: ['Khari Boli (Delhi standard)', 'Braj Bhasha', 'Awadhi', 'Bundeli', 'Bagheli'],
    relatedLanguages: ['Urdu', 'Punjabi', 'Rajasthani', 'Sanskrit'],
    isClassicalLanguage: false, literaryHistory: 'Modern Hindi literature flourished in Delhi from the 19th century — the Rekhta tradition of Urdu-Hindi poetry reached its zenith in Delhi\'s mushairas, and writers like Premchand and Harivansh Rai Bachchan shaped the modern Hindi novel and poetry from this city.', emoji: '🗣️',
  }],
  chennai: [{
    id: 'che-l1', citySlug: 'chennai', name: 'Tamil', nativeName: 'தமிழ்',
    script: 'Tamil Script', isoCode: 'ta', family: 'Dravidian', role: 'official',
    nativeSpeakers: '8 Crore', origin: 'One of the oldest surviving classical languages in the world, with origins dating back over 2,500 years.',
    aiSummary: 'Tamil is one of the world\'s great classical languages — the oldest surviving member of the Dravidian language family, with a literary tradition of over 2,500 years that includes the Sangam poetry anthologies considered the finest expression of ancient South Asian civilization. Tamil is the only language in the world that is both a classical language and a thriving, growing modern language spoken by 80 million people as their first language.',
    uniqueFeatures: ['One of India\'s 6 classical languages', 'Over 2,500 years of continuous literary tradition', 'Unique script with 247 characters', 'Spoken in 4 countries: India, Sri Lanka, Singapore, Malaysia'],
    commonPhrases: [
      { english: 'Hello', local: 'வணக்கம்', transliteration: 'Vanakkam', pronunciation: 'va-nak-kam' },
      { english: 'Thank you', local: 'நன்றி', transliteration: 'Nandri', pronunciation: 'nan-dri' },
      { english: 'How are you?', local: 'நீங்கள் எப்படி இருக்கிறீர்கள்?', transliteration: 'Neengal eppadi irukkireergal?', pronunciation: 'neen-gal ep-pa-di i-ruk-ki-reer-gal' },
      { english: 'Delicious!', local: 'மிகவும் சுவையான!', transliteration: 'Migavum suvaiyana!', pronunciation: 'mi-ga-vum su-vai-ya-na' },
      { english: 'Where is the beach?', local: 'கடற்கரை எங்கே?', transliteration: 'Kadarkkarai enge?', pronunciation: 'ka-dark-ka-rai en-ge' },
      { english: 'What is the price?', local: 'விலை என்ன?', transliteration: 'Vilai enna?', pronunciation: 'vi-lai en-na' },
    ],
    dialects: ['Sri Lanka Tamil', 'Madurai Tamil', 'Coimbatore Tamil', 'Chennai slang (Madras Bashai)'],
    relatedLanguages: ['Malayalam', 'Kannada', 'Telugu'],
    isClassicalLanguage: true, literaryHistory: 'Tamil\'s literary tradition begins with the Sangam period (300 BCE - 300 CE) — the Purananuru, Akananuru, and Thirukkural represent a sophisticated secular literary tradition of extraordinary psychological and philosophical depth that predates comparable European literature by over a millennium.', emoji: '📿',
  }],
  kolkata: [{
    id: 'kol-l1', citySlug: 'kolkata', name: 'Bengali', nativeName: 'বাংলা',
    script: 'Bengali Script', isoCode: 'bn', family: 'Indo-Aryan', role: 'official',
    nativeSpeakers: '30 Crore', origin: 'Evolved from Sanskrit through Pali, Prakrit, and Apabhramsha, with a distinct identity emerging around the 10th century CE.',
    aiSummary: 'Bengali is the language of Rabindranath Tagore — the first Asian Nobel Laureate who wrote the national anthems of both India and Bangladesh in Bengali. The language is known for its melodic quality, rich literary tradition, and the "Bengal Renaissance" of the 19th century that produced some of South Asia\'s most transformative intellectuals. Bengali film (the Parallel Cinema movement), music (Rabindra Sangeet), and literature have shaped Indian culture far beyond Bengal\'s borders.',
    uniqueFeatures: ['Rabindranath Tagore wrote in Bengali (Nobel 1913)', 'National language of Bangladesh', 'Rich cinema tradition (Satyajit Ray)', 'Unique script with 11 vowels and 39 consonants'],
    commonPhrases: [
      { english: 'Hello', local: 'নমস্কার', transliteration: 'Namaskar', pronunciation: 'na-mas-kaar' },
      { english: 'Thank you', local: 'ধন্যবাদ', transliteration: 'Dhanyabad', pronunciation: 'dhan-ya-baad' },
      { english: 'How are you?', local: 'আপনি কেমন আছেন?', transliteration: 'Apni kemon achen?', pronunciation: 'ap-ni ke-mon aa-chen' },
      { english: 'Delicious!', local: 'খুব সুন্দর!', transliteration: 'Khub sundar!', pronunciation: 'khub sun-dar' },
      { english: 'Where is Victoria Memorial?', local: 'ভিক্টোরিয়া মেমোরিয়াল কোথায়?', transliteration: 'Victoria Memorial kothay?', pronunciation: 'Vic-to-ria Me-mo-ri-al ko-thay' },
    ],
    dialects: ['Rarhi (standard)', 'Varendra', 'Sylheti', 'Chittagonian', 'Rangpuri'],
    relatedLanguages: ['Odia', 'Assamese', 'Hindi'],
    isClassicalLanguage: false, literaryHistory: 'Bengali literature flourished during the Bengal Renaissance of the 19th century, with Rabindranath Tagore\'s Gitanjali (1910) representing the apex of the tradition and earning the Nobel Prize in Literature in 1913 — the first Nobel awarded to a non-European writer.', emoji: '📚',
  }],
  bengaluru: [{
    id: 'blr-l1', citySlug: 'bengaluru', name: 'Kannada', nativeName: 'ಕನ್ನಡ',
    script: 'Kannada Script', isoCode: 'kn', family: 'Dravidian', role: 'official',
    nativeSpeakers: '4.4 Crore', origin: 'One of the oldest Dravidian languages with recorded epigraphs dating back to the 5th-century Halmidi inscription.',
    aiSummary: 'Kannada possesses a classical heritage spanning more than 1,500 years and holds the second highest number of Jnanpith literary awards in India (8 recipients). Beneath Bengaluru\'s high-tech exterior beats an ancient Kannada soul celebrated through Vachana poetry of Basaveshwara, melodic Haridasa sahitya, and rich Yakshagana theatre.',
    uniqueFeatures: ['Recognized Classical Language of India', '8 Jnanpith literary award recipients', 'Halmidi inscription dates to 450 CE', 'Vachana poetry of the 12th century'],
    commonPhrases: [
      { english: 'Hello', local: 'ನಮಸ್ಕಾರ', transliteration: 'Namaskara', pronunciation: 'na-mas-kaa-ra' },
      { english: 'Thank you', local: 'ಧನ್ಯವಾದಗಳು', transliteration: 'Dhanyavadagalu', pronunciation: 'dhan-ya-vaa-da-ga-lu' },
      { english: 'How are you?', local: 'ಹೇಗಿದ್ದೀರಾ?', transliteration: 'Hegiddeera?', pronunciation: 'he-gid-dee-raa' },
      { english: 'Very good / Delicious!', local: 'ತುಂಬಾ ಚೆನ್ನಾಗಿದೆ!', transliteration: 'Tumba chennagide!', pronunciation: 'tum-baa chen-naa-gi-de' },
      { english: 'Where is the tech park?', local: 'ಟೆಕ್ ಪಾರ್ಕ್ ಎಲ್ಲಿದೆ?', transliteration: 'Tech park ellide?', pronunciation: 'tech park el-li-de' },
      { english: 'How much is this?', local: 'ಇದು ಎಷ್ಟು?', transliteration: 'Idu eshtu?', pronunciation: 'i-du esh-tu' },
    ],
    dialects: ['Bengaluru/Mysuru Kannada (standard)', 'Kundagannada', 'Dharwad Kannada', 'Havyaka'],
    relatedLanguages: ['Tamil', 'Telugu', 'Malayalam', 'Tulu'],
    isClassicalLanguage: true, literaryHistory: 'Kannada literature was codified in Kavirajamarga (c. 850 CE) by Amoghavarsha. Basavanna and Akka Mahadevi revolutionized devotional verse in the 12th century through egalitarian Vachanas.', emoji: '📜',
  }],
  hyderabad: [{
    id: 'hyd-l1', citySlug: 'hyderabad', name: 'Telugu', nativeName: 'తెలుగు',
    script: 'Telugu Script', isoCode: 'te', family: 'Dravidian', role: 'official',
    nativeSpeakers: '8.3 Crore', origin: 'Referred to by Italian traveler Niccolò de\' Conti as the "Italian of the East" because every word ends in a vowel.',
    aiSummary: 'Telugu is India\'s third most spoken language and an officially designated Classical Language. In Hyderabad, Telugu mingles intimately with Dakhni Urdu — an endearing vernacular born in the medieval courts of the Golconda sultanate that gives the city its unmatched witty, warm street humor.',
    uniqueFeatures: ['Designated Classical Language of India', '"Italian of the East" due to vocalic ending of all words', 'Dakhni Urdu dialect blend in Hyderabad', 'Rich tradition of Kirtanas and Avadhanams'],
    commonPhrases: [
      { english: 'Hello', local: 'నమస్కారం', transliteration: 'Namaskaram', pronunciation: 'na-mas-kaa-ram' },
      { english: 'Thank you', local: 'ధన్యవాదాలు', transliteration: 'Dhanyavadalu', pronunciation: 'dhan-ya-vaa-da-lu' },
      { english: 'How are you?', local: 'ఎలా ఉన్నారు?', transliteration: 'Ela unnaru?', pronunciation: 'e-laa un-naa-ru' },
      { english: 'Very tasty!', local: 'చాలా రుచిగా ఉంది!', transliteration: 'Chaala ruchiga undi!', pronunciation: 'chaa-laa ru-chi-gaa un-di' },
      { english: 'Where is Charminar?', local: 'చార్మినార్ ఎక్కడ ఉంది?', transliteration: 'Charminar ekkada undi?', pronunciation: 'char-mi-nar ek-ka-da un-di' },
    ],
    dialects: ['Telangana Telugu (Hyderabad standard)', 'Costal Andhra', 'Rayalaseema', 'Dakhni'],
    relatedLanguages: ['Kannada', 'Tamil', 'Urdu'],
    isClassicalLanguage: true, literaryHistory: 'Nannaya began translating the Mahabharata into Telugu in the 11th century. Under Vijayanagara emperor Sri Krishnadevaraya, Telugu literature reached its golden age ("Desha Bhashalandu Telugu Lessa").', emoji: '🗣️',
  }],
  amritsar: [{
    id: 'amt-l1', citySlug: 'amritsar', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ',
    script: 'Gurmukhi', isoCode: 'pa', family: 'Indo-Aryan', role: 'official',
    nativeSpeakers: '13 Crore', origin: 'Derived from Shauraseni Prakrit and standardized into the Gurmukhi script by Guru Angad Dev Ji in the 16th century.',
    aiSummary: 'Punjabi is a tonal Indo-Aryan language that carries the spiritual resonance of the Guru Granth Sahib and the electric vitality of Punjab\'s agricultural rhythms. The Gurmukhi script was standardized in Amritsar\'s heartland and serves as the sacred medium of Sikh liturgical texts.',
    uniqueFeatures: ['Only major tone language among Indo-Aryan group', 'Written in Gurmukhi script ("from the Guru\'s mouth")', 'Rich Sufi poetic tradition (Bulleh Shah, Waris Shah)', 'World-famous bhangra and folk ballads'],
    commonPhrases: [
      { english: 'Hello / Greetings', local: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ', transliteration: 'Sat Sri Akaal', pronunciation: 'sat sree a-kaal' },
      { english: 'Thank you', local: 'ਧੰਨਵਾਦ', transliteration: 'Dhannvaad', pronunciation: 'dhan-vaad' },
      { english: 'How are you?', local: 'ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?', transliteration: 'Tusi kiven ho?', pronunciation: 'tu-see ki-ven ho' },
      { english: 'Very delicious!', local: 'ਬਹੁਤ ਸਵਾਦਿਸ਼ਟ!', transliteration: 'Bahut swadisht!', pronunciation: 'ba-hut swaa-disht' },
      { english: 'Where is the Golden Temple?', local: 'ਗੋਲਡਨ ਟੈਂਪਲ ਕਿੱਥੇ ਹੈ?', transliteration: 'Golden Temple kithe hai?', pronunciation: 'gol-den tem-pel kithe hai' },
    ],
    dialects: ['Majhi (Amritsar standard)', 'Doabi', 'Malwai', 'Pothohari'],
    relatedLanguages: ['Hindi', 'Urdu', 'Sindhi'],
    isClassicalLanguage: false, literaryHistory: 'The sacred poetry of Baba Farid and the Sikh Gurus in the Adi Granth along with Waris Shah\'s epic romance Heer Ranjha form the cornerstone of Punjabi literary consciousness.', emoji: '📖',
  }],
  kochi: [{
    id: 'koc-l1', citySlug: 'kochi', name: 'Malayalam', nativeName: 'മലയാളം',
    script: 'Malayalam Script', isoCode: 'ml', family: 'Dravidian', role: 'official',
    nativeSpeakers: '3.8 Crore', origin: 'Diverged from Middle Tamil around the 9th to 12th century, enriched with extensive Sanskrit lexical synthesis.',
    aiSummary: 'Malayalam is an officially recognized Classical Language celebrated for its intricate phonetic richness and lush poetic traditions. In coastal Kochi, Malayalam incorporates historic loanwords from Portuguese, Dutch, Arabic, and Syriac, reflecting the port city\'s two millennia of maritime trade.',
    uniqueFeatures: ['Designated Classical Language of India', 'Has the largest number of letters (53) among Indian scripts', 'Palindrome language name: M-A-L-A-Y-A-L-A-M', 'Thunchaththu Ezhuthachan considered father of modern language'],
    commonPhrases: [
      { english: 'Hello', local: 'നമസ്കാരം', transliteration: 'Namaskaram', pronunciation: 'na-mas-kaa-ram' },
      { english: 'Thank you', local: 'നന്ദി', transliteration: 'Nandi', pronunciation: 'nan-di' },
      { english: 'How are you?', local: 'സുഖമാണോ?', transliteration: 'Sukhamano?', pronunciation: 'su-kha-maa-no' },
      { english: 'Super delicious!', local: 'വളരെ രുചികരമാണ്!', transliteration: 'Valare ruchikaramannu!', pronunciation: 'va-la-re ru-chi-ka-ra-maa-nu' },
      { english: 'Where is the ferry?', local: 'ബോട്ട് ജെട്ടി എവിടെയാണ്?', transliteration: 'Boat jetty evideyannu?', pronunciation: 'boat jet-ti e-vi-de-yaa-nu' },
    ],
    dialects: ['Central Travancore', 'Malabar Malayalam', 'Cochin dialect', 'Judeo-Malayalam'],
    relatedLanguages: ['Tamil', 'Kannada', 'Sanskrit'],
    isClassicalLanguage: true, literaryHistory: 'Thunchaththu Ezhuthachan codified modern Malayalam literature with the Adhyathmaramayanam in the 16th century. Kathakali Attakathas represent the pinnacle of performing arts literature.', emoji: '🌴',
  }],
  ahmedabad: [{
    id: 'ahm-l1', citySlug: 'ahmedabad', name: 'Gujarati', nativeName: 'ગુજરાતી',
    script: 'Gujarati Script', isoCode: 'gu', family: 'Indo-Aryan', role: 'official',
    nativeSpeakers: '6 Crore', origin: 'Evolved from Gurjar Apabhramsha around the 12th century, closely allied with western Rajasthani.',
    aiSummary: 'Gujarati is the mother tongue of Mahatma Gandhi and Sardar Vallabhbhai Patel. Renowned for its warm, hospitable cadence and mercantile eloquence, the language uses an elegant cursive script that dispensed with the traditional Devanagari top line (shirorekha).',
    uniqueFeatures: ['Cursive script without top horizontal line', 'Language of Mahatma Gandhi\'s Satyagraha writings', 'Rich Bhakti saint poetry of Narsinh Mehta', 'Unique commercial and maritime terminology'],
    commonPhrases: [
      { english: 'Hello', local: 'નમસ્તે / જય શ્રી કૃષ્ણ', transliteration: 'Namaste / Jai Shree Krishna', pronunciation: 'na-mas-te / jay shree krish-na' },
      { english: 'Thank you', local: 'આભાર', transliteration: 'Aabhaar', pronunciation: 'aa-bhaar' },
      { english: 'How are you?', local: 'તમે કેમ છો?', transliteration: 'Tame kem chho?', pronunciation: 'ta-me kem chho' },
      { english: 'Very tasty / Majama!', local: 'બહુ સરસ / મજામાં!', transliteration: 'Bahu saras / Majama!', pronunciation: 'ba-hu sa-ras / ma-jaa-maan' },
      { english: 'Where is the heritage walk?', local: 'હેરિટેજ વોક ક્યાં છે?', transliteration: 'Heritage walk kyan chhe?', pronunciation: 'he-ri-tage walk kyaan chhe' },
    ],
    dialects: ['Amdavadi Gujarati', 'Surati', 'Kathiyawadi', 'Charotari'],
    relatedLanguages: ['Rajasthani', 'Hindi', 'Sindhi'],
    isClassicalLanguage: false, literaryHistory: '15th-century saint-poet Narsinh Mehta composed the timeless hymn "Vaishnav Jan To", while modern prose was shaped during the Freedom Movement at Sabarmati Ashram.', emoji: '🪷',
  }],
};

export const PLACES_DATA: Record<string, PlaceItem[]> = {
  mumbai: [
    { id: 'mum-p1', citySlug: 'mumbai', name: 'Gateway of India', type: 'monument', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: true, neighborhood: 'Apollo Bunder, Colaba', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Early morning or sunset', rating: 4.5, description: 'The iconic stone arch monument built during the British Raj, overlooking the Arabian Sea.', aiSummary: 'The Gateway of India stands at the tip of Apollo Bunder as Mumbai\'s most iconic landmark — a 26-meter basalt arch built to commemorate the 1911 visit of King George V and Queen Mary, but which later served as the ceremonial exit point of the last British troops when India gained independence in 1948. Today, it is Mumbai\'s great meeting point, where ferries depart for Elephanta Island and street vendors sell corn and chai against the backdrop of the Arabian Sea.', historicalPeriod: 'British Colonial (1924)', popularityScore: 98, emoji: '🏛️', tags: ['monument', 'colonial', 'waterfront', 'iconic'] },
    { id: 'mum-p2', citySlug: 'mumbai', name: 'Marine Drive', type: 'viewpoint', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'South Mumbai', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Sunset and after dark', rating: 4.7, description: 'A 3.6 km boulevard along the Arabian Sea known as the Queen\'s Necklace.', aiSummary: 'Marine Drive is Mumbai\'s great democratic promenade — a sweeping C-shaped boulevard along the Arabian Sea where the city comes to breathe, from morning walkers watching the fishing boats to evening couples watching the sun melt into the Arabian Sea. At night, the arc of street lights reflects in the sea to create the "Queen\'s Necklace" that gives it its poetic name. After extreme work weeks, Marine Drive is where Mumbaikars come to remember why they love the city.', historicalPeriod: 'British Colonial (1920s)', popularityScore: 97, emoji: '🌊', tags: ['viewpoint', 'waterfront', 'promenade', 'sunset'] },
    { id: 'mum-p3', citySlug: 'mumbai', name: 'Dharavi', type: 'hidden_gem', isHiddenGem: true, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'Central Mumbai', entryFee: { indian: 0, foreigner: 500 }, bestTimeToVisit: 'Weekday mornings', rating: 4.2, description: 'Asia\'s largest informal economy — a 2.1 sq km township producing Rs. 1,000 crore annually.', aiSummary: 'Dharavi challenges every preconception — far from the stereotyped "slum" of Western imagination, it is one of the most productive and entrepreneurially vibrant communities in Asia, generating over ₹5,000 crore annually in goods from leather goods to recycled plastics to Diwali pottery. The responsible walking tours organized by local residents reveal a tightly knit community of families, small businesses, and extraordinary human resilience that has built a self-sufficient ecosystem within one of the world\'s most expensive cities.', historicalPeriod: 'Modern (1800s-present)', popularityScore: 82, emoji: '🏭', tags: ['hidden-gem', 'community', 'social', 'entrepreneurship'] },
  ],
  delhi: [
    { id: 'del-p1', citySlug: 'delhi', name: 'Red Fort', type: 'fort', isHiddenGem: false, isUnescoHeritage: true, isAsiProtected: true, neighborhood: 'Old Delhi, Chandni Chowk', entryFee: { indian: 35, foreigner: 500 }, bestTimeToVisit: 'Early morning before crowds', rating: 4.4, description: 'The Mughal emperor Shah Jahan\'s magnificent red sandstone fort, UNESCO World Heritage Site.', aiSummary: 'Lal Qila (Red Fort) is the architectural embodiment of Mughal imperial ambition — a palatial complex of red Agra sandstone built by Emperor Shah Jahan in 1639, from whose ramparts India\'s Prime Minister addresses the nation every Independence Day. Within its walls stand the Diwan-i-Aam (Hall of Public Audience), the Diwan-i-Khas with its legendary silver ceiling, and the elegant Khas Mahal royal apartments. The evening sound and light show transforms it into a dramatic retelling of Mughal history.', historicalPeriod: 'Mughal Era (1639)', popularityScore: 96, emoji: '🏯', tags: ['monument', 'mughal', 'unesco', 'fort', 'independence-day'] },
    { id: 'del-p2', citySlug: 'delhi', name: 'Chandni Chowk', type: 'market', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'Old Delhi', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Early morning for breakfast trail', rating: 4.3, description: 'One of the oldest and busiest markets in India, a sensory labyrinth of food, spices, and commerce.', aiSummary: 'Chandni Chowk is Old Delhi at its most elemental — a 17th-century market that Shah Jahan designed with a central canal reflecting moonlight, now a dense, chaotic, magnificent labyrinth of narrow lanes (gallis) each specializing in a different trade: Dariba Kalan for silver jewelry, Kinari Bazaar for zardosi embroidery, Nai Sarak for books and stationery. The food trails through Chandni Chowk — tasting Jalebi at Ghantewala, nihari at Al-Jawahar, and kulfi at Old Famous Jalebi Wala — constitute one of India\'s greatest gastronomic experiences.', historicalPeriod: 'Mughal Era (1650)', popularityScore: 94, emoji: '🛍️', tags: ['market', 'old-delhi', 'heritage', 'food', 'shopping'] },
  ],
  jaipur: [
    { id: 'jai-p1', citySlug: 'jaipur', name: 'Amber Fort', type: 'fort', isHiddenGem: false, isUnescoHeritage: true, isAsiProtected: true, neighborhood: 'Amer, 11km from Jaipur', entryFee: { indian: 100, foreigner: 500 }, bestTimeToVisit: 'Early morning (8-10 AM)', rating: 4.7, description: 'A magnificent hilltop fort with exquisite mirror work and intricate carvings.', aiSummary: 'Amber Fort rises from a desert hillside with a drama that takes the breath away — its ochre-pink sandstone battlements snaking along the ridge above the Maota Lake like a Rajput crown. Inside, the Sheesh Mahal (Palace of Mirrors) is its crowning glory: thousands of tiny convex mirrors embedded in an elaborate honeycomb pattern such that a single candle flame appears to fill the chamber with a galaxy of stars. The fort\'s history as the seat of the Kachhwaha Rajput clan is told in its successive layers of construction, each adding new chambers of extraordinary beauty.', historicalPeriod: 'Rajput Era (1592)', popularityScore: 97, emoji: '🏰', tags: ['fort', 'rajput', 'unesco', 'mirror-work', 'hilltop'] },
    { id: 'jai-p2', citySlug: 'jaipur', name: 'Hawa Mahal', type: 'palace', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: true, neighborhood: 'Old City, Badi Chaupar', entryFee: { indian: 50, foreigner: 200 }, bestTimeToVisit: 'Sunrise (best facade lighting)', rating: 4.5, description: 'The "Palace of Winds" — a 5-story pink sandstone lattice screen with 953 windows.', aiSummary: 'The Hawa Mahal is Jaipur\'s most instantly recognizable image — a delicate five-story sandstone screen building with 953 jharokha windows (small latticed windows) designed by Maharaja Sawai Pratap Singh in 1799 to allow the royal ladies to observe street life below without being seen. The facade alone is a masterpiece of Rajput architecture — its honeycomb of interlocking windows creates natural air conditioning through the Venturi effect, keeping the interior cool even in Rajasthan\'s fierce summer heat.', historicalPeriod: 'Rajput Era (1799)', popularityScore: 95, emoji: '🪟', tags: ['palace', 'pink-city', 'architecture', 'iconic', 'rajput'] },
  ],
  bengaluru: [
    { id: 'blr-p1', citySlug: 'bengaluru', name: 'Lalbagh Botanical Garden', type: 'park', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'South Bengaluru', entryFee: { indian: 25, foreigner: 300 }, bestTimeToVisit: 'Early morning (6-9 AM)', rating: 4.6, description: 'A 240-acre botanical garden commissioned by Hyder Ali in 1760 featuring a historic London-inspired Glass House.', aiSummary: 'Commissioned by Hyder Ali and expanded by Tipu Sultan, Lalbagh is the green lung of Bengaluru. Home to centuries-old trees from Persia and the Cape of Good Hope, its centerpiece is the iconic iron-and-glass conservatory modeled after London\'s Crystal Palace.', historicalPeriod: 'Kingdom of Mysore (1760)', popularityScore: 94, emoji: '🌳', tags: ['botanical-garden', 'nature', 'mysore-history', 'glass-house'] },
    { id: 'blr-p2', citySlug: 'bengaluru', name: 'Bangalore Palace', type: 'palace', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'Vasanth Nagar', entryFee: { indian: 230, foreigner: 460 }, bestTimeToVisit: 'Morning hours', rating: 4.3, description: 'Tudor-revival royal palace owned by the Wadiyar royal dynasty with fortified towers and woodcarvings.', aiSummary: 'Built in 1878 by Rev. J. Garrett and acquired by the Wadiyars of Mysore, this palace exhibits Tudor and Scottish Gothic influences. With battlements, turrets, and interior walls adorned with Raja Ravi Varma paintings, it offers a window into Karnataka\'s royal opulence.', historicalPeriod: 'Wadiyar Dynasty (1878)', popularityScore: 91, emoji: '🏰', tags: ['tudor-palace', 'royal', 'art-collection'] },
  ],
  hyderabad: [
    { id: 'hyd-p1', citySlug: 'hyderabad', name: 'Charminar', type: 'monument', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: true, neighborhood: 'Old City', entryFee: { indian: 25, foreigner: 300 }, bestTimeToVisit: 'Evening under floodlights', rating: 4.6, description: 'The 1591 monument and mosque with 4 grand minarets commissioned by Muhammad Quli Qutb Shah.', aiSummary: 'Charminar marks the center of old Hyderabad, built by Qutb Shah to commemorate the end of a deadly plague. Surrounding it is the bustling Laad Bazaar famous for lacquer bangles and pearls, while the monument itself remains the indisputable emblem of Telangana\'s syncretic heritage.', historicalPeriod: 'Qutb Shahi Dynasty (1591)', popularityScore: 99, emoji: '🕌', tags: ['monument', 'qutb-shahi', 'old-city', 'iconic'] },
    { id: 'hyd-p2', citySlug: 'hyderabad', name: 'Golconda Fort', type: 'fort', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: true, neighborhood: 'Ibrahim Bagh', entryFee: { indian: 25, foreigner: 300 }, bestTimeToVisit: 'Late afternoon before sound & light show', rating: 4.7, description: 'Impregnable granite fortress renowned for its acoustic engineering and diamond mines.', aiSummary: 'Golconda was the capital of the medieval diamond trade that produced the Koh-i-Noor and Hope Diamond. A handclap beneath the dome at the entry portico echoes crisply to the Bala Hissar pavilion 1 km away atop the citadel — an acoustic marvel of medieval defense engineering.', historicalPeriod: 'Kakatiya / Qutb Shahi (1518)', popularityScore: 96, emoji: '💎', tags: ['fort', 'acoustics', 'diamonds', 'history'] },
  ],
  chennai: [
    { id: 'che-p1', citySlug: 'chennai', name: 'Kapaleeshwarar Temple', type: 'temple', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'Mylapore', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Early morning or evening aarti', rating: 4.8, description: '7th-century Dravidian Shiva temple with a towering 37-meter rainbow gopuram.', aiSummary: 'Located in the spiritual heart of Mylapore, Kapaleeshwarar Temple represents classical Dravidian temple architecture. Its rainbow-colored gopuram is carved with thousands of sculptural depictions of Hindu mythology, accompanied by traditional nadaswaram pipes and temple tank reflections.', historicalPeriod: 'Pallava / Vijayanagara Era', popularityScore: 97, emoji: '🛕', tags: ['dravidian', 'temple', 'gopuram', 'shiva'] },
    { id: 'che-p2', citySlug: 'chennai', name: 'Marina Beach', type: 'beach', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'Triplicane / Mylapore', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Sunrise or breezy twilight', rating: 4.4, description: 'The world\'s second longest natural urban beach spanning 13 kilometers along the Coromandel Coast.', aiSummary: 'Marina Beach is the open-air theater of Chennai life. Every evening, sea breezes from the Bay of Bengal welcome joggers, families savoring sundal and murukku, and visitors admiring bronze statues of Tamil literary giants along the promenade.', historicalPeriod: 'Madras Presidency (1884)', popularityScore: 95, emoji: '🌊', tags: ['beach', 'promenade', 'bay-of-bengal', 'sunset'] },
  ],
  kolkata: [
    { id: 'kol-p1', citySlug: 'kolkata', name: 'Victoria Memorial', type: 'monument', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: true, neighborhood: 'Maidan, Queen\'s Way', entryFee: { indian: 50, foreigner: 500 }, bestTimeToVisit: 'Sunset across the Maidan gardens', rating: 4.7, description: 'Monumental white Makrana marble palace commemorating Queen Victoria, set in 64 acres of manicured gardens.', aiSummary: 'Built from the same white Makrana marble as the Taj Mahal, Victoria Memorial combines British and Mughal neoclassical elements. Inside, magnificent gallery halls house paintings of the Raj, while outside the green lawns host Kolkata\'s vibrant intellectual dialogues.', historicalPeriod: 'British Raj (1921)', popularityScore: 98, emoji: '🏛️', tags: ['marble-palace', 'maidan', 'colonial-monument'] },
    { id: 'kol-p2', citySlug: 'kolkata', name: 'Howrah Bridge (Rabindra Setu)', type: 'monument', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'Hooghly River', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Blue hour evening over river ferry', rating: 4.6, description: 'World-famous balanced cantilever steel bridge carrying over 100,000 vehicles and 150,000 pedestrians daily without nuts or bolts.', aiSummary: 'Connecting Howrah to Kolkata across the sacred Hooghly, this engineering wonder was constructed using 26,500 tonnes of high-tensile Tata steel without a single bolt in the bridge structure. Crossing it on a yellow ambassador taxi at dusk is an indelible rite of passage.', historicalPeriod: 'Constructed 1943', popularityScore: 97, emoji: '🌉', tags: ['cantilever-bridge', 'hooghly', 'iconic-kolkata'] },
  ],
  varanasi: [
    { id: 'var-p1', citySlug: 'varanasi', name: 'Dashashwamedh Ghat & Ganga Aarti', type: 'ghat', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'Ganga Riverfront', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Dusk (6:30 PM for Maha Aarti)', rating: 4.9, description: 'The holiest ghat on the Ganga where saffron-robed priests perform the synchronized fire ritual every evening.', aiSummary: 'Legend holds that Lord Brahma created this ghat to welcome Lord Shiva. Every dusk, the riverfront falls hushed as young priests hoist heavy multi-tiered brass oil lamps in clockwise arcs to the sound of conch shells, cymbals, and Vedic chants, while thousands of floating diyas shimmer upon the water.', historicalPeriod: 'Ancient / Peshwa Balaji Baji Rao (1748)', popularityScore: 100, emoji: '🔥', tags: ['ganga-aarti', 'spiritual-epicenter', 'ghats', 'sacred'] },
    { id: 'var-p2', citySlug: 'varanasi', name: 'Kashi Vishwanath Golden Temple', type: 'temple', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'Vishwanath Gali', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Mangala Aarti at dawn', rating: 4.9, description: 'One of the 12 sacred Jyotirlingas of Lord Shiva, crowned by 800 kg of pure gold domes.', aiSummary: 'Kashi Vishwanath is the spiritual nucleus of Hindu faith, where liberation (Moksha) is sought. Destroyed and rebuilt multiple times through history, Maharani Ahilyabai Holkar restored the sanctum in 1780, and Maharaja Ranjit Singh donated gold leaf for its twin spires.', historicalPeriod: 'Rebuilt by Ahilyabai Holkar (1780)', popularityScore: 99, emoji: '🛕', tags: ['jyotirlinga', 'shiva', 'golden-temple', 'holiest'] },
  ],
  amritsar: [
    { id: 'amt-p1', citySlug: 'amritsar', name: 'Harmandir Sahib (Golden Temple)', type: 'temple', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'Old City, Amritsar', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Amrit Vela (4 AM) or evening illumination', rating: 5.0, description: 'The preeminent spiritual sanctuary of Sikhism, covered in real gold foil and surrounded by the holy Amrit Sarovar lake.', aiSummary: 'Harmandir Sahib represents divine serenity and absolute equality. Designed with four entrances open to all directions and four castes, its upper floors are gilded with 750 kg of pure gold. Sitting beside the tranquil Amrit Sarovar listening to live Gurbani Kirtan touches the transcendent core of human devotion.', historicalPeriod: 'Founded by Guru Ram Das Ji (1577)', popularityScore: 100, emoji: '✨', tags: ['golden-temple', 'sikh-sanctuary', 'amrit-sarovar', 'spiritual'] },
    { id: 'amt-p2', citySlug: 'amritsar', name: 'Jallianwala Bagh Memorial', type: 'monument', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: true, neighborhood: 'Near Golden Temple', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Morning', rating: 4.7, description: 'Historic public garden commemorating the martyrs of the 1919 massacre that galvanized India\'s Independence movement.', aiSummary: 'Preserved with the original red brick walls bearing bullet indentations from the 1919 British firing, the Amar Jawan Jyoti flame burns eternally in tribute to the peaceful assembly of Punjabis whose martyrdom accelerated the fall of the British Empire.', historicalPeriod: 'National Memorial (1919)', popularityScore: 95, emoji: '🕊️', tags: ['freedom-struggle', 'memorial', 'history'] },
  ],
  agra: [
    { id: 'agr-p1', citySlug: 'agra', name: 'Taj Mahal', type: 'monument', isHiddenGem: false, isUnescoHeritage: true, isAsiProtected: true, neighborhood: 'Dharmapuri, Forest Colony', entryFee: { indian: 50, foreigner: 1100 }, bestTimeToVisit: 'Sunrise from Mehtab Bagh or inside gates', rating: 4.9, description: 'One of the Seven Wonders of the World — Emperor Shah Jahan\'s ivory-white marble mausoleum for Mumtaz Mahal.', aiSummary: 'Standing gracefully beside the Yamuna River, the Taj Mahal is the supreme achievement of Mughal architecture. Constructed by 20,000 artisans utilizing Makrana marble, jade, turquoise, and lapis lazuli in delicate pietra dura inlay, its symmetry and luminosity change hues from pink at dawn to shimmering gold under the full moon.', historicalPeriod: 'Mughal Empire (1631-1648)', popularityScore: 100, emoji: '🕌', tags: ['wonder-of-world', 'unesco', 'mughal', 'marble', 'pietra-dura'] },
    { id: 'agr-p2', citySlug: 'agra', name: 'Agra Fort', type: 'fort', isHiddenGem: false, isUnescoHeritage: true, isAsiProtected: true, neighborhood: 'Rakabganj', entryFee: { indian: 50, foreigner: 650 }, bestTimeToVisit: 'Morning', rating: 4.7, description: 'Vast red sandstone fortress and seat of Mughal emperors with royal pavilions and Taj Mahal views.', aiSummary: 'Enclosed by 70-foot red sandstone ramparts, Agra Fort was transformed by Akbar into the military and administrative heart of the Mughal Empire. Here, in the octagonal Musamman Burj tower, Emperor Shah Jahan spent his final captive years gazing across the Yamuna at his beloved Taj Mahal.', historicalPeriod: 'Mughal Empire (1565)', popularityScore: 96, emoji: '🏰', tags: ['unesco', 'mughal-fort', 'red-sandstone'] },
  ],
  kochi: [
    { id: 'koc-p1', citySlug: 'kochi', name: 'Fort Kochi & Chinese Fishing Nets', type: 'viewpoint', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: false, neighborhood: 'Fort Kochi Beach', entryFee: { indian: 0, foreigner: 0 }, bestTimeToVisit: 'Sunset over Arabian Sea', rating: 4.5, description: 'Iconic cantilevered shore nets introduced by Chinese traders from Kublai Khan\'s court in the 14th century.', aiSummary: 'Silhouette against the blazing Arabian Sea sunset, these enormous cantilevered bamboo-and-teak fishing nets (Cheena Vala) require four fishermen to counterbalance the weighted rocks. Along the historic lanes behind them stand Portuguese, Dutch, and British colonial houses.', historicalPeriod: '14th-century maritime trade', popularityScore: 95, emoji: '⛵', tags: ['chinese-nets', 'fort-kochi', 'maritime', 'sunset'] },
  ],
  mysuru: [
    { id: 'mys-p1', citySlug: 'mysuru', name: 'Mysore Palace (Amba Vilas)', type: 'palace', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: true, neighborhood: 'Sayyaji Rao Road', entryFee: { indian: 100, foreigner: 500 }, bestTimeToVisit: 'Sunday night (7-8 PM for 100,000 bulb illumination)', rating: 4.9, description: 'Spectacular Indo-Saracenic royal seat of the Wadiyar dynasty, illuminated by 97,000 incandescent bulbs.', aiSummary: 'Mysore Palace is second only to the Taj Mahal in annual Indian visitors. Designed by British architect Henry Irwin in 1912 with rose-pink marble domes and carved mahogany ceilings, its Sunday evening illumination turns the fortress into a breathtaking golden constellation.', historicalPeriod: 'Wadiyar Dynasty (1912)', popularityScore: 99, emoji: '👑', tags: ['indo-saracenic', 'palace', 'illumination', 'wadiyar'] },
  ],
  lucknow: [
    { id: 'lko-p1', citySlug: 'lucknow', name: 'Bara Imambara & Bhool Bhulaiya', type: 'monument', isHiddenGem: false, isUnescoHeritage: false, isAsiProtected: true, neighborhood: 'Machchhi Bhavan', entryFee: { indian: 50, foreigner: 500 }, bestTimeToVisit: 'Morning with local guide', rating: 4.7, description: '18th-century grand monument with an enormous pillarless vaulted hall and a 3D labyrinth of 1,000 interlocking passages.', aiSummary: 'Commissioned as a famine relief project by Nawab Asaf-ud-Daula in 1784, the central arched hall spans 50 meters without a single supporting pillar or iron girder. Above it lies the Bhool Bhulaiya — a bewildering three-dimensional labyrinth of identical corridors designed to disorient hostile invaders.', historicalPeriod: 'Awadh Nawabs (1784)', popularityScore: 96, emoji: '🏛️', tags: ['labyrinth', 'awadhi-architecture', 'bhool-bhulaiya', 'nawab'] },
  ],
};

export const CULTURE_DATA: Record<string, CultureItem[]> = {
  mumbai: [
    { id: 'mum-c1', citySlug: 'mumbai', name: 'Bollywood', type: 'art', era: 'Modern', description: 'The world\'s largest film industry by number of films produced annually.', aiSummary: 'Bollywood is not simply India\'s film industry — it is a cultural force that has shaped the dreams, fashion, music, and emotional vocabulary of over a billion people. Mumbai\'s Film City in Goregaon and the studios of Andheri are where the mythological spectacles and romantic melodramas are conjured that define popular culture across South Asia and the Indian diaspora worldwide.', significance: 'Produces over 1,800 films annually, generates $2.3 billion annually', whereToExperience: ['Film City Studio Tours - Goregaon', 'Bollywood walk - Bandra', 'Dharavi Museum\'s film section'], isUnescoHeritage: false, popularityScore: 98, emoji: '🎬', tags: ['cinema', 'entertainment', 'modern', 'global'] },
    { id: 'mum-c2', citySlug: 'mumbai', name: 'Warli Painting', type: 'art', era: 'Ancient', description: 'A tribal art form of geometric paintings by the Warli tribe of coastal Maharashtra.', aiSummary: 'Warli painting is one of Maharashtra\'s oldest tribal art traditions — a visual language of the Warli people of the Western Ghats that uses simple geometric forms (circles, triangles, squares) in white rice paste on mud walls to depict scenes of daily life, harvest rituals, and wedding ceremonies.', significance: 'Ancient tribal art tradition; GI (Geographical Indication) protected', whereToExperience: ['Tribal Cultural Museum - Dahanu', 'Warli art workshops in Mumbai', 'Palghar tribal villages'], isUnescoHeritage: false, popularityScore: 82, emoji: '🎨', tags: ['tribal', 'ancient', 'painting', 'geometric'] },
  ],
  chennai: [
    { id: 'che-c1', citySlug: 'chennai', name: 'Bharatanatyam', type: 'dance', era: 'Ancient', description: 'One of the oldest classical dance forms of India, originating in Tamil Nadu.', aiSummary: 'Bharatanatyam is Tamil Nadu\'s greatest gift to the world of classical dance — a precise, exquisitely codified art form developed in the temples of medieval South India where devadasis (temple dancers) performed as an act of devotion to the deity.', significance: 'UNESCO Intangible Cultural Heritage nominee; one of India\'s 8 classical dances', whereToExperience: ['Kalakshetra Foundation - Besant Nagar', 'Music Academy - T. Nagar', 'Mylapore Fine Arts Club'], isUnescoHeritage: true, popularityScore: 96, emoji: '💃', tags: ['dance', 'classical', 'ancient', 'temple-art'] },
  ],
  kolkata: [
    { id: 'kol-c1', citySlug: 'kolkata', name: 'Rabindra Sangeet', type: 'music', era: 'Modern', description: 'A genre of songs composed by Nobel Laureate Rabindranath Tagore, the spiritual backbone of Bengali culture.', aiSummary: 'Rabindra Sangeet (Tagore Songs) are the emotional and spiritual backbone of Bengali culture — 2,230 songs composed by Rabindranath Tagore that range from devotional bhajans and love songs to patriotic anthems and children\'s rhymes.', significance: 'National anthem of India and Bangladesh composed in this tradition', whereToExperience: ['Rabindra Sadan auditorium', 'Rabindra Bharati University', 'Jorasanko Thakur Bari - Tagore\'s birthplace'], isUnescoHeritage: false, popularityScore: 94, emoji: '🎵', tags: ['music', 'tagore', 'bengali', 'classical', 'national-anthem'] },
  ],
  varanasi: [
    { id: 'var-c1', citySlug: 'varanasi', name: 'Banarasi Silk Weaving', type: 'textile', era: 'Medieval', description: 'A 15th-century weaving tradition producing the most prized silk saris in India.', aiSummary: 'Banarasi silk weaving is one of India\'s most celebrated craft traditions — a 500-year-old art practiced primarily by Muslim weaver families (Ansaris) in Varanasi\'s pit-loom workshops using pure silk threads and gold/silver zari wires.', significance: 'GI (Geographical Indication) protected; UNESCO heritage craft', whereToExperience: ['Weavers\' workshops in Sarnath', 'Banarasi Sari emporia near Godaulia', 'Varanasi Silk Expo'], isUnescoHeritage: true, popularityScore: 92, emoji: '🧵', tags: ['textile', 'silk', 'weaving', 'craft', 'bridal'] },
  ],
  bengaluru: [
    { id: 'blr-c1', citySlug: 'bengaluru', name: 'Yakshagana Folk Theatre', type: 'theatre', era: 'Medieval', description: 'Traditional theatre form of Karnataka combining dance, music, dialogue, and extravagant headgear.', aiSummary: 'Yakshagana is a high-energy traditional theatrical art that depicts episodes from the Ramayana and Mahabharata. Performers wear towering headgear (Kireeta), vibrant body paints, and heavy ankle bells, delivering improvised Kannada dialogues accompanied by the thundering beat of Chande drums.', significance: 'Iconic performance art of Coastal & Malenadu Karnataka', whereToExperience: ['Ranga Shankara - JP Nagar', 'Ravindra Kalakshetra', 'Udupi Yakshagana Kendra'], isUnescoHeritage: false, popularityScore: 93, emoji: '🎭', tags: ['theatre', 'karnataka', 'dance-drama', 'epic'] },
  ],
  kochi: [
    { id: 'koc-c1', citySlug: 'kochi', name: 'Kathakali Classical Dance-Drama', type: 'dance', era: 'Medieval', description: 'Classical stylized dance-drama of Kerala with elaborate multi-hour facial makeup and costume.', aiSummary: 'Kathakali is renowned for its intense facial expressions (Navarasas), intricate mudras, and striking green paccha makeup representing noble heroes. In Fort Kochi, visitors can watch artists spend two hours meticulously applying natural stone pigments to their faces before portraying epic battles between good and evil.', significance: 'One of India\'s 8 recognized Classical Dance forms', whereToExperience: ['Kerala Kathakali Centre - Fort Kochi', 'Greenix Village', 'Folklore Museum'], isUnescoHeritage: true, popularityScore: 97, emoji: '🎭', tags: ['classical-dance', 'kathakali', 'kerala', 'unesco'] },
  ],
  lucknow: [
    { id: 'lko-c1', citySlug: 'lucknow', name: 'Chikankari Hand Embroidery', type: 'craft', era: 'Mughal', description: 'Delicate white-on-white shadow embroidery introduced by Mughal Empress Noor Jahan.', aiSummary: 'Chikankari is an exquisite 400-year-old needlecraft involving 32 distinct stitches (such as phanda, jaali, and tepchi) embroidered onto fine muslin, georgette, and cotton. Lucknow\'s Chowk and Aminabad remain the global epicenter of this delicate Nawabi craft.', significance: 'GI protected handicraft supporting over 200,000 women artisans', whereToExperience: ['SEWA Lucknow artisan cooperatives', 'Janpath Market - Hazratganj', 'Chowk artisan quarters'], isUnescoHeritage: true, popularityScore: 95, emoji: '🪡', tags: ['embroidery', 'textile', 'nawabi', 'gi-tag'] },
  ],
  jaipur: [
    { id: 'jai-c1', citySlug: 'jaipur', name: 'Jaipur Blue Pottery', type: 'craft', era: 'Rajput/Mughal', description: 'Turquoise-glazed pottery made without clay using ground quartz stone, glass, and Multani mitti.', aiSummary: 'Introduced by Sawai Ram Singh II in the 19th century, Jaipur Blue Pottery uses Egyptian paste and copper oxide glaze fired at low temperatures, producing brilliant cobalt and turquoise vessels painted with floral arabesques and bird motifs.', significance: 'GI protected craft distinct across Rajasthan', whereToExperience: ['Kripal Kumbh - Bani Park', 'Neerja Blue Pottery - Jacob Road'], isUnescoHeritage: false, popularityScore: 90, emoji: '🏺', tags: ['blue-pottery', 'quartz', 'handicraft', 'rajasthan'] },
  ],
};

export const FESTIVAL_DATA: Record<string, FestivalItem[]> = {
  mumbai: [
    { id: 'mum-fest1', citySlug: 'mumbai', name: 'Ganesh Chaturthi', localName: 'गणेश चतुर्थी', type: 'religious', religion: 'Hindu', month: 8, duration: '11 days', isNationalHoliday: false, description: 'The grandest festival of Mumbai — an 11-day celebration of Lord Ganesha with massive public pandals.', aiSummary: 'Ganesh Chaturthi transforms Mumbai into a city of collective devotion and extraordinary public art — over 150,000 Ganesh idols installed across the city, from intimate family shrines to massive public pandals whose Ganesha idols can reach 60 feet in height.', significance: 'Cultural and political identity festival of Maharashtra; over 7 million participate in Mumbai', howItsCelebrated: ['Community pandal installations', 'Daily aarti rituals', 'Cultural programs', 'Visarjan procession on Day 11'], bestPlacesToWitness: ['Lalbaughcha Raja pandal (most famous)', 'Ganesh Galli, Lalbaug', 'Juhu Beach for Visarjan', 'Siddhivinayak Temple area'], popularityScore: 99, emoji: '🐘', tags: ['religious', 'maharashtrian', 'community', 'procession'] },
  ],
  kolkata: [
    { id: 'kol-fest1', citySlug: 'kolkata', name: 'Durga Puja', localName: 'দুর্গা পূজা', type: 'religious', religion: 'Hindu', month: 10, duration: '5 days + year-round preparation', isNationalHoliday: true, description: 'Kolkata\'s greatest festival — a 5-day celebration of Goddess Durga that is also a UNESCO Intangible Cultural Heritage.', aiSummary: 'Durga Puja is Kolkata\'s reason for being — a 5-day festival in October when the entire city transforms into an open-air art gallery of extraordinary scale. Over 2,500 community pandals are constructed throughout Kolkata, each competing to create the most innovative artistic installation.', significance: 'UNESCO Intangible Cultural Heritage (2021); 4.5 million tourists visit Kolkata during Puja', howItsCelebrated: ['Pandal hopping', 'Dhaki drummers performance', 'Sindur Khela on Dashami', 'Idol immersion in Ganges'], bestPlacesToWitness: ['Ekdalia Evergreen Club', 'Mohammad Ali Park', 'Kumartuli', 'Bagbazar Sarbojanin'], popularityScore: 100, emoji: '🪅', tags: ['religious', 'bengali', 'unesco', 'art', 'community'] },
  ],
  amritsar: [
    { id: 'amt-fest1', citySlug: 'amritsar', name: 'Baisakhi', localName: 'ਵਿਸਾਖੀ', type: 'harvest', religion: 'Sikh', month: 4, duration: '1 day (major celebration)', isNationalHoliday: false, description: 'The harvest festival of Punjab and the Sikh New Year, commemorating the founding of the Khalsa.', aiSummary: 'Baisakhi in Amritsar is simultaneously a harvest celebration and a profoundly sacred Sikh occasion — it was on Baisakhi 1699 that Guru Gobind Singh Ji founded the Khalsa Panth at Anandpur Sahib. Across Punjab, the air fills with the thunder of dhol drums and energetic Bhangra.', significance: 'Sikh New Year; founding of the Khalsa (1699)', howItsCelebrated: ['Prabhat Pheris', 'Nagar Kirtan', 'Bhangra and Gidda performances', 'Langar feast'], bestPlacesToWitness: ['Harmandir Sahib (Golden Temple)', 'Anandpur Sahib', 'Jallianwala Bagh memorial'], popularityScore: 95, emoji: '🌾', tags: ['sikh', 'harvest', 'punjabi', 'bhangra', 'new-year'] },
  ],
  mysuru: [
    { id: 'mys-fest1', citySlug: 'mysuru', name: 'Mysore Dasara (Navaratri)', localName: 'ಮೈಸೂರು ದಸರಾ', type: 'cultural', religion: 'Hindu', month: 10, duration: '10 days', isNationalHoliday: true, description: 'The 400-year-old state festival of Karnataka celebrated with the royal Jumboo Savari elephant procession.', aiSummary: 'Dating back to the Vijayanagara Empire in the 15th century and continued by the Wadiyars since 1610, Mysore Dasara culminates on Vijayadashami when the lead tusker carries the golden howdah containing Goddess Chamundeshwari through cheering crowds across Mysore.', significance: 'Karnataka State Festival (Nada Habba) with 400+ years of documented history', howItsCelebrated: ['Palace illumination with 100,000 bulbs', 'Torchlight parade at Bannimantap', 'Jumboo Savari royal procession'], bestPlacesToWitness: ['Mysore Palace grounds', 'Chamundi Hill', 'Sayyaji Rao Road procession route'], popularityScore: 99, emoji: '🐘', tags: ['royal', 'dasara', 'karnataka', 'jumboo-savari'] },
  ],
  ahmedabad: [
    { id: 'ahm-fest1', citySlug: 'ahmedabad', name: 'International Kite Festival (Uttarayan)', localName: 'ઉત્તરાયણ', type: 'cultural', religion: null, month: 1, duration: '2 days', isNationalHoliday: true, description: 'The skies of Ahmedabad erupt with millions of colorful kites celebrating the transition of the sun.', aiSummary: 'On January 14 and 15, all of Ahmedabad takes to the rooftops. Cries of "Kai Po Che!" ring out as kite fliers wage friendly aerial duels from dawn to midnight with tukkal illuminated paper lanterns, feasting on undhiyu, chikki, and jalebis.', significance: 'One of the world\'s largest aerial festivals, drawing master kite-makers globally', howItsCelebrated: ['Rooftop kite battles', 'Night tukkal lantern launches', 'Undhiyu and chikki feast'], bestPlacesToWitness: ['Old City pol rooftops (Khadia, Raipur)', 'Sabarmati Riverfront'], popularityScore: 98, emoji: '🪁', tags: ['kites', 'uttarayan', 'gujarat', 'kai-po-che'] },
  ],
  kochi: [
    { id: 'koc-fest1', citySlug: 'kochi', name: 'Onam & Vallam Kali', localName: 'ഓണം', type: 'harvest', religion: null, month: 8, duration: '10 days', isNationalHoliday: true, description: 'Kerala\'s secular harvest festival welcoming the mythical King Mahabali with flower carpets and snake boat races.', aiSummary: 'Onam unites all Keralites regardless of religion in celebrating prosperity. Homes create intricate floral pookkalams on the floor, families dine on the grand 26-dish Onasadya served on banana leaves, and the backwaters roar with the rhythmic rowing of 100-man chundan vallam snake boats.', significance: 'State festival of Kerala celebrating egalitarian abundance', howItsCelebrated: ['Floral Pookkalam competitions', '26-dish vegetarian Onasadya', 'Snake boat races (Vallam Kali)'], bestPlacesToWitness: ['Thrikkakara Temple (origin site)', 'Marine Drive Kochi', 'Vembanad Lake race points'], popularityScore: 98, emoji: '🌺', tags: ['kerala', 'onam', 'boat-race', 'sadya'] },
  ],
};

export const getLanguageByCity = (slug: string): LanguageProfile[] => {
  if (LANGUAGE_DATA[slug]) return LANGUAGE_DATA[slug];
  // Default regional language profile based on Hindi / standard Devanagari
  return [{
    id: `${slug}-l-gen`,
    citySlug: slug,
    name: 'Hindi & Regional Vernacular',
    nativeName: 'हिन्दी',
    script: 'Devanagari',
    isoCode: 'hi',
    family: 'Indo-Aryan',
    role: 'official',
    nativeSpeakers: '60 Crore+',
    origin: 'Evolved from Sanskrit through Shauraseni Prakrit and Apabhramsha.',
    aiSummary: `Spoken with distinctive local cadence and vocabulary across this historic region, blending ancestral literary terms with everyday urban idioms.`,
    uniqueFeatures: ['Written in Devanagari script', 'Phonetically consistent script', 'Rich vernacular storytelling'],
    commonPhrases: [
      { english: 'Hello', local: 'नमस्ते', transliteration: 'Namaste', pronunciation: 'na-mas-te' },
      { english: 'Thank you', local: 'धन्यवाद', transliteration: 'Dhanyavaad', pronunciation: 'dhan-ya-vaad' },
      { english: 'How are you?', local: 'आप कैसे हैं?', transliteration: 'Aap kaise hain?', pronunciation: 'aap kai-se hain' },
      { english: 'Very good / Delicious!', local: 'बहुत अच्छा!', transliteration: 'Bahut achha!', pronunciation: 'ba-hut ach-haa' },
    ],
    dialects: ['Standard Regional Dialect'],
    isClassicalLanguage: false,
    literaryHistory: 'Centuries of folk songs, oral legends, and regional chronicles enrich the linguistic character of this territory.',
    emoji: '📜',
  }];
};

export const getPlacesByCity = (slug: string): PlaceItem[] => {
  if (PLACES_DATA[slug]) return PLACES_DATA[slug];
  return [
    {
      id: `${slug}-p-gen`,
      citySlug: slug,
      name: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Heritage Quarter & Historic Fort`,
      type: 'monument',
      isHiddenGem: false,
      isUnescoHeritage: false,
      isAsiProtected: true,
      neighborhood: 'Old City Center',
      entryFee: { indian: 25, foreigner: 250 },
      bestTimeToVisit: 'Morning or late afternoon',
      rating: 4.5,
      description: `Historic monuments, ancient gates, and traditional bazaars chronicling the evolution of ${slug}.`,
      aiSummary: `The historic heart of the city exhibits fortified ramparts, ornate stone balconies, and bustling artisan bazaars that carry centuries of regional craftsmanship.`,
      historicalPeriod: 'Medieval / Royal Era',
      popularityScore: 88,
      emoji: '🏛️',
      tags: ['heritage', 'monument', 'old-city'],
    },
  ];
};

export const getCultureByCity = (slug: string): CultureItem[] => {
  if (CULTURE_DATA[slug]) return CULTURE_DATA[slug];
  return [
    {
      id: `${slug}-c-gen`,
      citySlug: slug,
      name: `Traditional Folk Art & Handloom Weaving`,
      type: 'craft',
      era: 'Ancient',
      description: `Generational artisans practicing indigenous craft, pottery, and textile techniques.`,
      aiSummary: `The cultural identity of this city is preserved by hereditary artisan guilds whose woven textiles and brassware reflect ancient folk patterns.`,
      significance: 'Preserved regional craft heritage',
      whereToExperience: ['City Artisan Bazaar', 'State Handloom Emporium'],
      isUnescoHeritage: false,
      popularityScore: 84,
      emoji: '🎨',
      tags: ['craft', 'handloom', 'tradition'],
    },
  ];
};

export const getFestivalsByCity = (slug: string): FestivalItem[] => {
  if (FESTIVAL_DATA[slug]) return FESTIVAL_DATA[slug];
  return [
    {
      id: `${slug}-f-gen`,
      citySlug: slug,
      name: 'Diwali & Regional Utsav',
      localName: 'दीपावली',
      type: 'cultural',
      religion: 'Hindu',
      month: 11,
      duration: '5 days',
      isNationalHoliday: true,
      description: 'The Festival of Lights celebrated with oil lamps, sweet distribution, and neighborhood fireworks.',
      aiSummary: 'The city turns into a sea of glittering earthen diyas, vibrant rangolis, and festive night bazaars welcoming prosperity and light.',
      significance: 'Celebration of triumph of light over darkness',
      howItsCelebrated: ['Lighting clay diyas', 'Exchanging handmade sweets', 'Family pujas'],
      bestPlacesToWitness: ['Old City Bazaars', 'Main Temple Ghats / Town Square'],
      popularityScore: 92,
      emoji: '🪔',
      tags: ['diwali', 'lights', 'celebration'],
    },
  ];
};

