"use client";

import { useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Job from "./Job";
import Newjob from "./newjob/Newjob";

function Page() {
  const [newJob, setNewJob] = useState(false);
  const nodeRef = useRef(null);
  return (
    <div>
      
        <CSSTransition
          in={!newJob}
          timeout={500}
          classNames="job-transition"
          unmountOnExit
          nodeRef={nodeRef}
        >
          <Job setNewJob={setNewJob} />
        </CSSTransition>
        <CSSTransition
          in={newJob}
          timeout={500}
          classNames="job-transition"
          nodeRef={nodeRef}
          unmountOnExit
        >
          <Newjob setNewJob={setNewJob} />
        </CSSTransition>
    

      {/* {newJob ? <Newjob /> : <Job setNewJob={setNewJob}/>} */}
    </div>
  );
}

export default Page;
