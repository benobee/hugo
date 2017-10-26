import $ from "jquery";
import methods from "./methods/methods";

const App = {
    init () {
        Object.assign(this, methods);

        /* on the product page, an enquiry button
        replaces the add to cart which triggers a
        a pop modal form found in the footer */
        $(window).on("load", () => {
            this.productModalForm();
        });

        /* testimonials carousel on the home page */
        this.testimonials();

        /* scrolling animtions. When user navigates through
        site various elements are targeted for anmiation
        fade in's. */
        this.scrollmapAnimation();

        /* side bar links for each category navigation */
        this.blogPage();

        console.log("DIST RUNNING");
    }
};

export default App;