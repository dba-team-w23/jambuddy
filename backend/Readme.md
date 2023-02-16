# Backend API

The following URLs API endpoints should be active on both local development (`localhost:8000/api/...`) and the testing server (`https://dbajamteam.pythonanywhere.com/api/...`):

```sh
-api/users/: GET (all) and POST actions
-api/users/<int:pk>/: GET (singular), PUT, and DELETE actions
-api/experiencelevels/: Get All and post actions
-api/experiencelevels/<int:pk>/:GET (all) and POST actions
-api/instruments/: GET (singular), PUT, and DELETE actions
-api/instruments/<int:pk>/:GET (all) and POST actions
-api/jamrequests/: GET (singular), PUT, and DELETE actions
-api/jamrequests/<int:pk>/:GET (all) and POST actions
-api/jamresponses/: GET (singular), PUT, and DELETE actions
-api/jamresponses/<int:pk>/:GET (all) and POST actions
-api/musicgenres/: GET (singular), PUT, and DELETE actions
-api/musicgenres/<int:pk>/:GET (all) and POST actions
-api/usergenres/: GET (singular), PUT, and DELETE actions
-api/usergenres/<int:pk>/:GET (all) and POST actions
-api/userinstruments/: GET (singular), PUT, and DELETE actions
-api/userinstruments/<int:pk>/:GET (all) and POST actions
-api/usermedia/: GET (singular), PUT, and DELETE actions
-api/usermedia/<int:pk>/:GET (all) and POST actions
-api/userreviews/: GET (singular), PUT, and DELETE actions
-api/userreviews/<int:pk>/:GET (all) and POST actions
```
