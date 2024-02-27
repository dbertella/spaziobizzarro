import Image from 'next/image'

export default function Logo() {
  return (
    <Image src="/logo.png" width={280} height={158} alt="Spazio Bizzarro" />
  )
}
