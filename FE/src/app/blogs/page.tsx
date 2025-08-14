import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  body: string;
  date: string;
}

export const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Tailwind CSS',
    body: 'Tailwind CSS is a utility-first CSS framework that lets you build modern designs directly in your HTML. In this post, I’ll walk you through the basics and show you how to set up Tailwind in your project. Tailwind CSS is a utility-first CSS framework that lets you build modern designs directly in your HTML. In this post, I’ll walk you through the basics and show you how to set up Tailwind in your project.',
    date: '2025-08-10',
  },
  {
    id: 2,
    title: 'My Journey into Fullstack Development',
    body: 'Starting as a front-end developer, I always wondered how the back-end worked. This post shares my experience learning Node.js, working with databases, and deploying fullstack apps.',
    date: '2025-08-05',
  },
  {
    id: 3,
    title: 'Why TypeScript Changed My Workflow',
    body: 'TypeScript brings type safety and better tooling to JavaScript projects. Here’s how it has improved my productivity and reduced bugs in my daily work.',
    date: '2025-08-01',
  },
  {
    id: 4,
    title: 'Getting Started with Tailwind CSS',
    body: 'Tailwind CSS is a utility-first CSS framework that lets you build modern designs directly in your HTML. In this post, I’ll walk you through the basics and show you how to set up Tailwind in your project. Tailwind CSS is a utility-first CSS framework that lets you build modern designs directly in your HTML. In this post, I’ll walk you through the basics and show you how to set up Tailwind in your project.',
    date: '2025-08-10',
  },
];

const BlogList = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">My Blog</h1>
        <p className="text-gray-600">Sharing my thoughts and experiences</p>
      </header>

      <section className="space-y-6">
        {mockPosts.map((post) => (
          <article
            key={post.id}
            className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
          >
            <h2 className="text-black text-2xl font-semibold mb-2">
              {post.title}
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-4 line-clamp-2">{post.body}</p>
            <Link
              href={`/blogs/${post.id}`}
              className="text-blue-500 hover:underline font-medium"
            >
              Read More →
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
};

export default BlogList;
