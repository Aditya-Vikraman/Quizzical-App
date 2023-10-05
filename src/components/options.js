import React from "react";

export default function Options (props) {
  const [options, setOptions] = React.useState([])

  React.useEffect(() => {
    setOptions(props.choises.map((item) => {
      return {
        qid: props.qid,
        value: item,
        selected: props.selected,
        answer: props.answer,
        end: props.finish,
      }
    }))
  },[props.selected,props.finish])
    
  return options.map((item) => {
    let style = {backgroundColor: item.value === item.selected ? "lightgreen": ""}
    
    if (item.end) {
      style = {backgroundColor: item.value === item.selected && item.selected !== item.answer ? "pink": item.value === item.answer ? "lightgreen": ""}
    }
    return (
      <div 
        className="option"
        style={style} 
        onClick={() => {props.handleClick(item.value,item.qid)}}
      >
        {item.value}
      </div>
    )
  })
}