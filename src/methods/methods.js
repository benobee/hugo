import "owl.carousel";
import $ from "jquery";
import Scrollmap from "scrollmap";

const methods = {
    blogPage () {
        //add back button
        $(".collection-type-blog.view-item .BlogItem-title").before("<a class='back-link butto' href='/insiders-corner'>← Return to Articles</a>");

        $(".collection-type-blog.view-list .BlogList-filter").before("<a class='back-link button' href='/insiders-corner'>← Return to Articles</a>");
    },
    testimonials () {
        //homepage quotes
        const $target = $(".owl-carousel");

        $($target).owlCarousel({
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
    scrollmapAnimation () {
        //insiders corner category links
        Scrollmap.trigger({
            target: "#collection-591a2a6b579fb30e8c3d8256 .sqs-col-3",
            surfaceVisible: 0.2
        }, (element) => {

            const links = $(element).find("a").toArray();

            const sequence = Scrollmap.sequence(links, {
                interval: 80
            }, (item) => {
                $(item).addClass("visible");
            });

            setTimeout(sequence, 400);

        }).trigger({
            //insiders corner blog posts
            target: "#collection-591a2a6b579fb30e8c3d8256 .summary-v2-block",
            surfaceVisible: 0
        }, (element) => {
            const articles = $(element).find(".summary-item").toArray();

            Scrollmap.sequence(articles, {
                interval: 400
            }, (item) => {
                $(item).addClass("visible");
            });

        }).trigger({
            //banner images
            target: ".Index-page--has-image",
            surfaceVisible: 0.2
        }, (element) => {
            const id = element.dataset.parallaxId;

            $(`.Parallax-item[data-parallax-id="${ id }"`).addClass("animate");

        }).trigger({
            //homepage first benefits
            target: "#benefits .image-card-wrapper",
            surfaceVisible: 0.2
        }, (element) => {
            $(element).addClass("visible");

        }).trigger({
            target: "#benefits .row:nth-child(2)",
            surfaceVisible: 0.5
        }, (element) => {
            const array = $(element).find(".sqs-col-6").toArray();

            Scrollmap.sequence(array, {
                interval: 600
            }, (item) => {
                $(item).addClass("visible");
            });

        }).trigger({
            //key benefits grid
            target: "#list-of-key-benefits .summary-item-list",
            surfaceVisible: 0.2
        }, (element) => {
            const array = $(element).find(".summary-item").toArray();

            Scrollmap.sequence(array, {
                interval: 200,
                order: "random"
            }, (item) => {
                $(item).addClass("visible");
            });
        });
    },
    productModalForm () {
        //replace product button - click product action button
        //to bring up enquire modal
        $(".sqs-add-to-cart-button").after("<div class='button product-action'>Enquire</div>");

        $(".product-action").on("click", () => {

            const form = $("#footerBlocksTop .form-block");

            $(".modal-wrapper .modal-content").append(form);
            const title = $(".ProductItem-details-title").html();

            $("input[name='SQF_PRODUCT_TITLE']").val(title);
            $("textarea").val(title);
            $(".modal-wrapper").addClass("active");
        });

        $(".modal-wrapper, .close").on("click", () => {
            $(".modal-wrapper").removeClass("active");
        });

        $(".modal-wrapper .modal-content").on("click", (e) => {
            e.stopPropagation();
        });
    }
};

export default methods;