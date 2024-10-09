export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <h2>Assignment Editor</h2>
      <hr />

      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          Assignment Name
        </label>
        <input
          id="wd-name"
          className="form-control"
          value="A1 - ENV + HTML"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">
          Description
        </label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={5}
        >
The assignment is available online.
Submit a link to the landing page of your Web application running on Netlify.
The landing page should include the following:
  - Your full name and section
  - Links to each of the lab assignments
  - Links to the Kanbas application
  - Links to all relevant source code repositories
        </textarea>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-points" className="form-label">
            Points
          </label>
          <input
            id="wd-points"
            className="form-control"
            type="number"
            value={100}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-assignment-group" className="form-label">
            Assignment Group
          </label>
          <select id="wd-assignment-group" className="form-select">
            <option>ASSIGNMENTS</option>
            <option>QUIZZES</option>
            <option>PROJECTS</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-display-grade" className="form-label">
            Display Grade As
          </label>
          <select id="wd-display-grade" className="form-select">
            <option>Percentage</option>
            <option>Points</option>
            <option>Complete/Incomplete</option>
          </select>
        </div>
      </div>

      {/* Submission Type */}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-submission-type" className="form-label">
            Submission Type
          </label>
          <select id="wd-submission-type" className="form-select">
            <option>Online</option>
            <option>On Paper</option>
          </select>

          <div className="form-check mt-2">
            <input className="form-check-input" type="checkbox" id="wd-entry-url" defaultChecked />
            <label className="form-check-label" htmlFor="wd-entry-url">
              Website URL
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-entry-text" />
            <label className="form-check-label" htmlFor="wd-entry-text">
              Text Entry
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-entry-media" />
            <label className="form-check-label" htmlFor="wd-entry-media">
              Media Recordings
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="wd-entry-file" />
            <label className="form-check-label" htmlFor="wd-entry-file">
              File Uploads
            </label>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="wd-assign-to" className="form-label">
            Assign To
          </label>
          <input id="wd-assign-to" className="form-control" value="Everyone" />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label htmlFor="wd-due-date" className="form-label">
            Due
          </label>
          <input id="wd-due-date" className="form-control" type="date" value="2024-05-13" />
        </div>
        <div className="col-md-3">
          <label htmlFor="wd-available-from" className="form-label">
            Available from
          </label>
          <input id="wd-available-from" className="form-control" type="date" value="2024-05-06" />
        </div>
        <div className="col-md-3">
          <label htmlFor="wd-available-until" className="form-label">
            Until
          </label>
          <input id="wd-available-until" className="form-control" type="date" value="2024-05-20" />
        </div>
      </div>

      <div className="mt-4">
        <button id="wd-cancel" className="btn btn-secondary me-2">Cancel</button>
        <button id="wd-save" className="btn btn-success">Save</button>
      </div>
    </div>
  );
}
