// /types/patient.ts
export type Patient = {
    patient_id: number
    patient_name: string
    age: number
    photo_url: string
    contact: {
      address: string
      number: string
      email: string
    }[]
    medical_issue: string
  }
  