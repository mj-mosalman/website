const highlights = [
  {
    title: 'React + TypeScript',
    body: 'Typed components with strict compiler settings, ready for real features.',
  },
  {
    title: 'Vite dev server',
    body: 'Hot reload runs on port 3000, so edits show up in the preview instantly.',
  },
  {
    title: 'Docker Compose ready',
    body: 'One command starts everything; dependencies install on boot from the lockfile.',
  },
]

export default function App() {
  return (
    <main className="page">
      <div className="card">
        <p className="eyebrow">New project</p>
        <h1>Your website starts here</h1>
        <p className="lede">
          This is a clean starting point. Edit <code>src/App.tsx</code> and the
          preview updates as you type.
        </p>

        <ul className="highlights">
          {highlights.map((item) => (
            <li key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>

        <p className="footnote">
          Run <code>npm run build</code> to type-check and produce a production
          bundle.
        </p>
      </div>
    </main>
  )
}
