import Navbar from '@/components/Layout/LandingPage/Navbar';

export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="bg-neutral-100">
      <Navbar />
      {children}
    </section>
  );
}
