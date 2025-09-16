import { Patient } from "@/app/types/patient"
import { NextResponse } from "next/server"

const mockPatients: Patient[] = [
  {
    patient_id: 1,
    patient_name: "John Doe",
    age: 45,
    photo_url: "",
    medical_issue: "Diabetes",
    contact: [
      {
        address: "123 Main St",
        number: "555-1234",
        email: "john@example.com",
      },
    ],
  },
  {
    patient_id: 2,
    patient_name: "Jane Smith",
    age: 32,
    photo_url: "",
    medical_issue: "Asthma",
    contact: [
      {
        address: "456 Elm St",
        number: "555-5678",
        email: "jane@example.com",
      },
    ],
  },
]

export async function GET() {
  return NextResponse.json(mockPatients)
}
