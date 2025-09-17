// /components/patient/columns.ts
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Patient } from "@/app/types/patient"

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "patient_id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "patient_name",
    header: () => "name",
  },
  // {
  //   accessorKey: "photo_url",
  //   header: () => "Photo",
  // },
  {
    accessorKey: "age",
    header: () => "Age",
  },
  {
    accessorKey: "medical_issue",
    header: "Medical Issue",
    cell: ({ row }) => {
      const issue = row.original.medical_issue?.trim() || "default"
  
      const colorMap: Record<string, string> = {
        "Fever": "bg-red-100 text-red-800",
        "Sore throat": "bg-blue-100 text-blue-800",
        "Sprained Ankle": "bg-yellow-100 text-yellow-800",
        "Ear Infection": "bg-purple-100 text-purple-800",
        "Sinusitis": "bg-purple-100 text-purple-800",
        "Allergic Reaction": "bg-purple-100 text-purple-800",
        "Headache": "bg-purple-100 text-purple-800",
        "Broken Arm": "bg-purple-100 text-purple-800",
        "Stomach Ache": "bg-purple-100 text-purple-800",
        "Rash": "bg-pink-100 text-pink-800",
        "default": "bg-gray-100 text-gray-800",
      }
  
      const color = colorMap[issue] ?? colorMap["default"]
  
      return (
        <span className={`px-2 py-1 rounded text-sm font-medium ${color}`}>
          {issue}
        </span>
      )
    },
  },
  {
    id: "email",
    header: () => "Email",
    cell: ({ row }) => (
      <div>{row.original.contact?.[0]?.email ?? "No email"}</div>
    ),
  },
  {
    id: "address",
    header: () => "Address",
    cell: ({ row }) => (
      <div>{row.original.contact?.[0]?.address ?? "No address"}</div>
    ),
  },
  {
    id: "phone",
    header: () => "Phone",
    cell: ({ row }) => (
      <div>{row.original.contact?.[0]?.number ?? "N/A"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const email = row.original.contact?.[0]?.email ?? "No email"
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(email)}>
              Copy Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
