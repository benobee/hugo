import $ from "jquery";
import methods from "./methods/methods";

class App_Build {
    constructor () {
      $(window).on("load", () => {
        methods.productModalForm();
      });
      methods.testimonials();
      //methods.scrollmapAnimation();
      methods.blogPage();
    }
}

const App = new App_Build();

export default App;