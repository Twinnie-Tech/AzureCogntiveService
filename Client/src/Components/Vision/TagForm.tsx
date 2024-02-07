import { Button } from "flowbite-react"
import {useForm,SubmitHandler} from "react-hook-form"
const TagForm = () => {
  return (
    <div>
    <p className="text-center">Tags</p>
    <div className="tags">
<form className="form flex flex-col items-center  bg-slate-300 " encType="multipart/form-data" >
<div className="h-[300px] flex justify-between items-center mb-5">
<label htmlFor="File">Upload Image</label>
<input type="file" id="File" name="File" />
</div>
<Button  type="submit">Submit</Button>
</form>
    </div>
</div>
  )
}

export default TagForm