import Link from "@/components/compat/Link"

export default function NotFound() {
  return <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
    <p className="text-muted text-lg mb-8">The page you are looking for could not be found.</p>
    <div className="flex gap-3">
      <Link href="/" className="btn-primary px-6 py-3 rounded-lg">Home</Link>
      <Link href="/menu" className="btn-secondary px-6 py-3 rounded-lg">Menu</Link>
    </div>
  </div>
}
