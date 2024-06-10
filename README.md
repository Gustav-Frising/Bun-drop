Blev något konstigt med minna commits till git så lägger upp commitsen i ett nytt project ungefär som jag jobbade med projectet.

json-server --watch db.json

npm run dev

Bun Drop documentation
The purpose of this project was to create a dynamic food delivery application suitable for
both mobile and desktop.
To achieve this, I started out with structuring up a mobile design in Figma, serving as the
base for the whole applications design. Using React as the framework/library of choice, I
structured every component in separate folders each with a matching CSS file, for an easier
navigation through the project. Json server was used as a mock database and all CRUD
operations fetch data locally.
For my tracking of the cart, I used local Storage, since I want the cart to still have your items
even after you have create an account. Local storage is also used for tracking current signed
in user keeping track of the favorites list which is stored in each individual user. I placed my
useEffects for tracking the state of User information and cart items in the custom
UseLocalStorage hook making the functions very flexible and easy to use.
A new approach I had which I never used before was Modals with conditional rendering for
forms, having a component which can handle both sign up/login and for payment choosing
between card/swish. Something super powerful with react is how easy it is to pass your
functions through components, in my case it proved very helpful when passing functions for
handling form submits, since a lot of conditions must be met before an order is saved in the
database.
With a lot of appearance as the main point for the development I ended up spending around
a week just styling the components and pages in CSS, regretfully this turned out to be quite
the setback for my functionality since there is always unexpected errors on the way. I
managed to implement every feature in time but not without some workarounds.
I had problems with rendering 2 components at the same time based on local storage for
favorites and menu items. I chose to display both on the same page and had to add so I can
scroll to the item with the same Id as the favorite instead, and now only have to change the
state baste on inputs from 1 component.
I really enjoyed working with react and state in this project I have realized the strength of
react hooks and components.
Had I done it again from scratch I would have looked at use Context for managing state
through the whole application mixing it with local storage for a better structure. I would also
have created more custom hooks and maybe some more components which ended up
appearing more then what I thought in the beginning.
