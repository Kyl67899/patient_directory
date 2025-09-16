"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import type { Table } from "@tanstack/react-table"
import { Patient } from "../types/patient"

export default function PatientToolbar({ table }: { table: Table<Patient> }) {

  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter by name..."
        value={(table.getColumn("patient_name")?.getFilterValue() as string) ?? ""}
        onChange={(e) => table.getColumn("patient_name")?.setFilterValue(e.target.value)}
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table.getAllColumns().filter((col): col is typeof col => col.getCanHide()).map((col) => (
            <DropdownMenuCheckboxItem
              key={col.id}
              checked={col.getIsVisible()}
              onCheckedChange={(val) => col.toggleVisibility(!!val)}
            >
              {col.id}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
