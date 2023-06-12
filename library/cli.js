const inquire = require('inquirer');
const {writeFile} = require('fs/promises')
const { Circle, Triangle, Square } = require('./shapes');
const SVG = require('./svg');

const questions = [
    {
        type:'input',
        message: 'Enter 3 character text',
        name: 'text',
    },
    {
        type:'input',
        message:'Enter text color',
        name: 'color',
    },
    {
        type:'list',
        message: 'Select shape',
        name: 'shapeType',
        choices: ['circle', 'triangle', 'square'],
    },
    {
        type:'input',
        message: 'Enter Shape color',
        name:'shapeColor',
    }
];

class CLI {
    run(){
        return inquire.prompt(questions)
        .then((answers) =>
        createSVG(answers)
        )
    }
}

function createSVG (answers){
const svg = new SVG();
    console.log(answers.shapeType);
    let shape;
        switch (answers.shapeType) {
          case "circle":
             shape = new Circle(answers.shapeColor);
            break;
           case "square":
             shape = new Square(answers.shapeColor);
             break;
           case "triangle":
            shape = new Triangle(answers.shapeColor);
            break;
        }

       svg.setShape(shape);
       svg.setText(answers.text, answers.color)
       const svgContent = svg.render();

       writeFile('output.svg', svgContent)
       .then(() => console.log('SVG file created successfully!'))
       .catch((error) => console.error('Error writing SVG file:', error));
        
};

module.exports = CLI
