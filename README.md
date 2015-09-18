# solvr.io
Find and hire solution ninjas

## GA WDI Project 4
Real-Time Marketplace for those with Problems and those with Solutions.

Built with: AngularJS, Firebase, Bootstrap, and Material Design

Deployed at this [link](https://solvr.firebaseapp.com)

## Install Instructions

1. Fork and clone repo locally.
2. Move into repo with ```cd solvr.io```
3. Run simple server at port of choice, e.g.
> ```ruby -run -e httpd . -p 8000```

4. View app by visiting localhost at configured port in browser
> http://localhost:8000

### User-Stories
* As a user, I want to be able to:
  - see all available contracts
  - search for contracts by title
  - select a contract and see all relevant info about that contract
  - register or log in
  - comment on a contract
  - view a personal dashboard showing all my posted and assigned contracts
* As a Poster:
  - post a new contract
  - manage my created contracts
  - edit a selected contract
  - cancel a selected contract
  - see all offers for my contracts
  - accept an offer
* As a Solvr:
  - make an offer on a contract
  - cancel an offer
  - see if my offer has been accepted
  - submit my solution

### Icebox
* Integrate Stripe API or another microservice to facilitate payments
* Automate Invoices and email receipts through a service like Zapier and Mandrill
* Add photo upload capabilities for Poster
* Private messaging service between Poster and Solvr
* Build Welcome Page

### Next Steps / Known Problems
* Add server-side authentication and validations for data
* Make code more modular by refactoring controllers/views into custom directives
* Update code to work with latest releases of dependencies
* Add landing page and update styles.
* Fix bugs with asynchronicity after submitting post form.

Please submit an issue to this repo with any other bugs or fixes.
