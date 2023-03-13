type BlockInfoProps = {
  title: string;
  children: React.ReactNode;
};

export default function BlockInfo({ title, children }: BlockInfoProps) {
  return (
    <div className="border">
      <h5 className="mb-0 mt-2 text-color-secondary">{title}</h5>
      <div className="font-medium text-lg">{children}</div>
    </div>
  );
}
