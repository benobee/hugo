"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _methods = require("./methods/methods");

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = {
        init: function init() {
                var _this = this;

                Object.assign(this, _methods2.default);

                /* on the product page, an enquiry button
                replaces the add to cart which triggers a
                a pop modal form found in the footer */
                (0, _jquery2.default)(window).on("load", function () {
                        _this.productModalForm();
                });

                /* testimonials carousel on the home page */
                this.testimonials();

                /* scrolling animtions. When user navigates through
                site various elements are targeted for anmiation
                fade in's. */
                this.scrollmapAnimation();

                /* side bar links for each category navigation */
                this.blogPage();
        }
};

exports.default = App;