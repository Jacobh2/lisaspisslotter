# New Project

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm test

Launches the test runner in the interactive watch mode.
See the section about running tests for more information.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" or "@snowpack/plugin-parcel" to your `snowpack.config.json` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.

### npm generate <tile>

Will output a winning game board based on the given tile!

The tile must exist as a .webp icon in public/icons

# TODO

## Frontend
- [x] Start using icons instead of text in tiles
- [x] Have start page / landing page
  - Will always yield a losing ticket
- [x] Winning / losing page
- [A] Scratch also the "don't scratch this square" thing, and then trigger a instant lose
- [x] Don't show icons until everything is loaded
- [x] Change favicon
- [x] Update HTML title
- [A] All "events" should be recognized in the message bar
- [x] Recognize hash events to make Jacob stfu
- [ ] Favourite Lisa quotes i nedre högra textfältet

## Backend
- [x] Other way of handling winning IDs?
  - Be able to give a specific price
- [x] Rename state to store
- [x] Compress sounds to get better UX on phone/slower internet 
- [x] Add cutout for "don't scratch this square" thing
- [J] Create proper winning list
  - Lots of beer
  - VIP ticket
  - Something with a hat
- [x] Photo edit ticket to say correct years under 30

