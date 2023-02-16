import { Card } from "primereact/card";
import { Badge } from "primereact/badge";

import Diagram from "@/assets/diagram.svg";

export default function MainPage() {
  return (
    <main className="card">
      <Card title="Схема">
        <img src={Diagram} />
      </Card>
    </main>
  );
}
