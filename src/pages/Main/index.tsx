import { Card } from "primereact/card";

import Diagram from "@/assets/diagram.svg";

export default function MainPage() {
  return (
    <main className="card">
      <Card title="Схема">
        <img src={Diagram} style={{ height: "80vh" }} />
      </Card>
    </main>
  );
}
