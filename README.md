## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Repository Structure

### Main Page

http://localhost:3000 will display Main Page with scrap data taken from the external URL provided by the testers and displayed on a table.

GET requests to external URL are made:

- On Page load
- On Filter applying

Note: when hitting the button "Clear Filters" a new GET request without filters will be triggered.

POST requests to Mongodb Atlas database will be done right after GET responses, saving user usage details as requested by the testers.

### Usage Page

When switching tab to Usage Data, a POST request to extract usage data will be made to Mongodb Atlas. Note that even for making "GET" requests, Mongodb states method has to be POST.

Usage Data will be displayed on a table with no filters.

## Endpoint nomenclature

- findScrapData.ts - GET
- findUsageData.ts - POST
- insertOneUsageLog.ts - POST
  
## Important to note

In order to have access to Mongodb Atlas database, you will need to add temporary credentials that the project owner will provide when requested under authorization. 

## Dependencies 

- mui
- jsdom
- mongodb
- mongoose
- next
- react
- react-dom
- swr
- tailwind
- eslint
- jest
- react-testing-library

## Contributions and Questions

Feel free to share your feedback and ideas. 

Thank you for your contributions!
