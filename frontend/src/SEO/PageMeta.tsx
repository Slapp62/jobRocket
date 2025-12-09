interface PageMetaProps {
  title: string;
  description: string;
  keywords?: string;
}

export function PageMeta({ title, description, keywords }: PageMetaProps) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
    </>
  );
}
