### Super Powerful Typewriter / Streaming Animation

![capture](https://github.com/wengcan/create-advanced-typewriter-animation/assets/4007458/fdee2a85-da55-47a1-96cd-7459b835e13c)

#### Install

This project relies on Node.js and npm. Ensure you have them installed locally if not already.

```
$ npm i create-advanced-typewriter-animation
```

Once the package is installed, you can import the library using either the import or require approach.
```
// using ES6 modules
import  createAdvancedTypingAnimation from 'create-advanced-typewriter-animation';
```
The UMD build is also accessible

```
<script src="/node_modules/create-advanced-typewriter-animation/dist/umd/bundle.js"></script>
```
then you can use `window.createAdvancedTypingAnimation`



#### Usage Example:
```
createAdvancedTypingAnimation(document.querySelector('.container'), `
    <writing infinity="true">
        <cursor />
        <typewriter duration='10' mode="1">
        a super powerful typing animation plugin, meticulously crafted using native JavaScript. It creates a captivating typewriter effect, infusing your web projects with a refined touch of sophistication.
        </typewriter>
    </writing>
`)
```
