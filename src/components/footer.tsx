export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-5 bg-[#1A1B1F] px-5 py-6 shadow-2xl">
      <p className="text-xs text-[#838896]">© {year} Copyright FSW Barber</p>
    </footer>
  );
}
