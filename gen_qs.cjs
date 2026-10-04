const fs = require('fs');

const stationsData = [
  {
    id: '1', title: 'Pembentukan Malaysia', iconName: 'Map', color: 'bg-blue-500', description: 'Ketahui sejarah gagasan dan pembentukan negara Malaysia.',
    questions: [
      { text: 'Idea gagasan Malaysia dicadangkan oleh siapa?', options: ['Tun Abdul Razak', 'Tunku Abdul Rahman', 'Tun Hussein Onn', 'Dato\' Onn Jaafar'], correctAnswer: 1 },
      { text: 'Bilakah Malaysia ditubuhkan dengan rasminya?', options: ['31 Ogos 1957', '16 September 1963', '13 Mei 1969', '31 Ogos 1963'], correctAnswer: 1 },
      { text: 'Negeri manakah yang turut serta membentuk Malaysia tetapi keluar pada 1965?', options: ['Brunei', 'Singapura', 'Sarawak', 'Sabah'], correctAnswer: 1 },
      { text: 'Apakah salah satu tujuan utama pembentukan Malaysia?', options: ['Memajukan sosioekonomi', 'Membina empayar baru', 'Menjajah', 'Menjadi kuasa besar'], correctAnswer: 0 },
      { text: 'Siapakah tokoh dari Sarawak yang menyokong kuat pembentukan Malaysia?', options: ['Donald Stephens', 'Temenggung Jugah', 'Tun Datu Mustapha', 'Ong Yoke Lin'], correctAnswer: 1 },
      { text: 'Siapakah Pengerusi Suruhanjaya Cobbold?', options: ['Lord Cobbold', 'Wong Pow Nee', 'Ghazali Shafie', 'Anthony Abell'], correctAnswer: 0 },
      { text: 'Suruhanjaya Cobbold ditubuhkan untuk meninjau pandangan rakyat di mana?', options: ['Singapura dan Brunei', 'Sabah dan Sarawak', 'Tanah Melayu dan Singapura', 'Brunei dan Sabah'], correctAnswer: 1 },
      { text: 'Apakah reaksi awal Indonesia terhadap pembentukan Malaysia?', options: ['Menyokong', 'Menentang (Ganyang Malaysia)', 'Berkecuali', 'Membantu'], correctAnswer: 1 },
      { text: 'Negara manakah yang menuntut hak ke atas Sabah semasa pembentukan Malaysia?', options: ['Indonesia', 'Brunei', 'Filipina', 'Thailand'], correctAnswer: 2 },
      { text: 'Perjanjian Malaysia telah ditandatangani di mana?', options: ['Kuala Lumpur', 'Singapura', 'London', 'Jesselton'], correctAnswer: 2 },
      { text: 'Bilakah Perjanjian Malaysia ditandatangani?', options: ['9 Julai 1963', '16 September 1963', '31 Ogos 1957', '13 Mei 1969'], correctAnswer: 0 },
      { text: 'Pemberontakan Brunei 1962 dipimpin oleh siapa?', options: ['A.M. Azahari', 'Soekarno', 'Macapagal', 'Lee Kuan Yew'], correctAnswer: 0 },
      { text: 'Siapakah Wakil PBB yang datang untuk meninjau semula pandangan rakyat Sabah dan Sarawak?', options: ['Lord Cobbold', 'U Thant / Lawrence Michelmore', 'Lord Lansdowne', 'Sir Anthony Abell'], correctAnswer: 1 },
      { text: 'Gagasan Malaysia pada asalnya dicadangkan merangkumi berapa buah wilayah?', options: ['3', '4', '5', '6'], correctAnswer: 2 },
      { text: 'Apakah jawatan Tunku Abdul Rahman semasa mencadangkan Gagasan Malaysia?', options: ['Ketua Menteri Tanah Melayu', 'Perdana Menteri Tanah Melayu', 'Presiden UMNO', 'Menteri Dalam Negeri'], correctAnswer: 1 },
      { text: 'Siapakah pemimpin Singapura yang menyokong pembentukan Malaysia?', options: ['David Marshall', 'Lee Kuan Yew', 'Goh Chok Tong', 'Ong Teng Cheong'], correctAnswer: 1 },
      { text: 'Parti manakah di Brunei yang menentang pembentukan Malaysia?', options: ['Parti Rakyat Brunei (PRB)', 'Parti Perikatan', 'SUPP', 'UNKO'], correctAnswer: 0 },
      { text: 'Siapakah tokoh Sabah yang mengasaskan UNKO?', options: ['Donald Stephens', 'Tun Datu Mustapha', 'Temenggung Jugah', 'Ong Kee Hui'], correctAnswer: 0 },
      { text: 'Apakah nama ibu negeri Sabah sebelum ditukar kepada Kota Kinabalu?', options: ['Sandakan', 'Tawau', 'Jesselton', 'Kudat'], correctAnswer: 2 },
      { text: 'Siapakah Yang di-Pertuan Agong pertama bagi Persekutuan Malaysia 1963?', options: ['Tuanku Abdul Rahman', 'Tuanku Syed Putra Jamalullail', 'Sultan Hisamuddin', 'Sultan Ismail Nasiruddin'], correctAnswer: 1 }
    ]
  },
  {
    id: '2', title: 'Negeri-negeri di Malaysia', iconName: 'Flag', color: 'bg-red-500', description: 'Kenali 13 buah negeri dan 3 Wilayah Persekutuan di Malaysia.',
    questions: [
      { text: 'Berapakah jumlah negeri di Malaysia?', options: ['11', '12', '13', '14'], correctAnswer: 2 },
      { text: 'Apakah ibu negeri bagi Sabah?', options: ['Kuching', 'Kota Kinabalu', 'Sandakan', 'Tawau'], correctAnswer: 1 },
      { text: 'Negeri manakah dikenali dengan gelaran Darul Makmur?', options: ['Pahang', 'Kedah', 'Johor', 'Perak'], correctAnswer: 0 },
      { text: 'Apakah gelaran ketua negeri bagi Pulau Pinang, Melaka, Sarawak dan Sabah?', options: ['Sultan', 'Raja', 'Yang di-Pertuan Besar', 'Yang di-Pertua Negeri'], correctAnswer: 3 },
      { text: 'Bendera negeri manakah mempunyai warna kuning, hitam dan putih?', options: ['Pahang', 'Perak', 'Terengganu', 'Kelantan'], correctAnswer: 1 },
      { text: 'Apakah ibu negeri bagi Sarawak?', options: ['Miri', 'Sibu', 'Bintulu', 'Kuching'], correctAnswer: 3 },
      { text: 'Negeri manakah yang terletak di paling utara Semenanjung Malaysia?', options: ['Kedah', 'Perak', 'Perlis', 'Kelantan'], correctAnswer: 2 },
      { text: 'Wilayah Persekutuan Labuan terletak berhampiran negeri mana?', options: ['Sarawak', 'Sabah', 'Terengganu', 'Pahang'], correctAnswer: 1 },
      { text: 'Apakah ibu negeri Johor?', options: ['Muar', 'Batu Pahat', 'Kluang', 'Johor Bahru'], correctAnswer: 3 },
      { text: 'Negeri manakah yang terkenal dengan jolokan "Negeri Jelapang Padi"?', options: ['Perlis', 'Kedah', 'Kelantan', 'Perak'], correctAnswer: 1 },
      { text: 'Apakah gelaran untuk negeri Kelantan?', options: ['Darul Ehsan', 'Darul Naim', 'Darul Ridzuan', 'Darul Khusus'], correctAnswer: 1 },
      { text: 'Ketua negeri bagi Negeri Sembilan digelar?', options: ['Sultan', 'Raja', 'Yang di-Pertuan Besar', 'Yang di-Pertua Negeri'], correctAnswer: 2 },
      { text: 'Bandar diraja bagi negeri Perak ialah?', options: ['Ipoh', 'Kuala Kangsar', 'Taiping', 'Teluk Intan'], correctAnswer: 1 },
      { text: 'Negeri manakah yang tidak mempunyai Sultan atau Raja?', options: ['Johor', 'Pahang', 'Melaka', 'Selangor'], correctAnswer: 2 },
      { text: 'Berapakah jumlah Wilayah Persekutuan di Malaysia?', options: ['2', '3', '4', '5'], correctAnswer: 1 },
      { text: 'Wilayah Persekutuan Putrajaya berfungsi sebagai?', options: ['Pusat pelancongan', 'Pusat pentadbiran kerajaan persekutuan', 'Pusat kewangan antarabangsa', 'Pelabuhan utama'], correctAnswer: 1 },
      { text: 'Bendera negeri manakah yang mempunyai tiga jalur tebal biru, kuning, putih?', options: ['Perlis', 'Sabah', 'Sarawak', 'Melaka'], correctAnswer: 0 },
      { text: 'Bendera negeri manakah yang mengandungi warna merah, biru, kuning dan putih serta berjalur empat di penjuru?', options: ['Kuala Lumpur', 'Selangor', 'Melaka', 'Johor'], correctAnswer: 0 },
      { text: 'Apakah gelaran bagi negeri Selangor?', options: ['Darul Ehsan', 'Darul Takzim', 'Darul Aman', 'Darul Ridzuan'], correctAnswer: 0 },
      { text: 'Ibu negeri bagi Terengganu ialah?', options: ['Kota Bharu', 'Kuala Terengganu', 'Kuantan', 'Dungun'], correctAnswer: 1 }
    ]
  },
  {
    id: '3', title: 'Rukun Negara', iconName: 'BookOpen', color: 'bg-green-500', description: 'Fahami 5 prinsip Rukun Negara.',
    questions: [
      { text: 'Bilakah Rukun Negara diisytiharkan?', options: ['31 Ogos 1957', '16 September 1963', '31 Ogos 1970', '13 Mei 1969'], correctAnswer: 2 },
      { text: 'Apakah prinsip PERTAMA Rukun Negara?', options: ['Kesetiaan kepada Raja', 'Kepercayaan kepada Tuhan', 'Keluhuran Perlembagaan', 'Kedaulatan Undang-undang'], correctAnswer: 1 },
      { text: 'Mengapakah Rukun Negara dibentuk?', options: ['Memupuk perpaduan kaum', 'Memajukan ekonomi', 'Membina bangunan', 'Menakutkan musuh'], correctAnswer: 0 },
      { text: 'Prinsip Kesopanan dan Kesusilaan menekankan tentang?', options: ['Kekayaan harta', 'Tingkah laku mulia', 'Keberanian', 'Kebebasan mutlak'], correctAnswer: 1 },
      { text: 'Ideologi Rukun Negara dibentuk berikutan peristiwa apa?', options: ['31 Ogos 1957', '16 September 1963', '13 Mei 1969', '1 Januari 2000'], correctAnswer: 2 },
      { text: 'Apakah prinsip KETIGA Rukun Negara?', options: ['Kepercayaan kepada Tuhan', 'Kesetiaan kepada Raja dan Negara', 'Keluhuran Perlembagaan', 'Kedaulatan Undang-undang'], correctAnswer: 2 },
      { text: 'Majlis apakah yang menggubal Rukun Negara?', options: ['Majlis Gerakan Negara (MAGERAN)', 'Majlis Keselamatan Negara', 'Majlis Raja-Raja', 'Kabinet Malaysia'], correctAnswer: 0 },
      { text: 'Siapakah yang mengisytiharkan Rukun Negara?', options: ['Tunku Abdul Rahman', 'Yang di-Pertuan Agong ke-4', 'Tun Abdul Razak', 'Tun Dr Mahathir'], correctAnswer: 1 },
      { text: 'Prinsip "Kesetiaan kepada Raja dan Negara" bermaksud rakyat mesti setia kepada?', options: ['Perdana Menteri', 'Yang di-Pertuan Agong', 'Ketua Menteri', 'Ahli Parlimen'], correctAnswer: 1 },
      { text: 'Apakah prinsip KEEMPAT Rukun Negara?', options: ['Keluhuran Perlembagaan', 'Kedaulatan Undang-undang', 'Kesopanan dan Kesusilaan', 'Kepercayaan kepada Tuhan'], correctAnswer: 1 },
      { text: 'Berapakah bilangan prinsip Rukun Negara?', options: ['3', '4', '5', '6'], correctAnswer: 2 },
      { text: 'Rukun Negara bertujuan untuk mencipta satu masyarakat yang?', options: ['Adil dan saksama', 'Kaya dan berkuasa', 'Berpecah belah', 'Mementingkan diri'], correctAnswer: 0 },
      { text: 'Apakah prinsip KELIMA Rukun Negara?', options: ['Kepercayaan kepada Tuhan', 'Keluhuran Perlembagaan', 'Kedaulatan Undang-undang', 'Kesopanan dan Kesusilaan'], correctAnswer: 3 },
      { text: 'Rukun Negara dibentuk untuk memastikan keharmonian antara?', options: ['Negara jiran', 'Kaum di Malaysia', 'Kerajaan dan pembangkang', 'Negeri-negeri'], correctAnswer: 1 },
      { text: 'Apakah maksud "Keluhuran Perlembagaan"?', options: ['Perlembagaan boleh diubah sesuka hati', 'Ketinggian dan keagungan Perlembagaan', 'Perlembagaan tidak penting', 'Hanya pemimpin perlu patuh'], correctAnswer: 1 },
      { text: 'Siapakah ketua MAGERAN yang memainkan peranan penting dalam pembentukan Rukun Negara?', options: ['Tun Abdul Razak', 'Tun Hussein Onn', 'Tunku Abdul Rahman', 'Tun Dr Ismail'], correctAnswer: 0 },
      { text: 'Prinsip "Kedaulatan Undang-undang" bermaksud?', options: ['Undang-undang hanya untuk orang miskin', 'Setiap rakyat tertakluk kepada undang-undang', 'Raja bebas dari undang-undang', 'Polis mencipta undang-undang'], correctAnswer: 1 },
      { text: 'Rukun Negara sering diikrarkan semasa perhimpunan di?', options: ['Pasar raya', 'Sekolah', 'Stadium bola sepak', 'Panggung wayang'], correctAnswer: 1 },
      { text: 'Tujuan Rukun Negara adalah untuk membina sebuah negara yang?', options: ['Mundur', 'Berpecah', 'Bersatu padu', 'Lemah'], correctAnswer: 2 },
      { text: 'Menghormati agama lain adalah selari dengan prinsip Rukun Negara yang mana?', options: ['Pertama', 'Kedua', 'Ketiga', 'Keempat'], correctAnswer: 0 }
    ]
  },
  {
    id: '4', title: 'Kaum di Malaysia', iconName: 'Users', color: 'bg-yellow-500', description: 'Kenali kepelbagaian kaum dan etnik.',
    questions: [
      { text: 'Apakah kaum majoriti di Malaysia?', options: ['Cina', 'India', 'Melayu', 'Iban'], correctAnswer: 2 },
      { text: 'Etnik Iban secara majoritinya menetap di negeri mana?', options: ['Sabah', 'Sarawak', 'Pahang', 'Johor'], correctAnswer: 1 },
      { text: 'Kaum Kadazandusun merupakan kaum etnik terbesar di negeri?', options: ['Sabah', 'Sarawak', 'Kelantan', 'Perlis'], correctAnswer: 0 },
      { text: 'Apakah alat muzik tradisional kaum Cina yang bertali dan dipetik?', options: ['Sitar', 'Guzheng', 'Kompang', 'Sape'], correctAnswer: 1 },
      { text: 'Tarian Bharatanatyam adalah tarian tradisional bagi kaum?', options: ['Melayu', 'Cina', 'India', 'Sikh'], correctAnswer: 2 },
      { text: 'Pakaian tradisional lelaki Melayu ialah?', options: ['Cheongsam', 'Dhoti', 'Baju Melayu', 'Samfoo'], correctAnswer: 2 },
      { text: 'Pakaian tradisional wanita Cina ialah?', options: ['Baju Kurung', 'Sari', 'Cheongsam', 'Ngepan'], correctAnswer: 2 },
      { text: 'Sari merupakan pakaian tradisional wanita kaum?', options: ['India', 'Melayu', 'Cina', 'Iban'], correctAnswer: 0 },
      { text: 'Alat muzik Sape terkenal dalam kalangan masyarakat di?', options: ['Sabah', 'Sarawak', 'Kelantan', 'Kedah'], correctAnswer: 1 },
      { text: 'Kaum Bidayuh kebanyakannya menetap di?', options: ['Sabah', 'Sarawak', 'Pahang', 'Perak'], correctAnswer: 1 },
      { text: 'Orang Asli suku kaum Semai banyak terdapat di negeri?', options: ['Pahang dan Perak', 'Johor dan Melaka', 'Kedah dan Perlis', 'Sabah dan Sarawak'], correctAnswer: 0 },
      { text: 'Apakah tarian tradisional masyarakat Melayu?', options: ['Tarian Kipas', 'Tarian Singa', 'Tarian Zapin', 'Tarian Ngajat'], correctAnswer: 2 },
      { text: 'Tarian Ngajat merupakan tarian tradisional suku kaum?', options: ['Kadazandusun', 'Iban', 'Bidayuh', 'Melanau'], correctAnswer: 1 },
      { text: 'Tarian Sumazau ditarikan oleh kaum?', options: ['Iban', 'Melanau', 'Kadazandusun', 'Bajau'], correctAnswer: 2 },
      { text: 'Makanan tradisional nasi lemak lazimnya dikaitkan dengan kaum?', options: ['Cina', 'India', 'Melayu', 'Kadazan'], correctAnswer: 2 },
      { text: 'Dim sum dan Kuih Bulan adalah makanan tradisional masyarakat?', options: ['Melayu', 'Cina', 'India', 'Baba Nyonya'], correctAnswer: 1 },
      { text: 'Tosai dan Idli adalah hidangan popular masyarakat?', options: ['Cina', 'Melayu', 'India', 'Serani'], correctAnswer: 2 },
      { text: 'Kaum Melanau terkenal dengan makanan tradisional yang dipanggil?', options: ['Ambuyat/Linut', 'Nasi Dagang', 'Lemang', 'Ketupat'], correctAnswer: 0 },
      { text: 'Masyarakat Baba dan Nyonya juga dikenali sebagai?', options: ['Orang Asli', 'Peranakan', 'Serani', 'Mamak'], correctAnswer: 1 },
      { text: 'Komuniti Serani banyak terdapat di negeri?', options: ['Pulau Pinang', 'Melaka', 'Johor', 'Sarawak'], correctAnswer: 1 }
    ]
  },
  {
    id: '5', title: 'Agama dan Kepercayaan', iconName: 'Star', color: 'bg-purple-500', description: 'Pelajari kepelbagaian agama yang diamalkan.',
    questions: [
      { text: 'Apakah agama rasmi bagi Persekutuan Malaysia?', options: ['Buddha', 'Kristian', 'Hindu', 'Islam'], correctAnswer: 3 },
      { text: 'Rumah ibadat utama bagi penganut agama Hindu dipanggil?', options: ['Masjid', 'Kuil', 'Tokong', 'Gereja'], correctAnswer: 1 },
      { text: 'Penganut agama Buddha menyambut perayaan?', options: ['Hari Krismas', 'Hari Wesak', 'Hari Raya', 'Deepavali'], correctAnswer: 1 },
      { text: 'Bolehkah agama lain selain agama rasmi diamalkan di Malaysia?', options: ['Tidak', 'Boleh dengan aman', 'Boleh secara rahsia', 'Hanya pada waktu tertentu'], correctAnswer: 1 },
      { text: 'Gereja adalah tempat ibadat bagi penganut agama?', options: ['Sikh', 'Kristian', 'Hindu', 'Taoisme'], correctAnswer: 1 },
      { text: 'Tempat ibadat bagi penganut agama Buddha dan Taoisme dipanggil?', options: ['Masjid', 'Kuil', 'Tokong', 'Gurdwara'], correctAnswer: 2 },
      { text: 'Gurdwara adalah tempat ibadat bagi masyarakat?', options: ['Sikh', 'Hindu', 'Kristian', 'Islam'], correctAnswer: 0 },
      { text: 'Kitab suci bagi agama Islam ialah?', options: ['Al-Quran', 'Bible', 'Bhagavad Gita', 'Tripitaka'], correctAnswer: 0 },
      { text: 'Kitab suci bagi penganut agama Kristian ialah?', options: ['Veda', 'Al-Quran', 'Bible', 'Guru Granth Sahib'], correctAnswer: 2 },
      { text: 'Penganut agama Hindu percaya kepada kelahiran semula yang dipanggil?', options: ['Nirwana', 'Karma/Reinkarnasi', 'Syurga', 'Moksha'], correctAnswer: 1 },
      { text: 'Batu Caves di Selangor merupakan tempat ibadat tumpuan penganut agama?', options: ['Buddha', 'Sikh', 'Hindu', 'Kristian'], correctAnswer: 2 },
      { text: 'Solat Jumaat diwajibkan ke atas lelaki yang beragama?', options: ['Islam', 'Kristian', 'Hindu', 'Buddha'], correctAnswer: 0 },
      { text: 'Amalan berpuasa di bulan Ramadan diwajibkan bagi penganut agama?', options: ['Islam', 'Buddha', 'Hindu', 'Sikh'], correctAnswer: 0 },
      { text: 'Hari Thaipusam disambut secara besar-besaran oleh penganut agama?', options: ['Buddha', 'Sikh', 'Hindu', 'Kristian'], correctAnswer: 2 },
      { text: 'Perlembagaan Malaysia menjamin kebebasan apa untuk semua warganegara?', options: ['Kebebasan beragama', 'Kebebasan tidak membayar cukai', 'Kebebasan melanggar undang-undang', 'Kebebasan mutlak'], correctAnswer: 0 },
      { text: 'Vaisakhi adalah perayaan penting bagi penganut agama?', options: ['Hindu', 'Sikh', 'Buddha', 'Taoisme'], correctAnswer: 1 },
      { text: 'Cap Goh Mei dirai oleh penganut agama atau kepercayaan masyarakat?', options: ['Cina', 'India', 'Melayu', 'Kadazan'], correctAnswer: 0 },
      { text: 'Golongan paderi memimpin upacara keagamaan di dalam?', options: ['Masjid', 'Kuil', 'Tokong', 'Gereja'], correctAnswer: 3 },
      { text: 'Penganut Buddha merayakan Hari Wesak untuk memperingati?', options: ['Kelahiran, Pencerahan, dan Kematian Siddharta Gautama', 'Tahun Baru', 'Pesta Musim Bunga', 'Kemenangan kebaikan ke atas kejahatan'], correctAnswer: 0 },
      { text: 'Imam bertugas mengetuai solat berjemaah di?', options: ['Gereja', 'Tokong', 'Kuil', 'Masjid'], correctAnswer: 3 }
    ]
  },
  {
    id: '6', title: 'Perayaan Masyarakat Malaysia', iconName: 'PartyPopper', color: 'bg-pink-500', description: 'Sertai kemeriahan perayaan yang disambut bersama.',
    questions: [
      { text: 'Hari Raya Aidilfitri disambut pada bulan apa dalam kalendar Islam?', options: ['Ramadan', 'Syawal', 'Zulhijjah', 'Muharram'], correctAnswer: 1 },
      { text: 'Apakah perayaan tradisional utama bagi kaum Cina?', options: ['Chap Goh Mei', 'Pesta Tanglung', 'Tahun Baru Cina', 'Pesta Perahu Naga'], correctAnswer: 2 },
      { text: 'Pesta Kaamatan disambut meriah oleh kaum apa di Sabah?', options: ['Bidayuh', 'Iban', 'Kadazandusun', 'Melanau'], correctAnswer: 2 },
      { text: 'Perayaan Deepavali juga dikenali sebagai pesta apa?', options: ['Pesta Bunga', 'Pesta Cahaya', 'Pesta Air', 'Pesta Api'], correctAnswer: 1 },
      { text: 'Hari Gawai di Sarawak disambut sebagai tanda kesyukuran selepas musim?', options: ['Musim Tengkujuh', 'Musim Menuai', 'Musim Bunga', 'Musim Kemarau'], correctAnswer: 1 },
      { text: 'Hari Raya Aidiladha juga dikenali sebagai?', options: ['Hari Raya Puasa', 'Hari Raya Korban', 'Maal Hijrah', 'Awal Muharram'], correctAnswer: 1 },
      { text: 'Tarian Singa lazimnya dipersembahkan semasa perayaan?', options: ['Hari Raya', 'Tahun Baru Cina', 'Deepavali', 'Krismas'], correctAnswer: 1 },
      { text: 'Apakah makanan khas yang sering dihidangkan semasa Tahun Baru Cina untuk melambangkan kemakmuran?', options: ['Yee Sang', 'Ketupat', 'Murukku', 'Roti Canai'], correctAnswer: 0 },
      { text: 'Penganut Kristian menyambut Hari Krismas pada tarikh?', options: ['25 Disember', '1 Januari', '31 Ogos', '16 September'], correctAnswer: 0 },
      { text: 'Kolam atau Rangoli merupakan hiasan lantai yang sinonim dengan perayaan?', options: ['Hari Raya', 'Tahun Baru Cina', 'Deepavali', 'Hari Gawai'], correctAnswer: 2 },
      { text: 'Makanan tradisi ketupat dan rendang sangat popular semasa?', options: ['Hari Raya Aidilfitri', 'Tahun Baru Cina', 'Deepavali', 'Krismas'], correctAnswer: 0 },
      { text: 'Angpau atau sampul merah berisi wang biasanya diberikan semasa?', options: ['Tahun Baru Cina', 'Hari Gawai', 'Thaipusam', 'Wesak'], correctAnswer: 0 },
      { text: 'Perayaan Pongal disambut oleh masyarakat India sebagai tanda kesyukuran untuk?', options: ['Kelahiran anak', 'Musim menuai', 'Tahun baru', 'Kemenangan dalam peperangan'], correctAnswer: 1 },
      { text: 'Pesta San Pedro disambut oleh masyarakat Serani di?', options: ['Pulau Pinang', 'Melaka', 'Johor', 'Sabah'], correctAnswer: 1 },
      { text: 'Tarian Magunatip (tarian buluh) sering dipersembahkan semasa Pesta?', options: ['Kaamatan', 'Gawai', 'Tahun Baru Cina', 'Deepavali'], correctAnswer: 0 },
      { text: 'Apakah minuman tradisional yang disajikan semasa Hari Gawai?', options: ['Sirap Bandung', 'Tuak', 'Teh Tarik', 'Kopi O'], correctAnswer: 1 },
      { text: 'Amalan rumah terbuka semasa musim perayaan bertujuan untuk?', options: ['Membazir makanan', 'Memupuk perpaduan kaum', 'Menunjuk-nunjuk kekayaan', 'Memenuhi masa lapang'], correctAnswer: 1 },
      { text: 'Maal Hijrah adalah perayaan untuk menyambut?', options: ['Hari jadi', 'Tahun Baru Islam', 'Hari pahlawan', 'Hari kemerdekaan'], correctAnswer: 1 },
      { text: 'Pesta Perahu Naga (Dragon Boat Festival) disambut oleh masyarakat?', options: ['Cina', 'Melayu', 'India', 'Iban'], correctAnswer: 0 },
      { text: 'Masyarakat Sikh menyambut perayaan Vaisakhi pada bulan?', options: ['Januari', 'April', 'Ogos', 'Disember'], correctAnswer: 1 }
    ]
  },
  {
    id: '7', title: 'Pemimpin Negara', iconName: 'Crown', color: 'bg-indigo-500', description: 'Kenali tokoh-tokoh pemimpin negara.',
    questions: [
      { text: 'Siapakah Perdana Menteri Malaysia yang pertama?', options: ['Tun Abdul Razak', 'Tun Dr. Mahathir', 'Tunku Abdul Rahman', 'Tun Hussein Onn'], correctAnswer: 2 },
      { text: 'Gelaran "Bapa Pemodenan" merujuk kepada Perdana Menteri yang mana?', options: ['Tunku Abdul Rahman', 'Tun Dr. Mahathir Mohamad', 'Tun Abdullah Ahmad Badawi', 'Dato\' Sri Najib Tun Razak'], correctAnswer: 1 },
      { text: 'Siapakah yang digelar sebagai "Bapa Pembangunan" Malaysia?', options: ['Tun Abdul Razak Hussein', 'Tun Hussein Onn', 'Tunku Abdul Rahman', 'Tan Sri Muhyiddin Yassin'], correctAnswer: 0 },
      { text: 'Siapakah Ketua Utama Negara Malaysia?', options: ['Perdana Menteri', 'Yang di-Pertuan Agong', 'Ketua Hakim', 'Yang di-Pertua Dewan Rakyat'], correctAnswer: 1 },
      { text: 'Parlimen Malaysia terdiri daripada YDPA, Dewan Rakyat dan?', options: ['Dewan Undangan Negeri', 'Dewan Negara', 'Dewan Tertinggi', 'Dewan Menteri'], correctAnswer: 1 },
      { text: 'Gelaran "Bapa Perpaduan" diberikan kepada Perdana Menteri ke berapa?', options: ['Kedua (Tun Abdul Razak)', 'Ketiga (Tun Hussein Onn)', 'Keempat (Tun Dr Mahathir)', 'Kelima (Tun Abdullah)'], correctAnswer: 1 },
      { text: 'Siapakah Perdana Menteri kelima Malaysia yang digelar Bapa Pembangunan Modal Insan?', options: ['Tun Dr Mahathir', 'Tun Abdullah Ahmad Badawi', 'Dato Sri Najib', 'Tan Sri Muhyiddin'], correctAnswer: 1 },
      { text: 'Yang di-Pertuan Agong dipilih dalam kalangan Raja-Raja Melayu untuk tempoh berapa tahun?', options: ['3 tahun', '4 tahun', '5 tahun', '6 tahun'], correctAnswer: 2 },
      { text: 'Siapakah Perdana Menteri yang memperkenalkan gagasan 1Malaysia?', options: ['Tun Dr Mahathir', 'Tun Abdullah', 'Dato\' Sri Najib Tun Razak', 'Tan Sri Muhyiddin'], correctAnswer: 2 },
      { text: 'Perdana Menteri dilantik oleh siapa?', options: ['Rakyat melalui undian terus', 'Yang di-Pertuan Agong', 'Dewan Negara', 'Ketua Hakim Negara'], correctAnswer: 1 },
      { text: 'Menteri-menteri Kabinet dilantik atas nasihat siapa?', options: ['Yang di-Pertuan Agong', 'Perdana Menteri', 'Ketua Polis Negara', 'Sultan'], correctAnswer: 1 },
      { text: 'Dewan manakah yang ahlinya dipilih melalui Pilihan Raya Umum?', options: ['Dewan Negara', 'Dewan Rakyat', 'Dewan Bahasa dan Pustaka', 'Dewan Perniagaan'], correctAnswer: 1 },
      { text: 'Siapakah Bapa Kemerdekaan Malaysia?', options: ['Tun Abdul Razak', 'Tun Hussein Onn', 'Tunku Abdul Rahman', 'Dato Onn Jaafar'], correctAnswer: 2 },
      { text: 'Dato\' Onn Jaafar merupakan pengasas dan presiden pertama bagi parti?', options: ['PAS', 'DAP', 'UMNO', 'MIC'], correctAnswer: 2 },
      { text: 'Siapakah tokoh pemimpin kaum Cina (Presiden MCA pertama) yang turut berjuang menuntut kemerdekaan?', options: ['Tun Tan Cheng Lock', 'Tun V.T. Sambanthan', 'Lee Kuan Yew', 'Lim Kit Siang'], correctAnswer: 0 },
      { text: 'Siapakah Presiden MIC yang pertama yang menyertai rombongan kemerdekaan ke London?', options: ['Tun V.T. Sambanthan', 'Dato K. Pathmanaban', 'S. Samy Vellu', 'P. Ramlee'], correctAnswer: 0 },
      { text: 'Tunku Abdul Rahman mengisytiharkan kemerdekaan di mana?', options: ['Stadium Merdeka', 'Dataran Merdeka', 'Stadium Bukit Jalil', 'Bangunan Sultan Abdul Samad'], correctAnswer: 0 },
      { text: 'Sistem pentadbiran negara kita berasaskan?', options: ['Demokrasi Berparlimen', 'Monarki Mutlak', 'Komunis', 'Republik'], correctAnswer: 0 },
      { text: 'Dewan Negara juga dikenali sebagai?', options: ['Parlimen', 'Senat', 'Kongres', 'Kabinet'], correctAnswer: 1 },
      { text: 'Gelaran "Bapa Transformasi" merujuk kepada Perdana Menteri ke berapa?', options: ['Keempat', 'Kelima', 'Keenam (Dato Sri Najib)', 'Ketujuh'], correctAnswer: 2 }
    ]
  },
  {
    id: '8', title: 'Kemajuan Ekonomi Malaysia', iconName: 'TrendingUp', color: 'bg-teal-500', description: 'Lihat bagaimana ekonomi negara kita berkembang.',
    questions: [
      { text: 'Apakah hasil eksport utama Tanah Melayu pada awal kemerdekaan?', options: ['Petroleum dan Gas', 'Getah dan Bijih Timah', 'Kelapa Sawit dan Koko', 'Barangan Elektrik'], correctAnswer: 1 },
      { text: 'Apakah nama syarikat kereta nasional pertama Malaysia?', options: ['Perodua', 'Proton', 'Modenas', 'Inokom'], correctAnswer: 1 },
      { text: 'KLCC pernah menjadi bangunan tertinggi di dunia. Ia dibina semasa pentadbiran?', options: ['Tunku Abdul Rahman', 'Tun Hussein Onn', 'Tun Dr. Mahathir Mohamad', 'Tun Abdullah'], correctAnswer: 2 },
      { text: 'Apakah tanaman komersial utama Malaysia masa kini selain getah?', options: ['Padi', 'Kelapa Sawit', 'Koko', 'Lada Hitam'], correctAnswer: 1 },
      { text: 'Koridor Raya Multimedia (MSC) ditubuhkan untuk memajukan sektor?', options: ['Pertanian', 'Pelancongan', 'ICT', 'Automotif'], correctAnswer: 2 },
      { text: 'FELDA ditubuhkan untuk membantu masyarakat luar bandar dalam sektor?', options: ['Perindustrian', 'Pertanian', 'Perlombongan', 'Perikanan'], correctAnswer: 1 },
      { text: 'Siapakah Perdana Menteri yang banyak merancakkan penubuhan FELDA?', options: ['Tunku Abdul Rahman', 'Tun Abdul Razak', 'Tun Dr Mahathir', 'Dato Sri Najib'], correctAnswer: 1 },
      { text: 'Syarikat minyak dan gas kebangsaan Malaysia dikenali sebagai?', options: ['Shell', 'BHP', 'PETRONAS', 'Esso'], correctAnswer: 2 },
      { text: 'Proton Saga dilancarkan pada tahun berapa?', options: ['1980', '1985', '1990', '1995'], correctAnswer: 1 },
      { text: 'Zon Perdagangan Bebas (FTZ) diwujudkan untuk menggalakkan industri?', options: ['Pertanian', 'Perlombongan', 'Pembuatan/Elektronik', 'Pembalakan'], correctAnswer: 2 },
      { text: 'Jambatan Pulau Pinang siap dibina dan dibuka pada tahun?', options: ['1980', '1985', '1990', '1995'], correctAnswer: 1 },
      { text: 'Apakah lapangan terbang antarabangsa utama Malaysia masa kini?', options: ['LTSAAS (Subang)', 'KLIA (Sepang)', 'Senai', 'Bayan Lepas'], correctAnswer: 1 },
      { text: 'Dasar Ekonomi Baru (DEB) dilancarkan pada tahun 1970 dengan tujuan utama untuk?', options: ['Membasmi kemiskinan dan menyusun semula masyarakat', 'Membina kereta nasional', 'Melancarkan satelit', 'Menjajah negara lain'], correctAnswer: 0 },
      { text: 'Satelit komunikasi pertama Malaysia dikenali sebagai?', options: ['MEASAT 1', 'TiungSAT 1', 'RazakSAT', 'Inmarsat'], correctAnswer: 0 },
      { text: 'Litar Antarabangsa Sepang (SIC) dibina untuk memajukan sukan permotoran dan ekonomi semasa era Perdana Menteri?', options: ['Kedua', 'Ketiga', 'Keempat', 'Kelima'], correctAnswer: 2 },
      { text: 'Industri pelancongan Malaysia dipromosikan ke seluruh dunia melalui kempen?', options: ['Malaysia Truly Asia', 'Visit ASEAN', 'Amazing Malaysia', 'Malaysia Boleh'], correctAnswer: 0 },
      { text: 'Pusat pentadbiran kerajaan persekutuan yang baru dan moden ialah?', options: ['Kuala Lumpur', 'Cyberjaya', 'Putrajaya', 'Shah Alam'], correctAnswer: 2 },
      { text: 'Kereta nasional kedua Malaysia yang memfokuskan kepada kereta kompak ialah?', options: ['Proton', 'Perodua', 'Modenas', 'Naza'], correctAnswer: 1 },
      { text: 'Modenas merupakan syarikat nasional yang mengeluarkan?', options: ['Kereta', 'Kapal terbang', 'Motosikal', 'Bas'], correctAnswer: 2 },
      { text: 'Sektor manakah yang menjadi penyumbang utama kepada KDNK Malaysia pada masa kini?', options: ['Pertanian', 'Perlombongan', 'Perkhidmatan dan Pembuatan', 'Pembalakan'], correctAnswer: 2 }
    ]
  },
  {
    id: '9', title: 'Sukan Kebanggaan', iconName: 'Trophy', color: 'bg-orange-500', description: 'Hayati pencapaian wira dan wirawati sukan negara.',
    questions: [
      { text: 'Siapakah Ratu Skuasy negara yang pernah memegang gelaran No. 1 dunia paling lama?', options: ['Datuk Nicol David', 'Nur Dhabitah Sabri', 'Farah Ann', 'Pandelela Rinong'], correctAnswer: 0 },
      { text: 'Datuk Lee Chong Wei adalah jaguh dunia dalam sukan?', options: ['Ping Pong', 'Tenis', 'Badminton', 'Bola Keranjang'], correctAnswer: 2 },
      { text: 'Gelaran "The Pocket Rocketman" merujuk kepada atlet sukan?', options: ['Lumba Basikal Trek', 'Lumba Kereta', 'Lari Pecut', 'Renang'], correctAnswer: 0 },
      { text: 'Apakah gelaran pasukan bola sepak kebangsaan Malaysia?', options: ['Singa Malaya', 'Harimau Malaya', 'Helang Merah', 'Seladang'], correctAnswer: 1 },
      { text: 'Siapakah atlet paralimpik emas acara lompat jauh di Paralimpik Rio 2016?', options: ['Ridzuan Puzi', 'Ziyad Zolkefli', 'Datuk Abdul Latif Romly', 'Cheah Liek Hou'], correctAnswer: 2 },
      { text: 'Cheah Liek Hou merupakan pemenang pingat emas Paralimpik dalam sukan?', options: ['Renang', 'Memanah', 'Badminton', 'Angkat Berat'], correctAnswer: 2 },
      { text: 'Pasukan badminton Malaysia pernah menjulang Piala Thomas kali terakhir pada tahun?', options: ['1992', '1998', '2004', '2012'], correctAnswer: 0 },
      { text: 'Sukan Komanwel 1998 dianjurkan di bandar mana?', options: ['London', 'Kuala Lumpur', 'Melbourne', 'New Delhi'], correctAnswer: 1 },
      { text: 'Pandelela Rinong adalah pemenang pingat Olimpik Malaysia yang pertama dalam sukan?', options: ['Gimnastik', 'Renang', 'Terjun', 'Lumba basikal'], correctAnswer: 2 },
      { text: 'Siapakah lagenda bola sepak negara yang dikenali sebagai "Supermokh"?', options: ['Soh Chin Aun', 'Santokh Singh', 'Mokhtar Dahari', 'R. Arumugam'], correctAnswer: 2 },
      { text: 'Pasukan bola sepak kebangsaan Malaysia pernah layak ke Sukan Olimpik Moscow 1980 tetapi bertindak memboikotnya. Betul atau salah?', options: ['Betul', 'Salah', 'Mereka tidak layak', 'Mereka memenangi emas'], correctAnswer: 0 },
      { text: 'Gandingan Aaron Chia dan Soh Wooi Yik memenangi kejuaraan dunia pertama Malaysia dalam sukan badminton acara apa?', options: ['Perseorangan Lelaki', 'Beregu Lelaki', 'Beregu Campuran', 'Beregu Wanita'], correctAnswer: 1 },
      { text: 'Bonnie Bunyau Gustin adalah juara dunia dan pemenang emas Paralimpik dalam sukan?', options: ['Lumba Basikal', 'Terjun', 'Powerlifting (Angkat Berat)', 'Memanah'], correctAnswer: 2 },
      { text: 'Sukan SEA (Sukan Asia Tenggara) dianjurkan setiap berapa tahun?', options: ['Setiap tahun', '2 tahun sekali', '3 tahun sekali', '4 tahun sekali'], correctAnswer: 1 },
      { text: 'Siapakah pelari pecut wanita Malaysia yang digelar "Ratu Pecut Asia"?', options: ['Shanti Pereira', 'Marina Chin', 'Datuk Rabuan Pit', 'Datuk M. Rajamani'], correctAnswer: 3 },
      { text: 'Sukan berbasikal trek "Keirin" dimenangi oleh jaguh negara yang bernama?', options: ['Khairul Anuar Mohamad', 'Datuk Azizulhasni Awang', 'Zaidatul Husniah', 'Welson Sim'], correctAnswer: 1 },
      { text: 'Apakah sukan yang dimainkan oleh lagenda Shalin Zulkifli?', options: ['Boling Tenpin', 'Skuasy', 'Gimnastik', 'Golf'], correctAnswer: 0 },
      { text: 'Gimnas negara, Farah Ann Abdul Hadi, cemerlang dalam sukan?', options: ['Gimrama', 'Gimnastik Artistik', 'Renang Berirama', 'Lompat Jauh'], correctAnswer: 1 },
      { text: 'Sukan pencak silat merupakan sukan mempertahankan diri tradisi kaum?', options: ['Cina', 'India', 'Melayu', 'Kadazan'], correctAnswer: 2 },
      { text: 'Stadium Nasional Bukit Jalil dibina bersempena penganjuran sukan apa?', options: ['Sukan Olimpik', 'Sukan Asia', 'Sukan Komanwel 1998', 'Piala Dunia'], correctAnswer: 2 }
    ]
  },
  {
    id: '10', title: 'Malaysia dan Dunia', iconName: 'Globe', color: 'bg-cyan-500', description: 'Ketahui peranan penting Malaysia di persada antarabangsa.',
    questions: [
      { text: 'Malaysia adalah negara pengasas pertubuhan serantau iaitu?', options: ['OIC', 'PBB', 'ASEAN', 'NAM'], correctAnswer: 2 },
      { text: 'Malaysia menyertai Pertubuhan Bangsa-Bangsa Bersatu (PBB) pada tahun?', options: ['1957', '1963', '1970', '1990'], correctAnswer: 0 },
      { text: 'Pertubuhan Kerjasama Islam (OIC) dianggotai oleh?', options: ['Negara Eropah', 'Negara Islam', 'Negara Komanwel', 'Negara Asia Tenggara'], correctAnswer: 1 },
      { text: 'Sukan antarabangsa terbesar yang pernah dianjurkan oleh Malaysia pada 1998 ialah?', options: ['Sukan Olimpik', 'Sukan Asia', 'Sukan Komanwel', 'Piala Dunia'], correctAnswer: 2 },
      { text: 'Malaysia kelantangannya membela nasib negara ditindas seperti isu di?', options: ['Antartika', 'Palestin', 'Greenland', 'Iceland'], correctAnswer: 1 },
      { text: 'Komanwel merupakan pertubuhan yang dianggotai oleh negara-negara bekas jajahan?', options: ['Perancis', 'Belanda', 'Sepanyol', 'British'], correctAnswer: 3 },
      { text: 'NAM (Pergerakan Negara-Negara Berkecuali) bermaksud anggotanya tidak memihak kepada mana-mana blok kuasa besar. Betul atau salah?', options: ['Betul', 'Salah', 'Hanya memihak kepada blok Barat', 'Hanya memihak kepada blok Timur'], correctAnswer: 0 },
      { text: 'Deklarasi Langkawi (1989) yang dipersetujui semasa CHOGM berkaitan dengan isu?', options: ['Ekonomi global', 'Alam sekitar', 'Perang nuklear', 'Sukan antarabangsa'], correctAnswer: 1 },
      { text: 'Pasukan pengaman Malaysia di bawah panji PBB pernah berkhidmat di negara mana?', options: ['Bosnia, Congo, Lubnan', 'Amerika, Jepun, Korea', 'Australia, New Zealand', 'Brazil, Argentina'], correctAnswer: 0 },
      { text: 'Siapakah Perdana Menteri yang banyak menaikkan nama Malaysia di pentas dunia pada era 80an dan 90an?', options: ['Tun Hussein Onn', 'Tun Dr Mahathir', 'Tun Abdullah', 'Dato Sri Najib'], correctAnswer: 1 },
      { text: 'Kerjasama ASEAN merangkumi bidang ekonomi, sosial dan?', options: ['Ketenteraan pencerobohan', 'Kewangan Eropah', 'Politik/Keselamatan Serantau', 'Angkasa Lepas'], correctAnswer: 2 },
      { text: 'Malaysia merupakan penganjur terawal bagi dialog apa yang melibatkan negara-negara Islam?', options: ['G8', 'Forum Ekonomi Dunia', 'Sidang Kemuncak OIC', 'Kesatuan Eropah'], correctAnswer: 2 },
      { text: 'Tunku Abdul Rahman pernah dilantik sebagai Setiausaha Agung pertama bagi pertubuhan?', options: ['PBB', 'ASEAN', 'OIC', 'NAM'], correctAnswer: 2 },
      { text: 'Apakah dasar luar Malaysia pada awal kemerdekaan?', options: ['Pro-Barat', 'Pro-Komunis', 'Berkecuali', 'Bersendirian'], correctAnswer: 0 },
      { text: 'Pada era Tun Abdul Razak, dasar luar Malaysia bertukar menjadi?', options: ['Pro-Barat', 'Berkecuali dan berbaik dengan semua negara', 'Pro-Komunis', 'Mengecualikan negara jiran'], correctAnswer: 1 },
      { text: 'ZOPFAN (Zon Aman, Bebas dan Berkecuali) dicadangkan oleh ASEAN untuk?', options: ['Menjajah negara lain', 'Mengekalkan keamanan di Asia Tenggara', 'Memulakan perang', 'Membina empayar baru'], correctAnswer: 1 },
      { text: 'Dialog Serantau (ARF) di bawah ASEAN membincangkan isu berkaitan?', options: ['Sukan', 'Kebudayaan', 'Keselamatan', 'Pendidikan'], correctAnswer: 2 },
      { text: 'Malaysia mempunyai hubungan diplomatik dengan hampir seluruh negara dunia kecuali?', options: ['Singapura', 'Israel', 'Thailand', 'Indonesia'], correctAnswer: 1 },
      { text: 'Misi bantuan kemanusiaan antarabangsa Malaysia sering digerakkan melalui NGO seperti?', options: ['MERCY Malaysia', 'Bank Negara', 'PDRM', 'Bomba'], correctAnswer: 0 },
      { text: 'Ibu Pejabat ASEAN terletak di?', options: ['Kuala Lumpur', 'Singapura', 'Jakarta', 'Bangkok'], correctAnswer: 2 }
    ]
  }
];

const finalStation = {
  id: 'final', title: 'Cabaran Utama: Kuiz 20 Soalan', iconName: 'Award', color: 'bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600', description: 'Uji pengetahuan anda untuk Sijil Pahlawan Sejarah!',
  questions: [
    { text: 'Siapakah Bapa Kemerdekaan Malaysia?', options: ['Tun Dr Mahathir', 'Tun Abdul Razak', 'Tunku Abdul Rahman', 'Dato Onn Jaafar'], correctAnswer: 2 },
    { text: 'Bilakah tarikh Hari Kemerdekaan Tanah Melayu?', options: ['16 September', '31 Ogos', '13 Mei', '1 Januari'], correctAnswer: 1 },
    { text: 'Apakah bunga kebangsaan Malaysia?', options: ['Bunga Mawar', 'Bunga Raya', 'Bunga Orkid', 'Bunga Kertas'], correctAnswer: 1 },
    { text: 'Berapakah kelopak yang terdapat pada Bunga Raya?', options: ['4', '5', '6', '7'], correctAnswer: 1 },
    { text: 'Apakah nama ibu negara Malaysia?', options: ['Putrajaya', 'Shah Alam', 'Kuala Lumpur', 'Johor Bahru'], correctAnswer: 2 },
    { text: 'Burung Kenyalang menjadi simbol kebanggaan negeri mana?', options: ['Sabah', 'Sarawak', 'Pahang', 'Kedah'], correctAnswer: 1 },
    { text: 'Gunung tertinggi di Malaysia ialah...', options: ['Gunung Tahan', 'Gunung Ledang', 'Gunung Kinabalu', 'Gunung Jerai'], correctAnswer: 2 },
    { text: 'Siapakah angkasawan pertama Malaysia?', options: ['Datuk Nicol David', 'Datuk Dr. Sheikh Muszaphar Shukor', 'Datuk Lee Chong Wei', 'Tan Sri Tony Fernandes'], correctAnswer: 1 },
    { text: 'Apakah warna jalur pada Bendera Malaysia (Jalur Gemilang)?', options: ['Merah dan Hitam', 'Merah dan Putih', 'Kuning dan Biru', 'Hitam dan Putih'], correctAnswer: 1 },
    { text: 'Berapakah bucu bintang pada Jalur Gemilang?', options: ['11', '12', '13', '14'], correctAnswer: 3 },
    { text: 'Lagu kebangsaan Malaysia bertajuk?', options: ['Negaraku', 'Tanah Airku', 'Jalur Gemilang', 'Malaysia Boleh'], correctAnswer: 0 },
    { text: 'Mata wang rasmi Malaysia ialah...', options: ['Dolar', 'Rupiah', 'Ringgit', 'Baht'], correctAnswer: 2 },
    { text: 'Tugu Negara dibina untuk memperingati siapa?', options: ['Pemimpin negara', 'Pahlawan yang terkorban mempertahankan negara', 'Mangsa bencana alam', 'Tokoh sukan'], correctAnswer: 1 },
    { text: 'Apakah bahasa rasmi negara Malaysia?', options: ['Bahasa Inggeris', 'Bahasa Mandarin', 'Bahasa Tamil', 'Bahasa Melayu'], correctAnswer: 3 },
    { text: 'Wawasan 2020 telah diperkenalkan oleh siapa?', options: ['Tun Abdul Razak', 'Tun Abdullah', 'Tun Dr. Mahathir Mohamad', 'Datuk Seri Anwar Ibrahim'], correctAnswer: 2 },
    { text: 'Semenanjung Malaysia dipisahkan dari Sabah dan Sarawak oleh laut apa?', options: ['Laut China Selatan', 'Selat Melaka', 'Laut Sulu', 'Lautan Hindi'], correctAnswer: 0 },
    { text: 'Tarian Mak Yong berasal dari negeri mana?', options: ['Johor', 'Melaka', 'Kelantan', 'Perak'], correctAnswer: 2 },
    { text: 'Jambatan Pulau Pinang menghubungkan pulau dengan kawasan mana?', options: ['Butterworth', 'Georgetown', 'Bayan Lepas', 'Seberang Perai'], correctAnswer: 3 },
    { text: 'Bangunan Sultan Abdul Samad terletak berhadapan dengan mercu tanda apa?', options: ['KLCC', 'Dataran Merdeka', 'Menara KL', 'Stadium Merdeka'], correctAnswer: 1 },
    { text: 'Kemerdekaan Tanah Melayu pada 1957 dicapai melalui cara apa?', options: ['Peperangan', 'Pemberontakan', 'Rundingan damai', 'Campur tangan asing'], correctAnswer: 2 }
  ]
};

// Add ID to questions
stationsData.forEach(station => {
  station.questions = station.questions.map((q, idx) => ({
    id: `${station.id}-${idx + 1}`,
    ...q
  }));
});

finalStation.questions = finalStation.questions.map((q, idx) => ({
  id: `f-${idx + 1}`,
  ...q
}));

const output = `import { Station } from '../types';

export const stationsData: Station[] = ${JSON.stringify(stationsData, null, 2)};

export const finalStation: Station = ${JSON.stringify(finalStation, null, 2)};
`;

fs.writeFileSync('src/data/questions.ts', output);
console.log('File written successfully.');
