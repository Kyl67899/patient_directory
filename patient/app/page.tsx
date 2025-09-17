"use client"

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import PatientTabs from "./component/PatientTabs"

export default function Home() {
  const [loading, setLoading] = useState()

  return (
    <>
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <main className="p-6">
          <PatientTabs />
        </main>
      )}
    </>
  );
}
