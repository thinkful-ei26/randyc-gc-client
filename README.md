# GoodCall
In the dark and distant past when landlines were the norm, the appropriate time to call someone seemed more apparent but with the advent of mobile phones and more diverse work schedules that 'good' time to call a person has become harder to discern. Combine that with the alluring and intoxicating ability to call other time zones and the problem both escalates and becomes more complex. All this amazing technology but still that paralyzing question, when is a good time to call? Enter the 'goodCall' app, providing a simple way to have a 'friends and family' group communicate their individual call time schedules to each other and help match up times when it is best for both parties to talk based on a comparison of individual schedules. Hopefully the simple knowledge of knowing when a person is available to talk will result in more robust communication amongst groups. 

See the deployed version here: https://goodcall.herokuapp.com/

Client repo lives here: https://github.com/thinkful-ei26/randyc-gc-client
Server repo lives here: https://github.com/thinkful-ei26/randyc-gc-server

## Base Project Goal
GoodCall is intended to help a user keep track of the good times to call people.

## Project MVP:
Allow a single user to set a block of time utilizing a calendar UI and store the block of time in a persistant data base.


## Current Functionality:
GoodCall allows the creation of multiple users and allows for the secure log-in of existing users.
As a user you can currently set time block events with a day/date, start and end time via a calendar UI.
Exisitng time blocks can then be freely edited and deleted.
These blocks are stored in your secure user account via a persistant Mongo database.

## Future Functionality Goals:
* Allow users to add themselves to a user group where-in they can share schedule information.
This would allow viewable comparisons/filters of a user schedule with that of his or her entire user group or selected users of that group.

* Drag and drop functionality of calendar UI as well as stretching blocks to set start and end times.

* Intelligent suggestion alerts to a user, ie: It's Saturday, during your 1:30pm - 2:30pm time block it's a good time to call: Bill, Janet or Dave.
 
## Screenshots:

## User Log-in:
![](images/user-log-in.png)

## New User Registration:
![](images/new-user-registration.png)

## User Schedule View (Add Time Block Mode):
![](images/main-view-add-mode.png)

## User Schedule View (Edit Time Block Mode):
![](images/main-view-edit-mode.png)

## Tech Stack:
Frontend: React
State Management: Redux
Server: Node with Express
Database: MongoDB
Authentication: JWT
Main Calendar UI: FullCalendar
Time Selection UI: ReactJS Datepicker
 
## Code Base Structure:
## /src
/actions
  action-blocks-api
  action-users-api
  auth.js
  users.js
  utils.js
## /components
  dashboard.js
  header-bar.js
  input.js
  landing-page.js
  login-form.js
  registration-form.js
  registration-page.js
  requires-login.js
  showcalendar.js
## /reducers
  auth.js
  blocksReducer.js
  usersReducer.js
  rootReducer.js
  
  
  
 



