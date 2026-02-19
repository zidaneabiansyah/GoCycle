import Footer from "@/components/layout/Footer/Footer";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      {/* Navbar is intentionally omitted */}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
