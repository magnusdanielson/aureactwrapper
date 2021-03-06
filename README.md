# aurelia-typescript-plugin
Utility classes that wraps React components and expose them as Aurelia components.

## How to use
Install with
`au install @dunite/au-react-wrapper`

There is no plugin method to call. You need to inherit one of the wrapper classes for your component. Below code is a simple example on how to use the base classes.
```
import { customElement, TaskQueue, inject } from 'aurelia-framework';
import { Label, ILabelProps } from 'office-ui-fabric-react/lib/Label';
import { AuReactWrapper, addPropertiesState } from '@dunite/au-react-wrapper';

let reactprops: ILabelProps = <ILabelProps>{};
reactprops.disabled = <any>{};
reactprops.className = <any>{};
reactprops.required = <any>{};
reactprops.htmlFor = <any>{};

@inject(Element, TaskQueue)
@customElement('du-label')
export class DuLabel extends AuReactWrapper implements ILabelProps {

  constructor(element, protected tq: TaskQueue) 
  {
    super(element, tq);
  }

  hidden: boolean = false;

  attached() {
    this.renderReact(Label, this.createState(reactprops));
  }
}

addProperties(DuLabel, reactprops);
```


### Import statements
* First you need customElement, TaskQueue and inject from 'aurelia-framework'.
* Second you import the React class you want to wrap, in this case it is Label from 'office-ui-fabric-react/lib/Label'.
* Third and optional is to import the interface that the component expose, in this case ILabelProps.
* Fourth, you need one of the base classes from this library, in this case AuReactWrapper.
* Fifth, you need addProperties function from this library.

### Create the reactprops object
The addProperties function second parameter is the reactprops object. All properties on the object will be exposed on the Aurelia Component and two-way bound to the property on the React Component. To make it simple, we use a same-name convention, so if the React component expose a className property, the addProperties function will add a 'className' property on your class and two-way bind it to the 'className' property on the React Component.

If the React component expose a callback funtion, typically onChange-event or similar, just add below code. Note that in this case the property on the React component and the corresponding property on the Aurelia component is called "value"
```
reactprops.onChange = <any> ((that:any, event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
  
  // line below is necessery to prevent the React component to rerender
  that.ignoreReactUpdate = true;
  // line below is necessery to update the viewmodel
  that.value = newValue;

  // line below is necessery to update the React viewmodel
  that.reactComponent.setState( {"value":newValue || ''});
  
});
```

If you have functions or callbacks you want the user of the component to bind, add below code.

```
reactprops.onClick = <any>onlyAureliaBound;
```

Also note that the first argument of the event function is `_that` that refers to your class, in this case DuLabel.

The following arguments are coming from the callback, you have to check the documentation of the component you are wrapping.

Note that some React components change behaviour when you listen to onchange events. It is typically called controlled component when you have bound the onchange event. If that is the case, the responsibility of updating the state of the React component is yours.

If you have a controlled component you may need to seperate changes that is triggered from the React component and changes triggered from the Aurelia component.

Above example shows how to separate those changes by using the `ignoreReactUpdate` attribute on the Aurelia class.

Note that if you set `that.ignoreReactUpdate = true;` the React component will not be updated and not rerendered. A typical exampel where you don't want to rerender to the React component is when cursor position is important.

The addProperties function will automatically add above propertis as a bindable function to your Aurelia component. For the onClick event it will check if you have bound the on-click property on your custom component to a function and if that is the case, call it. For the onChange event it will also first check if you have bound the property on your custom component to a function and if that is the case call it, otherwise it will call the function you provided above. You as a component developer can offer a default implementation if you expect that to be the most common scenario. And remember, even if you do, the consumer of the component can override it anyway with their bound function.

### The custom class
You must add the @inject and @customElement class decorators as above example. Just remeber to change 'du-label' to the element name you want do expose. In this case the element will be used with
```
<du-label></du-label>
```

Also just copy the constructor function from the example. This constructor is required for the AuReactWrapper and AuReactWrapperNoChildren. If the React class expose any property that hides or removes the component, add that property to the class, in this case

```
 hidden: boolean = false;
```

Set the value for hiddenName to the name of the property that hides the element. In this case it is 'hidden', sometimes it is 'show' or 'display'. Also remeber to set the hiddenisHidden property. If the hiddenName property hides the element when set to true, them set hiddenIsHidden to true. If the hiddenName property displays the element when set to true, then set hiddenIsHidden to false.

You can optionally add the implements Interface keyword after the class if you need intellisense from TypeScript when you need to write code against your component. It does not at all change the functionality of your component at runtime.

### attached event
Just copy the code from the example above. Remeber to change 'Label' to the React class you are wrapping. It was the class you imported at the beginning.


### addProperties
Just copy the code from the example. Remeber to change 'DuLabel' to the name of the class you just created. It is highly recommended to name the class according to Aurelia conventions, in this case DuLabel for the du-label element.


Then just use it as below
```

<du-label html-for="anInput">A Label for An Input</du-label>

<du-default-button checked="true" text.bind="mytextbutton"  primary class-name="lisa"  on-click.bind="buttonclick"  ></du-default-button>
```

## Demo site
[Demo site that uses au-react-wrapper for Office-UI-React components](https://au-office-ui.azurewebsites.net)

## Module support
This plugin exports AMD, CommonJS, ES2015, native and System modules.


