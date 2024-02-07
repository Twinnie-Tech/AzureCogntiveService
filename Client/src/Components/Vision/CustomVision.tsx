import TagForm from "./TagForm"
import Brand from "./Brand"
import Compare from "./Compare"
import AdultContent from "./AdultContent"
import ColorsForm from "./ColorsForm"
const CustomVision = () => {
  return (
    <div className="grid grid-cols-3 gap-6 mx-8  bg-red-400" >
  <TagForm />
  <Brand />
<Compare />
<ColorsForm />
<AdultContent />
    </div>
  )
}

export default CustomVision