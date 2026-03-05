import { Suspense } from 'react'
import AdminLoginForm from '../components/AdminLoginForm'

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-page flex items-center justify-center px-4">
      <Suspense>
        <AdminLoginForm />
      </Suspense>
    </main>
  )
}
