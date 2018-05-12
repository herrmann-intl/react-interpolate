'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var Interpolate = function (_React$Component) {
  _inherits(Interpolate, _React$Component);

  function Interpolate() {
    _classCallCheck(this, Interpolate);

    return _possibleConstructorReturn(this, (Interpolate.__proto__ || Object.getPrototypeOf(Interpolate)).apply(this, arguments));
  }

  _createClass(Interpolate, [{
    key: 'render',
    value: function render() {
      var preJsxString = this.props.template || "";
      var interpolations = _lodash2.default.omit(this.props, ["template"]);

      var regx = /<(.*)>(.*?)<\/\1>/g;
      var readyForProcessing = preJsxString.replace(regx, function (match) {
        return '%~%' + match + '%~%';
      });

      var stringSegments = readyForProcessing.split("%~%");

      var segments = stringSegments.map(function (str, index) {
        var matches = regx.exec(str);
        var reactFn = matches && interpolations[matches[1]];
        if (typeof reactFn == 'function') {
          return _react2.default.cloneElement(reactFn(matches[2]), { key: index });
        } else if ((typeof reactFn === 'undefined' ? 'undefined' : _typeof(reactFn)) == "object" && reactFn) {
          return _react2.default.createElement("span", { key: index, style: reactFn }, matches[2]);
        } else if (typeof reactFn == 'string') {
          return _react2.default.createElement("span", { key: index, className: reactFn }, matches[2]);
        } else {
          return _react2.default.createElement("span", { key: index }, str);
        }
      });

      return _react2.default.createElement(
        'span',
        null,
        segments
      );
    }
  }]);

  return Interpolate;
}(_react2.default.Component);

Interpolate.propTypes = {
  template: _propTypes2.default.string.isRequired
};
exports.default = Interpolate;


Interpolate.propTypes = { template: _react2.default.PropTypes.string };