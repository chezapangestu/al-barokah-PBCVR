import Image from 'next/image'
import thumbnail from '../../public/pict/Thumbnail 1920x1080.jpg'

export default function WaktuKajian() {
  return (
    <div>
      <Image src={thumbnail} alt="banner-kajian" height={900}></Image>
    </div>
  )
}
