"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

require("owl.carousel");

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _scrollmap = require("scrollmap");

var _scrollmap2 = _interopRequireDefault(_scrollmap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var methods = {
    blogPage: function blogPage() {
        //add back button
        (0, _jquery2.default)(".collection-type-blog.view-item .BlogItem-title").before("<a class='back-link butto' href='/insiders-corner'>← Return to Articles</a>");

        (0, _jquery2.default)(".collection-type-blog.view-list .BlogList-filter").before("<a class='back-link button' href='/insiders-corner'>← Return to Articles</a>");
    },
    testimonials: function testimonials() {
        //homepage quotes
        var $target = (0, _jquery2.default)(".owl-carousel");

        (0, _jquery2.default)($target).owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            stagePadding: 2,
            margin: 2,
            autoplayTimeout: 6000,
            autoplaySpeed: 1000,
            autoplayHoverPause: false,
            nav: true
        });
    },
    scrollmapAnimation: function scrollmapAnimation() {
        //insiders corner category links
        _scrollmap2.default.trigger({
            target: "#collection-591a2a6b579fb30e8c3d8256 .sqs-col-3",
            surfaceVisible: 0.2
        }, function (element) {

            var links = (0, _jquery2.default)(element).find("a").toArray();

            var sequence = _scrollmap2.default.sequence(links, {
                interval: 80
            }, function (item) {
                (0, _jquery2.default)(item).addClass("visible");
            });

            setTimeout(sequence, 400);
        }).trigger({
            //insiders corner blog posts
            target: "#collection-591a2a6b579fb30e8c3d8256 .summary-v2-block",
            surfaceVisible: 0
        }, function (element) {
            var articles = (0, _jquery2.default)(element).find(".summary-item").toArray();

            _scrollmap2.default.sequence(articles, {
                interval: 400
            }, function (item) {
                (0, _jquery2.default)(item).addClass("visible");
            });
        }).trigger({
            //banner images
            target: ".Index-page--has-image",
            surfaceVisible: 0.2
        }, function (element) {
            var id = element.dataset.parallaxId;

            (0, _jquery2.default)(".Parallax-item[data-parallax-id=\"" + id + "\"").addClass("animate");
        }).trigger({
            //homepage first benefits
            target: "#benefits .image-card-wrapper",
            surfaceVisible: 0.2
        }, function (element) {
            (0, _jquery2.default)(element).addClass("visible");
        }).trigger({
            target: "#benefits .row:nth-child(2)",
            surfaceVisible: 0.5
        }, function (element) {
            var array = (0, _jquery2.default)(element).find(".sqs-col-6").toArray();

            _scrollmap2.default.sequence(array, {
                interval: 600
            }, function (item) {
                (0, _jquery2.default)(item).addClass("visible");
            });
        }).trigger({
            //key benefits grid
            target: "#list-of-key-benefits .summary-item-list",
            surfaceVisible: 0.2
        }, function (element) {
            var array = (0, _jquery2.default)(element).find(".summary-item").toArray();

            _scrollmap2.default.sequence(array, {
                interval: 200,
                order: "random"
            }, function (item) {
                (0, _jquery2.default)(item).addClass("visible");
            });
        });
    },
    productModalForm: function productModalForm() {
        //replace product button - click product action button
        //to bring up enquire modal
        (0, _jquery2.default)(".sqs-add-to-cart-button").after("<div class='button product-action'>Enquire</div>");

        (0, _jquery2.default)(".product-action").on("click", function () {

            var form = (0, _jquery2.default)("#footerBlocksTop .form-block");

            (0, _jquery2.default)(".modal-wrapper .modal-content").append(form);
            var title = document.querySelector(".ProductItem-details-title");

            (0, _jquery2.default)("input[name='SQF_PRODUCT_TITLE']").val(title.innerText);
            (0, _jquery2.default)("textarea").val(title.innerText);
            (0, _jquery2.default)(".modal-wrapper").addClass("active");
        });

        (0, _jquery2.default)(".modal-wrapper, .close").on("click", function () {
            (0, _jquery2.default)(".modal-wrapper").removeClass("active");
        });

        (0, _jquery2.default)(".modal-wrapper .modal-content").on("click", function (e) {
            e.stopPropagation();
        });
    }
};

exports.default = methods;