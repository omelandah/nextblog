import Link from '../../../node_modules/next/link';

const blogs = [
  {
    id: 1,
    title: 'blog 1',
  },
  {
    id: 2,
    title: 'blog 2',
  },
  {
    id: 3,
    title: 'blog 3',
  },
];

const BlogList = () => {
  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
