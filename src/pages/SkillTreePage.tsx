import {SkillTree} from "../components";
import useDragScroll from "../hooks/useDragScroll";

function SkillTreePage() {
    const containerRef = useDragScroll<HTMLDivElement>();

    return  <div  ref={containerRef} className="w-full h-full overflow-scroll "><SkillTree/></div>
}

export default SkillTreePage;