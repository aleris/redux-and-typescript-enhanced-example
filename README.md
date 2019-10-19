# Redux with Typescript Recipe

A practical example for organizing code for Redux with Typescript taking advantage of type checking.

[![Build Status](https://travis-ci.org/aleris/redux-and-typescript-enhanced-example.svg?branch=master)](https://travis-ci.org/aleris/redux-and-typescript-enhanced-example)

This is an alternative code organization of the example from https://redux.js.org/recipes/usage-with-typescript ( 
with complete code in https://codesandbox.io/s/w02m7jm3q7). That example has a couple of disadvantages:

* Non-functional Redux store organization on types, actions, reducers which in turn forces working 
on same concept (an action) in three separate files.
* With many actions in a store tree, the reducer become a long switch list of unrelated mutations,
very hard to follow.
* Reduplication of strings like for the type constant `const SEND_MESSAGE = 'SEND_MESSAGE'.
* Action creators, action type and type constant are only linked by name not by a compiled
common structure, in big projects there can be many name clashes, small name variations, etc. 

This recipe/example has the Redux store code organized on functional (eg. chat, system) subtrees
which brings all the action concepts in the same place. 

The action creator, reducer and action type constant and action type are all placed in a single 
Typescript class which provides the common structure that links them all together.
The class has two _'interfaces'_, the class or static interface which provides:

The action type constant:
```typescript
static readonly _TYPE = 'SendMessageAction'
```
By convention, the type constant has the exact name as the class.

Action creator:
```typescript
static createAction(newMessage: Message): SendMessageAction {
  return {
    type: SendMessageAction._TYPE,
    newMessage
  }
}
```

Reducer function:
```typescript
static _reduce(state: ChatState, action: SendMessageAction): ChatState {
  return {
    messages: [...state.messages, action.newMessage]
  }
}
```

This reducer function is called from the reducer switch which will just dispatch the calls:

```typescript
switch (action.type) {
  case SendMessageAction._TYPE:
    return SendMessageAction._reduce(state, action as SendMessageAction)
  //...
```

The second interface, implemented as an abstract class, provide the actual object type:
```typescript
abstract readonly type: string
abstract readonly newMessage: Message
```
The runtime object will still be a plain object as required by Redux.

From connected components the action is used like:
```typescript
const mapDispatchToProps = {
  sendMessage: SendMessageAction.createAction,
// ...
```

Or directly with:
```typescript
dispatch(
  SendMessageAction.createAction({
    user,
    message,
    timestamp,
    isMe
  })
)
```

Disadvantages of this approach are:
* Still bloated
* Action class types are repeated a lot in definition
* One reducer per action (which arguably can be a good thing)

The project also has a working configured setup for eslint, prettier and less.
 
This project was initially bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Less is not supported by create react app without ejecting, so this is using less-watch-compiler 
to watch for changes and regenerate the css files inplace. CSS modules are used for styles in tsx files.

The project has a minimal ci configuration for Travis CI and automatically deploys to git hub pages. 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
CSS files will be updated if you make changes to the less files.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`

Deploys to github pages with the authenticated user.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
