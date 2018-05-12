import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

/*
  A react component that that takes a template written in psuedo html and interpolates
  react tags provided as props. Note that it does not support nesting interpolation
  tags.

  @example
  // returns <span>Hello <span class="test">world</span></span>
  <Interpolate
    template="Hello <emphasis> world </emphasis>"
    emphasis={(c)=> <span className="foo">{c}</span>}>

  If you simply want to wrap the content of a tag in a span with a className,
  you can pass the class name instead of a whole function

  <Interpolate
    template="Hello <emphasis> world </emphasis>"
    emphasis="foo"/>
*/
export default class Interpolate extends React.Component{

  static propTypes = {
    template: PropTypes.string.isRequired
  };

  render(){
    const preJsxString = this.props.template || ""
    let interpolations = _.omit(this.props,["template"])

    const regx = /<(.*)>(.*?)<\/\1>/g
    let readyForProcessing = preJsxString.replace(regx, (match)=> `%~%${match}%~%`)

    const stringSegments = readyForProcessing.split("%~%")

    let segments = stringSegments
      .map((str, index)=>{
        let matches = regx.exec(str)
        let reactFn = matches && interpolations[matches[1]]
        if(typeof(reactFn) == 'function'){
          return React.cloneElement(reactFn(matches[2]), {key: index})
        }else if(typeof(reactFn) == "object" && reactFn){
          return React.createElement("span", {key: index, style: reactFn}, matches[2])
        }else if(typeof(reactFn) == 'string'){
          return React.createElement("span", {key: index, className: reactFn}, matches[2])
        }else{
          return React.createElement("span", {key: index}, str)
        }
      })

    return(
      <span>
        {segments}
      </span>
    )
  }
}

Interpolate.propTypes = {template: React.PropTypes.string}
