import { Patient } from "../types/patient"

const issueColorMap: Record<string, string> = {
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

export default function PatientCard({ patients }: { patients: Patient[] }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map(p => {
          const issueColor = issueColorMap[p.medical_issue] ?? issueColorMap.default

          return (
            <div key={p.patient_id} className="border rounded-lg shadow-sm bg-white">
              <div className="flex items-center gap-4 bg-[#3f96f9] w-full p-3">
                <img
                  src={p.photo_url}
                  alt={p.patient_name}
                  className="w-12 h-12 object-cover rounded-full border"
                />
                <div className="flex justify-between w-full items-center">
                  <div className="">
                    <h3 className="font-semibold text-sm">{p.patient_name}</h3>
                    <h4 className="font-semibold text-sm">ID-{String(p.patient_id).padStart(3, "0")}</h4>
                  </div>
                  <div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1.5 rounded-full m-3">
                      Age {p.age}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className={`text-sm px-2 py-1 rounded font-medium inline-block mb-2 ${issueColor}`}>
                  {p.medical_issue}
                </div>

                <div className="text-sm text-muted-foreground mb-1">📍 {p.contact[0]?.address ?? "No address"}</div>
                <div className="text-sm mb-1">📞 {p.contact[0]?.number ?? "N/A"}</div>
                <div className="text-sm">✉️ {p.contact[0]?.email ?? "No Email"}</div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
