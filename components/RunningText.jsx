import Image from 'next/image'
import logoAlBarokah from '../public/pict/logo-al-barokah-192x192.png'

export default function RunningText() {
  return (
    <div className="w-full bg-black text-white fixed bottom-0 p-4 flex items-center space-x-5">
      {/* <Image src={logoAlBarokah} alt="logo-albarokah" height={30} />
      <div className="flex">
        <p>Masjid</p> &nbsp;
        <p>AlBarokah</p>
      </div> */}
      <marquee className="text-3xl font-medium">
        <b>PROGRAM MASJID:</b> <ngaji-iqro>Mengaji Iqra (Anak),</ngaji-iqro>{' '}
        Setiap Senin, Selasa, Rabu. Pukul 16.00 s/d Selesai |{' '}
        <ngaji-quran>Mengaji Al-Quran (Anak),</ngaji-quran> Setiap Senin,
        Selasa, Rabu. Pukul 18.00 s/d Selesai |{' '}
        <tadabbur-tahsin>Tadabbur & Tahsin Quran,</tadabbur-tahsin> Setiap
        Jumat. Pukul 15.30 s/d Selesai |{' '}
        <ngopi-kajian>NGOPI! Ngobrol Perkara Iman,</ngopi-kajian> Setiap Ahad.
        Pukul 05.00 s/d Selesai &emsp;&emsp;&emsp;
        <b>PROGRAM MASJID:</b> <ngaji-iqro>Mengaji Iqra (Anak),</ngaji-iqro>{' '}
        Setiap Senin, Selasa, Rabu. Pukul 16.00 s/d Selesai |{' '}
        <ngaji-quran>Mengaji Al-Quran (Anak),</ngaji-quran> Setiap Senin,
        Selasa, Rabu. Pukul 18.00 s/d Selesai |{' '}
        <tadabbur-tahsin>Tadabbur & Tahsin Quran,</tadabbur-tahsin> Setiap
        Jumat. Pukul 15.30 s/d Selesai |{' '}
        <ngopi-kajian>NGOPI! Ngobrol Perkara Iman,</ngopi-kajian> Setiap Ahad.
        Pukul 05.00 s/d Selesai &emsp;&emsp;&emsp;
        {/* <b>Rekening Infak Kebutuhan Masjid: </b>
        Bank Syariah Indonesia <b>BSI: 300-4000-888</b> Kode bank: 451 a.n
        Masjid Al-Barokah PBCVR
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <b>Rekening Infak Kebutuhan Masjid: </b>
        Bank Syariah Indonesia <b>BSI: 300-4000-888</b> Kode bank: 451 a.n
        Masjid Al-Barokah PBCVR
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <b>Rekening Wakaf Pembangunan Masjid: </b>
        Bank Syariah Indonesia <b>BSI: 300-4000-567</b> Kode bank: 451 a.n
        Masjid Al-Barokah PBCVR
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        <b>Rekening Zakat Maal/Fitrah/Penghasilan: </b>
        Bank Syariah Indonesia <b>BSI: 300-4000-667</b> Kode bank: 451 a.n
        Masjid Al-Barokah PBCVR */}
      </marquee>
      <p className="font-medium">|</p>
      <marquee className="text-3xl font-medium">
        "Seseorang yang berjalan ke masjid, maka tiap langkah kakinya akan
        diberikan satu pahala, dihapuskan satu dosa, dan dinaikkan satu derajat
        oleh Allah SWT." (HR. Ibnu Majah dan Muslim).
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; "Orang yang
        menunggu sholat di masjid akan diberi pahala seperti sholat." (HR.
        Bukhari). &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
        "Ada tujuh golongan yang dinaungi kelak. Dan satunya adalah orang yang
        hatinya terpaut dengan masjid. Seorang pemuda yang hatinya terikat
        dengan masjid, orang-orang itulah yang akan mendapatkan perlindungan
        dari Allah saat kiamat kelak." (HR. Bukhari).
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; "Seseorang
        yang melaksanakan shoat Subuh berjamaah, maka orang itu akan mendapatkan
        pahala 119 kali dibanding sholat sendiri." (HR. Muslim).
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; "Seseorang
        yang melaksanakan sholat lsya berjamaah, maka dia akan mendapatkan
        pahala 59 kali lipat." (HR. Muslim).
        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; "Pahala
        salat Dzuhur jamaah, Ashar jamaah, dan Maghrib jamaah masing-masing
        dilipatgandakan 27 kali kalau kita laksanakan secara jamaah." (HR.
        Muslim).
      </marquee>
    </div>
  )
}
