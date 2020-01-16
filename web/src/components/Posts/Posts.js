import { useMutation } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`

const truncate = (text) => {
  let output = text
  if (text.length > 100) {
    output = output.substring(0, 100) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const PostsList = ({ posts }) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      location.reload()
    },
  })

  const onDeleteClick = (event) => {
    const id = event.target.dataset.id

    if (confirm(`Are you sure you want to delete post ${id}?`)) {
      deletePost({ variables: { id: parseInt(id) } })
    }
  }

  return (
    <div className="bg-white text-gray-900 border rounded-lg overflow-hidden">
      <table className="table-auto w-full text-sm">
        <thead>
          <tr className="bg-gray-300 text-gray-700">
            <th className="font-semibold text-left p-3 pl-4">id</th>
            <th className="font-semibold text-left p-3">title</th>
            <th className="font-semibold text-left p-3">body</th>
            <th className="font-semibold text-left p-3">createdAt</th>
            <th className="font-semibold text-left p-3 pr-4">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="odd:bg-gray-100 even:bg-white border-t"
            >
              <td className="p-3 pl-4">{post.id}</td>
              <td className="p-3" title={post.title}>
                {truncate(post.title)}
              </td>
              <td className="p-3" title={post.body}>
                {truncate(post.body)}
              </td>
              <td className="p-3" title={post.createdAt}>
                {timeTag(post.createdAt)}
              </td>
              <td className="p-3 pr-4 text-right whitespace-no-wrap">
                <nav>
                  <ul>
                    <li className="inline-block">
                      <Link
                        to={routes.post({ id: post.id })}
                        title={`Show post ${post.id} detail`}
                        className="text-xs bg-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded px-2 py-1 uppercase font-semibold tracking-wide"
                      >
                        Show
                      </Link>
                    </li>
                    <li className="inline-block ml-2">
                      <Link
                        to={routes.editPost({ id: post.id })}
                        title={`Edit post ${post.id}`}
                        className="text-xs bg-blue-600 text-blue-200 hover:bg-blue-700 hover:text-white rounded px-2 py-1 uppercase font-semibold tracking-wide"
                      >
                        Edit
                      </Link>
                    </li>
                    <li className="inline-block ml-2">
                      <a
                        href="#"
                        title={`Delete post ${post.id}`}
                        data-id={post.id}
                        className="text-xs bg-red-600 text-red-200 hover:bg-red-700 hover:text-white rounded px-2 py-1 uppercase font-semibold tracking-wide"
                        onClick={onDeleteClick}
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostsList
