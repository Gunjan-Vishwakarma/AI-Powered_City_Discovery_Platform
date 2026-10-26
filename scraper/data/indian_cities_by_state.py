"""
Master Registry of Indian Cities & Towns grouped State-by-State.
Contains 1,000+ Indian cities, municipal corporations, heritage towns, and district centers.
State order starts with Madhya Pradesh as per workflow requirements.
"""

from typing import Dict, List

INDIAN_CITIES_BY_STATE: Dict[str, List[str]] = {
    # 1. Madhya Pradesh (Starting State - Comprehensive Coverage)
    "Madhya Pradesh": [
        "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna",
        "Ratlam", "Rewa", "Murwara", "Singrauli", "Burhanpur", "Khandwa", "Bhind",
        "Chhindwara", "Guna", "Shivpuri", "Vidisha", "Chhatarpur", "Damoh", "Mandsaur",
        "Khargone", "Neemuch", "Pithampur", "Narmadapuram", "Itarsi", "Sehore", "Betul",
        "Seoni", "Datia", "Nagda", "Dhar", "Mandla", "Sheopur", "Shajapur", "Tikamgarh",
        "Barwani", "Shahdol", "Panna", "Balaghat", "Ashoknagar", "Harda", "Anuppur",
        "Raisen", "Dindori", "Umaria", "Alirajpur", "Jhabua", "Maihar", "Khajuraho",
        "Orchha", "Mandu", "Pachmarhi", "Omkareshwar", "Maheshwar", "Sanchi", "Bhimbetka",
        "Amarkantak", "Chanderi", "Bhedaghat", "Ashta", "Sarangpur", "Sanawad", "Badnagar",
        "Ganjbasoda", "Khurai", "Bina", "Sausar", "Multai", "Sendhwa", "Narsinghpur",
        "Pipariya", "Budhni", "Nasrullaganj", "Jaora", "Alot", "Manawar", "Badnawar",
        "Rajgarh", "Biaora", "Narsinghgarh", "Morena", "Ambah", "Sabalgarh", "Dabra",
        "Raghogarh", "Chitrakoot", "Mauganj", "Kotma", "Nowgong", "Patan", "Sihora",
        "Gotegaon", "Pandhurna", "Amla", "Bhainsdehi", "Timarni", "Khirkiya", "Kukshi",
        "Sardarpur", "Bhanpura", "Garoth", "Shamgarh", "Mahidpur", "Tarana", "Khategaon"
    ],

    # 2. Rajasthan
    "Rajasthan": [
        "Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar",
        "Sikar", "Bharatpur", "Pali", "Sri Ganganagar", "Kishangarh", "Baran", "Dholpur",
        "Tonk", "Beawar", "Hanumangarh", "Sawai Madhopur", "Churu", "Jhunjhunu", "Gangapur",
        "Chittorgarh", "Hindaun", "Bhiwadi", "Bundi", "Nagaur", "Makrana", "Sujangarh",
        "Jaisalmer", "Barmer", "Mount Abu", "Pushkar", "Nathdwara", "Kumbhalgarh", "Ranakpur",
        "Banswara", "Dungarpur", "Jalore", "Pratapgarh", "Rajsamand", "Dausa", "Karauli",
        "Nawalgarh", "Mandawa", "Fatehpur", "Sardarshahar", "Ratangarh", "Pilani", "Chirawa",
        "Neem Ka Thana", "Suratgarh", "Nohar", "Bhadra", "Anupgarh", "Sadulpur", "Khetri",
        "Phalodi", "Balotra", "Sirohi", "Abu Road", "Shahpura", "Kekri", "Deoli", "Merta City",
        "Didwana", "Kuchaman", "Ladnun", "Nawa", "Sambhar", "Chaksu", "Kotputli", "Behror"
    ],

    # 3. Uttar Pradesh
    "Uttar Pradesh": [
        "Lucknow", "Varanasi", "Agra", "Kanpur", "Prayagraj", "Meerut", "Noida", "Ghaziabad",
        "Aligarh", "Bareilly", "Moradabad", "Saharanpur", "Gorakhpur", "Firozabad", "Jhansi",
        "Muzaffarnagar", "Mathura", "Ayodhya", "Rampur", "Shahjahanpur", "Farrukhabad", "Hapur",
        "Mirzapur", "Sambhal", "Amroha", "Hardoi", "Fatehpur", "Raebareli", "Orai", "Sitapur",
        "Bahraich", "Modinagar", "Unnao", "Jaunpur", "Lakhimpur", "Hathras", "Banda",
        "Pilibhit", "Barabanki", "Mughalsarai", "Khurja", "Gonda", "Mainpuri", "Lalitpur",
        "Etah", "Deoria", "Ghazipur", "Sultanpur", "Azamgarh", "Bijnor", "Basti", "Chandauli",
        "Ballia", "Vrindavan", "Sarnath", "Kushinagar", "Fatehpur Sikri", "Shamli", "Baraut",
        "Baghpat", "Khekra", "Dadri", "Jewar", "Sikandrabad", "Bulandshahr", "Anupshahr",
        "Kosi Kalan", "Chhata", "Govardhan", "Barsana", "Tundla", "Shikohabad", "Sirasaganj",
        "Jaswantnagar", "Saifai", "Etawah", "Bharthana", "Auraiya", "Bidhuna", "Kannauj",
        "Chhibramau", "Bilhaur", "Ghatampur", "Pukhrayan", "Akbarpur", "Rura", "Jhinjhak"
    ],

    # 4. Maharashtra
    "Maharashtra": [
        "Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Chhatrapati Sambhajinagar", "Solapur",
        "Kolhapur", "Amravati", "Nanded", "Sangli", "Jalgaon", "Akola", "Latur", "Dhule",
        "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Navi Mumbai", "Panvel",
        "Satara", "Beed", "Yavatmal", "Gondia", "Wardha", "Barshi", "Achalpur", "Dharashiv",
        "Nandurbar", "Ratnagiri", "Shirdi", "Mahabaleshwar", "Lonavala", "Khandala", "Alibaug",
        "Matheran", "Panchgani", "Sindhudurg", "Palghar", "Bhandara", "Gadchiroli", "Washim",
        "Hingoli", "Buldhana", "Kalyan-Dombivli", "Mira-Bhayandar", "Bhiwandi", "Ulhasnagar",
        "Malegaon", "Badlapur", "Ambernath", "Vasai-Virar", "Karjat", "Khopoli", "Pen", "Roha",
        "Chiplun", "Khed", "Sawantwadi", "Malvan", "Vengurla", "Karad", "Phaltan", "Wai",
        "Baramati", "Daund", "Shirur", "Talegaon", "Chakan", "Saswad", "Bhor", "Junnar"
    ],

    # 5. Gujarat
    "Gujarat": [
        "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh",
        "Gandhinagar", "Anand", "Navsari", "Surendranagar", "Morbi", "Bharuch", "Porbandar",
        "Godhra", "Veraval", "Bhuj", "Ankleshwar", "Botad", "Palanpur", "Patan", "Dahod",
        "Jetpur", "Valsad", "Kalol", "Gondal", "Deesa", "Amreli", "Mehsana", "Nadiad",
        "Somnath", "Dwarka", "Gir", "Diu", "Daman", "Modhera", "Champaner", "Mandvi",
        "Kevadia", "Saputara", "Vapi", "Bilimora", "Bardoli", "Vyara", "Rajpipla", "Karjan",
        "Dabhoi", "Padra", "Halol", "Lunawada", "Balasinor", "Kapadvanj", "Dakore", "Petlad",
        "Khambhat", "Borsad", "Tarapur", "Dholka", "Dhandhuka", "Sanand", "Bavla", "Viramgam",
        "Kadi", "Unjha", "Visnagar", "Vadnagar", "Kheralu", "Sidhpur", "Radhanpur", "Tharad"
    ],

    # 6. Karnataka
    "Karnataka": [
        "Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Kalaburagi",
        "Davanagere", "Ballari", "Vijayapura", "Shivamogga", "Tumakuru", "Raichur", "Bidar",
        "Hosapete", "Gadag-Betageri", "Robertsonpet", "Hassan", "Bhadravati", "Chitradurga",
        "Udupi", "Kolar", "Mandya", "Chikkamagaluru", "Hampi", "Badami", "Gokarna", "Pattadakal",
        "Aihole", "Coorg", "Madikeri", "Belur", "Halebidu", "Bijapur", "Karwar", "Dandeli",
        "Chamarajanagar", "Ramanagara", "Bagalkote", "Yadgir", "Koppal", "Haveri", "Sirsi",
        "Kumta", "Bhatkal", "Honnavar", "Kundapura", "Karkala", "Puttur", "Bantwal", "Sullia",
        "Sringeri", "Mudigere", "Kadur", "Tarikere", "Arsikere", "Channarayapatna", "Holenarasipura",
        "Sakleshpur", "Channapatna", "Kanakapura", "Magadi", "Nelamangala", "Doddaballapura",
        "Devanahalli", "Hosakote", "Bangarapet", "Malur", "Mulbagal", "Srinivaspur", "Chintamani",
        "Sidlaghatta", "Gauribidanur", "Bagepalli", "Madhugiri", "Sira", "Tiptur", "Gubbi"
    ],

    # 7. Tamil Nadu
    "Tamil Nadu": [
        "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode",
        "Tirunelveli", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet", "Sivakasi",
        "Karur", "Udhagamandalam", "Hosur", "Nagercoil", "Kanchipuram", "Kumarapalayam",
        "Karaikkudi", "Neyveli", "Cuddalore", "Kumbakonam", "Tiruvannamalai", "Pollachi",
        "Rajapalayam", "Gudiyatham", "Pudukkottai", "Vaniyambadi", "Ambur", "Nagapattinam",
        "Rameswaram", "Kanyakumari", "Mamallapuram", "Chidambaram", "Kodaikanal", "Yercaud",
        "Dharmapuri", "Krishnagiri", "Namakkal", "Perambalur", "Ariyalur", "Tiruvarur",
        "Theni", "Virudhunagar", "Tenkasi", "Tirupathur", "Chengalpattu", "Arakkonam", "Arcot",
        "Walajapet", "Sholinghur", "Tiruttani", "Tiruvallur", "Avadi", "Tambaram", "Poonamallee",
        "Maraimalai Nagar", "Madurantakam", "Cheyyar", "Arani", "Polur", "Vandavasi", "Gingee",
        "Tindivanam", "Villupuram", "Kallakurichi", "Ulundurpet", "Virudhachalam", "Panruti"
    ],

    # 8. West Bengal
    "West Bengal": [
        "Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda",
        "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian", "Ranaghat",
        "Haldia", "Raiganj", "Krishnanagar", "Nabadwip", "Midnapore", "Jalpaiguri", "Balurghat",
        "Basirhat", "Bankura", "Darjeeling", "Kalimpong", "Shantiniketan", "Bishnupur", "Murshidabad",
        "Cooch Behar", "Alipurduar", "Purulia", "Digha", "Sundarbans", "Jhargram", "Barasat",
        "Barrackpore", "Bhatpara", "Naihati", "Kanchrapara", "Kalyani", "Bongaon", "Rishra",
        "Serampore", "Baidyabati", "Bhadreswar", "Champdani", "Chandannagar", "Hooghly-Chinsurah",
        "Bansberia", "Tribeni", "Tarakeswar", "Arambagh", "Kalna", "Katwa", "Memari", "Gushkara",
        "Bolpur", "Suri", "Rampurhat", "Sainthia", "Dubrajpur", "Raghunathpur", "Adra", "Jhalda"
    ],

    # 9. Kerala
    "Kerala": [
        "Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Alappuzha",
        "Palakkad", "Malappuram", "Kannur", "Manjeri", "Thalassery", "Kottayam", "Kasaragod",
        "Wayanad", "Munnar", "Varkala", "Kovalam", "Kumarakom", "Bekal", "Pathanamthitta",
        "Idukki", "Aluva", "Changanassery", "Ponnani", "Kanhangad", "Payyanur", "Tirur",
        "Perinthalmanna", "Nilambur", "Kottakkal", "Kondotty", "Tanur", "Parappanangadi",
        "Feroke", "Ramanattukara", "Koduvally", "Muvattupuzha", "Kothamangalam", "Perumbavoor",
        "Angamaly", "North Paravur", "Kalamassery", "Thrikkakara", "Tripunithura", "Maradu",
        "Cherthala", "Kayamkulam", "Mavelikkara", "Chengannur", "Haripad", "Adoor", "Thiruvalla"
    ],

    # 10. Andhra Pradesh
    "Andhra Pradesh": [
        "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Kakinada",
        "Rajamahendravaram", "Kadapa", "Mangalagiri-Tadepalle", "Tirupati", "Anantapur", "Ongole",
        "Eluru", "Nandyal", "Machilipatnam", "Adoni", "Tenali", "Proddatur", "Chittoor",
        "Hindupur", "Bhimavaram", "Madanapalle", "Guntakal", "Srikakulam", "Dharmavaram",
        "Gudivada", "Narasaraopet", "Tadipatri", "Amaravati", "Lepakshi", "Araku Valley",
        "Palakollu", "Tadepalligudem", "Tanuku", "Narsapur", "Jaggayyapet", "Nuzvid", "Gudiyatham",
        "Sattenapalle", "Vinukonda", "Macherla", "Ponnur", "Bapatla", "Repalle", "Chirala",
        "Kandukur", "Markapur", "Giddalur", "Kanigiri", "Kavali", "Gudur", "Venkatagiri",
        "Sullurpeta", "Naidupeta", "Nagari", "Puttur", "Punganur", "Palamaner", "Kuppam", "Rayachoti"
    ],

    # 11. Telangana
    "Telangana": [
        "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Ramagundam",
        "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Siddipet",
        "Jagtial", "Mancherial", "Nirmal", "Kothagudem", "Bodhan", "Kamareddy", "Gadwal",
        "Wanaparthy", "Bhongir", "Medak", "Palwancha", "Vikarabad", "Jangaon", "Bellampalli",
        "Mandamarri", "Kyathanpally", "Chennur", "Luxettipet", "Khanapur", "Bhainsa", "Asifabad",
        "Kagaznagar", "Sirpur", "Utnoor", "Boath", "Metpalli", "Korutla", "Raikal", "Dharmapuri",
        "Vemulawada", "Sircilla", "Choppadandi", "Huzurabad", "Jammikunta", "Peddapalli", "Sultanabad"
    ],

    # 12. Punjab
    "Punjab": [
        "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali",
        "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar",
        "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Sangrur", "Fazilka", "Gurdaspur",
        "Rupnagar", "Tarn Taran", "Faridkot", "Mansa", "Fatehgarh Sahib", "Nawanshahr",
        "Zirakpur", "Kharar", "Kurali", "Derabassi", "Morinda", "Chamkaur Sahib", "Anandpur Sahib",
        "Nangal", "Dasuya", "Mukerian", "Garhshankar", "Urmar Tanda", "Nakodar", "Shahkot", "Phillaur",
        "Goraya", "Samrala", "Payal", "Raikot", "Jagraon", "Mullanpur Dakha", "Dharankot", "Kotkapura"
    ],

    # 13. Haryana
    "Haryana": [
        "Faridabad", "Gurugram", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar",
        "Karnal", "Sonipat", "Panchkula", "Bhiwani", "Sirsa", "Bahadurgarh", "Jind",
        "Thanesar", "Kaithal", "Rewari", "Palwal", "Hansi", "Narnaul", "Fatehabad",
        "Kurukshetra", "Tohana", "Narwana", "Charkhi Dadri", "Pehowa", "Sohna", "Manesar",
        "Kalka", "Pinjore", "Naraingarh", "Barwala", "Shahbad", "Ladwa", "Radaur", "Jagadhri",
        "Bilaspur", "Sadhaura", "Cheeka", "Guhla", "Pundri", "Kalayat", "Nilokheri", "Taraori",
        "Nissing", "Gharaunda", "Assandh", "Indri", "Samalkha", "Ganaur", "Gohana", "Kharkhoda"
    ],

    # 14. Bihar
    "Bihar": [
        "Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif",
        "Arrah", "Begusarai", "Katihar", "Munger", "Chhapra", "Danapur", "Bettiah", "Saharsa",
        "Sasaram", "Hajipur", "Dehri", "Siwan", "Motihari", "Nawada", "Bagaha", "Buxar",
        "Kishanganj", "Sitamarhi", "Jamalpur", "Jehanabad", "Aurangabad", "Rajgir", "Nalanda",
        "Bodh Gaya", "Vaishali", "Madhubani", "Samastipur", "Jamui", "Banka", "Narkatiaganj",
        "Ramnagar", "Raxaul", "Sugauli", "Chakia", "Dhaka", "Bairgania", "Sheohar", "Dumra",
        "Belsand", "Pupri", "Jhanjharpur", "Benipatti", "Rosera", "Dalsinghsarai", "Shahpur Patori",
        "Mahnar", "Lalganj", "Mahua", "Dighwara", "Sonpur", "Marhaura", "Revelganj", "Ekma"
    ],

    # 15. Odisha
    "Odisha": [
        "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore",
        "Bhadrak", "Baripada", "Jharsuguda", "Jeypore", "Bargarh", "Rayagada", "Bolangir",
        "Kendrapara", "Dhenkanal", "Konark", "Paradip", "Angul", "Jajpur", "Koraput",
        "Keonjhar", "Phulbani", "Sundargarh", "Gopalpur", "Chilika", "Jatni", "Khordha",
        "Pipili", "Nimapada", "Choudwar", "Banki", "Athagarh", "Jagatsinghpur", "Pattamundai",
        "Chandbali", "Dhamra", "Soro", "Jaleswar", "Nilagiri", "Rairangpur", "Karanjia",
        "Talcher", "Kamakhyanagar", "Bhuban", "Hinjilicut", "Chhatrapur", "Aska", "Bhanjanagar", "Digapahandi"
    ],

    # 16. Assam
    "Assam": [
        "Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur",
        "Bongaigaon", "Karimganj", "Sivasagar", "Goalpara", "North Lakhimpur", "Barpeta",
        "Dhubri", "Diphu", "Hailakandi", "Kokrajhar", "Golaghat", "Mangaldai", "Haflong",
        "Kaziranga", "Majuli", "Morigaon", "Dhemaji", "Nalbari", "Rangia", "Palasbari",
        "Hojai", "Lanka", "Lumding", "Digboi", "Margherita", "Naharkatiya", "Chabua", "Nazira",
        "Sonari", "Moranhat", "Bihpuria", "Narayanpur", "Jonai", "Silapathar", "Gohpur", "Biswanath Chariali"
    ],

    # 17. Jharkhand
    "Jharkhand": [
        "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Phusro",
        "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Chirkunda", "Chaibasa", "Gumia",
        "Dumka", "Madhupur", "Sahibganj", "Pakur", "Simdega", "Netarhat", "Parasnath",
        "Chakradharpur", "Ghatshila", "Musabani", "Jaduguda", "Adityapur", "Saraikela",
        "Kandra", "Chandil", "Bermo", "Tenughat", "Bokaro Thermal", "Gomoh", "Katras", "Jharia",
        "Sindri", "Nirsa", "Barhi", "Barkakana", "Patratu", "Koderma", "Jhumri Telaiya", "Domchanch"
    ],

    # 18. Chhattisgarh
    "Chhattisgarh": [
        "Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Raigarh",
        "Ambikapur", "Durg", "Dhamtari", "Mahasamund", "Chirmiri", "Kanker", "Kawardha",
        "Janjgir", "Champa", "Bhatapara", "Mainpat", "Bastar", "Dantewada", "Charoda",
        "Kumhari", "Jamul", "Tilda Newra", "Gobranawapara", "Arang", "Balod", "Dalli-Rajhara",
        "Bemetara", "Mungeli", "Takhatpur", "Ratanpur", "Kota", "Pendra", "Gaurela", "Sakti",
        "Akaltara", "Naila Janjgir", "Kharsia", "Sarangarh", "Gharghoda", "Pathalgaon", "Jashpur"
    ],

    # 19. Uttarakhand
    "Uttarakhand": [
        "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh",
        "Nainital", "Mussoorie", "Almora", "Pithoragarh", "Kichha", "Ramnagar", "Manglaur",
        "Badrinath", "Kedarnath", "Gangotri", "Yamunotri", "Auli", "Ranikhet", "Chakrata",
        "Joshimath", "Uttarkashi", "Kausani", "Lansdowne", "Mukteshwar", "Kotdwar", "Pauri",
        "Srinagar Garhwal", "Rudraprayag", "Karnaprayag", "Gopeshwar", "Chamoli", "Tehri",
        "New Tehri", "Narendra Nagar", "Chamba Garhwal", "Barkot", "Purola", "Didihat", "Dharchula", "Bageshwar"
    ],

    # 20. Himachal Pradesh
    "Himachal Pradesh": [
        "Shimla", "Dharamshala", "Solan", "Mandi", "Kullu", "Manali", "Baddi", "Nahan",
        "Chamba", "Una", "Hamirpur", "Bilaspur", "Dalhousie", "Kasauli", "Spiti", "Kaza",
        "Palampur", "Parwanoo", "Kangra", "Keylong", "Kinnaur", "Kalpa", "Nalagarh",
        "Paonta Sahib", "Sundernagar", "Jogindernagar", "Sarkaghat", "Baijnath", "Nurpur",
        "Jawalamukhi", "Dehra Gopipur", "Nagrota Bagwan", "Mehatpur", "Santokhgarh", "Amb", "Gagret", "Nadaun"
    ],

    # 21. Goa
    "Goa": [
        "Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Calangute", "Candolim",
        "Baga", "Anjuna", "Old Goa", "Canacona", "Bicholim", "Curchorem", "Cuncolim",
        "Sanquelim", "Valpoi", "Pernem", "Quepem", "Sanguem", "Dharbandora", "Aldona", "Assagao", "Vagator"
    ],

    # 22. Jammu and Kashmir
    "Jammu and Kashmir": [
        "Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Udhampur", "Sopore",
        "Punch", "Rajouri", "Ganderbal", "Pulwama", "Kulgam", "Gulmarg", "Pahalgam",
        "Sonamarg", "Katra", "Patnitop", "Doda", "Kishtwar", "Ramban", "Akhnoor", "R.S. Pura",
        "Bishnah", "Samba", "Hiranagar", "Billawar", "Basholi", "Chenani", "Ramnagar J&K",
        "Reasi", "Banihal", "Batote", "Bhaderwah", "Thathri", "Bandi Pora", "Handwara", "Kupwara"
    ],

    # 23. Ladakh
    "Ladakh": [
        "Leh", "Kargil", "Nubra Valley", "Diskit", "Pangong", "Zanskar", "Drass", "Hunder", "Turtuk", "Padum"
    ],

    # 24. Chandigarh (UT)
    "Chandigarh": [
        "Chandigarh", "Manimajra"
    ],

    # 25. Delhi (NCT)
    "Delhi (NCT)": [
        "Delhi", "New Delhi", "Old Delhi", "Dwarka", "Rohini", "Connaught Place",
        "Karol Bagh", "Chandni Chowk", "Saket", "Hauz Khas", "Vasant Kunj", "Shahdara",
        "Laxmi Nagar", "Mayur Vihar", "Janakpuri", "Pitampura", "Najafgarh", "Narela"
    ],

    # 26. Tripura
    "Tripura": [
        "Agartala", "Dharmanagar", "Udaipur", "Kailashahar", "Belonia", "Khowai", "Ambassa",
        "Ranirbazar", "Teliamura", "Bishalgarh", "Melaghar", "Sonamura", "Santirbazar", "Sabroom", "Kumarghat"
    ],

    # 27. Meghalaya
    "Meghalaya": [
        "Shillong", "Tura", "Nongpoh", "Jowai", "Cherrapunji", "Mawlynnong", "Dawki", "Williamnagar",
        "Resubelpara", "Baghmara", "Mairang", "Nongstoin", "Khliehriat", "Ampati"
    ],

    # 28. Manipur
    "Manipur": [
        "Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul", "Kakching", "Senapati",
        "Moirang", "Lilong", "Mayang Imphal", "Wangoi", "Nambol", "Kwakeithel", "Jiribam"
    ],

    # 29. Nagaland
    "Nagaland": [
        "Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Phek",
        "Chumukedima", "Medziphema", "Tseminyu", "Pfutsero", "Kiphire", "Longleng", "Peren", "Noklak"
    ],

    # 30. Mizoram
    "Mizoram": [
        "Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Saitual",
        "Hnahthial", "Khawzawl", "Mamit", "Vairengte", "Bairabi", "Zawlnuam", "Tlabung"
    ],

    # 31. Arunachal Pradesh
    "Arunachal Pradesh": [
        "Itanagar", "Naharlagun", "Tawang", "Pasighat", "Ziro", "Bomdila", "Along", "Tezu",
        "Roing", "Namsai", "Changlang", "Khonsa", "Seppa", "Daporijo", "Yingkiong", "Anini"
    ],

    # 32. Sikkim
    "Sikkim": [
        "Gangtok", "Namchi", "Geyzing", "Mangan", "Pelling", "Ravangla", "Yuksom", "Lachung",
        "Lachen", "Jorethang", "Singtam", "Rangpo", "Rhenock", "Pakyong", "Soreng"
    ],

    # 33. Puducherry (UT)
    "Puducherry": [
        "Puducherry", "Karaikal", "Yanam", "Mahe", "Auroville", "Ozhukarai", "Villianur", "Bahour"
    ],

    # 34. Andaman and Nicobar Islands (UT)
    "Andaman and Nicobar": [
        "Port Blair", "Havelock Island", "Neil Island", "Diglipur", "Rangat", "Mayabunder", "Garacharma", "Bambooflat"
    ],

    # 35. Dadra and Nagar Haveli and Daman and Diu (UT)
    "Dadra and Nagar Haveli and Daman and Diu": [
        "Daman", "Diu", "Silvassa", "Amli", "Dadra", "Naroli"
    ],

    # 36. Lakshadweep (UT)
    "Lakshadweep": [
        "Kavaratti", "Agatti", "Andrott", "Minicoy", "Amini", "Kalpeni", "Kadmat"
    ],
}

def get_all_states() -> List[str]:
    """Returns list of all Indian states & UTs in prioritized order starting with MP."""
    return list(INDIAN_CITIES_BY_STATE.keys())

def get_cities_in_state(state_name: str) -> List[str]:
    """Returns cities for a specific state (case-insensitive lookup)."""
    for state, cities in INDIAN_CITIES_BY_STATE.items():
        if state.lower() == state_name.lower():
            return cities
    return []

def get_total_city_count() -> int:
    """Returns total count of cities across all states."""
    return sum(len(cities) for cities in INDIAN_CITIES_BY_STATE.values())
