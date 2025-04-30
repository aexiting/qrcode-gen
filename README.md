

## How do (thing)? 

Easy just pull in the code and use:
``
npm run dev
``
should work right out-of-the-box assuming you've installed all the npm dependencies.

Be sure to build with:
``
npm run build
``

And to run the test suite:
``
npm run test
``
# Lightweight QRCode generator
This is a QRCode generator for basics strings. I've abstracted away all the complicated features of QRCodes that
might be difficult to understand by less technical folks. 

## Rationale
I made the website for myself, since I like to go bar hopping.
Very often I would get along with someone and take 5 minutes or so to exchange info. It's loud, dark and people are 
typically inebriated. So rather than fiddling with your phone having a one place you can tap and show a QRCode is 
an easier time.

**Link to website:** https://qr-gen.dev/

## How It's Made:

**Tech used:** HTML, CSS, Typescript, React + Vue

A basic React + Vue.js app. I used the React library for handling logic to determine side effects based on the data.
I also thought it would easier to break up the elements of the page into components using that library. And of course, 
React is an industry standard, so I hope it increases the chances of others contributing or using it in the future.

I'm a very error-prone developer so Typescript was an easy choice. I think it's worth the overhead for set up, because
the lint errors kept me from making typing mistakes that lead to weird edge cases. 

Looking at other QRCode generators the look was a bit dry. With this project I put extra effort and research into creating
a decent(?) interface that could be used especially in darker rooms.

## Contact me
You can email me: ``demetriusp8@gmail.com`` for any feedback you have.

## Lessons Learned:

Honestly the hardest thing is starting a new project. Starting your first project is even harder.
Everything else is pretty fun once the ball is rolling.


