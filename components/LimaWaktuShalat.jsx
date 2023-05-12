export default function LimaWaktuShalat({ title, value }) {
  return (
    <div className="grid lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-2 grid-cols-2 p-10 border">
      <p className="font-bold text-2xl">{title}</p>
      <p className=" text-3xl">{value}</p>
    </div>
  )
}
