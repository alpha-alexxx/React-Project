import { Link } from "react-router-dom";

export default function UserCard({ id, name, email, company, website }) {
  return (
    <>
      <div className="card">
        <div className="card-header">{name}</div>
        <div className="card-body">
          <div>{company.name}</div>
          <div>{website}</div>
          <div>{email}</div>
        </div>
        <div className="card-footer">
          <Link className="btn" to={`${id}`}>
            View
          </Link>
        </div>
      </div>
    </>
  );
}
