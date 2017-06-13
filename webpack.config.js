/****************************************/
/*******     WEBPACK CONFIG     *********/
/****************************************/

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

/****************************************/
/*******     CONFIG OBJECT      *********/
/****************************************/

const WEBPACK_CONFIG = { module: {} };

/****************************************/
/*******       VARIABLES        *********/
/****************************************/

const inputName = "main";
const outputName = "bundle";

/****************************************/
/*******      ENVRIONMENTS      *********/
/****************************************/

/*
 * test whether the script will be run in
 * production using "npm run build" from
 * the terminal. If true, file names will
 * be hashed, js will be minified.
*/

if (process.env.PROD_ENV === 'true') {
    const isProduction = true;
}

/***************************************/
/*********       INPUT        **********/
/***************************************/

const input = {
    context: __dirname,
    entry: [ `./src/${ inputName }.js`, `./src/${ inputName }.less`],
    devtool: isProduction ? '' : 'eval',
    node: {
        dns: 'mock',
        net: 'mock',
        fs: 'empty'
    },
    resolve: {
        alias: {
          'masonry': 'masonry-layout',
          'isotope': 'isotope-layout'
        }
    }
};

//extend properties to config
Object.assign(WEBPACK_CONFIG, input);

/****************************************/
/********   LOADERS / RULES   ***********/
/****************************************/

/*
 * each loader will push to this rules
 * array then added to WEBPACK_CONFIG.
*/

const rules = [];

/*********************/

// @rule: ES Lint

const eslint = {
    test: /\.js$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    options: {
      emitWarning: true,
    }
};

rules.push(eslint);

// @rule: Babel
const babel = {
    test: /\.js$/,
    include: path.resolve(__dirname, 'src'),
    exclude: /node_modules/,
    use: [{
        loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', { modules: false }]
            ]   
        }
    }]
};

rules.push(babel);

// @rule: extract all less, compile and apply post css prefixing
const lessLoader = {
    test: /\.less$/, 
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        loader: [
            {
                loader: 'css-loader',
            },
            {
                loader: 'postcss-loader',
            },
            {
                loader: 'less-loader',
            }
        ]
    })
};

rules.push(lessLoader);

// @rule: css autoprefixer
const postCSSLoader = {
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'postcss-loader',
      }
    ]
};

rules.push(postCSSLoader);

// @rule: json
const jsonLoader = { 
    test: /\.json$/,
    use: [
        {
            loader: "json-loader",
        }
    ]
};

rules.push(jsonLoader);

WEBPACK_CONFIG.module.rules = rules;

/***************************************/
/**********      PLUGINS      **********/
/***************************************/

/*
 * each plugin will push to this plugins
 * array. Some will only be pushed when
 * config is set to production. 
*/

const plugins = [];

/*********************/

// @plugin: node env
const nodeENV = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

isProduction ? plugins.push(nodeENV) : false;

/*****************************/

// @plugin: es6 linting loader
const loaderOptions = new webpack.LoaderOptionsPlugin({
  test: /.js$/,
  exclude: /node_modules/,
  use: [
    {
        loader: "eslint-loader"
    }
  ]
});

plugins.push(loaderOptions);

/**********************/

// @plugin: compile all less files into master CSS
const CSSBundle = new ExtractTextPlugin({ 
    filename: isProduction ? `${ outputName }.min.css` : `${ outputName }.css`
});

plugins.push(CSSBundle);

/*********************/

// @plugin: extend jquery for jquery plugins
const jQueryExtend = new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery"
});

plugins.push(jQueryExtend);

/*********************/

// @plugin: handling es6 promises
const promises = new webpack.ProvidePlugin({
    'Promise': 'es6-promise', 
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
});

plugins.push(promises);

/*********************/

// @plugin: post CSS
const postCSS = [
    require('autoprefixer')
]

postCSS.forEach((item) => {
    plugins.push(item);
});

/*********************/

// @plugin: for minifying javascript
const minify = new webpack.optimize.UglifyJsPlugin({
    compress: { 
        warnings: false 
    },
    output: {
        comments: false
    },
    minimize: true,
    debug: true,
    sourceMap: true,
    minify: true,
});


//if production is set, js will be minified

if (isProduction) {
    plugins.push(minify);
}

//output to config object
WEBPACK_CONFIG.plugins = plugins;

/************************************/
/********       OUTPUT        *******/
/************************************/
const output = {
    output: {
          publicPath: '/',
          path: __dirname + "/dist",
          filename: isProduction ? `${ outputName }.min.js` : `${ outputName }.js`
    }
};

//extend properties to config
Object.assign(WEBPACK_CONFIG, output);

//export config
module.exports = WEBPACK_CONFIG;