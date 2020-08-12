import React from 'react'
import PropTypes from 'prop-types'


const LineGraph = ({ width = 500, inputs = [], valueLabel = '', formatter }) => {
  const graphPadding = 10
  const drawWidth = width - (graphPadding * 2)


  const colors = [ 'blue', 'red', 'aqua', 'purple', 'lime', 'green', 'navy', 'blue', 'aqua', 'teal' ]

  let nextColor = 0
  let startingPixel = graphPadding
  const realValTotal = inputs.reduce((acc, x) => acc + x.value, 0)

  const inputsWithXValues = inputs.filter(x => x.value > 0).map((input, index) => {
    const pixelWidth = (input.value / realValTotal) * drawWidth

    const x1 = startingPixel
    const x2 = startingPixel + pixelWidth
    startingPixel = x2


    let color = input.color
    if (!color) {
      color = colors[nextColor]
      nextColor++

      if (nextColor >= colors.length) {
        nextColor = 0
      }
    }


    return {
      ...input,
      id: index,
      x1,
      x2,
      color,
    }
  })



  return (
    <svg height="20" width={`${width}`} viewBox={`0 0 ${width} 20`} xmlns="http://www.w3.org/2000/svg">
      <line x1={10} y1="10" x2={width - graphPadding} y2="10" strokeWidth="2" stroke='black' />

      {inputsWithXValues.map(input => {
        return (
          <g key={input.id}>
            <line x1={input.x1} y1="10" x2={input.x2} y2="10" strokeWidth="5" stroke={input.color} />

            {/* Tooltip */}
            <rect x={input.x1} width={input.x2 - input.x1} height='20' fill='transparent'>
              <title>{`${input.label} - ${formatter ? formatter.format(input.value) : input.value} ${valueLabel}`}</title>
            </rect>
          </g>
        )
      })}

      {/* Ticks */}
      {inputsWithXValues.map(input => {
        return (<line key={`${input.id}tick`} x1={input.x1} y1="4" x2={input.x1} y2="16" strokeWidth="2" stroke='black' />)
      })}

      {/* No values placeholder */}
      {inputs.length === 0 ? (
        <g>
          <line key='firsttick' x1={10} y1="4" x2={10} y2="16" strokeWidth="2" stroke='black' />
        </g>
      ) : null}

      <line key='finaltick' x1={width - graphPadding} y1="4" x2={width - graphPadding} y2="16" strokeWidth="2" stroke='black' />
    </svg>
  )
}


LineGraph.propTypes = {
  width: PropTypes.number,
  inputs: PropTypes.array,
  valueLabel: PropTypes.string,
  formatter: PropTypes.object,
}


export default LineGraph