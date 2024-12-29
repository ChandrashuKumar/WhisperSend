import HomeBtn from "@/components/HomeBtn"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div>
        <HomeBtn />
        {children}
      </div>
  )
}