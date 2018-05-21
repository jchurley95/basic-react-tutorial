# Basic React Tutorial

Learn how to access and manipulate data between parent and child components in a React app.

To get started, clone this repo and run "npm install", and then run "npm start".
Assuming that worked, it should have installed all the dependencies specified in that package.json and started the app on localhost:3000.
It should have opened the app for your as well in your browser. You will notice that the app reloads everytime you save your code, and you will also notice the awesome spinning React symbol that comes with each app you bootstrap with create-react-app.

I personally use Visual Studio Code as your editor. It is quick to open and has awesome installable React extensions like "React Code Snippets" which can increase your development speed and limit how much syntax and structure you have to memorize. This tutorial will be tailored towards using VS Code.

If you have VS Code set up, you can just run "code ." from your terminal with the directory open and get started writing some React.
Your actual React code exists in the "src" folder and cannot go outside of this folder.

If you want to do further reading at any point I would recommend taking a look at the official React Docs online.

## Parent and Child Components

Our goal is to create re-usable building blocks called child components.
The structure that these building blocks live inside of is their parent component.
Within the "src" folder you have been given a folder called "components" which contains FunctionalChildComponent.js and StatefulChildComponent.js. 
In this app, the file called "App.js" will be the main parent component.

To see this in action, we first need to import our child components into App.js.
The import statements in App.js should look something like:

``` javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FunctionalChildComponent from './components/FunctionalChildComponent';
import StatefulChildComponent from './components/StatefulChildComponent';
```

Notice that you do not have to specify the file type in the import statements (.js can be left off).
Now lets actually render these components in the empty ```<div>``` tag underneath the ```<header>``` tag in App.js.


 ``` javascript
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <div>
    <FunctionalChildComponent />
    <StatefulChildComponent />
  </div>
</div>
```

If done correctly, you should see "Hello from FunctionalChildComponent" and "Hello from StatefulChildComponent" on the page.

## Component "state"

This JSON object exists in the constructor of a React stateful component. 
Open the "App.js" file in your code editor.

You've been given an empty state object. Add a property to this object called "myString" and make its value "Hello from myString". 
Next, add a line directly under the "render() {" line that says "console.log(this.state.myString)".
If done correctly, your browser console should show your string.


``` javascript
this.state = {
  myString: "Hello from myString"
}
```

You can create/call on data outside of your state object as well, but it is considered an anti-pattern. This is not just my opinion, you can actually end up seeing an error or warning in the console coming from the React team that calls it an anti-pattern. We'll see why in the next section.

## Using this.setState({}) to trigger a re-render of the page.

When we maintain our data in our state object, we can work with the React framework rather than against it.
React gives us a method called setState which lets us update our state object and then triggers a re-render of the component AND it's children as a result.

Try it out:
Add a property to the state object called "trueOrFalse" and make it's value false.


``` javascript
this.state = {
  myString: "Hello from myString",
  trueOrFalse: false
}
```

Next, create a function underneath your constructor, but above the render() method, called "toggleTrueOrFalse". This function will use this.setState to make this.state.trueOrFalse equal to the opposite of whatever it currently equals.

#### GOOD

``` javascript
toggleTrueOrFalse = () => {
    var updatedTrueOrFalse = !this.state.trueOrFalse;
    this.setState({trueOrFalse: updatedTrueOrFalse});
}
```

or

``` javascript
toggleTrueOrFalse = () => {
    var trueOrFalse = !this.state.trueOrFalse;
    this.setState({trueOrFalse});
}
```

Notice how if you call your variable the same name as it is called in the state object you can just say this.setState({trueOrFalse}). 
There are multiple ways to handle binding functions to the class, this "arrow function" syntax (the "arrow" being the "=>") is how I prefer to do it for simplicity's sake.
When googling React stuff you will often see an alternative way of handling this using the "bind" function in the constructor. You can do further research if you want to see why people prefer the various ways of handling this.

#### BAD 

``` javascript
toggleTrueOrFalse = () => {
    this.state.trueOrFalse = !this.state.trueOrFalse;
}
```

This is a common anti-pattern. React wants you to use setState and trigger that re-render. Feel free to do further research.

Then, add a button tag above your child components that has an onClick function which triggers your function when clicked.

#### GOOD 

``` javascript
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <div>
    <button onClick={this.toggleTrueOrFalse}>Toggle T/F</button>  
    <FunctionalChildComponent />
    <StatefulChildComponent />
  </div>
</div>
```

or 

``` javascript
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <div>
    <button onClick={() => {this.toggleTrueOrFalse()}}>Toggle T/F</button>  
    <FunctionalChildComponent />
    <StatefulChildComponent />
  </div>
</div>
```

Calling the function without adding () at the end, or calling a function that calls the function with () at the end to avoid an infinite loop of re-renders.
If you want to pass a value/parameter directly to the function, you need to use the second example above.

#### BAD 

``` javascript
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <div>
    <button onClick={this.toggleTrueOrFalse()}>Toggle T/F</button>  
    <FunctionalChildComponent />
    <StatefulChildComponent />
  </div>
</div>
```

A big "gotcha" of the React framework is that this syntax will constantly trigger re-rendering of the component in an infinite loop and crash the app. 

Finally, lets show this value on the page as it changes.


``` javascript
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <div>
    <button onClick={this.toggleTrueOrFalse}>Toggle T/F</button>  
    <div>True or False: {this.state.trueOrFalse.toString()}</div>
    <FunctionalChildComponent />
    <StatefulChildComponent />
  </div>
</div>
```

Now when you click the button you should see the value change on the page.
Next let's talk about what we just did to make the data show on the page.

## Showing data in JSX

Fun fact, you technically haven't been writing any HTML at this point, and you aren't going to.
You've actually been using a language called JSX (JavaScript XML), which is much more powerful than HTML.
If you look at the code, your elements all say "className" instead of "class", and you just wrote a javascript directly into the text between tags using the bracket {} syntax.

One key thing to remember is that each JSX object can only have one element, so basically if you only created two divs side by side not enclosed in another div then it will break.

A little more about JSX:

- "JSX produces React 'elements'"
- "React doesn’t require using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages."
- "You can put any valid JavaScript expression inside the curly braces in JSX. For example, 2 + 2, user.firstName, or formatName(user) are all valid JavaScript expressions."
- "After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects."
- "By default, React DOM escapes any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks."
Further reading: https://reactjs.org/docs/introducing-jsx.html

You used JSX to show the value of trueOrFalse in App.js state as text on the page.
Now, use it to show the value of myString on the page as well.

``` javascript
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <div>
    <button onClick={this.toggleTrueOrFalse}>Toggle T/F</button>  
    <div>True or False: {this.state.trueOrFalse.toString()}</div>
    <div>{this.state.myString}</div>
    <FunctionalChildComponent />
    <StatefulChildComponent />
  </div>
</div>
```

You should see the value of your string underneath the value of trueOrFalse.
Now let's get a little more complicated.
Show the value of myString on the page if the value of trueOrFalse is true.

``` javascript
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <div>
    <button onClick={this.toggleTrueOrFalse}>Toggle T/F</button>  
    <div>True or False: {this.state.trueOrFalse.toString()}</div>
    <div>{this.state.trueOrFalse && this.state.myString}</div>
    <FunctionalChildComponent />
    <StatefulChildComponent />
  </div>
</div>
```

or

``` javascript
{this.state.trueOrFalse && <div>{this.state.myString}</div>}
```

You can render entire elements conditionally with JSX. This is helpful in any number on situations, such as only rendering/enabling certain buttons on a page if the user has the right permissions to use them, or only rendering parts of a page if a user is logged in, or only allowing a user to click submit on a form if certain fields on the form have been filled in.

## Conditional rendering of child components

Let's expand on the previous section and only show our FunctionalChildComponent if trueOrFalse is true, and only show our StatefulChildComponent if trueOrFalse is false.

``` javascript
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <div>
    <button onClick={this.toggleTrueOrFalse}>Toggle T/F</button>  
    <div>True or False: {this.state.trueOrFalse.toString()}</div>
    <div>{this.state.trueOrFalse && this.state.myString}</div>
    {this.state.trueOrFalse === true && <FunctionalChildComponent />}
    {this.state.trueOrFalse === false && <StatefulChildComponent />}
  </div>
</div>
```

or 

``` javascript
{this.state.trueOrFalse ? <FunctionalChildComponent /> : <StatefulChildComponent />}
```

## Passing data from parent component to child components as "props"

Our data in this app currently lives in our App.js state, but we can access it from our child components by passing it as a reserved term called "props" through the element tags. Whatever you decide to call these props is up to you (for example, stringFromParent could be called something else like angularWishesItWasReact)

``` javascript
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <div>
    <button onClick={this.toggleTrueOrFalse}>Toggle T/F</button>  
    <div>True or False: {this.state.trueOrFalse.toString()}</div>
    <div>{this.state.trueOrFalse && this.state.myString}</div>
    {
      this.state.trueOrFalse ? 
      <FunctionalChildComponent stringFromParent={this.state.myString} trueOrFalseFromParent={this.state.trueOrFalse} />
      :
      <StatefulChildComponent stringFromParent={this.state.myString} trueOrFalseFromParent={this.state.trueOrFalse} />
    }
  </div>
</div>
```

Now we can access this in our child components.
Make sure with the functional child component to pass props as a parameter.

Note: we have to refer to props as this.props in the stateful child and just props in the functional child. 


``` javascript
import React from 'react';

const FunctionalChildComponent = (props) => {
    return (
        <div>
            Hello From FunctionalChildComponent, props.stringFromParent is: {props.stringFromParent}, and props.trueOrFalseFromParent is: {props.trueOrFalseFromParent.toString()}
        </div>
    );
};

export default FunctionalChildComponent;
```

and 

``` javascript
import React, { Component } from 'react';

class StatefulChildComponent extends Component {
    constructor() {
        super();

        this.state = {
            
        }
    }
    render() {
        return (
            <div>
                Hello from StatefulChildComponent, this.props.stringFromParent is: {this.props.stringFromParent}, and this.props.trueOrFalseFromParent is: {this.props.trueOrFalseFromParent.toString()}
            </div>
        );
    }
}

export default StatefulChildComponent;
```

We can use this data here, but we cannot directly manipulate it here. This is a good thing, as it helps preserve and control our data by limiting where it can actually be changed. It is one of the early differences between the standard ways to do React and Angular. This is confusing to picture at first because you still can and should manipulate data in your "top level state" from child components using functions that live in that top level components passed down as props to the child components. That felt confusing just typing it, so don't try to read that over and over until it makes sense, just move on to the next section and see it in action. It'll make way more sense if you just do it.

Further reading on "Unidirectional Data Flow In React":
https://medium.com/@lizdenhup/understanding-unidirectional-data-flow-in-react-3e3524c09d8e

## Passing functions as props/Updating parent state from child component

Remember our toggleTrueOrFalse function? Its time to pass it down to our child components the same way we passed down the state values (as props).

``` javascript
<div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
  </header>
  <div>
    <div>True or False: {this.state.trueOrFalse.toString()}</div>
    <div>{this.state.trueOrFalse && this.state.myString}</div>
    {
      this.state.trueOrFalse 
      ? 
      <FunctionalChildComponent 
        stringFromParent={this.state.myString} 
        trueOrFalseFromParent={this.state.trueOrFalse}
        parentToggleFunction={this.toggleTrueOrFalse}
      />
      :
      <StatefulChildComponent 
        stringFromParent={this.state.myString} 
        trueOrFalseFromParent={this.state.trueOrFalse}
        parentToggleFunction={this.toggleTrueOrFalse}
      />
    }
  </div>
</div>
```

Notice that I removed our ```<button onClick={this.toggleTrueOrFalse}>Toggle T/F</button>```, it's moving to our child components now and it will call the same function as before, but this time it will refer to it in terms of props.

``` javascript
import React from 'react';

const FunctionalChildComponent = (props) => {
    return (
        <div>
          <button onClick={props.toggleTrueOrFalse}>Make it true</button>
          Hello From FunctionalChildComponent, props.stringFromParent is: {props.stringFromParent}, and props.trueOrFalseFromParent is: {props.trueOrFalseFromParent.toString()}
        </div>
    );
};

export default FunctionalChildComponent;
```

and 

``` javascript
import React, { Component } from 'react';

class StatefulChildComponent extends Component {
    constructor() {
        super();

        this.state = {
            
        }
    }
    render() {
        return (
            <div>
              <button onClick={this.props.toggleTrueOrFalse}>Make it false</button>
              Hello from StatefulChildComponent, this.props.stringFromParent is: {this.props.stringFromParent}, and this.props.trueOrFalseFromParent is: {this.props.trueOrFalseFromParent.toString()}
            </div>
        );
    }
}

export default StatefulChildComponent;
```

Now our button tags live in the child components, and every time we click the button on the screen it will change the value in the parent component's state, trigger a setState re-render, and in the process, load the correct JSX/child component based on the value it now reads from the App.js state.

## Mapping through an array to return child components

Pretend you were creating a checkout cart for an app, and you want to display each item in the cart as its own "card" but with a standard layout and look. Your page (parent component) has an array in its state object of each item the user has in their cart, and you would use JSX to iterate through that array and for each element in the array return a ```<CheckoutCard />``` functional component. It's a pretty powerful pattern, going back to what we talked about with child components being the re-usable building blocks of the app.

Let's try it in our app.

First, we need to create an array in our App.js state object. I'm writing this during lunch and I'm hungry, so we're going to go with pizza toppings, not including pineapple, because that is just wrong.

``` javascript
this.state = {
  myString: "Hello from myString",
  trueOrFalse: false,
  pizzaToppings: ["pepperoni", "sausage", "buffalo chicken", "jalapenos", "bacon", "extra cheese", "black olives"]
}
```

Create a new file in the components folder called PizzaTopping.js and make sure to pass props as a parameter, and display props.topping.
If you are using VS Code as your editor, I would recommend trying out an extension called "React Code Snippets" which allows you to type rsc and then press tab to scaffold a functional component for you. It also allows you to type rcc then press tab and it will scaffold out a stateful component for you.
Try rsc tab for creating your PizzaTopping component.

``` javascript
import React from 'react';

const PizzaTopping = (props) => {
    return (
        <div>
            {props.topping}
        </div>
    );
};

export default PizzaTopping;
```

Next, add PizzaTopping.js as one of our imports in App.js 

``` javascript
import PizzaTopping from './components/PizzaTopping';
```

Finally, render a ```<PizzaTopping />``` component for each element of our this.state.pizzaToppings array.
Your App.js should look something like this:

``` javascript
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FunctionalChildComponent from './components/FunctionalChildComponent';
import StatefulChildComponent from './components/StatefulChildComponent';
import PizzaTopping from './components/PizzaTopping';

class App extends Component {
  constructor() {
    super();

    this.state = {
      myString: "Hello from myString",
      trueOrFalse: false,
      pizzaToppings: ["pepperoni", "sausage", "buffalo chicken", "jalapenos", "bacon", "extra cheese", "black olives"]
    }
  }

  toggleTrueOrFalse = () => {
    var trueOrFalse = !this.state.trueOrFalse;
    this.setState({trueOrFalse});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <div>True or False: {this.state.trueOrFalse.toString()}</div>
          <div>{this.state.trueOrFalse && this.state.myString}</div>
          {
            this.state.trueOrFalse 
            ? 
            <FunctionalChildComponent 
              stringFromParent={this.state.myString} 
              trueOrFalseFromParent={this.state.trueOrFalse}
              toggleTrueOrFalse={this.toggleTrueOrFalse}
            />
            :
            <StatefulChildComponent 
              stringFromParent={this.state.myString} 
              trueOrFalseFromParent={this.state.trueOrFalse}
              toggleTrueOrFalse={this.toggleTrueOrFalse}
            />
          }
          {
            this.state.pizzaToppings.map((currentTopping, index) => {
              return (<PizzaTopping topping={currentTopping} key={index} />)
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
```

# You're Done!
Now you can create parent and child components, pass data and functions as props from the parent to the children, and dynamically render components based on state or props.

More advanced tutorials would include integrating an ```express``` server as your API and using npm packages like ```axios``` or ```fetch``` to make API calls from react components, as well as using the React lifecycle methods such as ```componentWillMount()``` and ```componentDidMount()``` to control what data your component initially loads with using those API calls.

You can also clone this repo https://github.homedepot.com/Pricing/react-common-framework-UI and have an app set up with 
- express and react already bootstrapped for you
- React Router set up
- package.json scripts already set up to handle react and express running together
- Home Depot THDSSO login functionality and page already set up as default page if not logged in (will also work between sites created with this repo unless that functionality is removed or changed by you, as in you can go from one site to the next without logging in again if that THDSSO cookie is already saved in the browser and/or user has a valid session still in the backend)
- UX Styleguide already integrated