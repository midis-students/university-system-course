import { Message } from 'primereact/message';

export default function WarnMessage({ text }: { text: string }) {
  return <Message severity="warn" text={text} />;
}
