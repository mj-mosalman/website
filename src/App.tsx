import { RouterProvider, normalizePath, useRouter } from './router/Router'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { TreatmentsPage } from './pages/TreatmentsPage'
import { TreatmentRoute } from './pages/TreatmentDetailPage'
import { PhilosophyPage } from './pages/PhilosophyPage'
import { SpecialistsPage } from './pages/SpecialistsPage'
import { JournalPage } from './pages/JournalPage'
import { ArticleRoute } from './pages/ArticlePage'
import { ConsultationPage } from './pages/ConsultationPage'
import { ContactPage } from './pages/ContactPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { AccessibilityPage } from './pages/AccessibilityPage'
import { NotFoundPage } from './pages/NotFoundPage'

function Routes() {
  const { pathname } = useRouter()
  const path = normalizePath(pathname)

  if (path === '/') return <HomePage />
  if (path === '/treatments') return <TreatmentsPage />
  if (path.startsWith('/treatments/')) {
    return <TreatmentRoute slug={decodeURIComponent(path.slice('/treatments/'.length))} />
  }
  if (path === '/philosophy') return <PhilosophyPage />
  if (path === '/specialists') return <SpecialistsPage />
  if (path === '/journal') return <JournalPage />
  if (path.startsWith('/journal/')) {
    return <ArticleRoute slug={decodeURIComponent(path.slice('/journal/'.length))} />
  }
  if (path === '/consultation') return <ConsultationPage />
  if (path === '/contact') return <ContactPage />
  if (path === '/privacy') return <PrivacyPage />
  if (path === '/terms') return <TermsPage />
  if (path === '/accessibility') return <AccessibilityPage />
  return <NotFoundPage />
}

export default function App() {
  return (
    <RouterProvider>
      <Layout>
        <Routes />
      </Layout>
    </RouterProvider>
  )
}
