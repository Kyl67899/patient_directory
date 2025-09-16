"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// import PatientTable from "./PatientTable"
import PatientCard from "./PatientCard"
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { Patient } from "../types/patient"
import PatientToolbar from "./patientToolbar"
import { Table as TanTable } from "@tanstack/react-table"
import PatientTable from "./PatientTable"
import { columns as patientColumns } from "./patient/PatientColumn"
import { Skeleton } from "@/components/ui/skeleton"

export default function PatientTabs() {
  const [data, setData] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch("/mock.json")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok")
        return res.json()
      })
      .then(setData)
      .catch((err) => {
        console.error("Fetch error:", err)
        alert("Failed to load patient data")
      })
      .finally(() => setLoading(false))
  }, [])

  const table = useReactTable({
    data,
    columns: patientColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <Tabs defaultValue="table" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="table">Table View</TabsTrigger>
        <TabsTrigger value="card">Card View</TabsTrigger>
      </TabsList>

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
        </>
      )}

      <TabsContent value="card">
        <PatientCard patients={data} />
      </TabsContent>
    </Tabs>
  )
}
