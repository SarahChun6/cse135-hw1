# CSE 135 HW1 Website - Deployment Setup

## Team Members
- Sarah Chun

## **Grader password:** letmepasspls
## **Server IP Address:** 138.68.9.238
No ssh key should be needed

https://schun.site


### Discussion of what your third approach was for 3rd party analytics, what you evaluated, why you picked the one you did, and your analysis of it

I did not have time to attempt a third approach for the 3rd party analytics but between Google analytics and Logrocket, Logrockets seems more comphrensive as well as invasive to user privacy. Google Analytics provides aggregated traffic data, pageviews, and basic event tracking, but does not show individual user sessions. LogRocket provides more detailed session tracking, letting you see clicks, scrolling, and user interactions in real time. Overall,  LogRocket was more useful but surprising because it allowed me to observe user behavior directly rather than in a combined summary.

### Other notes 

I initially implemented a Node.js server using CGI, handling simple HTML/JSON responses and environment variables. I then experimented with a reverse proxy setup, hosting a Node.js HTTP server to listen to Apache requests on port 3000. Ultimately, I reverted to the CGI approach, so the server now supports both versions, but uses CGI to avoid running a constantly open Node.js HTTP server. I also attempted to implement state with CGI, but it was unsuccessful, and my later attempt with Express behind a reverse proxy did not work in implementing state management with NodeJS either.