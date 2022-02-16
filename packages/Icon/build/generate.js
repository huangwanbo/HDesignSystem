const fs = require('fs-extra');
const babel = require('@babel/core');
const { optimize } = require('svgo');
const cloneDeep = require('lodash/cloneDeep');
const { flatData } = require('./getSvgData');
const nunjucks = require('nunjucks');
const path = require('path');
const swc = require("@swc/core");
const config = {
    plugins: [
      'removeUnknownsAndDefaults',
      'cleanupAttrs',
      'removeXMLNS',
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeTitle',
      'removeDesc',
      'removeUselessDefs',
      'removeEditorsNSData',
      'removeEmptyAttrs',
      'removeHiddenElems',
      'removeEmptyText',
      'removeEmptyContainers',
      // 'removeViewBox',
      'cleanupEnableBackground',
      'convertStyleToAttrs',
      'convertColors',
      'convertPathData',
      'convertTransform',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'removeUnusedNS',
      'cleanupIDs',
      'cleanupNumericValues',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      // 'removeRasterImages',
      'mergePaths',
      'convertShapeToPath',
      'sortAttrs',
      'removeDimensions',
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            {
              width: '1em',
            },
            {
              height: '1em',
            },
            {
              fill: 'none',
            },
            {
              stroke: 'currentColor',
            },
            '{...props}',
          ],
        },
      },
    ],
  };

  const syntaxEs = (name) => {
      return `export { default as ${name} } from './react-icon/${name}/index';`
  }
  const entryCode = flatData.map((com) => syntaxEs(com.componentName)).join('\n');

  fs.outputFile('./index.es.js', entryCode, err => {
      if (err) return;
      console.log('Generate es module entry success!');
  })

  let typeingsCode = `import * as React from 'react';
  
  interface IconProps extends React.SVGAttributes<SVGElement> {
      style?: React.CSSProperties;
      spin?: boolean;
  }
  
  `

  flatData
  .map((svg) => svg.componentName)
  .forEach(
      (componentName) => {
          (typeingsCode += `export declare const ${componentName}: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<unknown>>\n`)
      }
  )
  fs.outputFileSync('./index.d.ts', typeingsCode);

 nunjucks.configure({ autoescape: false });

  const babelConfig = {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-transform-arrow-functions',
      '@babel/plugin-transform-destructuring',
      '@babel/plugin-transform-spread',
    ],
  };

  const babelConfigCjs = cloneDeep(babelConfig);
  babelConfigCjs.plugins.push('@babel/plugin-transform-modules-commonjs');
  
  let length = 0;
  const totalLength = flatData.length
  function generateIcon() {
      for(let i = 0; i < totalLength; i++ ) {
          const iconClassName = flatData[i].name;
          const iconName = flatData[i].componentName;
          const iconPath = flatData[i].file;
          const svgCode = fs.readFileSync(flatData[i].file, 'utf8');
          const svg = optimize(svgCode, { path: iconPath, ...config })
            .data.replace(/stroke-width=/g, 'strokeWidth=')
            .replace(/stroke-linecap=/g, 'strokeLineCap=')
            .replace(/stroke-linejoin=/g, 'strokeLineJoin=')
            .replace(/fill-rule=/g, 'fillRule=')
            .replace(/clip-rule=/g, 'clipRule=')
            .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
            .replace(/class=/g, 'className=');
          nunjucks.render(
              path.resolve('build/icon.template.nunjucks'),
              {
                  svg,
                  iconName,
                  iconClassName,
              },
              (err, res) => {
                  if (err) return;
                 // const code = babel.transform(res, babelConfig).code;
                 const code = swc.transformSync(res,{
                   "jsc": {
                     "parser": {
                        "syntax": "ecmascript",
                        "jsx": true,
                     },
                     target: "es5"
                     
                   }
                 }).code;
                  fs.outputFile(
                      `react-icon/${iconName}/index.js`,
                      code,
                      (err, res) => {
                          if(!err){
                              length += 1;
                              if(length == totalLength) {
                                console.log(`\nGenerate icon success! Total: ${totalLength}\n`);
                              }
                          }
                      }
                  )

              }
          );
      }
  }

  generateIcon();