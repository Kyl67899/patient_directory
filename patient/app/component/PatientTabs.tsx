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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PatientTabs() {
  const [data, setData] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All")
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10 // cards per page

  console.log("Available issues:", data.map(p => p.medical_issue))

  // filter the patients by medical issues
  const filteredPatients = data.filter(p => {
    const matchesIssue = filter === "All" || p.medical_issue.toLowerCase() === filter.toLowerCase()
    const matchesSearch = p.patient_name.toLowerCase().includes(search.toLowerCase())
    return matchesIssue && matchesSearch
  })

  // index page logic 
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex)

  // links for the medial issues
  const links = 
  [
    "All", "Fever", "Sore throat", "Rash", "Sprained Ankle", "Ear Infection", 
    "Sinusitis", "Allergic Reaction", "Headache", "Broken Arm", "Stomach Ache"
  ];

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

  // reset the page
  useEffect(() => {
    setCurrentPage(1)
  }, [filter, search])
  

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

      <div className="flex flex-wrap gap-2 mb-4">
        {/* <Input
        placeholder="Filter by name..."
        value={(table.getColumn("patient_name")?.getFilterValue() as string) ?? ""}
        onChange={(e) => table.getColumn("patient_name")?.setFilterValue(e.target.value)}
        className="max-w-sm"
      /> */}

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

      <TabsContent value="card">
        {/* <PatientCard patients={filteredPatients} /> */}
        <PatientCard patients={paginatedPatients} />
        
        <div className="flex justify-end items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {Math.ceil(filteredPatients.length / pageSize)}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(prev =>
                prev < Math.ceil(filteredPatients.length / pageSize) ? prev + 1 : prev
              )
            }
            disabled={currentPage >= Math.ceil(filteredPatients.length / pageSize)}
          >
            Next
          </Button>
        </div>

      </TabsContent>
    </Tabs>
  )
}

// "use client"

// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent
// } from "@/components/ui/tabs"
// import PatientCard from "./PatientCard"
// import PatientTable from "./PatientTable"
// import PatientToolbar from "./patientToolbar"
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getFilteredRowModel
// } from "@tanstack/react-table"
// import { useEffect, useState } from "react"
// import { Patient } from "../types/patient"
// import { columns as patientColumns } from "./patient/PatientColumn"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

// export default function PatientTabs() {
//   const [data, setData] = useState<Patient[]>([])
//   const [loading, setLoading] = useState(true)
//   const [filter, setFilter] = useState("All")
//   const [search, setSearch] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const pageSize = 10

//   const links = [
//     "All", "Fever", "Sore throat", "Rash", "Sprained Ankle", "Ear Infection",
//     "Sinusitis", "Allergic Reaction", "Headache", "Broken Arm", "Stomach Ache"
//   ]

//   useEffect(() => {
//     fetch("/mock.json")
//       .then(res => {
//         if (!res.ok) throw new Error("Network response was not ok")
//         return res.json()
//       })
//       .then(setData)
//       .catch(err => {
//         console.error("Fetch error:", err)
//         alert("Failed to load patient data")
//       })
//       .finally(() => setLoading(false))
//   }, [])

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [filter, search])

//   const filteredPatients = data.filter(p => {
//     const matchesIssue = filter === "All" || p.medical_issue.toLowerCase() === filter.toLowerCase()
//     const matchesSearch =
//       p.patient_name.toLowerCase().includes(search.toLowerCase()) ||
//       p.medical_issue.toLowerCase().includes(search.toLowerCase()) ||
//       p.contact.some(c =>
//         c.address.toLowerCase().includes(search.toLowerCase()) ||
//         c.email.toLowerCase().includes(search.toLowerCase()) ||
//         c.number.toLowerCase().includes(search.toLowerCase())
//       )
//     return matchesIssue && matchesSearch
//   })

//   const startIndex = (currentPage - 1) * pageSize
//   const endIndex = startIndex + pageSize
//   const paginatedPatients = filteredPatients.slice(startIndex, endIndex)

//   const table = useReactTable({
//     data: paginatedPatients,
//     columns: patientColumns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//   })

//   return (
//     <div className="w-full">
//       <Tabs defaultValue="table">
//         <TabsList className="mb-4">
//           <TabsTrigger value="table">Table View</TabsTrigger>
//           <TabsTrigger value="card">Card View</TabsTrigger>
//         </TabsList>

//         {/* 🔍 Shared Search and Filter Controls */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//           <Input
//             placeholder="Search by name, issue, or contact..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="max-w-md"
//           />

//           <div className="flex flex-wrap gap-2">
//             {links.map(issue => (
//               <Button
//                 key={issue}
//                 variant={filter === issue ? "default" : "outline"}
//                 onClick={() => setFilter(issue)}
//               >
//                 {issue}
//               </Button>
//             ))}
//           </div>
//         </div>

//         {/* 🧠 Loading Skeleton */}
//         {loading ? (
//           <div className="space-y-4">
//             {[...Array(5)].map((_, i) => (
//               <Skeleton key={i} className="h-12 w-full rounded-md" />
//             ))}
//           </div>
//         ) : (
//           <>
//             <TabsContent value="table">
//               <PatientTable table={table} />
//               <PatientToolbar table={table} />
//             </TabsContent>

//             <TabsContent value="card">
//               <PatientCard patients={paginatedPatients} />
//             </TabsContent>

//             {/* 📄 Pagination Controls for Both Views */}
//             <div className="flex justify-end items-center gap-2 mt-4">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </Button>

//               <span className="text-sm text-muted-foreground">
//                 Page {currentPage} of {Math.ceil(filteredPatients.length / pageSize)}
//               </span>

//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() =>
//                   setCurrentPage(prev =>
//                     prev < Math.ceil(filteredPatients.length / pageSize) ? prev + 1 : prev
//                   )
//                 }
//                 disabled={currentPage >= Math.ceil(filteredPatients.length / pageSize)}
//               >
//                 Next
//               </Button>
//             </div>
//           </>
//         )}
//       </Tabs>
//     </div>
//   )
// }
