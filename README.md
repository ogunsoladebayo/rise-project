# RESTful API using Node.js, Express, TypeScript, and PostgreSQL


## Table of Contents

- [Database Design & Setup](#database-design--setup)
- [API Development](#api-development)
- [Query Optimization Task](#query-optimization-task)
- [Middleware & Error Handling](#middleware--error-handling)
- [Getting Started](#getting-started)
- [Tests](#tests)
- [Submission](#submission)

## Database Design & Setup

Below is the database schema design along with the labeled indexed columns for query optimization:
The database consists of three tables: User, Post, and Comment.


**User Table:**
- `id` (int, Primary Key, Indexed)
- `name` (varchar)
- `email` (varchar)
- `hashedPassword` (varchar)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

**Post Table:**
- `id` (int, Primary Key, Indexed)
- `title` (varchar)
- `body` (text)
- `author_id` (int, Indexed, for efficient joins with "user" table)
- `created_at` (Timestamp)

**Comment Table:**
- `id` (int, Primary Key, Indexed)
- `content` (text)
- `author_id` (Indexed, for efficient joins with "user" table)
- `post_id` (int, Indexed, for efficient joins with "post" table)
- `created_at` (Timestamp, Indexed, for filtering/ordering comments)
- `updated_at` (Timestamp)

## API Development

Endpoints have been created to perform the following actions:
- Create and retrieve users (`/users`).
- Create a post for a user and retrieve all posts of a user (`/users/:id/posts`).
- Add a comment to a post (`/posts/:postId/comments`).
- Performance Challenge: Retrieve top 3 users with the most posts and their latest comments efficiently (`/users/top`).

## Query Optimization Task

The following query retrieves the top 3 users with the most posts and their latest comment:

```sql
WITH LatestComments AS (SELECT c.author_id, MAX(c.created_at) AS latestCommentCreatedAt, MAX(c.content) AS latestCommentContent
FROM comment c
GROUP BY c.author_id)

SELECT u.id, u.name, COUNT(DISTINCT p.id) AS postsCount, lc.latestCommentContent AS latestComment
FROM "user" u
LEFT JOIN post p ON u.id = p.author_id
LEFT JOIN LatestComments lc
ON u.id = lc.author_id
GROUP BY u.id, lc.latestCommentContent
ORDER BY postsCount DESC
LIMIT 3;

```

The query is optimized by creating a CTE (Common Table Expression) to retrieve the latest comment for each user. This is done by grouping the comments by the author_id and selecting the maximum created_at timestamp and content. The CTE is then joined with the user table to retrieve the top 3 users with the most posts and their latest comment. The use of CTE helps in reducing redundant calculations and improving readability.

## Middleware & Error Handling

token-based authentication is applied to all routes except POST to `/users`. Input data is validated with simple request body checks, and error handling is applied to API routes as middleware.

## Getting Started

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure your PostgreSQL and Redis instances.
4. Update environment variables.
5. Run the app using `npm start`.

### Docker Compose

To run the application using Docker Compose:

1. Open a terminal and navigate to the project directory.
2. Run `docker compose up` to build and start the app.
3. Access the API at `http://localhost:4080`.
4. PG Admin is available at `http://localhost:8081`.

## Tests

Unit tests ensure the functionality and correctness of the application. Run tests using `npm test`.

## Submission

- API endpoints are documented in the provided Postman collection: [Postman Collection](https://documenter.getpostman.com/view/11616904/2s9Y5YR2cv).
- The API is live on Render: [Rise Demo](https://https://rise-demo.onrender.com).

For any inquiries, please contact [usman.ogunsola@outlook.com](mailto:usman.ogunsola@outlook.com).
