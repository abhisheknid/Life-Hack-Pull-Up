import Nav from "@/components/Nav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6 sm:px-6">{children}</main>
    </>
  );
}
