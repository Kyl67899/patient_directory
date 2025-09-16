"use client"

import { useEffect, useMemo, useState } from "react"
import { Patient } from "../types/patient"
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { columns } from "./patient/PatientColumn"
import { Skeleton } from "@/components/ui/skeleton"
import PatientTable from "./PatientTable"
import PatientToolbar from "./patientToolbar"
import PatientCard from "./PatientCard"

export default function PatientTabs() {
  const [data, setData] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [tabView, setTabView] = useState("")

  const links = [
    "All", "Fever", "Sore throat", "Rash", "Sprained Ankle", "Ear Infection",
    "Sinusitis", "Allergic Reaction", "Headache", "Broken Arm", "Stomach Ache"
  ]

  useEffect(() => {
    fetch("/mock.json")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok!")
        return res.json()
      })
      .then(setData)
      .catch(err => {
        console.log("Fetch error: ", err)
        alert("Failed to load patient data")
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [filter, search])

  const filteredPatient = useMemo(() => {
    return data.filter(p => {
      const matchesIssue = filter === "All" || p.medical_issue.toLowerCase() === filter.toLowerCase()
      const matchesSearch =
        p.patient_name.toLowerCase().includes(search.toLowerCase()) ||
        p.medical_issue.toLowerCase().includes(search.toLowerCase()) ||
        p.contact.some(c =>
          c.address.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase()) ||
          c.number.toLowerCase().includes(search.toLowerCase())
        )
      return matchesIssue && matchesSearch
    })
  }, [data, filter, search])

  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredPatient.slice(startIndex, startIndex + pageSize)
  }, [filteredPatient, currentPage])

  const table = useReactTable({
    data: paginatedPatients,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <>
      <div className="w-full">
        <Tabs value={tabView} onValueChange={setTabView}>
          <TabsList className="mb-4">
            <TabsTrigger value="table">Table View</TabsTrigger>
            <TabsTrigger value="card">Card View</TabsTrigger>
          </TabsList>
          {/* 🔍 Search and Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <Input
              placeholder="Search by name, issue, or contact..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-md"
            />

            <div className="flex flex-wrap gap-2">
              {links.map(issue => (
                <Button
                  key={issue}
                  variant={filter === issue ? "default" : "outline"}
                  onClick={() => setFilter(issue)}
                >
                  {issue}
                </Button>
              ))}
            </div>
          </div>

          {/* loading */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-md" />
              ))}
            </div>
          ) : (
            <>
              <TabsContent value="table">
                <PatientTable table={table} />
                <PatientToolbar table={table} />
              </TabsContent>

              <TabsContent value="card">
                <PatientCard patients={paginatedPatients} />
                <PatientCard patients={filteredPatient} />
              </TabsContent>

              {/* Pagination Controls */}
              <div className="flex justify-end items=center gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {Math.ceil(filteredPatient.length / pageSize)}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(prev =>
                      prev < Math.ceil(filteredPatient.length / pageSize) ? prev + 1 : prev
                    )
                  }
                  disabled={currentPage >= Math.ceil(filteredPatient.length / pageSize)}
                >
                  Next
                </Button>
              </div>
            </>
          )}

        </Tabs>
      </div>
    </>
  )
}