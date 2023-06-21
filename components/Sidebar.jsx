import Link from 'next/link'

export default function Sidebar() {
  return (
    <div className="fixed top-[50%] w-12 z-20 flex-col space-y-2">
      <div className="opacity-30 hover:opacity-100">
        <Link href={'iqomahSubuh'}>
          <div className="rounded-md p-3 flex justify-center bg-zinc-500">
            <p className="font-bold text-white">S</p>
          </div>
        </Link>
      </div>
      <div className="opacity-30 hover:opacity-100">
        <Link href={'iqomahDzuhur'}>
          <div className="rounded-md p-3 flex justify-center bg-zinc-500">
            <p className="font-bold text-white">D</p>
          </div>
        </Link>
      </div>
      <div className="opacity-30 hover:opacity-100">
        <Link href={'iqomahAshar'}>
          <div className="rounded-md p-3 flex justify-center bg-zinc-500">
            <p className="font-bold text-white">A</p>
          </div>
        </Link>
      </div>
      <div className="opacity-30 hover:opacity-100">
        <Link href={'iqomahMaghrib'}>
          <div className="rounded-md p-3 flex justify-center bg-zinc-500">
            <p className="font-bold text-white">M</p>
          </div>
        </Link>
      </div>
      <div className="opacity-30 hover:opacity-100">
        <Link href={'iqomahIsya'}>
          <div className="rounded-md p-3 flex justify-center bg-zinc-500">
            <p className="font-bold text-white">I</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
