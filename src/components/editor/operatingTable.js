'use strict'

let React = require('react')
let _ = require('lodash')
import ComponentViewFactory  from 'components/widgets/componentViewFactory'
import AutoScale from 'components/mixins/autoScale'
require('components/editor/operatingTable.less')

let OperatingTable = React.createClass({
  mixins: [AutoScale],
  componentDidMount: function () {
    this._resized()
    window.addEventListener('resize', this._resized)
  },

  componentWillUnmount: function () {
    window.removeEventListener('resize', this._resized)
  },
  onClick() {
    let slide = this.props.deck.getSelectedSlide()
    if (slide) {
      slide.unselectComponents()
      slide.stopEditingComponents()
    }
  },

  getInitialState: function () {
    return {}
  },
  render: function () {
    let slide = this.props.deck.getSelectedSlide()
    let componentsView = slide.components.map((component, index) => {
      let ComponentView = ComponentViewFactory(component)
      return (
        <ComponentView {...component}
          key={index}
        />
      )
    })
    return (
      <div
        className="sp-operating-table"
        onClick={this.onClick}>
        <div className="sp-ot-slide" style={this.state.scaleStyle}>
          {componentsView}
        </div>
      </div>
    )
  }
})

module.exports = OperatingTable