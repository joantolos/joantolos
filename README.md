# Joan Tolós Site

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Mail configuration

The contact form backend now requires these environment variables:

- `MAIL_USER`
- `MAIL_PASS`
- `SITE_EMAIL` (optional, defaults to `MAIL_USER`)
- `SMTP_HOST` (optional, defaults to `smtp.gmail.com`)
- `SMTP_PORT` (optional, defaults to `465`)
- `SMTP_SECURE` (optional, defaults to `true`)

## Private finance dashboard

The private finance area requires these environment variables:

- `AUTH_USERNAME`
- `AUTH_PASSWORD`
- `AUTH_SESSION_SECRET`
- `FINANCE_DASHBOARD_JSON` (optional)

Example `FINANCE_DASHBOARD_JSON` value:

```json
{
  "title": "Savings Dashboard",
  "updatedAt": "2026-05-06",
  "averageMonthlyQuota": 174.22,
  "goals": [
    {
      "name": "POM",
      "current": 4638,
      "target": 6000,
      "etaMonths": 8,
      "etaLabel": "Estimated in 8 months"
    },
    {
      "name": "Car Fund",
      "current": 0,
      "target": 7000,
      "etaMonths": 41,
      "etaLabel": "Estimated in 3 years and 5 months"
    }
  ],
  "monthlySavings": [
    { "date": "2026-03-01", "amount": 247.33 },
    { "date": "2026-04-01", "amount": 54 },
    { "date": "2026-05-01", "amount": 744 }
  ],
  "notes": [
    "Update values monthly."
  ]
}
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
