export default function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`py-14 md:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  )
}
