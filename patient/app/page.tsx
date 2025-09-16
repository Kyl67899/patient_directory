import Navbar from "./component/navbar";
import PatientTabs from "./component/PatientTabs";
import { Table as TanTable } from "@tanstack/react-table"

export default function Home() {
  return (
    <>
      <main className="p-6">
      <PatientTabs />
    </main>

    </>
  );
}
