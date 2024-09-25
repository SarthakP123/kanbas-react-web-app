export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
  
        <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
     </textarea>
        <br />
  
        <table>
          <tbody>
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-points">Points</label>
              </td>
              <td>
                <input id="wd-points" value={100} />
              </td>
            </tr>
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-assignment-group">Assignment Group</label>
              </td>
              <td>
                <select id="wd-assignment-group">
                  <option>ASSIGNMENTS</option>
                  <option>QUIZZES</option>
                  <option>PROJECTS</option>
                </select>
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-display-grade">Display Grade as</label>
              </td>
              <td>
                <select id="wd-display-grade">
                  <option>Percentage</option>
                  <option>Points</option>
                  <option>Complete/Incomplete</option>
                </select>
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
              </td>
              <td>
                <select id="wd-submission-type">
                  <option>Online</option>
                  <option>On Paper</option>
                </select>
                <br />
                <div>
                  <input type="checkbox" id="wd-entry-text" /> Text Entry
                  <input type="checkbox" id="wd-entry-url" /> Website URL
                  <input type="checkbox" id="wd-entry-media" /> Media Recordings
                  <input type="checkbox" id="wd-entry-annotation" /> Student Annotation
                  <input type="checkbox" id="wd-entry-file" /> File Uploads
                </div>
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-assign-to">Assign to</label>
              </td>
              <td>
                <input id="wd-assign-to" value="Everyone" />
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-due-date">Due</label>
              </td>
              <td>
                <input id="wd-due-date" type="date" value="2024-05-13" />
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-available-from">Available from</label>
              </td>
              <td>
                <input id="wd-available-from" type="date" value="2024-05-06" />
                <label htmlFor="wd-available-until">Until</label>
                <input id="wd-available-until" type="date" value="2024-05-20" />
              </td>
            </tr>
          </tbody>
        </table>
  
        <br />
        <button id="wd-cancel">Cancel</button>
        <button id="wd-save">Save</button>
      </div>
    );
  }
  