import Link from 'next/link'

export default function LimaWaktuShalat({
  title,
  value,
  className,
  variant,
  url,
}) {
  const addClassName = className ? `${className}` : ''
  const variants = {
    'bg-imsak': `imsak-color`,
    'bg-subuh': `subuh-color`,
    'bg-isyraq': `isyraq-color`,
    'bg-dzuhur': `dzuhur-color`,
    'bg-ashar': `ashar-color`,
    'bg-maghrib': `maghrib-color`,
    'bg-isya': `isya-color`,
  }
  const pickedVariant = variants[variant]
  return (
    <Link href={url}>
      <div
        className={`grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-2 grid-cols-2 p-6 text-center rounded-lg opacity-90 cursor-pointer hover:bg-gray-500 ${pickedVariant} ${addClassName}`}
      >
        <p className="font-black text-3xl text-white drop-shadow-md">{title}</p>
        <p className="font-bold text-3xl text-white drop-shadow-2xl">{value}</p>
      </div>
    </Link>
  )
}
