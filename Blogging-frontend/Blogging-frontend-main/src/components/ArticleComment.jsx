import React from "react";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";

function ArticleComment({ comment }) {
  console.log("comment", comment);

  const { author, body, createdAt, id } = comment;
  const { authUser } = useAuth();

  const canDelete = author?.username === authUser?.username;

  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{body} </p>
      </div>

      {id && (
        <div className="card-footer">
          <Link>{author.username}</Link>&nbsp;

            <span className="date-posted">
                {new Date(createdAt).toDateString()}
            </span>

          &nbsp;
          {canDelete && <button>Delete</button>}
        </div>
      )}
    </div>
  );
}

export default ArticleComment;
