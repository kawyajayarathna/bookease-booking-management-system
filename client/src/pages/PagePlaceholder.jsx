const PagePlaceholder = ({ title }) => (
  <main className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-6 py-16">
    <section className="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <h1 className="text-3xl font-bold text-slate-900">KVAudio {title}</h1>
      <p className="mt-3 text-slate-600">This is only a placeholder.</p>
    </section>
  </main>
)

export default PagePlaceholder
