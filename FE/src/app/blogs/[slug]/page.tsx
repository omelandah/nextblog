interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

const BlogDetail = async ({ params }: BlogDetailProps) => {
  const data = await params;

  return <div>Detail blog #{data.slug}</div>;
};

export default BlogDetail;
