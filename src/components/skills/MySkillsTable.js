import React, { Component } from "react";

const MySkillsTable = ({ type, updateClick, deleteClick, skills }) => {
  return (
    <>
      <div className="table-responsive-sm">
        <table className="table table-sm col-lg-8 table-hover text-center">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Grade</th>
              <th>Status</th>
              <th>Comment</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody id="technicalReq">
            {skills.map((skill, index) => (
              <tr key={index}>
                <td>{skill.skillName}</td>
                <td>{skill.date}</td>
                <td>{skill.level}</td>
                <td>{skill.status}</td>
                <td>{skill.comment}</td>
                {skill.status === "PENDING" ? (
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={deleteClick.bind(this, skill.employeeSkillId)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                    &nbsp;
                    <button
                      className="btn btn-alert btn-sm"
                      onClick={updateClick.bind(
                        this,
                        type,
                        skill.employeeSkillId
                      )}
                    >
                      {" "}
                      Update
                    </button>
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MySkillsTable;
