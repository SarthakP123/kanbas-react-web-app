import React from 'react';
import "./index.css";

import ForegroundColors from './ForegroundColors';
import BackgroundColors from './BackgroundColors';
import  Borders  from './Borders';
import  Padding from './Padding';
import Margins from './Margins';
import Corners from './Corners';
import Dimensions from './Dimensions';
import Positions from './Positions';
import Zindex from './Zindex';
import Float from './Float';
import GridLayout from './GridLayout';
import Flex from './Flex';
import ReactIcons from './ReactIcons';
import BootstrapGrids  from './BootstrapGrids';
import ScreenSizeLabel  from './ScreenSizeLabel';
import BootstrapTables from './BootstrapTables';
import BootstrapLists from './BootstrapLists';
import BootstrapForms from './BootstrapForms';
import BootstrapNavigation from './BootstrapNavigation';

export default function Lab2() {
  return (
    <div className="container">
      <h2>Lab 2 - Cascading Style Sheets</h2>

      {/* Styling with the STYLE attribute */}
      <h3>Styling with the STYLE attribute</h3>
      <p style={{ backgroundColor: "blue", color: "white" }}>
        Style attribute allows configuring look and feel right on the element. Avoid using the style attribute for maintainability.
      </p>

      {/* ID Selectors */}
      <h3>ID selectors</h3>
      <p id="wd-id-selector-1">
        This paragraph uses an ID selector with a red background and white text.
      </p>
      <p id="wd-id-selector-2">
        This paragraph uses a different ID with a yellow background and black text.
      </p>

      {/* Class Selectors */}
      <h3>Class selectors</h3>
      <p className="wd-class-selector">
        This paragraph is styled using a class selector with a yellow background and blue text.
      </p>
      <h4 className="wd-class-selector">
        This heading uses the same class selector as above.
      </h4>

      {/* Document Structure Selectors */}
      <h3>Document structure selectors</h3>
      <div className="wd-selector-1">
        <div className="wd-selector-2">
          <p className="wd-selector-3">
            This paragraph uses document structure for its red background and white text.
            <span className="wd-selector-4">
              This span is nested inside the paragraph and uses yellow background and blue text.
            </span>
          </p>
        </div>
      </div>

      {/* Colors */}
      <div id="wd-css-colors">
        <h2>Colors</h2>
        <h3 className="wd-fg-color-blue">This heading is blue</h3>
        <p className="wd-fg-color-red">
          This paragraph is red but <span className="wd-fg-color-green">this text is green</span>.
        </p>
      </div>

      {/* Background Colors */}
      <div id="wd-css-background-colors">
        <h3 className="wd-bg-color-blue wd-fg-color-white">This heading has a blue background and white text</h3>
        <p className="wd-bg-color-red wd-fg-color-black">
          This paragraph has a red background and black text but
          <span className="wd-bg-color-green wd-fg-color-white"> this span has a green background and white text</span>.
        </p>
      </div>

      <ForegroundColors />
      <BackgroundColors />
      <Borders />
      <Padding />
      <Margins />
      <Corners />
      <Dimensions />
      <Positions />
      <Zindex />
      <Float />
      <GridLayout />
      <Flex />
      <ReactIcons />
      <BootstrapGrids />
      <ScreenSizeLabel />
      <BootstrapTables />
      <BootstrapLists />
      <BootstrapForms />
      <BootstrapNavigation />
    </div>
  );
}
