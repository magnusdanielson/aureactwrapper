import * as React from 'react';
import * as ReactDom from 'react-dom';
import { TaskQueue, inlineView, LogManager } from 'aurelia-framework';
import { Logger } from 'aurelia-logging';
import { ReactWrapper } from './ReactWrapper';
import { AuReactWrapperBase } from './AuReactWrapperBase';

// Den här filen har endast "ReactWrapper" som unik referens
@inlineView('<template><span id.bind="inneridAurelia" show.bind="!hidden"><slot></slot></span></template>')
export class AuReactWrapper extends AuReactWrapperBase {
  public element: HTMLElement;
  public container: Element | null;
  public reactComponent: any;
  public inneridAurelia: string;
  public parent: any;
  public log: Logger;



  constructor(element, protected tq: TaskQueue) {
    super(element, tq);
    //console.log("ctor AuReactWrapper")
    this.element = element;
    this.log = LogManager.getLogger('reacthost');
    // this.log.info('DuReactWrapperBaseClass constructor');
    this.inneridAurelia = 'du' + Math.round(Math.random() * 10000000000000000);
  }



  


  unbind() {
    if (this.element != null)
      ReactDom.unmountComponentAtNode(<Element>this.container);
  }

  propertyChanged(name, newValue) {

    // console.log('AuReactWrapper: propertyChanged');
    // console.log(this);

    // console.log(`property ${name} changed to ${newValue}`);

    if (name == this.hiddenName) {
      if (this.isHidden()) {
        this.moveBack();
      }
    }

    if (!this.ignoreReactUpdate) {
      ////console.log("update came from aurelia");
      let obj = {};
      obj[name] = newValue;
      // line below is necessery
      this.reactComponent.setState(obj);
    }
    this.tq.queueMicroTask(() => {
      this.ignoreReactUpdate = false;
    });

    return;


    // if (name == this.hiddenName)
    // {
    //   if ( this.hiddenIsHidden ? newValue : !newValue )
    //   {
    //     this.moveBack();
    //   }
    // }
    // console.log(this);
    // //@ts-ignore
    // if(this.changeState == false)
    // {
    //   console.log("AuReactWrapper changeState == false");

    // }
    // else
    // {
    //   console.log("AuReactWrapper changeState == true");
    //   //this.reactComponent.setState(obj);
    //   //this[name] = newValue;


    // }
    // this.reactComponent.setState(obj);
    // //@ts-ignore
    // this.changeState = true;

  }

  moveBack() {
    //console.log('moveBack AuReactWrapper');
    let auelement = document.getElementById(this.inneridAurelia);

    var oldParent = document.getElementById(this.reactComponent.inneridReact);

    if (oldParent == null || auelement == null) {
      return;
    }

    while (oldParent.childNodes.length > 0) {
      auelement.appendChild(oldParent.childNodes[0]);
    }
  }

  renderReact(reactClass: any, a: any) {

    //console.log('renderReact AuReactWrapper');

    //ReactDom.unmountComponentAtNode(this.element);


    this.container = this.element.querySelector('.au-react-root');

    // if (this.container != null) {
    //   this.container.remove();
    // }

    // this.container = document.createElement('span');
    // this.container.setAttribute('class', 'au-react-root');
    // this.element.appendChild(this.container);

    if (this.container == null) {
      this.container = document.createElement('span');
      this.container.setAttribute('class', 'au-react-root');
      this.element.appendChild(this.container);

    }


    a.aureliaHost = this;
    a.reactClass = reactClass;

    // reactElement is the DOM element;
    let reactElement = React.createElement(ReactWrapper, a);

    // reactComponent is THE React Component
    var reactComponent = ReactDom.render(reactElement, this.container
      // , () =>
      // {
      //   console.log('DuReactWrapperBaseClass React callback render complete');
      // }
    );
    this.reactComponent = reactComponent;

    //console.log('renderReact complete AuReactWrapper');
  }
}
