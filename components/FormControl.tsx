import React from "react"

const FormControl = ({children, className}:{children:React.ReactNode, className?:string}):JSX.Element => {
  return (
    <div className={className}>{children}</div>
  )
}
export default FormControl