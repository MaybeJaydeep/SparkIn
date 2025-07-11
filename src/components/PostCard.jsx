import { Link } from 'react-router-dom';

export default function PostCard({ slug, title, excerpt, author, date }) {
  return (
    <div className="border-b pb-4 mb-4">
      <Link to={`/post/${slug}`}>
        <h2 className="text-2xl font-bold text-blue-600 hover:underline">{title}</h2>
      </Link>
      <p className="text-gray-600">{excerpt}</p>
      <div className="text-sm text-gray-500">
        By{' '}
        <Link to={`/author/${author}`} className="underline hover:text-blue-600">
          {author}
        </Link>{' '}
        on {date}
      </div>
    </div>
  );
}
