Halal Tracker App - THR Minggu 4 State Management

- Nama : Khania Ramadhani Fitri
- NIM : 2410501027
- Opsi : A - Halal Tracker App

Halal Tracker App adalah aplikasi mobile yang membantu pengguna mencatat dan melacak kegiatan ibadah sehari-hari selama bulan Syawal. Aplikasi ini memudahkan pengguna untuk memantau progress ibadah, mencatat kegiatan baru, dan melihat statistik lengkap.

Hooks yang Digunakan
- useState: `src/screens/HomeScreen.js`
            modalVisible: Mengontrol tampilan modal tambah kegiatan 
            newHabitName: Menyimpan input nama kegiatan baru     selectedCategory`:Menyimpan kategori kegiatan yang dipilih (ibadah/sosial)      activeTab:Mengelola tab aktif (Hari Ini/Statistik)
- useEffect: src/context/HabitContext.js : Memuat data dari AsyncStorage saat aplikasi pertama kali dibuka (1 kali mount)
            src/context/HabitContext.js : Menyimpan data ke AsyncStorage setiap kali ada perubahan state habits
- useReducer: `src/context/HabitContext.js`
  `TOGGLE_HABIT`
   `RESET_DAILY`
   `ADD_HABIT`
  `REMOVE_HABIT`
   `LOAD_DATA`
- Custom Hook: `src/hooks/useHabits.js`: Mengabstraksi seluruh logika habit tracking dan perhitungan statistik
## Screenshot
![alt text](screenshoots/add-data.png)
![alt text](screenshoots/add-habit.png)
![alt text](screenshoots/delete-data.png)
![alt text](screenshoots/home-screen.png)
![alt text](screenshoots/stats-screen.png)
## Cara Menjalankan
npm install && npm start
