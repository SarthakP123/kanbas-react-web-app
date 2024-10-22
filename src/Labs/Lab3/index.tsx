import BooleanVariables from "./BooleanVariables";
import VariablesAndConstants from "./VariablesAndConstants";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import ArrowFunctions from "./ArrowFunctions";
import ForLoops from "./ForLoops";
import PathParameters from "./PathParameters";
import MathFunctions from "./Math";
import FilterFunction from "./FilterFunction";
import MapFunction from "./MapFunction";
import Spreading from "./Spreading";
import TemplateLiterals from "./TemplateLiterals";
import TernaryOperator from "./TernaryOperator";
import Classes from "./Classes";

export default function Lab3() {
  console.log('Hello World!');
  return (
    <div id="wd-lab3" className="container">
      <h3>Lab 3</h3>
      <VariablesAndConstants />
      <BooleanVariables />
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
      </Highlight>
      
      <ArrowFunctions />
      <ForLoops />
      <PathParameters />
      <FilterFunction />
      <MapFunction />
      <Spreading />
      <TemplateLiterals />
      <TernaryOperator />
      <Classes />
    </div>
  );
}
