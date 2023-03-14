import Diagram from "@/assets/diagram.svg?raw";

export default function MainPage() {
  return <div dangerouslySetInnerHTML={{ __html: Diagram }} />;
}
