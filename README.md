# Vehicle Insurance Quote Generator

This project implements a web application for generating vehicle insurance quotes. It consists of an Angular frontend and a Spring Boot backend.

## Overview

The Angular frontend allows users to input their personal and vehicle details through a multi-step form flow. It uses Angular Material and other libraries like Tailwind CSS for styling and layout.

The entered information is sent to the Spring Boot backend which calculates a personalized insurance premium quote. The backend implements the core business logic for generating quotes based on factors like age, vehicle value, driving history etc.

Key technical features:

- Responsive and user-friendly interface built with Angular and Angular Material
- Reactive forms for data input validation
- Multi-step workflows and navigation
- Dynamic form fields and validations
- Integration with backend services for premium calculation
- Animations and transitions for visual polish
- Deployed on Vercel with CI/CD integration

## Running the Application

The frontend and backend can be run independently for development.

### Frontend

Prerequisites:

- Node.js
- Angular CLI

```
yarn install
yarn start
```

The app will be available at `http://localhost:4200`

### Backend

View more information about the backend at:
<https://github.com/tutuCH/Connex-Tx-Java-Project>

## Challenges and Learnings

Some key challenges faced while building this application:

- **Complex form logic** - Building reactive forms with dynamic fields and multi-step flows required meticulous planning and error handling. The vehicle information page with its cascading autocomplete fields was particularly complex to implement. Reading Angular Material documentation and researching techniques to dynamically update form control options based on user input was crucial to overcoming this challenge.

Building this project provided an opportunity to apply core skills like:

- Planning complex features and workflows
- Understanding integration between frontend and backend
- Angular architecture and best practices
- Reactive programming techniques
- Building responsive and user-friendly interfaces

## Live Demo

A live demo is hosted on Vercel

open chrome with the following command for the demo:

```
open -n -a "Google Chrome" --args --user-data-dir="/tmp/chrome_dev_test" --disable-web-security
```

demo link: <https://connex-tx-angular-project.vercel.app/>

Please feel free to explore the application and provide any feedback for improvement. The source code is available on GitHub.
