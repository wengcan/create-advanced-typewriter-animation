### Super Powerful Typewriter / Streaming Animation


> This JavaScript library offers user-friendly web **text animations**, including typewriter effects, streaming effects and other styles, with a focus on performance. 

[Demo](https://create-advanced-typewriter-animation.vercel.app/) 


#### Preview

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

#### Directive Explanation:

| Directive    | Description                                                                                   | Attributes                                                              |
| ------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `<writing>`  | Specifies the writing block, containing various child elements (e.g., `<cursor>`, `<hideCursor>`, `<typewriter>`, `<moveCursor>`, `<delete>`, `<mask>`, `<clear>`). | `infinity`: Specifies whether the animation should loop infinitely (`true` or `false`). |
| `<cursor>`   | Represents the typing cursor. Used inside the `<writing>` block to denote where typing should begin. | None                                                                     |
| `<hideCursor>` | Hides the typing cursor. Used inside the `<writing>` block to hide the cursor. | None                                                                     |
| `<typewriter>` | Represents a block of text that is typed out in the animation.                              | - `speed`: Typing speed in units per character (higher number means slower typing). <br> - `duration`: Specifies the total duration of the typing effect (overrides `speed` if provided). <br> - `mode`: Typing animation style (`0`, `1`, or `2`): <br>     - `0`: Character by character typing. <br>     - `1`: Word by word typing. <br>     - `2`: Sentence by sentence typing. <br> - `className`: CSS class for the typed text, useful for styling specific parts of the text. |
| `<moveCursor>` | Moves the cursor a specified number of steps. | - `duration`: Duration of the cursor movement. <br> - `mode`: Cursor movement style (`0` or `1`): <br>     - `0`: Moves the cursor backward. <br>     - `1`: Moves the cursor forward. <br> - `count`: Number of steps to move the cursor. |
| `<delete>`   | Represents a deletion effect where characters are removed one by one. | - `duration`: Duration of the deletion effect. <br> - `count`: Number of characters to delete. <br> **Note**: The `<delete>` directive only works when the cursor is specified in the previous directive. |
| `<delay>`    | Represents a delay or pause in the animation.                                                | `duration`: Duration of the delay. |
| `<mask>`     | Represents a mask effect that reveals or hides text in a certain style.                     | - `duration`: Duration of the mask effect. <br> - `color`: Color or gradient for the mask. <br> - `mode`: Mask style (`0`, `1`, or `2`): <br>     - `0`: Character by character masking. <br>     - `1`: Word by word masking. <br>     - `2`: Sentence by sentence masking. |
| `<clear>`    | Clears the contents of the writing block. | None |

