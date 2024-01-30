import React from 'react'
import { Web3Provider } from '@ethersproject/providers'

import { getICOContract } from '@constants/ICO_contract'
import { FloyxIcoAddress } from '@constants/Addresses'
import './style.css'
import { iconPreSale } from '@assets/index'

class CircularProgressBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    // Size of the enclosing square
    const sqSize = this.props.sqSize
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (this.props.sqSize - this.props.strokeWidth) / 2
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${sqSize} ${sqSize}`
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - (dashArray * this.props.percentage) / 100

    return (
      <div>
        <div className="outer__div">
          <svg width={this.props.sqSize} height={this.props.sqSize} viewBox={viewBox}>
            <circle
              className="circle_background"
              cx={this.props.sqSize / 2}
              cy={this.props.sqSize / 2}
              r={radius}
              strokeWidth={`${this.props.strokeWidth}px`}
            />
            <circle
              className="circle_progress"
              cx={this.props.sqSize / 2}
              cy={this.props.sqSize / 2}
              r={radius}
              strokeWidth={`${this.props.strokeWidth}px`}
              // Start progress marker at 12 O'Clock
              transform={`rotate(-90 ${this.props.sqSize / 2} ${this.props.sqSize / 2})`}
              style={{
                strokeDasharray: dashArray,
                strokeDashoffset: dashOffset
              }}
            />
            <text className="circle_text" x="50%" y="50%" dy=".3em" textAnchor="middle">
              {`${this.props.percentage}%`}
            </text>
          </svg>
        </div>
        <img className="set__Image" src={iconPreSale} alt="presale" />
      </div>
    )
  }
}

CircularProgressBar.defaultProps = {
  sqSize: 100,
  percentage: 25,
  strokeWidth: 5
}

class ProgressBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      percentage: 0
    }
    this.intervalId = 0

    this.handleChangeEvent = this.handleChangeEvent.bind(this)
  }

  handleChangeEvent(event) {
    this.setState({
      percentage: event.target.value
    })
  }

  async componentDidMount() {
    this.intervalId = setInterval(() => {
      this.loadData()
    }, 2000)
  }

  async loadData() {
    const totalSupply = this.props.totalSupply
    try {
      const library = new Web3Provider(window.ethereum, 'any')
      const ICOContract = getICOContract(library, FloyxIcoAddress)
      const ICOContractValue = await ICOContract.soldTokens(this.props.overrides)
      const testValue = ICOContractValue * (1 / 1000000000000000000)
      const percentage = (testValue / totalSupply) * 100

      if (parseInt(percentage) > 100) {
        this.setState({ percentage: 100 })
        return
      }

      this.setState({ percentage: parseInt(percentage) })
    } catch (e) {
      // console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    return (
      <div style={{ margin: '1rem' }}>
        <CircularProgressBar strokeWidth="10" sqSize="200" percentage={this.state.percentage} />
      </div>
    )
  }
}

export default ProgressBar
