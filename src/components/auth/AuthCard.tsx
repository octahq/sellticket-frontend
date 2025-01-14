
export default function AuthCard({children}: {  children: React.ReactNode}) {
  return (
    <div className="bg-white border border-lines-100 rounded-[20px] shadow-auth-card-shadow p-6 w-[420px]">
      {children}
    </div>
  )
}
