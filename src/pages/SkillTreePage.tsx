import  {useRef } from "react";
import useScrollOnDrag from "react-draggable-scroll";

import {SkillTree} from "../components";

function SkillTreePage() {
    const containerRef = useRef(null);
    const { events } = useScrollOnDrag(containerRef);
    return  <div {...events} ref={containerRef} className="w-full h-full overflow-scroll "><SkillTree/></div>
}

export default SkillTreePage;